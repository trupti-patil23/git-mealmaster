import "./ViewMealPlan.scss";
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import { MealMasterApi } from "./../../utils/utils.jsx";
import MealPlanTable from "./../../components/MealPlanTable/MealPlanTable.jsx";
import { toast, ToastContainer } from 'react-toastify';

const ViewMealPlan = ({ userId }) => {
    const mealMasterApi = new MealMasterApi();
    const [mealPlanIngredientList, setMealPlanIngredientList] = useState([
        { mealPlanId: "", ingredientList: [] }
    ]);
    const [mealPlansList, setMealPlansList] = useState([
        [
            { mealPlanId: "" },
            { breakfast: [], lunch: [], dinner: [] },
            { breakfast: [], lunch: [], dinner: [] },
            { breakfast: [], lunch: [], dinner: [] },
            { breakfast: [], lunch: [], dinner: [] },
            { breakfast: [], lunch: [], dinner: [] },
            { breakfast: [], lunch: [], dinner: [] },
            { breakfast: [], lunch: [], dinner: [] }
        ]
    ]);

    useEffect(() => {
        /**
             * Added to get all meal plan for loggedin user
             */
        async function getMealPlansForUser() {
            try {
                const mealMasterApi = new MealMasterApi();
                const response = await mealMasterApi.getMealPlansForUser(userId);
                const MealPlansArray = response.data;

                let length = MealPlansArray.length;
                let perPlanArray = new Array(length);
                let perPlanIngredientsArray = new Array(length);

                // Fill perPlanArray and perPlanIngredientsArray with arrays of length 7
                for (let i = 0; i < length; i++) {
                    perPlanArray[i] = new Array(7);
                    perPlanIngredientsArray[i] = new Array(7);
                }

                let count = 0;
                MealPlansArray.map((mealPlan) => {

                    perPlanArray[count][0] = mealPlan.meal_plan_id;
                    perPlanArray[count][1] = mealPlan.sunday_meal_plan;
                    perPlanArray[count][2] = mealPlan.monday_meal_plan;
                    perPlanArray[count][3] = mealPlan.tuesday_meal_plan;
                    perPlanArray[count][4] = mealPlan.wednesday_meal_plan
                    perPlanArray[count][5] = mealPlan.thursday_meal_plan;
                    perPlanArray[count][6] = mealPlan.friday_meal_plan;
                    perPlanArray[count][7] = mealPlan.saturday_meal_plan;
                    perPlanIngredientsArray[count][0] = mealPlan.meal_plan_id;
                    perPlanIngredientsArray[count][1] = mealPlan.ingredient_list;
                    count = count + 1;
                    return '';
                });

                setMealPlanIngredientList(perPlanIngredientsArray);
                setMealPlansList(perPlanArray);

            } catch (error) {
                let status = "", message = "";
                if (error.response) {
                    status = error.response.status;
                    message = error.response.data.message;
                }
                if (status === 404) {
                    console.log(`${message}`);
                } else {
                    console.error("Error while getting meal plans getMealPlansForUser()", error);
                }
            }
        }

        getMealPlansForUser();
    }, [mealPlansList,userId]); 

    /**
     * Added to download meal plan ,to create meal_plan.csv file
     * @param {*} mealPlanId 
     * @param {*} mealPlanDownload 
     */
    function handleMealDownload(mealPlanId, mealPlanDownload) {
        // Create the CSV content header row
        let csvContent = ',BREAKFAST,LUNCH,DINNER\n';

        // Iterate over each day in the meal plan
        mealPlanDownload.forEach((day, index) => {
            const daysOfWeek = ['', 'SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
            if (index !== 0) {
                // Access the element at index 1 of each meal array
                const breakfast = day["breakfast"][1] || ' ';
                const lunch = day["lunch"][1] || ' ';
                const dinner = day["dinner"][1] || ' ';

                // Concatenate the day of the week with the breakfast, lunch, and dinner items
                const row = `${daysOfWeek[index]}, ${breakfast}, ${lunch}, ${dinner}\n`;
                csvContent += row;
            }
        });
        // Create a Blob object from the CSV content
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });

        //Use FileSaver.js library to trigger the download
        saveAs(blob, 'Weekly_Meal_Plan.csv');
    }

    /**
     * Added to download IngredientList for selected meal plan
     * @param {*} mealPlanId 
     */
    function handleIngredientsDownload(mealPlanId) {
        let ingredientListDownload = [];
        mealPlanIngredientList.forEach((ingredient) => {
            if (ingredient[0] === mealPlanId) {
                ingredientListDownload = ingredient[1];
                return;
            }
        });

        // Create CSV content with headings
        let csvContent = ' INGREDIENTS ,QUANTITY \n';

        // Loop through the ingredientList array and append each ingredient and quantity to the CSV content
        ingredientListDownload.forEach(ingredient =>
            csvContent += `${ingredient},"  " \n`
        );

        // Create a Blob object containing the CSV content
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });

        //Use FileSaver.js library to trigger the download
        saveAs(blob, 'Ingredients.csv');
    }

    /**
     * Added to delete meal plan for user with unique meal_plan_id from meal_plans table
     * @param {*} mealPlanId 
     */
    async function handleDeletePlan(mealPlanId) {
        try {
            const response = await mealMasterApi.deleteMealPlan(mealPlanId);

            if (response.status === 204) {
                toast.success(`Meal Plan got deleted successfully!`, { autoClose: 800 });

                //After deleting ,delete mealPlanId from state variable mealPlansList array 
                const mealsArrayAfterDelete = mealPlansList.filter(mealPlan => mealPlan.mealPlanId === mealPlanId);
                setMealPlansList(mealsArrayAfterDelete);
            }
        } catch (error) {
            let status = "", message = "";
            if (error.response) {
                status = error.response.status;
                message = error.response.data.message;
            }
            if (status === 404) {
                toast.error(`${message}`);
            } else {
                console.log("Error while deleting meal plans handleDeletePlan()", error);
            }
        }
    }

    /**
     * Added to verify whether mealPlansList has meaningful data or not
     * @param {*} mealPlansList 
     * @returns 
     */
    function isEmpty(mealPlansList) {
        let isEmpty = true; // assuming the list is empty by default
        for (let i = 0; i < mealPlansList.length; i++) {
            const mealPlan = mealPlansList[i];
            if (mealPlan[0].mealPlanId !== "") {
                isEmpty = false; // if any mealPlanId is not empty, set isEmpty to false
                break; // exit the loop
            }
        }
        return isEmpty;
    }

    return (
        <div className="view-meal">
            {!isEmpty(mealPlansList) ? (mealPlansList.map((mealPlan, index) => {
                const mealPlanId = mealPlan[0];
                return (
                    <div className="view-meal__per-plan" key={index}>
                        {
                            <MealPlanTable
                                mealsPlanData={[mealPlan[1], mealPlan[2], mealPlan[3], mealPlan[4], mealPlan[5], mealPlan[6], mealPlan[7]]} />}

                        <div className="view-meal__actions-row">
                            <div>
                                <button className="view-meal__button view-meal__button--download" 
                                    onClick={() => { handleMealDownload(mealPlanId, mealPlan) }}>
                                    Download Meal Plan
                                </button>
                            </div>

                            <div>
                                <button className="view-meal__button view-meal__button--download"
                                    onClick={() => handleIngredientsDownload(mealPlanId)}>
                                    Download Ingredients
                                </button>
                            </div>

                            <div>
                                <button className="view-meal__button view-meal__button--delete"
                                    onClick={() => handleDeletePlan(mealPlanId)}>
                                    Delete Meal Plan
                                </button>
                            </div>

                        </div>
                    </div>
                )
            })) :
                (<div className="view-meal__message-box">
                    <p>
                        No meal plans are currently stored for you.
                        You can create a meal plan using the 'Create Meal Plan' tab.
                    </p>
                </div>)}

            <ToastContainer />
        </div>
    );
}

export default ViewMealPlan;