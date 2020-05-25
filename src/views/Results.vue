<template>
    <div class="container">
        <div class="breadcrumb">
            <router-link to="/">
                <i class="fas fa-arrow-left mr-1"></i>
                Home
            </router-link>
        </div>
        <div class="title-results">
            <h1>Recipes</h1>
            <p class="results">· 10 results</p>
            <p class="showing">Showing recipes with {{ this.nice_query }}</p>
        </div>
        <!-- Results -->
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
                            <i class="fas fa-exclamation missed mr-2"></i>
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
                            v-for="used in recipe.usedIngredients"
                            :key="recipe.id + used.id"
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
        <div class="pagination mt-5">
            <button class="changePage" @click="previousPage"><i class="fas fa-chevron-left"></i></button>
            <button
                v-for="page in getPages"
                :key="page"
                @click="changePage(page)"
                :class="[{ active: current_page == page }, 'page']"
            >
                {{ page }}
            </button>
            <button class="changePage" @click="nextPage"><i class="fas fa-chevron-right"></i></button>
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
            nice_query: '',
            offset: 0,
            current_page: 3,
            total: 4
        }
    },
    computed: {
        getPages() {
            var pages = []
            var first
            var last
            if (this.total > 5) {
                if (this.current_page == 1) {
                    // First
                    first = 1
                    last = 5
                } else if (this.current_page == 2) {
                    //Second
                    first = 2
                    last = 6
                } else if (this.current_page == this.total) {
                    // Last
                    first = this.current_page - 4
                    last = this.current_page
                } else if (this.current_page == this.total - 1) {
                    // Second to last
                    first = this.current_page - 3
                    last = this.current_page + 1
                } else {
                    // Rest
                    first = this.current_page - 2
                    last = this.current_page + 2
                }
            } else {
                //Less than 5 pages
                first = 1
                last = this.total
            }
            for (let i = first; i <= last; i++) {
                pages.push(i)
            }
            return pages
        }
    },
    methods: {
        previousPage() {
            this.current_page -= 1
            //Do something
        },
        nextPage() {
            this.current_page += 1
            //Do something
        },
        changePage(page) {
            this.current_page = page
            //Do something
        },
        findRecipes2() {
            this.recipes = IngredientsService.getRecipes().results
        },
        findRecipes() {
            RecipesService.findByIngredients(this.query, this.offset)
                .then(response => {
                    this.recipes = response.data.results
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

.pagination {
    display: flex;
    justify-content: center;
    button {
        border-radius: 5px;
        border: 1px solid #e0e0e0;
        color: $purple;
        height: 30px;
        width: 30px;
        text-align: center;
        margin: 0 4px;
        &:hover {
            background: $light_pink;
            border: 1px solid $light_pink;
            color: white;
        }
        &:focus {
            outline: none;
        }
    }
    .changePage {
        i {
            margin-top: 5px;
        }
    }
    .page {
        font-size: 14px;
        &.active {
            border: 1px solid $pink;
            color: white;
            background: $pink;
            box-shadow: 0px 0px 3px 0px #c06c84;
        }
    }
}

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
