import "./SignUp.scss";
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { MealMasterApi } from "./../../utils/utils.jsx";

const SignUp = () => {
    const mealMasterApi = new MealMasterApi();
    //const form = document.getElementById("signup");
    const navigate = useNavigate();

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
        const form = event.target;

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

        const newUserData = {
            firstName: event.target.firstName.value,
            lastName: event.target.lastName.value,
            password: event.target.password.value,
            email: event.target.email.value
        }

        async function postNewUser(newUserData) {
            try {
                const response = await mealMasterApi.postNewUser(newUserData);
                if (response.status === 201) {
                    toast.success(`${response.data}`, { autoClose: 800 });
                    await new Promise(resolve => setTimeout(resolve, 1500)); //sleeps for 2000
                    navigate("/");
                }
            } catch (error) {
                let status = "", message = "";
                if (error.response) {
                    status = error.response.status;
                    message = error.response.data.message;
                }
                if (status === 409) {
                    toast.error(`${message}`);
                } else {
                    console.log("Error while adding new user: ", error);
                }
            }
        }
        postNewUser(newUserData);
        form.reset();
    }

    return (
        <form className="signup" onSubmit={handleSubmit}>
            <p className="signup__title">SignUp</p>

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

                />
            </div>

            <div className="signup__row">
                <Link className="signup__link" to="/">Have an Account ?</Link>
            </div>

            <div className="signup__row">
                <button className="signup__button" type="submit">Sign Up</button>
            </div>
            <ToastContainer />
        </form>
    );
}

export default SignUp;