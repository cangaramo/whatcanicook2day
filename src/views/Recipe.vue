<template>
    <div class="single-recipe">
        <div class="container">
            <div class="breadcrumb">
                <router-link to="/" class="plain">
                    Home
                </router-link>
                <div v-if="query">
                    <i class="mx-2 px-1 mt-1 fas fa-arrow-left"></i>
                    <router-link
                        :to="{ name: 'Results', params: { query: query } }"
                        class="plain"
                    >
                        Recipes
                    </router-link>
                </div>
            </div>
        </div>
        <div v-if="!loaded">
            <Loader></Loader>
        </div>
        <div v-show="loaded">
            <div class="container pb-5">
                <div class="row">
                    <!-- Title, Numbers and summary -->
                    <div class="col-md-6">
                        <h1>{{ recipe.title }}</h1>
                        <Numbers :recipe="this.recipe"></Numbers>
                        <h4 class="my-4">Summary</h4>
                        <div v-html="recipe.summary"></div>
                    </div>
                    <!-- Picture -->
                    <div class="col-md-5 offset-md-1 mt-4 mt-md-0">
                        <img class="picture" :src="recipe.image" />
                    </div>
                </div>
            </div>
            <div class="py-4 light-background">
                <div class="container my-2">
                    <div class="row">
                        <!-- Ingredients  -->
                        <div class="col-md-6">
                            <Ingredients
                                :ingredients="recipe.extendedIngredients"
                            ></Ingredients>
                        </div>
                        <!-- Equipment -->
                        <div
                            class="col-md-5 offset-md-1"
                            v-if="getEquipments.length > 0"
                        >
                            <Equipment :equipments="getEquipments"></Equipment>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container">
                <div class="row">
                    <!-- Instructions -->
                    <div class="col-md-6 pr-5 pr-md-3">
                        <Instructions :recipe="recipe"></Instructions>
                    </div>
                    <!-- Diets and intolerances -->
                    <div class="col-md-5 offset-md-1">
                        <Diets :recipe="recipe"></Diets>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import IngredientsService from '@/services/IngredientsService.js'
import RecipesService from '@/services/RecipesService.js'
import Numbers from '@/components/Recipe/Numbers.vue'
import Ingredients from '@/components/Recipe/Ingredients.vue'
import Instructions from '@/components/Recipe/Instructions.vue'
import Equipment from '@/components/Recipe/Equipment.vue'
import Diets from '@/components/Recipe/Diets.vue'
import Loader from '@/components/Loader'

export default {
    props: {
        id: String,
        query: String
    },
    data() {
        return {
            recipe: {},
            loaded: false
        }
    },
    components: {
        Numbers,
        Ingredients,
        Instructions,
        Equipment,
        Diets,
        Loader
    },
    computed: {
        getEquipments() {
            var equipments = []
            if (this.recipe.analyzedInstructions) {
                if (this.recipe.analyzedInstructions.length > 0) {
                    const instructions = this.recipe.analyzedInstructions[0]
                    instructions.steps.forEach(step => {
                        step.equipment.forEach(equipment => {
                            equipments.push(equipment)
                        })
                    })
                }
            }
            return equipments
        }
    },
    methods: {
        fetchRecipe() {
            RecipesService.getRecipeById(this.id)
                .then(response => {
                    this.recipe = response.data
                    this.loaded = true
                })
                .catch(error => {
                    this.loaded = true
                    alert('Error fetching the data. ' + error)
                })
        },
        fetchRecipe2() {
            setTimeout(() => {
                this.recipe = IngredientsService.getRecipe()
                this.loaded = true
            }, 400)
        }
    },
    created() {
        if (this.id) {
            //this.fetchRecipe2()
            this.fetchRecipe()
        } else {
            alert('Error fetching data.')
        }
    }
}
</script>

<style lang="scss">
@import '@/sass/variables.scss';

.single-recipe {
    min-height: 90vh;
    .light-background {
        background: #f3f3f9;
    }
    .picture {
        border-radius: 20px;
        width: 100%;
    }
    .list-item {
        display: flex;
        align-items: center;
        margin: 10px 0;
        .name {
            font-weight: 600;
            color: $pink;
            font-family: 'Poppins', sans-serif;
            margin-bottom: 0;
        }
        .description {
            color: gray;
            margin-bottom: 0;
        }
        .img-wrapper {
            border-radius: 10px;
            background: white;
            padding: 4px;

            div {
                height: 45px;
                width: 45px;
                background-repeat: no-repeat;
                background-position: center;
                background-size: contain;
                border-radius: 50%;
            }
        }
    }
}
</style>
