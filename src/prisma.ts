import { PrismaClient, Prisma } from "@prisma/client";
import { userInfo } from "os";
import {Express, Response, Request} from 'express';
import bcrypt from 'bcrypt';
import owasp from "owasp-password-strength-test";
const prisma = new PrismaClient()
import { getFileFromAwsS3 } from "./Controllers/s3Use";

// TODO: implement

export const createNewUser = async ({ firstName, lastName, email, hashedPassword, resumeURL }: any) => {
    console.log('ResumeURL: ', resumeURL)

    return await prisma.user.create({
        data: {
            email,
            name: `${firstName} ${lastName}`,
            passwords: {
                create: {
                    userPassword: hashedPassword
                },
            },
            resumes: resumeURL
                ? { create: { resumeURL } }
                : undefined,
                
        },
        include: {
            passwords: true,
            resumes: true,
        }
    });
    
    
};
export default prisma;
