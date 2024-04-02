import "./SignIn.scss";
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import { MealMasterApi } from "./../../utils/utils.jsx";

const SignIn = ({ setLoggedIn, setUserData }) => {
    const mealMasterApi = new MealMasterApi();
    const form = document.getElementById("signin");
    const navigate = useNavigate();

    /**
     * When you click on "SignIn" button,this function get called
     * @param {*} event 
     */
    function handleSubmit(event) {
        event.preventDefault();
        const userData = {
            email: event.target.email.value,
            password: event.target.password.value
        };

        async function authenticateUser(userData) {
            try {
                const response = await mealMasterApi.authenticateUser(userData);
                const token = response.data.token;
                if (response.status === 201) {
                    //Add JWT token to local storage
                    localStorage.setItem("token", token);

                    if (token) {
                        // get user profile data using token
                        const response = await mealMasterApi.getUserProfileData(token);
                        setUserData(response.data);
                        setLoggedIn(true);
                    }                  
                    navigate("/homePage");
                }
            } catch (error) {
                let status = "", message = "";
                if (error.response) {
                    status = error.response.status;
                    message = error.response.data.error;
                }

                if (status === 401 || status === 409) {
                    toast.error(`${message}`);
                }
                else {
                    console.log("Error while signing in user:", error);
                }
            }
        }
        authenticateUser(userData);
        form.reset();
    }

    return (
        <form className="signin" id="signin" onSubmit={handleSubmit}>
            <p className="signin__title">SignIn</p>

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