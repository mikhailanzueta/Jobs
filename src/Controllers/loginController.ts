import {Express, Router, Response, Request} from 'express';
import prisma, { getExistingUser } from '../prisma'
import bcrypt from 'bcrypt';


export const loginRequest = async(req: Request, res: Response): Promise<any> => {
    try {
        const {email, password} = req.body;

        if (!email || !password) {
            res.status(204).json({error: "Email and password are required."})
            return
        }

        // Check if the email or password exists in database:
        const User = await getExistingUser(email);
        if (!User || !User.activePassword?.password?.userPassword) {
            res.status(400).json({error: "Invalid email or password."})
            console.log(User)
            console.log(User?.activePassword?.password.userPassword)
            return 
        }

        // Check if provided password matches password in the database:
        const storedPassword = User.activePassword.password.userPassword;
        const passwordMatch = await bcrypt.compare(password, storedPassword);

        if (!passwordMatch) {
            res.status(401).json({error: "Incorrect password."})
            return
        }

        res.status(200).json({message: 'User successfully logged in!'})
        
    } catch (error) {
        console.error('Error logging in: ', error);
        return res.status(500).json({error: "Internal server error."})
    }
}
