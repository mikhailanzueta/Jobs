import {Express, Router, Response, Request} from 'express';
import bcrypt from 'bcrypt';
import owasp from "owasp-password-strength-test";
import prisma, { createNewUser } from '../prisma'
import { uploadFileToAwsS3 } from '../Controllers/s3Use';
import {UploadedFiles} from '../types'
import { ApiReturnStatusMessages, checkIfPasswordValid, checkPasswordMatch } from '../../../shared';
// import { completeSignIn, tryEmailSignIn } from '../../../frontend/src/firebase'

export const signupRequest = async (req: Request, res: Response):Promise<any> => {
    try {
        // extract all the data from the frontend's request body
        const { firstName, lastName, email, password, confirmPassword, resumeName } = req.body;
        const files = req.files as UploadedFiles; // Explicitly cast req.files
        const file = files?.resume; // Get the resume file
        console.log('req.files: ', files)
        console.log('File: ', file)
        console.log('resume name from req.body: ', resumeName)

        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            res.status(401).json({error: "Not a valid email address."})
            return
        }

        const possibleError = checkIfPasswordValid(password)
        if (possibleError) {
          res.status(400).json({error: 'Invalid password'})
          return
        }
    
        const passwordsMatch = checkPasswordMatch(password, confirmPassword);
        if (!passwordsMatch) {
          res.status(402).json({error: "passwords do not match"})
          return;
        }
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Upload file if present
        let resumeURL = null;
        if (file) {
            const fileData = {
                fileName: resumeName, // Properly extract the name of the file from resumeName
                filePath: file.path, // Correctly extracted path
            };
            resumeURL = await uploadFileToAwsS3(fileData); // Set the users resumeURL in the database, to the AWS S3 url
        }

        // Save user to database
        const newUser = await createNewUser({
            firstName,
            lastName,
            email,
            hashedPassword,
            resumeURL,
        },);

        return res.status(201).json({message: "User signed up successfully",});

    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
