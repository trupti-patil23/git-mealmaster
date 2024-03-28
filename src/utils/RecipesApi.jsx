import axios from "axios";
export class RecipesApi {
    constructor() {
        this.baseUrl = "https://www.themealdb.com/api/json/v1/1/filter.php";
        this.axios = axios.create({
            baseURL: this.baseUrl,
        });
    }

    /**
     * This method gives the list of Recipes, as per Category 
     * eg, breakfast, Indian
     */
    async getRecipesListAsPerCategory(category) {
        try {
            const response = await axios.get(`${this.baseUrl}/?c=${category}`);
            return response.data;
        } catch (error) {
            console.log("Error in getting comments: " + `${error}`);
        }

    }

}