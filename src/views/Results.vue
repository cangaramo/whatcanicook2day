<template>
    <div class="container">
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
                        <button class="btn mt-3">Read more</button>
                    </div>
                    <div class="col-7">
                        <!-- Missing ingredients -->
                        <p class="subtitle mt-0 mb-1">
                            <i class="fas fa-exclamation missed mr-2"></i
                            >Missing ingredients:
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
                            <i class="fas fa-check used mr-1"></i> Used
                            ingredients
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
    </div>
</template>

<script>
import RecipesService from '@/services/RecipesService.js'
import IngredientsService from '@/services/IngredientsService.js'
export default {
    props: {
        query: String
    },
    data() {
        return {
            recipes: {}
        }
    },
    methods: {
        findRecipes2() {
            this.recipes = IngredientsService.getRecipes()
        },
        findRecipes() {
            RecipesService.findByIngredients(this.query)
                .then(response => {
                    this.recipes = response.data
                })
                .catch(error => {
                    console.log('There was an error ' + error)
                })
        }
    },
    created() {
        console.log('hila')
        if (this.query) {
            //this.findRecipes()
            this.findRecipes2()
        } else {
            console.log('empty query')
        }
    }
}
</script>

<style lang="scss">
.recipe {
    position: relative;

    .btn {
        bottom: 0;
        left: 15px;
        position: absolute;
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
