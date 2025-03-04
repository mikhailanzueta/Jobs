import express, { Router } from 'express';
import { signupRequest } from '../Controllers/signupController'
import multer from 'multer';
const upload = multer({ dest: 'uploads/' });
import { uploadFileToAws } from '../Controllers/s3Connect';

const router: Router = Router();
router.get('/Signup', (req, res) => {
    res.status(200).json({ message: "Signup route is working" });
});

router.post('/Signup', (req, res, next) => {
    // res.status(200).json({message: 'Signup was successful'})
    // console.log("temp", req.body.length, req.body.file)
    // uploadFileToAws(req.body.firstName, req.body.file)
    next()
} , signupRequest)

export { router }
