import axios from 'axios'

const apiClient = axios.create({
    //baseURL: `http://localhost:3000`,
    baseURL: `https://api.spoonacular.com`,
    withCredentials: false, // This is the default
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
    //https://api.spoonacular.com/recipes/65597/information?apiKey=d4308995a2ae43578da556983599118e

    // old query
    //https://api.spoonacular.com/recipes/findByIngredients?ingredients=apples&apiKey=d4308995a2ae43578da556983599118e
})

const apiKey = 'd4308995a2ae43578da556983599118e'
export default {
    findByIngredients(query) {
        return apiClient.get(
            '/recipes/findByIngredients?ingredients=' +
                query +
                '&number=50' +
                '&apiKey=' +
                apiKey
        )
    },
    getRecipeById(id) {
        return apiClient.get(
            '/recipes/' + id + '/information' + '?apiKey=' + apiKey
        )
    }
    // findByIngredients(query, offset) {
    //     return apiClient.get(
    //         //'/recipes/findByIngredients?ingredients=' + query + '&' + apiKey
    //         'https://api.spoonacular.com/recipes/complexSearch' +
    //             '?includeIngredients=' + query +
    //             '&fillIngredients=true' +
    //             '&instructionsRequired=true' +
    //             '&offset=' + offset +
    //             '&apiKey=' + apiKey
    //     )
    // }
}
