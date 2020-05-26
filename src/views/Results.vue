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
                    <Recipe
                        v-for="recipe in showRecipes"
                        :key="recipe.id"
                        :recipe="recipe"
                    ></Recipe>
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
import ResultsPagination from '@/components/Results/ResultsPagination'
import Loader from '@/components/Results/Loader'
import Recipe from '@/components/Results/RecipeCard'

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
        Loader,
        Recipe
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
        beforeLoad() {
            this.loaded = false
            window.scrollTo(0, 0)
        },
        updatePage(current_page) {
            this.offset = (current_page - 1) * 10
            this.beforeLoad()
            setTimeout(() => {
                this.loaded = true
            }, 700)
        },
        findRecipes2() {
            setTimeout(() => {
                this.recipes = IngredientsService.getRecipes()
                this.totalResults = this.recipes.length
                this.loaded = true
            }, 700)
        },
        findRecipes() {
            RecipesService.findByIngredients(this.query)
                .then(response => {
                    this.recipes = response.data
                    this.totalResults = this.recipes.length
                    setTimeout(() => {
                        this.loaded = true
                    }, 400)
                })
                .catch(error => {
                    console.log('There was an error ' + error)
                    this.loaded = true
                })
        }
    },
    created() {
        if (this.query) {
            this.nice_query = this.query.replace(',+', ', ')
            this.nice_query.replace('%20', ' ')
            this.findRecipes2()
            //this.findRecipes()
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
    }
    .showing {
        margin-top: 12px;
        font-size: 17px;
    }
}
</style>
