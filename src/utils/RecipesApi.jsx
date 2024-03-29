import axios from "axios";
export class RecipesApi {
    constructor() {
        this.baseUrl = "https://www.themealdb.com/api/json/v1/1";
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
            const response = await axios.get(`${this.baseUrl}/filter.php/?c=${category}`);
            return response.data;
        } catch (error) {
            console.log("Error in getting comments: " + `${error}`);
        }
    }

    async getIngredientList(recipeId) {
        try {
            const response = await axios.get(`${this.baseUrl}/lookup.php?i=${recipeId}`);
            return response.data;
        } catch (error) {
            console.log("Error in getting ingredients " + `${error}`);
        }
    }

}