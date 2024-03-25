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
        try{
            return await this.axios.post("/users/register", userData);          
        }catch(error){        
            throw (error);
        }
    }

    /**
     * Added to authorize user if present in users table
     * @param {*} userData 
     */
    async verifyUser(userData,token) {
        try{
            return await this.axios.get("/users/login", {
                headers: { Authorization: `Bearer ${token}`},
                params:{userData}
              });                
        }catch(error){  
            console.log("Utils",error);      
            throw (error);
        }
    }
}