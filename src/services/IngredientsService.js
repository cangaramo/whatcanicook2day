import ingredients from './ingredients.json'
//import recipes from './recipes-info.json'
import recipes from './old-recipes2.json'

import single_recipe from './recipe-chuli.json'

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
