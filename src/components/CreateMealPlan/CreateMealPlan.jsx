import "./CreateMealPlan.scss";
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import { Link } from "react-router-dom";
import { RecipesApi } from "../../utils/RecipesApi.jsx";
import { MealMasterApi } from "../../utils/utils.jsx";
import addIcon from "./../../assets/icons/SVG/icons-add.png";
import MealPlanTable from "../MealPlanTable/MealPlanTable.jsx";
import { toast, ToastContainer } from 'react-toastify';

const CreateMealPlan = ({ userId }) => {
    const recipeApi = new RecipesApi();
    const mealMasterApi = new MealMasterApi();
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const [mealType, setMealType] = useState("");
    const [mealCategory, setMealCategory] = useState("");
    const [recipes, setRecipes] = useState([]);
    const [showDayInput, setShowDayInput] = useState(false);
    const [cardId, setCardId] = useState('');
    const [ingredientList, setIngredientList] = useState([]); //ingredient list per meal plan

    const [mealsPlanData, setMealsPlanData] = useState([
        { breakfast: [], lunch: [], dinner: [] },
        { breakfast: [], lunch: [], dinner: [] },
        { breakfast: [], lunch: [], dinner: [] },
        { breakfast: [], lunch: [], dinner: [] },
        { breakfast: [], lunch: [], dinner: [] },
        { breakfast: [], lunch: [], dinner: [] },
        { breakfast: [], lunch: [], dinner: [] }
    ]);

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
        setShowDayInput(true);
        setCardId(recipe.idMeal);
    }

    /**
     * Added to take day input from dropdown by user while adding recipe
     */
    const handleDayInputChange = (event, recipeData) => {
        const inputDayValue = event.target.value;
        const index = daysOfWeek.findIndex((day) => (day.toLowerCase() === inputDayValue.toLowerCase()));

        async function getIngredientList() {
            try {
                const response = await recipeApi.getIngredientList(recipeData.idMeal);
                const meals = response.meals[0];
                for (let i = 1; i < 20; i++) {
                    let propertyName = "strIngredient" + i;
                    const ingredient = meals[propertyName];
                    //Add unique ingredient to ingredientList state variable 
                    if (ingredient && !ingredientList.includes(ingredient)) {
                        ingredientList.push(ingredient);
                    }
                }
            } catch (error) {
                console.log("Error getting ingredient list  getIngredientList()", error);
            }
        }
        getIngredientList();
        const recipeLink = `https://www.themealdb.com/meal/${recipeData.idMeal}-${recipeData.strMeal.replace(/ /g, "-")}-Recipe`;

        //Creating Array for (breakfast,lunch,dinner) meal type
        const recipeDetails = [];
        recipeDetails.push(recipeData.idMeal)  //0 : RecipeId 
        recipeDetails.push(recipeData.strMeal) //1:Recipe Name
        recipeDetails.push(recipeLink); //2:RecipeLink

        let mealsArray = [...mealsPlanData]; //to change memory location of stored array
        if (mealType.toLowerCase() === "breakfast") {
            mealsArray[index].breakfast = recipeDetails;
        } else if (mealType.toLowerCase() === "lunch") {
            mealsArray[index].lunch = recipeDetails;
        } else if (mealType.toLowerCase() === "dinner") {
            mealsArray[index].dinner = recipeDetails;
        }

        setMealsPlanData(mealsArray);
        setIngredientList(ingredientList);
    }

    /**
     * When user click on "Save Meal Plan" button, 
     * Meal Plan will save to the backend table "meal_plans"
     * @param {*} event 
     */
    const handleSubmitPlan = (event) => {
        // Do not prevent default behavior for radio buttons
        if (event.target.type === 'radio') {
            return;
        }
        // Prevent the default action of the click event
        event.preventDefault();

        // Convert IngredientList to a JSON object
        const jsonIngredientList = JSON.stringify(ingredientList);

        //check if mealsPlanData has meaningful data or not,Dont save blank data  
        let isNull = mealsPlanData.every(mealPlan =>
            Object.values(mealPlan).every(meal => meal.length === 0)
        );

        if (isNull) {         
            toast.error("Your meal plan is empty ", { autoClose: 800 });
        } else { //Save meal Plan  

            //Convert All Meals from Sundat to Saturday to JSONObject
            const jsonSunday = JSON.stringify(mealsPlanData[0]);
            const jsonMonday = JSON.stringify(mealsPlanData[1]);
            const jsonTuesday = JSON.stringify(mealsPlanData[2]);
            const jsonWednesday = JSON.stringify(mealsPlanData[3]);
            const jsonThrusday = JSON.stringify(mealsPlanData[4]);
            const jsonFriday = JSON.stringify(mealsPlanData[5]);
            const jsonSaturday = JSON.stringify(mealsPlanData[6]);

            //Create new Object MealPlansToSave
            const mealPlansToSave = {
                userId: userId,
                sunday: jsonSunday,
                monday: jsonMonday,
                tuesday: jsonTuesday,
                wednesday: jsonWednesday,
                thrusday: jsonThrusday,
                friday: jsonFriday,
                saturday: jsonSaturday,
                ingredients: jsonIngredientList
            }

            async function saveMealPlan(mealPlansToSave) {
                try {
                    const response = await mealMasterApi.saveMealPlan(mealPlansToSave);
                    if (response.status === 201) {
                        toast.success(`${response.data.message}`, { autoClose: 800 });
                    }
                } catch (error) {
                    let status = "", message = "";
                    if (error.response) {
                        status = error.response.status;
                        message = error.response.data.message;
                    }
                    if (status === 409) {
                        toast.error(`${message}`);
                    } else {
                        console.log("Error while saving meal plan saveMealPlan()", error);
                    }
                }
            }
            saveMealPlan(mealPlansToSave);
        }
    }

    return (
        <>
            <form className="recipes" onSubmit={handleSubmitPlan}>
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
                    <MealPlanTable mealsPlanData={mealsPlanData} />
                </div>
            </form>

            <div className="card-container">
                {recipes?.map((recipe) => {
                    return (
                        <div key={recipe.idMeal} className="card-container__card">
                            <Link to={`https://www.themealdb.com/meal/${recipe.idMeal}-${recipe.strMeal.replace(/ /g, "-")}-Recipe`}
                                target="_blank" className="card-container__link">
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
            <ToastContainer />
        </>
    );
}

export default CreateMealPlan;