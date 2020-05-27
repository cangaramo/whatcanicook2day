import axios from 'axios'

const apiClient = axios.create({
    baseURL: `https://api.spoonacular.com`,
    withCredentials: false, // This is the default
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
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
}
