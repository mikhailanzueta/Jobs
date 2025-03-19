import React from 'react'
import { useState } from 'react'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import {checkIfPasswordValid, checkPasswordMatch, PasswordErrorCodes} from '../../../../shared'


function Signup() {
  // const [formError, setFormError] = useState<string | null>(null)
  const [passwordError, setPasswordError] = useState<string | null>();
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    const formData = new FormData(e.currentTarget)
    if(formData.has("resume")) {
      const file = formData.get('resume') as File;
      formData.append('resumeName', file.name)
    }
    for (const [key, value] of formData.entries()) {
      console.log(key + ': ' + value);
    }

    const isPasswordValid = checkIfPasswordValid(password)
    if (!isPasswordValid) {
      setPasswordError(PasswordErrorCodes.WeakPassword)
    }

    const passwordsMatch = checkPasswordMatch(password, confirmPassword);
    if (!passwordsMatch) {
      setConfirmPasswordError(PasswordErrorCodes.PasswordsDoNotMatch);
    }

    if(formData)

    try {
      const response = await fetch('http://localhost:3000/api/Signup', {
        method: "POST",
        headers: {},
        body: formData
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(`HTTP Error: ${JSON.stringify(errorData)}`)
        // if (ApiReturnStatusCodes[response.status] == null) {
        //   console.error('Unknown error code: ', response.status, errorData)
        // }else {
        //   setFormError(ApiReturnStatusMessages[response.status])
        // }
      }
      const result = await response.json()
      console.log('User successfully signed up: ', result)
    } catch(error) {
      console.error('Error: ', error)
    }

  };
    
    return (
        <React.Fragment>
          
          <div className="border-4 border-white m-[4%_30%_12%_30%] h-auto p-5 bg-dark-slate-gray rounded-3xl signup-page">
            <div className='flex flex-col items-center w-full mt-5 header'>
              <h1 className='text-center text-3xl mt-5 mb-4 text-white tracking wide'>SIGNUP PAGE</h1>
              <div className='w-14 h-1.5 rounded-md bg-wheat underline'></div>
            </div>
            <form className='flex flex-col justify-center items-center mt-5 mx-auto' onSubmit={submitForm} action='submit'>
              <div className='mb-5 input-container'>
                <label htmlFor="firstName"></label>
                <FontAwesomeIcon icon={faUser} className='user-icon text-white text-[18px]'/>
                <input type="text" name="firstName" id="firstName" placeholder='First Name' className='w-[20vw] p-4 border-[1px] text-[white] border-white bg-transparent ml-5 placeholder:text-[french-gray]' required />
              </div>
              <div className='mb-5 input-container'>
                <label htmlFor="lastName"></label>
                <FontAwesomeIcon icon={faUser} className='user-icon text-white text-[18px]'/>
                <input type="text" name="lastName" id="lastName" placeholder='Last Name' className='w-[20vw] p-4 border-[1px] text-[white] border-white bg-transparent ml-5 placeholder:text-[french-gray]' required />
              </div>
              <div className='mb-5 input-container'>
                <label htmlFor="email"></label>
                <FontAwesomeIcon icon={faEnvelope} className='email-icon text-white text-[18px]'/>
                <input type="text" name="email" id="email" placeholder='Email' className='w-[20vw] p-4 border-[1px] text-[white] border-white bg-transparent ml-5 placeholder:text-[french-gray]' required />
              </div>
              <div className='mb-5 input-container'>
                <label htmlFor="password" className='mb-1.5 w-full text-white '></label>
                <FontAwesomeIcon icon={faLock} className='password-icon text-white text-[18px]'/>
                <input type="password" name="password" id="password" placeholder='Password' className='w-[20vw] p-4 border-[1px] text-[white] border-white bg-transparent ml-5 placeholder:text-[french-gray]' value={password} onChange={(e) => {
                  const value = e.currentTarget.value;
                  setPassword(value);
                  setPasswordError(null)
                }} required />
              </div>
              {passwordError && <div className="text-red-500 text-sm mr-4">{passwordError}</div>}
              <div className='mb-5 input-container'>
                <label htmlFor="password"></label>
                <FontAwesomeIcon icon={faLock} className='password-icon text-white text-[18px]'/>
                <input type="password" name="confirmPassword" id="confirmPassword" placeholder='Confirm Password' className='w-[20vw] p-4 border-[1px] text-[white] border-white bg-transparent ml-5' value={confirmPassword} onChange={(e) => {
                  const value = e.currentTarget.value;
                  setConfirmPassword(value);
                  setConfirmPasswordError("")
                }} required />
                {confirmPasswordError && <div className="text-red-500 text-sm mr-4">{confirmPasswordError}</div>}
              </div>
              <div className='mb-5 ml-4 input-container'>
                <input type='file' name='resume' id='resume' />
                <button></button>
              </div>
              <button type="submit" className='text-white text-[14px] border-[1px] border-white bg-transparent rounded-[6px] p-[12px] mb-[16px] hover:bg-wheat hover:text-black hover:border-none'>Sign up</button>
              <button type="button" className='text-white text-[14px] border-[1px] border-white bg-transparent rounded-[6px] p-[12px] mb-[16px] ml-2.5 hover:bg-wheat hover:text-black hover:border-none'>Sign up with Google <FontAwesomeIcon icon={faGoogle} className='ml-2 text-[13px] google-icon'/></button>
              
              <Link to="/login" className="text-center text-wheat m-[10px_auto] underline login-btn">Already have an account?</Link>
            </form>
          </div>
          
        </React.Fragment>
      );
}

export default Signup