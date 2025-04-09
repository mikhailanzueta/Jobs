import { PrismaClient, Prisma } from "@prisma/client";
import { userInfo } from "os";
import {Express, Response, Request} from 'express';
import bcrypt from 'bcrypt';
import owasp from "owasp-password-strength-test";
const prisma = new PrismaClient()
import { getFileFromAwsS3 } from "./Controllers/s3Use";
// import { tryEmailSignIn, completeSignIn, sendSignInLinkToEmail, firebaseConfig } from "../../frontend/src/firebase"; 
import { auth } from '../../frontend/src/firebase'

// TODO: implement

export const createNewUser = async ({ firstName, lastName, email, hashedPassword, resumeURL }: any) => {
    console.log('ResumeURL: ', resumeURL)

    const user = await prisma.user.create({
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
            activePassword: true,
            resumes: true,
            activeResume: true,
        }
    });
    const activeUserPassword = await prisma.activeUserPassword.create({
        data: {
            userId: user.id,
            passwordId: user.passwords[0].id,
        }
    })

    const activeResume = await prisma.activeUserResume.create({
        data: {
            userId: user.id,
            resumeId: user.resumes[0].id,
        }
    })
    return user
    
};

export const getExistingUser = async (email: string) => {
        return await prisma.user.findUnique({
            where: { email },
            select: {
                email: true,
                activePassword: {
                    select: {
                      password: {
                        select: {
                          userPassword: true,
                        },
                      },
                    },
                },
            },
        });
        // if (!user || !user.activePassword) {
        //     console.error('Invalid email or password!')
        // }
        // const storedPassword = user.activePassword.password.userPassword;
        // const passwordMatch = bcrypt.compare(password, storedPassword);
}
// export const createAndSendInvite = async(email: string) => {
//     try {
//         //Make sure user exists:
//         let user = await prisma.user.findUnique({where: {email}});
        
//         //Create invite:
//         const newInvite = await prisma.invites.create({
//             data: {
//                 userId: user.id,
//                 accepted: false,
//             }
//         })

//         // Generate invite link:
//         const inviteLink = `${firebaseConfig.messagingSenderId}/invite?token=${newInvite.id}`; // This is the link they are going to click
//         const actionCodeSettings = {
//             url: 'http://localhost:5173/',
//             handleCodeInApp: true,
//         }

//         //Send out invite using firebase:
//         await sendSignInLinkToEmail(auth, email, actionCodeSettings)
//             .then(() => {
//                 alert('Verification link sent to your email!')
//                 window.localStorage.setItem('emailForSignIn', email);
//             })
//             .catch((error) => {
//                 const errorCode = error.code;
//                 const errorMessage = error.message;
//                 console.log(errorCode, errorMessage)
//             })
//     }
// }
export default prisma;
