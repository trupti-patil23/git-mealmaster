import "./HomePage.scss";
import HomePageImage from "./../../assets/images/HomePageImage.jpg";
import MealImage from "./../../assets/icons/SVG/meal.png";
import PhoneImage from "./../../assets/icons/SVG/phone.png";
import downloadImage from "./../../assets/icons/SVG/downloadMeal.png";
import listImage from "./../../assets/icons/SVG/ingredients.png";

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

            <div className="homepage__container">
                <p className="homepage__heading">Meal Planning Made Easy !</p>

                <div className="homepage__meal">
                    <img src={MealImage} alt="MealImage" className="image" />
                    <div className="homepage__image-title">Browse Recipe</div>
                </div>

                <div className="homepage__meal">
                    <img src={MealImage} alt="MealImage"  />
                    <div className="homepage__image-title">Browse Recipe</div>
                </div>

                <div className="homepage__phone">
                  <img src={PhoneImage} alt="PhoneImage" />               
                  <div className="homepage__image-title">Add to Meal Planner</div>
                </div>

                <div className="homepage__download">
                  <img src={downloadImage} alt="downloadImage" />               
                  <div className="homepage__image-title">Download Meal Plan</div>
                </div>

                <div className="homepage__download-ingredient">
                  <img src={listImage} alt="downloadIngredient" />               
                  <div className="homepage__image-title">Download Ingredient List</div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;