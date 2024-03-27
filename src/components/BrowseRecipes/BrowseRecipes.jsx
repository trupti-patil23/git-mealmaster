import "./BrowseRecipes.scss"

const BrowseRecipes = () => {
    return (
        <form>
            <p>Meal Type</p>
            <label for="breakfast">Breakfast</label>
            <input type="radio" id="breakfast" name="mealType" value="breakfast"></input>

            <label for="lunch">Lunch</label>
            <input type="radio" id="lunch" name="mealType" value="lunch"></input>

            <label for="dinner">Dinner</label>
            <input type="radio" id="dinner" name="mealType" value="dinner"></input>

        </form>
    );
}

export default BrowseRecipes;