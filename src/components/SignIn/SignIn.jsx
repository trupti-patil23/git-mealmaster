import "./SignIn.scss";
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';

const SignIn = () => { 

    function handleSubmit(event) {
        event.preventDefault(); 
    }

    return (
        <form className="signin" onClick={handleSubmit}>
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
                <Link className= "signup__link" to="/signup">Create an Account</Link>
            </div>

            <div className="signin__row">
                <button className="signin__button" type="submit">Sign In</button>
            </div>
        </form>
    );
}

export default SignIn;