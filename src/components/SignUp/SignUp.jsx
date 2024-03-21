import "./SignUp.scss";
import { Link } from "react-router-dom";

const SignUp = () => {

    function handleInputChange() {
        console.log("handle cahnge");
    }

    function handleSubmit() {
        console.log("handle submit");
    }

    return (
        <form className="signup" onClick={handleSubmit}>
            <p className="signup__title">Create Account</p>

            <div className="signup__row">
                <label className="signup__label">First Name:</label>
                <input
                    className="signup__textbox"
                    type="text"
                    id="firstname"
                    name="firstname"
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
                    id="lastname"
                    name="lastname"
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
                    placeholder="Email Address"
                    onChange={handleInputChange}
                    required
                />
            </div>

            <div className="signup__row">
                <label className="signup__label">Password</label>
                <input
                    className="signup__textbox"
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleInputChange}
                    required
                />
            </div>

            <div className="signup__row">
                <label className="signup__label">Confirm Password</label>
                <input
                    className="signup__textbox"
                    type="password"
                    id="password-confirm"
                    name="confirmPassword"
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

        </form>
    );
}

export default SignUp;