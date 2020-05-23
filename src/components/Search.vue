<template>
    <div class="container">
        <h4>Search</h4>
        <button>Search</button>
        <p>Dairy</p>
        <div
            v-for="(product, index) in ingredients.dairy"
            :key="index"
            class="product"
        >
            {{ capitaLizeLetter(product) }}
        </div>
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
.product {
    border: 1px solid black;
    display: inline-block;
    margin: 0 10px;
}
</style>
