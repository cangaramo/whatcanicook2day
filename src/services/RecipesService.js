import axios from 'axios'

const apiClient = axios.create({
    //baseURL: `http://localhost:3000`,
    baseURL: `https://api.spoonacular.com`,
    withCredentials: false, // This is the default
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
    // query
    //https://api.spoonacular.com/recipes/findByIngredients?ingredients=apples&apiKey=d4308995a2ae43578da556983599118e
})

const apiKey = 'apiKey=d4308995a2ae43578da556983599118e'
export default {
    findByIngredients(query) {
        return apiClient.get(
            '/recipes/findByIngredients?ingredients=' + query + '&' + apiKey
        )
    }
}
