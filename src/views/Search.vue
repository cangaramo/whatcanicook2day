<template>
    <div class="container">
        <h2>What's in your fridge?</h2>
        <!-- Ingredients selection -->
        <div class="mb-4">
            <h4>Dairy</h4>
            <div
                v-for="(product, index) in ingredients.dairy"
                :key="'dairy-' + index"
                class="product"
            >
                {{ capitaLizeLetter(product) }}
            </div>
            <h4>Vegetables</h4>
            <div
                v-for="(product, index) in ingredients.vegetables"
                :key="'veggie-' + index"
                class="product"
            >
                {{ capitaLizeLetter(product) }}
            </div>
            <h4>Fruits</h4>
            <div
                v-for="(product, index) in ingredients.fruits"
                :key="'fruit-' + index"
                class="product"
            >
                {{ capitaLizeLetter(product) }}
            </div>
        </div>
        <button>Find recipe</button>

        <h2 class="mt-4">Results</h2>
    </div>
</template>

<script>
//import RecipesService from '@/services/RecipesService.js'
import IngredientsService from '@/services/IngredientsService.js'

export default {
    data() {
        return {
            msg: 'hola',
            ingredients: {}
        }
    },
    created() {
        this.ingredients = IngredientsService.getIngredients()
        // RecipesService.getEvents()
        //     .then(response => {
        //         console.log(response.data)
        //     })
        //     .catch(error => {
        //         console.log('There was an error ' + error)
        //     })
    },
    methods: {
        capitaLizeLetter(word) {
            if (typeof word !== 'string') return ''
            return word.charAt(0).toUpperCase() + word.slice(1)
        }
    }
}
</script>

<style>
h4 {
    margin-top: 20px;
}

.product {
    border: 1px solid black;
    display: inline-block;
    margin: 5px 6px;
    padding: 3px 8px;
    border-radius: 8px;
}
</style>
