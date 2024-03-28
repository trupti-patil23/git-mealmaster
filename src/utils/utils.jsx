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
}