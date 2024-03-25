import "./SignIn.scss";
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import { MealMasterApi } from "./../../utils/utils.jsx";

const SignIn = () => {
    const mealMasterApi = new MealMasterApi();
    const form = document.getElementById("signin");

    function handleSubmit(event) {
        event.preventDefault();
        const userData = {
            email: event.target.email.value,
            password: event.target.password.value
        };

        async function verifyUser(userData) {
            try {
                const token = localStorage.getItem("token");
                const response = await mealMasterApi.verifyUser(userData, token);
                if (response.status === 201) {
                    console.log("user Authenticated", response);
                    //pass user Object to App and the main page(Profile) 
                }
            } catch (error) {
                const status = error.response.status;
                const message = error.response.data.error;

                if (status === 401 || status === 409) {
                    toast.error(`${message}`);
                }
                else {
                    console.log("Error while signing in user:", error);
                }
            }
        }
        verifyUser(userData);
        // form.reset();
    }

    return (
        <form className="signin" id="signin" onSubmit={handleSubmit}>
            <p className="signin__title">Create Account</p>

            <div className="signin__row">
                <label className="signin__label">Email Address:</label>
                <input
                    className="signin__textbox"
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Email Address"
                    required
                />
            </div>

            <div className="signin__row">
                <label className="signin__label">Password:</label>
                <input
                    className="signin__textbox"
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    required
                />
            </div>

            <div className="signin__row">
                <Link className="signup__link" to="/signup">Create an Account</Link>
            </div>

            <div className="signin__row">
                <button className="signin__button" type="submit">Sign In</button>
            </div>
            <ToastContainer />
        </form>
    );
}

export default SignIn;