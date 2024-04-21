import "./Header.scss";
import { Link, NavLink } from "react-router-dom";
import { Avatar, Menu, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";
import UserProfileImage from "./../../assets/images/blank_profile.jpg";
import logoImage from "./../../assets/logo/meal-master-logo.png"
import { MEALMASTER_API_URL } from "./../../utils/utils.jsx";

const Header = ({ loggedIn, handleLogout, headerImageUrl, userData }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [headerProfileImageUrl, setProfileHeaderImageUrl] = useState(UserProfileImage);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        if (userData) {           
            setProfileHeaderImageUrl(`${MEALMASTER_API_URL}/images/${userData.profileImage}`);
        }
    }, [userData])//Run only once on component mount

    useEffect(() => {
        setProfileHeaderImageUrl(headerImageUrl);
    }, [headerImageUrl])

    return (
        <>
            <header className="header">
                <div>
                    <Link to="/" >
                        <img className="header__logo-image"
                            alt="MealMasterLogo" src={logoImage} />
                    </Link>
                </div>                

                {
                    loggedIn ?
                        (<nav className="header-profile">
                            <NavLink to="/createMealPlan" className="header-profile__link">
                                Create Meal Plan
                            </NavLink>

                            <NavLink to="/viewMealPlan" className="header-profile__link">
                                View Meal Plan
                            </NavLink>

                            <div>                               
                                <Avatar
                                    sx={{ cursor: 'pointer' }}
                                    src={headerProfileImageUrl}
                                    alt="ProfileImage"
                                    onClick={handleClick}>
                                </Avatar>
                                <div className = "header-profile__user-name">{userData.firstName && (userData.firstName.charAt(0).toUpperCase() + userData.firstName.slice(1))}</div>

                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem component={NavLink} to="/userProfile" onClick={handleClose}>
                                        Profile
                                    </MenuItem>

                                    <MenuItem component={NavLink} to="/" onClick={() => { handleLogout(); handleClose(); }}>
                                        Logout
                                    </MenuItem>
                                </Menu>
                            </div>

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