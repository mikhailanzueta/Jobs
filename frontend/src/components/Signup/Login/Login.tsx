import React from 'react'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
// import {checkIfPasswordValid, checkPasswordMatch, PasswordErrorCodes} from "../../../../../shared/"
import { handleGoogleSignIn } from '../../../../src/firebase'



function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState<string>('')
    const [emailError, setEmailError] = useState<string | null>()
    const [passwordError, setPasswordError] = useState<string | null>();
    const [password, setPassword] = useState<string>("")
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(faEyeSlash);


    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();


        try {   
            // fetch user data from backend:
            const response = await fetch('http://localhost:3000/api/Login', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({email, password})
            })

            const result = await response.json();

            if (!response.ok) {
                const message = result.error || 'Something went wrong!'

                if (message.toLowerCase().includes('email')) {
                    setEmailError(message)
                }
                if (!message.toLowerCase().includes('email')) {
                    setPasswordError(message)
                } 
                return

                // const errorData = await response.json();
                // throw new Error(`HTTP Error: ${JSON.stringify(errorData)}`)
            }
            console.log(result)
        } catch(error) {
            console.error('Error: ', error)
            setPasswordError('Server error.')
          }
    }

    // Password toggle:
    const handlePasswordToggle = () => {
        if (type === 'password') {
          setIcon(faEye)
          setType('text')
        } else {
          setIcon(faEyeSlash)
          setType('password')
        }
    }

    




    return (
        <React.Fragment>
        
        <div className="border-4 border-white m-[8%_30%_12%_30%] h-auto p-5 bg-dark-slate-gray rounded-3xl login-page">
            <div className='flex flex-col items-center w-full mt-5 header'>
            <h1 className='text-center text-3xl mt-5 mb-4 text-white tracking wide'>Login</h1>
            <div className='w-14 h-1.5 rounded-md bg-wheat underline'></div>
            </div>
            <form className='flex flex-col justify-center items-center mt-5 mx-auto' onSubmit={submitForm} action='submit'>
            <div className='mb-5 input-container'>
                <label htmlFor="email"></label>
                <FontAwesomeIcon icon={faEnvelope} className='email-icon text-white text-[18px]'/>
                <input type="text" name="email" id="email" placeholder='Email' className='w-[20vw] p-4 border-[1px] text-[white] border-white bg-transparent ml-5 placeholder:text-[french-gray]' value={email} onChange={(e) => {
                    const value = e.currentTarget.value
                    setEmail(value)
                    setEmailError('')
                }} required />
            </div>
            {emailError && <div className="text-red-500 text-sm mb-[4px] ml-[8px]">{emailError}</div>}
            <div className='mb-5 relative input-container'>
                <label htmlFor="password" className='mb-1.5 w-full text-white '></label>
                <FontAwesomeIcon icon={faLock} className='password-icon text-white text-[18px]'/>
                <input type={type} name="password" id="password" placeholder='Password' className='w-[20vw] p-4 border-[1px] text-[white] border-white bg-transparent ml-5 placeholder:text-[french-gray]' value={password} onChange={(e) => {
                    const value = e.currentTarget.value;
                    setPassword(value);
                    setPasswordError("")
                }} required />
                <span className='icon' onClick={handlePasswordToggle}>
                <FontAwesomeIcon icon={icon} className="eye-icon" />
                </span>
            </div>
            {passwordError && <div className="text-red-500 text-sm mb-[4px] ml-[8px]">{passwordError}</div>}
            <button type="submit" className='text-white text-[14px] border-[1px] border-white bg-transparent rounded-[6px] p-[12px] mb-[16px] hover:bg-wheat hover:text-black hover:border-none'>Login</button>
            <button type="button" className='text-white text-[14px] border-[1px] border-white bg-transparent rounded-[6px] p-[12px] mb-[16px] ml-2.5 hover:bg-wheat hover:text-black hover:border-none' onClick={handleGoogleSignIn}>Sign up with Google <FontAwesomeIcon icon={faGoogle} className='ml-2 text-[13px] google-icon'/></button>
            
            <button className="text-center text-wheat m-[10px_auto] underline login-btn" onClick={() => navigate("/Signup")}>Don't have an account?</button>
            </form>
        </div>
        
        </React.Fragment>
    );
}
export default Login
