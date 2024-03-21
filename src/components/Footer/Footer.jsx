import "./Footer.scss";
import { Link} from "react-router-dom";
import facebookImage from "./../../assets/icons/SVG/Icon-facebook.svg";
import twitterImage from "./../../assets/icons/SVG/Icon-twitter.svg";
import instagramImage from "./../../assets/icons/SVG/Icon-instagram.svg";

const Footer = () => {
    return (        
        <footer className="footer">
            <p>@MealMaster All Rights Reserved.</p>

           
            <div className="footer__icons">
                <Link to="https://www.instagram.com/" target="_blank">
                    <img className="footer__instagram" src={instagramImage} alt="instagram"></img>
                </Link>
                <Link to="https://www.facebook.com/" target="_blank">
                    <img className="footer__facebook" src={facebookImage} alt="facebook"></img>
                </Link>
                <Link to="https://twitter.com/" target="_blank">
                    <img className="footer__twitter" src={twitterImage}  alt="twitter"></img>
                </Link>
            </div>
        </footer>
    );
}
export default Footer;