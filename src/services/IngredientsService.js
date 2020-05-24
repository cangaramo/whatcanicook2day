import ingredients from './ingredients.json'
import recipes from './recipes-info.json'
import single_recipe from './recipe-sana.json'

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
