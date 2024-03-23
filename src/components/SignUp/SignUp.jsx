import "./SignUp.scss";
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';

const SignUp = () => {

     //Setting formData state variable for form input validations
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    function handleInputChange(event) {  
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    function handleSubmit(event) {
        event.preventDefault(); 

         // Email validation (basic format check)
         var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
         if (!emailRegex.test(formData.email)) {
            toast.error("Invalid email format.");
             return;
         }
        
        // Added validation if Password length < 8
        if (formData.password.length < 8) {
            toast.error("Password must be at least 8 characters long.");
            return;
        }

         // Added validation if Passwords do not match
        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        } 

        const userData= {
            firstName:event.target.firstName.value,
            lastName:event.target.lastName.value,
            passowrd:event.target.password.value,
            email:event.target.email.value
        }
        console.log(userData);
        
       // Show toast notification
       toast.success("Form submitted successfully!", {
        onClose: () => {
          // Navigate to the home page after the toast is closed
          //navigate("/");
        }
      });        
    }

    return (
        <form className="signup" onSubmit={handleSubmit}>
            <p className="signup__title">Create Account</p>

            <div className="signup__row">
                <label className="signup__label">First Name:</label>
                <input
                    className="signup__textbox"
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    placeholder="First Name"
                    onChange={handleInputChange}
                    required
                />
            </div>

            <div className="signup__row">
                <label className="signup__label">Last Name:</label>
                <input
                    className="signup__textbox"
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    placeholder="Last name"
                    onChange={handleInputChange}
                    required
                />
            </div>

            <div className="signup__row">
                <label className="signup__label">Email Address:</label>
                <input
                    className="signup__textbox"
                    type="text"
                    id="email"
                    name="email"
                    value={formData.email}
                    placeholder="Email Address"
                    onChange={handleInputChange}
                    required
                />
            </div>

            <div className="signup__row">
                <label className="signup__label">Password:</label>
                <input
                    className="signup__textbox"
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    placeholder="Password"
                    onChange={handleInputChange}
                    required
                />
            </div>

            <div className="signup__row">
                <label className="signup__label">Confirm Password:</label>
                <input
                    className="signup__textbox"
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    placeholder="Confirm Password"
                    onChange={handleInputChange}
                    required
                />
            </div>

            <div className="signup__row">
                <Link className= "signup__link" to="/">Have an Account ?</Link>
            </div>

            <div className="signup__row">
                <button className="signup__button" type="submit">Sign In</button>
            </div>
            <ToastContainer />
        </form>
          
    );
}

export default SignUp;