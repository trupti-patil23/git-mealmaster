import "./Header.scss";
import { Link, NavLink } from "react-router-dom";
import logoImage from "./../../assets/logo/meal-master-logo.jpg"

const Header = () => {
    return (
        <header className="header">  
            <div>
                <Link to="/" >
                    <img className="header__logo-image"  
                         alt="MealMasterLogo" src={logoImage} />
                </Link>
            </div>
            <p className="header__title">
                Your Ultimate Meal Planning Companion!
            </p>          
        </header>
    );
}
export default Header;