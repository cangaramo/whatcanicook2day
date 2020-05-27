import ingredients from './ingredients.json'
import recipes from './mock/apples.json'
import single_recipe from './mock/blackberry.json'

export default {
    getIngredients() {
        return ingredients
    },
    getRecipes() {
        return recipes
    },
    getRecipe() {
        return single_recipe
    }
}
