import React from 'react'
import { useState } from 'react'
import { Link } from "react-router-dom";


function Signup() {

    return (
        <React.Fragment>
          <div className="signup-page">
            <h1>SIGNUP PAGE</h1>
            <form>
              <div>
                <label htmlFor="firstName">First Name:</label>
                <input type="text" name="firstName" id="firstName" required />
              </div>
              <div>
                <label htmlFor="lastName">Last Name:</label>
                <input type="text" name="lastName" id="lastName" required />
              </div>
              <div>
                <label htmlFor="email">Email:</label>
                <input type="text" name="email" id="email" required />
              </div>
              <div>
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" id="password" required />
              </div>
              <div>
                <label htmlFor="password">Confirm Password:</label>
                <input type="password" name="password" id="password" required />
              </div>
              <button type="submit">Sign up</button>
              <button type="submit">Sign up with Google</button>
              <Link to="/login" className="login-btn">Already have an account?</Link>
            </form>
          </div>
          
        </React.Fragment>
      );
}

export default Signup