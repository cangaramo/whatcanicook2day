<template>
    <div class="container">
        <h2>What's in your fridge?</h2>
        <!-- Ingredients selection -->
        <div class="mb-4">
            <h4>Dairy</h4>
            <Ingredient
                v-for="product in ingredients.dairy"
                :key="product.id"
                :name="product"
                @productSelected="selectProduct($event)"
            >
            </Ingredient>
            <h4>Vegetables</h4>
            <Ingredient
                v-for="product in ingredients.vegetables"
                :key="product.id"
                :name="product"
                @productSelected="selectProduct($event)"
            >
            </Ingredient>
            <h4>Fruits</h4>
            <Ingredient
                v-for="product in ingredients.fruits"
                :key="product.id"
                :name="product"
                @productSelected="selectProduct($event)"
            >
            </Ingredient>
        </div>
        <button @click="findRecipes">Find recipe</button>

        <h2 class="mt-4">Results</h2>
        <div class="row">
            <div
                v-for="recipe in recipes"
                :key="recipe.id"
                class="recipe  text-left col-6 my-4 py-1"
            >
                <h5 class="mb-3">{{ recipe.title }}</h5>
                <div class="row ">
                    <div class="col-5">
                        <img class="w-100" :src="recipe.image" />
                        <button class="mt-3">Read more</button>
                    </div>
                    <div class="col-7">
                        <!-- Missing ingredients -->
                        <p class="subtitle mt-0 mb-1">
                            <i class="fas fa-exclamation missed mr-2"></i>Missing
                            ingredients:
                        </p>
                        <div
                            class="item-ing missing mb-1"
                            v-for="missing in recipe.missedIngredients"
                            :key="missing.id"
                        >
                            {{ missing.name }}
                        </div>
                        <!-- Used ingredients -->
                        <p class="subtitle mt-2 mb-1">
                            <i class="fas fa-check used mr-1"></i> Used ingredients
                        </p>
                        <p
                            class="item-ing used  mb-1"
                            v-for="used in recipe.usedIngredients"
                            :key="used.id"
                        >
                            {{ used.name }}
                        </p>
                        <!-- Unused ingredients -->
                        <p class="subtitle mt-2 mb-1">
                            <i class="fas fa-times mr-2"></i>Unused ingredients
                        </p>
                        <div
                            class="item-ing  mb-1"
                            v-for="unused in recipe.unusedIngredients"
                            :key="unused.id"
                        >
                            {{ unused.name }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <br /><br />
    </div>
</template>

<script>
//import RecipesService from '@/services/RecipesService.js'
import IngredientsService from '@/services/IngredientsService.js'
import Ingredient from '@/components/Ingredient'

export default {
    data() {
        return {
            ingredients: {},
            recipes: {},
            selected_products: []
        }
    },
    created() {
        this.fetchIngredients()
    },
    components: {
        Ingredient
    },
    methods: {
        fetchIngredients() {
            this.ingredients = IngredientsService.getIngredients()
        },
        selectProduct(product) {
            var pos = this.selected_products.indexOf(product)
            if (pos == -1) {
                // Add
                this.selected_products.push(product)
            } else {
                // Remove
                this.selected_products.splice(pos, 1)
            }
            console.log(this.selected_products)
        },
        findRecipes() {
            this.recipes = IngredientsService.getRecipes()
            console.log(this.selected_products.join(',+'))
        }
        // findRecipes() {
        //     const query = this.selected_products.join(',+')
        //     RecipesService.findByIngredients(query)
        //         .then(response => {
        //             this.recipes = response.data
        //         })
        //         .catch(error => {
        //             console.log('There was an error ' + error)
        //         })
        // }
    }
}
</script>

<style lang="scss">
h4 {
    margin-top: 20px;
    color: #d9455f;
}
.recipe {
    position: relative;
    h5 {
        font-weight: 700;
        color: #424874;
    }

    button {
        background: #424874;
        color: white;
        border-radius: 15px;
        padding: 7px 18px;
        bottom: 0;
        left: 15px;
        font-weight: 500;
        font-size: 15px;
        position: absolute;
        font-weight: 500;
        font-size: 13px;
    }

    .subtitle {
        font-size: 14px;
        font-weight: 500;

        .used {
            color: #47a591;
        }

        .missed {
            color: #f77268;
        }
    }
    img {
        border-radius: 20px;
    }

    .item-ing {
        display: inline-block;
        margin-right: 5px;
        padding: 3px 8px;
        border-radius: 8px;
        font-size: 13px;
        border: 1px solid black;

        &.used {
            border: 1px solid #47a591;

            .fas {
                color: #47a591;
            }
        }

        &.missing {
            border: 1px solid #f77268;
        }
    }
}

</style>
