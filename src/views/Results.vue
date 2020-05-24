<template>
    <div class="container">
        <div class="breadcrumb">
            <router-link to="/">
                <i class="fas fa-arrow-left mr-1"></i>
                Go back
            </router-link>
        </div>
        <div class="title-results">
            <h1>Recipes</h1>
            <p class="results">· 10 results</p>
            <p class="showing">Showing recipes with {{ this.nice_query}}</p>
        </div>
        <div class="row">
            <div
                v-for="recipe in recipes"
                :key="recipe.id"
                class="col-6 recipe"
            >
                <h5>{{ recipe.title }}</h5>
                <div class="row mt-3">
                    <div class="col-5">
                        <img class="picture" :src="recipe.image" />
                        <button class="btn">Read more</button>
                    </div>
                    <div class="col-7">
                        <!-- Missing ingredients -->
                        <p class="subtitle">
                            <i class="fas fa-exclamation missed mr-2"></i>
                            Missing ingredients:
                        </p>
                        <div
                            class="item-ingredient missing"
                            v-for="missing in recipe.missedIngredients"
                            :key="missing.id"
                        >
                            {{ missing.name }}
                        </div>
                        <!-- Used ingredients -->
                        <p class="subtitle">
                            <i class="fas fa-check used mr-1"></i>
                            Used ingredients
                        </p>
                        <p
                            class="item-ingredient used"
                            v-for="used in recipe.usedIngredients"
                            :key="used.id"
                        >
                            {{ used.name }}
                        </p>
                        <!-- Unused ingredients -->
                        <p class="subtitle">
                            <i class="fas fa-times mr-2"></i>
                            Unused ingredients
                        </p>
                        <div
                            class="item-ingredient"
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
            recipes: {},
            nice_query: ''
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
        if (this.query) {
            //this.findRecipes()
            this.nice_query = this.query.replace(',+', ', ')
            this.findRecipes2()
        } else {
            console.log('empty query')
        }
    }
}
</script>

<style lang="scss">
@import '@/sass/variables.scss';

.title-results {
    margin-top: 30px;
    h1 {
        margin: 0;
        display: inline-block;
    }
    .results {
        display: inline-block;
        font-weight: 600;
        font-size: 20px;
        margin-bottom: 0;
        margin-left: 15px;
        vertical-align: super;
        color: $pink;
    }
    .showing {
        margin-top: 12px;
        font-size: 17px;
    }
}

.recipe {
    position: relative;
    margin: 30px 0;

    .btn {
        margin-top: 20px;
        font-size: 14px;
    }
    .subtitle {
        font-size: 14px;
        font-weight: 500;
        margin-bottom: 6px;
        margin-top: 10px;
        &:first-child {
            margin-top: 0;
        }
        .used {
            color: $success;
        }
        .missed {
            color: $error;
        }
    }
    .picture {
        border-radius: 20px;
        width: 100%;
    }
    .item-ingredient {
        display: inline-block;
        margin-right: 5px;
        padding: 3px 8px;
        border-radius: 8px;
        font-size: 13px;
        border: 1px solid black;
        margin-bottom: 6px;
        &.used {
            border: 1px solid $success;

            .fas {
                color: $success;
            }
        }
        &.missing {
            border: 1px solid $error;
        }
    }
}
</style>
