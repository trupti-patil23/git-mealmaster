import axios from "axios";
export class MealMasterApi {
    constructor() {
        this.baseUrl = "http://localhost:8080";
        this.axios = axios.create({
            baseURL: this.baseUrl,
        });
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
            return await this.axios.get("/meals/viewMealPlan",  {params: {userId}});
        } catch (error) {
            throw (error);
        }
    }
}