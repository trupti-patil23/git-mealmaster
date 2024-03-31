import "./ViewMealPlan.scss";
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from "react";
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
            console.log("User id :", userId)
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

            //  console.log("MealPlans ARRAY :", MealPlansArray);
            let count = 0;
            MealPlansArray.map((mealPlan) => {
                console.log("count", count)
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

            //console.log("mealPlanIngredientList---- : ", perPlanIngredientsArray);
            // console.log("mealPlansList---------", perPlanArray);

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

    return (
        <div>
            {mealPlansList.map((mealPlan, index) => {
                return (
                    <div key={index}>
                        {                           
                         <MealPlanTable planId={mealPlan[0]} 
                         mealsPlanData={[mealPlan[1], mealPlan[2], mealPlan[3], mealPlan[4], mealPlan[5], mealPlan[6], mealPlan[7]]} />}
                    </div>
                )
            })}            
            <ToastContainer />
        </div>
    );
}

export default ViewMealPlan;