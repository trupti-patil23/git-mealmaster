import axios from "axios";

 //Get API URL from .env file
 export const MEALMASTER_API_URL=process.env.REACT_APP_API_URL;

export class MealMasterApi {
    constructor() {
        this.baseUrl = MEALMASTER_API_URL; 
        this.axios = axios.create({
            baseURL: this.baseUrl,
        });
    }

    /**
     * Added to save User profile image on server
     * @param {*} imageData 
     */
    async postUserProfileImage(imageData) {
        try {
            return await this.axios.post("/users/uploadPhoto", imageData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });           
        } catch (error) {
            throw error;
        }

    }


    /**
     * Added to save new user object to database table "users"
     * @param {*} userData 
     */
    async postNewUser(userData) {
        try {
            return await this.axios.post("/users/register", userData);
        } catch (error) {
            throw (error);
        }
    }

    /**
     * Added to authorize user if present in users table
     * @param {*} userData 
     */
    async authenticateUser(userData) {
        try {
            return await this.axios.get("/users/login", { params: { userData } });
        } catch (error) {
            throw (error);
        }
    }

    /**
     * This method added to get User Profile data using token
     * @param {*} token 
     * @returns 
     */
    async getUserProfileData(token) {
        try {
            return await this.axios.get("/users/profile", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        } catch (error) {
            throw (error);
        }
    }

    /**
    * Added to save meal plan to database table meal_plans
    * @param {*} mealPlansToSave 
    */
    async saveMealPlan(mealPlansToSave) {
        try {
            return await this.axios.post("/meals/saveMealPlan", mealPlansToSave);
        } catch (error) {
            throw (error);
        }
    }

    /**
     * 
     * @param {*} userId 
     */
    async getMealPlansForUser(userId) {
        try {
            return await this.axios.get("/meals/viewMealPlan", { params: { userId } });
        } catch (error) {
            throw (error);
        }
    }

    /**
     * Added to delete requested meal plan by user using unique meal_plan_id from meal_plans table
     * @param {*} mealPlanId 
     * @returns 
     */
    async deleteMealPlan(mealPlanId) {
        try {
            const response = await this.axios.delete("/meals/deleteMealPlan", { params: { mealPlanId } });
            return response;
        } catch (error) {
            throw (error);
        }
    }
}