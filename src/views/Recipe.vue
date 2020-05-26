<template>
    <div class="single-recipe">
        <div class="container pb-5">
            <div class="breadcrumb">
                <router-link to="/" class="plain">
                    Home
                </router-link>
                <i class="mx-2 px-1 mt-1 fas fa-arrow-left"></i>
                <router-link to="/" class="plain">
                    Recipes
                </router-link>
            </div>
            <div class="row">
                <!-- Title, Numbers and summary -->
                <div class="col-6">
                    <h1>{{ recipe.title }}</h1>
                    <Numbers :recipe="this.recipe"></Numbers>
                    <h4 class="my-4">Summary</h4>
                    <div v-html="recipe.summary"></div>
                </div>
                <!-- Picture -->
                <div class="col-5 offset-1">
                    <img class="picture" :src="recipe.image" />
                </div>
            </div>
        </div>
        <div class="py-4 light-background">
            <div class="container my-2">
                <div class="row">
                    <!-- Ingredients -->
                    <div class="col-6">
                        <Ingredients
                            :ingredients="recipe.extendedIngredients"
                        ></Ingredients>
                    </div>
                    <!-- Equipment -->
                    <div
                        class="col-5 offset-1"
                        v-if="recipe.analyzedInstructions[0]"
                    >
                        <Equipment :equipments="getEquipments"></Equipment>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <!-- Instructions -->
                <div class="col-6">
                    <Instructions
                        :instructions="recipe.analyzedInstructions[0]"
                        :source="recipe.sourceUrl"
                    ></Instructions>
                </div>
                <!-- Diets and intolerances -->
                <div class="col-5 offset-1">
                    <Diets></Diets>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import IngredientsService from '@/services/IngredientsService.js'
import Numbers from '@/components/Recipe/Numbers.vue'
import Ingredients from '@/components/Recipe/Ingredients.vue'
import Instructions from '@/components/Recipe/Instructions.vue'
import Equipment from '@/components/Recipe/Equipment.vue'
import Diets from '@/components/Recipe/Diets.vue'

export default {
    props: {
        id: String
    },
    data() {
        return {
            recipe: {}
        }
    },
    components: {
        Numbers,
        Ingredients,
        Instructions,
        Equipment,
        Diets
    },
    computed: {
        getEquipments() {
            const instructions = this.recipe.analyzedInstructions[0]
            var equipments = []
            instructions.steps.forEach(step => {
                step.equipment.forEach(equipment => {
                    equipments.push(equipment)
                })
            })
            return equipments
        }
    },
    methods: {
        fetchRecipe() {
            this.recipe = IngredientsService.getRecipe()
            console.log(this.recipe)
        },
        capitaLizeLetter(word) {
            if (typeof word !== 'string') return ''
            return word.charAt(0).toUpperCase() + word.slice(1)
        }
    },
    created() {
        if (this.id) {
            this.fetchRecipe()
        } else {
            console.log('empty query')
        }
    }
}
</script>

<style lang="scss">
@import '@/sass/variables.scss';

.single-recipe {
    .light-background {
        background: #f3f3f9;
    }
    .picture {
        border-radius: 20px;
        width: 100%;
    }
    .list {
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
