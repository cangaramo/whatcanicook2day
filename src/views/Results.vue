<template>
    <div class="container results">
        <div class="breadcrumb">
            <router-link to="/">
                <i class="fas fa-arrow-left mr-1"></i>
                Home
            </router-link>
        </div>
        <div class="title-results">
            <h1>Recipes</h1>
            <p class="total">· {{ totalResults }} results</p>
            <p class="showing">Showing recipes with {{ this.nice_query }}</p>
        </div>
        <div v-if="!loaded">
            <Loader></Loader>
        </div>
        <div v-show="loaded">
            <div class="mt-4" v-if="totalResults == 0">
                <h4>No results found</h4>
            </div>
            <div v-else>
                <!-- Results -->
                <div class="row">
                    <div
                        v-for="recipe in showRecipes"
                        :key="recipe.id"
                        class="col-6 recipe"
                    >
                        <h5>{{ recipe.title }}</h5>
                        <div class="row mt-3">
                            <div class="col-5">
                                <img class="picture" :src="recipe.image" />
                                <router-link
                                    tag="button"
                                    class="btn"
                                    :to="{
                                        name: 'Recipe',
                                        params: { id: recipe.id.toString() }
                                    }"
                                    >Read more</router-link
                                >
                            </div>
                            <div class="col-7">
                                <!-- Missing ingredients -->
                                <p class="subtitle">
                                    <i
                                        class="fas fa-exclamation missed mr-2"
                                    ></i>
                                    Missing ingredients:
                                </p>
                                <div
                                    class="item-ingredient missing"
                                    v-for="missing in recipe.missedIngredients"
                                    :key="recipe.id + missing.id"
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
                                    v-for="(used,
                                    index) in recipe.usedIngredients"
                                    :key="recipe.id + used.id + index"
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
                                    :key="recipe.id + unused.id"
                                >
                                    {{ unused.name }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Pagination -->
                <Pagination
                    :pages="getPages"
                    @updatePage="updatePage($event)"
                ></Pagination>
            </div>
        </div>
    </div>
</template>

<script>
import RecipesService from '@/services/RecipesService.js'
import IngredientsService from '@/services/IngredientsService.js'
import ResultsPagination from '@/components/ResultsPagination'
import Loader from '@/components/Loader'

export default {
    props: {
        query: String
    },
    data() {
        return {
            recipes: {},
            nice_query: '',
            offset: 0,
            loaded: false,
            totalResults: null
        }
    },
    components: {
        Pagination: ResultsPagination,
        Loader: Loader
    },
    computed: {
        getPages() {
            var pages
            if (this.totalResults % 10 == 0) {
                pages = parseInt(this.totalResults / 10)
            } else {
                pages = parseInt(this.totalResults / 10) + 1
            }
            return pages
        },
        showRecipes() {
            var show_recipes = []
            if (this.totalResults) {
                show_recipes = this.recipes.slice(this.offset, this.offset + 10)
            }
            return show_recipes
        }
    },
    methods: {
        clearData() {
            this.loaded = false
            this.scrollToTop()
        },
        updatePage(current_page) {
            this.offset = (current_page - 1) * 10
            this.clearData()
            this.loaded = true
            //this.findRecipes2()
            //this.findRecipes()
        },
        scrollToTop() {
            window.scrollTo(0, 0)
        },
        findRecipes2() {
            setTimeout(() => {
                //this.totalResults = IngredientsService.getRecipes().totalResults
                //this.recipes = IngredientsService.getRecipes().results
                this.recipes = IngredientsService.getRecipes()
                this.totalResults = this.recipes.length
                console.log(this.showRecipes)
                this.loaded = true
            }, 1000)
        },
        findRecipes() {
            RecipesService.findByIngredients(this.query, this.offset)
                .then(response => {
                    this.totalResults = response.data.totalResults
                    this.recipes = response.data.results
                    setTimeout(() => {
                        this.loaded = true
                    }, 500)
                })
                .catch(error => {
                    console.log('There was an error ' + error)
                    this.loaded = true
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

.results {
    min-height: 90vh;
}

.title-results {
    margin-top: 30px;
    h1 {
        margin: 0;
        display: inline-block;
    }
    .total {
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
