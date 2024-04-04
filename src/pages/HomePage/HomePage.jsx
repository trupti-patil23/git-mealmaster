import "./HomePage.scss";
import HomePageImage from "./../../assets/images/HomePageImage.jpg";

const HomePage = ({ userData }) => {
    /**
     * Added to Capitalize first letter
     * @param {*} value 
     * @returns 
     */
    function capitalizeFirstLetter(value) {
        return value && (value.charAt(0).toUpperCase() + value.slice(1));
    }

    return (
        <div className="homepage">
            <div className="homepage__overlay-text">Welcome {capitalizeFirstLetter(userData.firstName) + " " + capitalizeFirstLetter(userData.lastName)} </div>
            <img className="homepage__image" src={HomePageImage} alt="HomePageImage" />
        </div>
    );
}

export default HomePage;