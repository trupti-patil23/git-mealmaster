import "./Header.scss";
import { Link, NavLink } from "react-router-dom";
import logoImage from "./../../assets/logo/meal-master-logo.jpg"

const Header = ({ loggedIn, handleLogout }) => {
    console.log("loggedIn", loggedIn);
    return (
        <>
            <header className="header">
                <div>
                    <Link to="/" >
                        <img className="header__logo-image"
                            alt="MealMasterLogo" src={logoImage} />
                    </Link>
                </div>

                <p className="header__title">Your Ultimate Meal Planning Companion!</p>              

                {
                    loggedIn ?
                        (<nav className="header-profile">
                            <NavLink to="/browseRecipes" className="header-profile__link">
                                Browse Receipe
                            </NavLink>

                            <NavLink to="/viewMealPlan" className="header-profile__link">
                                View Meal Plan
                            </NavLink>

                            <NavLink to="/userProfile" className="header-profile__link" >
                                Profile
                            </NavLink>

                            <NavLink to = "/" className="header-profile__link" onClick={handleLogout}>
                                Logout
                            </NavLink>
                        </nav>)

                        : (<nav className="header-signin">
                            <NavLink to="/" className="header-signin__link">
                                Sign In
                            </NavLink>

                            <NavLink to="/signup" className="header-signin__link">
                                Sign Up
                            </NavLink>
                        </nav>)
                }
            </header>
        </>
    );
}
export default Header;