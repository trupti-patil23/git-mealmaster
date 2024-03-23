import axios from "axios";

export class MealMasterApi {
    constructor() {
        this.baseUrl = "http://localhost:5050";
        this.axios = axios.create({
            baseURL: this.baseUrl,
        });
    }

    /**
     * Added to save new user object to database table "Users"
     * @param {*} userData 
     */
    async postNewUser(userData) {
        try{
            await this.axios.post("/registerUser",userData);
        }catch(error){
            throw new Error("Failed to post new user: postNewUser() mothod " + error.message);
        }
    }
}