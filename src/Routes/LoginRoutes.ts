import express, { Router } from 'express';
import { loginRequest } from '../Controllers/loginController'
import multer from 'multer';

const router: Router = Router()
router.get('/Login', (req, res) => {
    res.status(200).json({ message: "Login route is working" });
});

router.post('/Login', (req, res, next) => {

    next()
}, loginRequest)
export { router }