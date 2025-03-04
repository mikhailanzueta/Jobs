import 'dotenv/config';
import os from 'os';
import express from "express";
import path from "path";
import session from "express-session";
import cors from "cors";
import passport from "passport";
import helmet from 'helmet';
import multer from 'multer';
import expressformData from 'express-form-data';
import env from "./config";
import {router as signupRoutes} from './Routes/signupRoutes';
import { uploadFileToAwsS3 } from './Controllers/s3Use';

const app = express();

/**
 * Options are the same as multiparty takes.
 * But there is a new option "autoClean" to clean all files in "uploadDir" folder after the response.
 * By default, it is "false".
 */
const options = {
    uploadDir: os.tmpdir(),
    autoClean: true
};

// parse data with connect-multiparty. 
app.use(expressformData.parse(options));
// delete from the request all empty files (size == 0)
app.use(expressformData.format());
// change the file objects to fs.ReadStream 
app.use(expressformData.stream());
// union the body and the files
app.use(expressformData.union());
app.use(cors());
app.use(helmet({ contentSecurityPolicy: false }));
// USE JSON
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(session({
    secret: env.session_secret,
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
app.get("/", (req, res) => {
    res.status(200).send("Hello world!!");
});

app.use('/api', signupRoutes)

app.listen(env.port, () => {
    console.log(`Server listening on port ${env.port}`);
});
