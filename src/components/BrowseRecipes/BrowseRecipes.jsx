import "./BrowseRecipes.scss"
import { useState } from "react";
import { Link } from "react-router-dom";
import { RecipesApi } from "./../../utils/RecipesApi";
import addIcon from "./../../assets/icons/SVG/icons-add.png";

const BrowseRecipes = () => {
    const recipeApi = new RecipesApi();
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const [mealType, setMealType] = useState("");
    const [mealCategory, setMealCategory] = useState("");
    const [recipes, setRecipes] = useState([]);

    const [mealsPlanData, setMealsPlanData] = useState([
        { breakfast: "", lunch: "", dinner: "" },
        { breakfast: "", lunch: "", dinner: "" },
        { breakfast: "", lunch: "", dinner: "" },
        { breakfast: "", lunch: "", dinner: "" },
        { breakfast: "", lunch: "", dinner: "" },
        { breakfast: "", lunch: "", dinner: "" },
        { breakfast: "", lunch: "", dinner: "" }
    ]);

    const [showDayInput, setShowDayInput] = useState(false); //State varible to manage form to get a day from user
    const [cardId, setCardId] = useState('');
    /**
     * Added to get value from Meal Category dropdown
     * @param {*} event 
     */
    const handleMealCategoryChange = (event) => {
        const mealCategoryValue = event.target.value;
        setMealCategory(mealCategoryValue);

        async function getLunchDinnerData(mealCategoryValue) {
            try {
                const response = await recipeApi.getRecipesListAsPerCategory(mealCategoryValue);
                console.log("lunch dinner:", response.meals);
                setRecipes(response.meals);
            } catch (error) {
                console.log("Error getting Lunch and Dinner Data  getLunchDinnerData()", error);
            }
        }
        getLunchDinnerData(mealCategoryValue);
    };

    /**
     * Addded to get value from Radio Button selection
     * @param {*} value 
     */
    const handleRadioChange = (value) => {
        setMealType(value);
        if (value === "breakfast") {
            async function getBreakfastData() {
                try {
                    const response = await recipeApi.getRecipesListAsPerCategory("breakfast");
                    const dessertResponse = await recipeApi.getRecipesListAsPerCategory("Dessert");
                    let breakfastRecipes = [...response.meals, ...dessertResponse.meals];
                    setRecipes(breakfastRecipes);
                } catch (error) {
                    console.log("Error getting breakfast Data  getBreakfastData()", error);
                }
            }
            getBreakfastData();
        }
    };

    /**
     * Added to add selected recipe in the meal plan
     */
    const handleAddRecipe = (recipe) => {
        console.log("add clicked", recipe);
        setShowDayInput(true);
        setCardId(recipe.idMeal);
    }

    /**
     * Added to take day input from dropdown by user while adding recipe
     */
    const handleDayInputChange = (event, recipeData) => {
        const inputDayValue = event.target.value;
        const index = daysOfWeek.findIndex((day) => (day.toLowerCase() === inputDayValue.toLowerCase()));
        let ingredientList = [];

        async function getIngredientList() {
            try {
                const response = await recipeApi.getIngredientList(recipeData.idMeal);
                const meals = response.meals[0];
                for (let i = 1; i < 20; i++) {
                    let propertyName = "strIngredient" + i;
                    console.log(meals[propertyName]);
                    if (meals[propertyName]) {
                        ingredientList.push(meals[propertyName]);
                    }
                }
            } catch (error) {
                console.log("Error getting ingredient list  getIngredientList()", error);
            }
        }
        getIngredientList();

        const recipeDetails = {
            id: recipeData.idMeal,
            name: recipeData.strMeal,
            //imageLink: recipeData.strMealThumb,
            recipeLink: `https://www.themealdb.com/meal/${recipeData.idMeal}-${recipeData.strMeal.replace(/ /g, "-")}-Recipe`,
            ingredients: ingredientList
        }

        let mealsArray = [...mealsPlanData]; //to change memory location of stored array
        if (mealType.toLowerCase() === "breakfast") {
            mealsArray[index].breakfast = recipeDetails.name;
        } else if (mealType.toLowerCase() === "lunch") {
            mealsArray[index].lunch = recipeDetails.name;
        } else if (mealType.toLowerCase() === "dinner") {
            mealsArray[index].dinner = recipeDetails.name;
        }
        setMealsPlanData(mealsArray);
    }

    /**
     * When user click on "Save Meal Plan" button, Plean will save to the backend table
     * @param {*} event 
     */
    const handleSubmitPlan = (event) => {

    }

    return (
        <>
            <form className="recipes" onClick={handleSubmitPlan}>
                <div className="recipes__first-column">
                    <div className="recipes__radio recipes__row">
                        <p className="recipes__radio-label">Meal Type:</p>
                        <div className="recipes__mealtype-row">
                            <input type="radio"
                                id="breakfast"
                                value="breakfast"
                                checked={mealType === "breakfast"}
                                onChange={() => handleRadioChange("breakfast")}
                            >
                            </input>
                            <label htmlFor="breakfast">Breakfast</label>
                        </div>

                        <div className="recipes__mealtype-row">
                            <input type="radio"
                                id="lunch"
                                value="lunch"
                                checked={mealType === "lunch"}
                                onChange={() => handleRadioChange("lunch")}
                            >
                            </input>
                            <label htmlFor="lunch">Lunch</label>
                        </div>

                        <div className="recipes__mealtype-row">
                            <input type="radio"
                                id="dinner"
                                value="dinner"
                                checked={mealType === "dinner"}
                                onChange={() => handleRadioChange("dinner")}
                            >
                            </input>
                            <label htmlFor="dinner">Dinner</label>
                        </div>
                    </div>
                    {mealType !== "breakfast" && (
                        <div className="recipes__row">
                            <label htmlFor="food-select" className="recipes__dropdown-label">Meal Category:</label>
                            <select className="recipes__dropdown-value" id="food-select" value={mealCategory} onChange={handleMealCategoryChange}>
                                <option value="">Select an option</option>
                                <option value="Vegan">Vegan</option>
                                <option value="Vegetarian">Vegetarian</option>
                                <option value="Pasta">Pasta</option>
                                <option value="Chicken">Chicken</option>
                                <option value="seafood">Seafood</option>
                                <option value="Miscellaneous">Miscellaneous</option>
                            </select>
                        </div>
                    )}
                    <div className="recipes__row">
                        <button className="recipes__button" type="submit">Save Meal Plan</button>
                    </div>
                </div>

                <div className="recipes__second-column">
                    <table className="plan-table">
                        <thead>
                            <tr>
                                <th>Meal Type</th>
                                {daysOfWeek.map((day) => (<th>{day}</th>))}
                            </tr>
                        </thead>
                        <tbody>
                            <td >
                                <tr><div className="plan-table__data">Breakfast</div></tr>
                                <tr><div className="plan-table__data">Lunch</div></tr>
                                <tr><div className="plan-table__data">Dinner</div></tr>
                            </td>

                            {mealsPlanData.map((dayMeal) => {
                                return (
                                    <td>
                                        <tr>
                                            <div className="plan-table__data">
                                                {dayMeal.breakfast}
                                            </div>
                                        </tr>

                                        <tr>
                                            <div className="plan-table__data">
                                                {dayMeal.lunch}
                                            </div>
                                        </tr>
                                        <tr>
                                            <div className="plan-table__data">
                                                {dayMeal.dinner}
                                            </div>
                                        </tr>
                                    </td>                                    
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </form>

            <div className="card-container">
                {

                    recipes?.map((recipe) => {
                        return (
                            <div key={recipe.idMeal} className="card-container__card">
                                <Link to={`https://www.themealdb.com/meal/${recipe.idMeal}-${recipe.strMeal.replace(/ /g, "-")}-Recipe`}
                                    target="_blank">
                                    <img src={recipe.strMealThumb} alt="RecipeImage" className="card-container__image" />
                                    <div className="card-container__recipe-name" >{recipe.strMeal} </div>
                                </Link>

                                <div className="card-container__input-container">
                                    <img className="card-container__add-image" src={addIcon} alt="AddIconn"
                                        onClickCapture={() => handleAddRecipe(recipe)} />

                                    {showDayInput && (recipe.idMeal === cardId) && (
                                        <select className="card-container__day-input" id="day-select" onChange={(event) => handleDayInputChange(event, recipe)}>
                                            <option value="">Select a Day</option>
                                            <option value="sunday">Sunday</option>
                                            <option value="monday">Monday</option>
                                            <option value="tuesday">Tuesday</option>
                                            <option value="wednesday">Wednesday</option>
                                            <option value="thursday">Thursday</option>
                                            <option value="friday">Friday</option>
                                            <option value="saturday">Saturday</option>
                                        </select>
                                    )}
                                </div>

                            </div>
                        );
                    })
                }
            </div>

        </>

    );
}

export default BrowseRecipes;