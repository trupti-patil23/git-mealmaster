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

    /**
     * Added to get all meal plan for loggedin user
     */
    async function getMealPlansForUser() {
        try {
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
                perPlanIngredientsArray[count][0] = mealPlan.ingredient_list;
                count = count + 1;
            });

            setMealPlanIngredientList(perPlanIngredientsArray);
            setMealPlansList(perPlanArray);
        } catch (error) {
            const status = error.response;
            const message = error.message;
            if (status === 404) {
                toast.error(`${message}`);
            } else {
                console.log("Error while getting meal plans getMealPlansForUser()", error);
            }
        }
    }

    useEffect(() => {
        getMealPlansForUser();
    }, []); // Run only once on component mount

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
                const breakfast = day["breakfast"][1] || 'No Breakfast';
                const lunch = day["lunch"][1] || 'No Lunch';
                const dinner = day["dinner"][1] || 'No Dinner';

                // Concatenate the day of the week with the breakfast, lunch, and dinner items
                const row = `${daysOfWeek[index]}, ${breakfast}, ${lunch}, ${dinner}\n`;
                csvContent += row;
            }
        });
        // Create a Blob object from the CSV content
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });

        //Use FileSaver.js library to trigger the download
        saveAs(blob, 'meal_plan.csv');
    }

    function handleIngredientsDownload(mealPlanId) {
        console.log("Ingredients download - ", mealPlanId);
    }

    /**
     * Added to delete meal plan for user with unique meal_plan_id from meal_plans table
     * @param {*} mealPlanId 
     */
    async function handleDeletePlan(mealPlanId) {
        try {
            const response = await mealMasterApi.deleteMealPlan(mealPlanId);
            console.log();
            if (response.status === 204) {
                toast.success(`Meal Plan got deleted successfully!`, { autoClose: 1500 });
               // await new Promise(resolve => setTimeout(resolve, 1500)); //sleeps for 2000
                let mealsArrayAfterDelete = [...mealPlansList];
                //After deleting ,delete mealPlanId from state variable mealPlansList array 
                mealsArrayAfterDelete = mealsArrayAfterDelete.filter(mealPlan => mealPlan.mealPlanId === mealPlanId );
                setMealPlansList(mealsArrayAfterDelete);
            }
        } catch (error) {
            let status = "",message="";
             if(error.response) {           
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

    return (
        <div className="view-meal">
            {mealPlansList?.map((mealPlan, index) => {
                const mealPlanId = mealPlan[0];
                return (
                    <div className="view-meal__per-plan" key={index}>
                        {
                            <MealPlanTable
                                mealsPlanData={[mealPlan[1], mealPlan[2], mealPlan[3], mealPlan[4], mealPlan[5], mealPlan[6], mealPlan[7]]} />}

                        <div className="view-meal__actions-row">
                            <div>
                                <button className="view-meal__button"
                                    onClick={() => { handleMealDownload(mealPlanId, mealPlan) }}>
                                    Download Meal Plan
                                </button>
                            </div>

                            <div>
                                <button className="view-meal__button"
                                    onClick={() => handleIngredientsDownload(mealPlanId)}>
                                    Download Ingredients
                                </button>
                            </div>

                            <div>
                                <button className="view-meal__button"
                                    onClick={() => handleDeletePlan(mealPlanId)}>
                                    Delete Meal Plan
                                </button>
                            </div>

                        </div>
                    </div>
                )
            })}
            <ToastContainer />
        </div>
    );
}

export default ViewMealPlan;