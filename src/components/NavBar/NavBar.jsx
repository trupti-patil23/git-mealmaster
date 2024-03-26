import "./NavBar.scss";
import { NavLink } from "react-router-dom";

const NavBar = () => {
    return (
        <div className="navbar">
            <NavLink to="/" className="navbar__link">
                Sign In
            </NavLink>

            <NavLink to="/signup" className="navbar__link">
                Sign Up
            </NavLink>
        </div>
    );
}
export default NavBar;