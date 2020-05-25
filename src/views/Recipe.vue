<template>
    <div class="single-recipe">
        <div class="container pb-5">
            <div class="breadcrumb">
                <router-link to="/">
                    <i class="fas fa-arrow-left mr-1"></i>
                    Home
                </router-link>
            </div>
            <div class="row">
                <!-- Title, numbers, summary and ingredients -->
                <div class="col-6">
                    <h1>{{ recipe.title }}</h1>
                    <div class="numbers">
                        <div class="number">
                            <p>{{ recipe.readyInMinutes }}<i class="ml-1 mb-1 fas fa-clock"></i></p>
                            <p>minutes</p>
                        </div>
                        <div class="number">
                            <p>{{ recipe.servings }}<i class="ml-1 fas fa-user"></i></p>
                            <p>servings</p>
                        </div>
                        <div class="number">
                            <p>{{ recipe.healthScore }}<i class="ml-1 fas fa-heartbeat"></i></p>
                            <p>health score</p>
                        </div>
                    </div>
                    <h4 class="my-4">Summary</h4>
                    <div v-html="recipe.summary"></div>
                </div>
                <div class="col-5 offset-1">
                    <img class="picture" :src="recipe.image" />
                </div>
                <!-- Ingredients -->
            </div>
        </div>
        <div style="background: #f3f3f9">
            <div class="container">
                <div class="row">
                    <div class="col-6">
                        <h4 class="my-4">Ingredients</h4>
                        <div
                            v-for="ingredient in recipe.extendedIngredients"
                            :key="ingredient.id"
                            class="list"
                        >
                            <div class="img-wrapper">
                                <div
                                    :style="
                                        `background-image:url('https://spoonacular.com/cdn/ingredients_250x250/${ingredient.image}')`
                                    "
                                />
                            </div>
                            <div class="ml-4">
                                <p class="name">
                                    {{ capitaLizeLetter(ingredient.name) }}
                                </p>
                                <p class="description">{{ ingredient.original }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <h4 class="my-4">Equipment</h4>
                        <div
                            v-for="equipment in getEquipments"
                            :key="equipment.id"
                            class="list"
                        >
                            <div class="img-wrapper">
                                <div
                                    :style="
                                        `background-image:url('https://spoonacular.com/cdn/equipment_250x250/${equipment.image}')`
                                    "
                                />
                            </div>
                            <div class="ml-4">
                                <p class="name">
                                    {{ capitaLizeLetter(equipment.name) }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <p>Link {{ recipe.sourceName }}: {{ recipe.sourceUrl }}</p>

                <p>Vn: {{ recipe.vegan }}</p>
                <p>V: {{ recipe.vegetarian }}</p>
                <p>G: {{ recipe.glutenFree }}</p>
                <p>D: {{ recipe.dairyFree }}</p>

                {{ this.id }}

                <br /><br />
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div v-for="(step, j) in recipe.analyzedInstructions[0].steps" :key="`s-${j}`">
                    <div style="border-left: 1px solid gray">
                        <div style="width: 20px; height: 20px; border-radius: 50%; background: blue; margin-left: -10px">
                            <p class="mb-0">{{ step.number }}</p>
                        </div>
                        <div style="position: relative; left: 30px; top: -20px">
                            <p class="mb-0">{{ step.step }}</p>
                        </div>
                    </div>
                    <!-- 
                    
                    <p>Ingredients: {{ step.ingredients }}</p>
                    <br /><br /> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import IngredientsService from '@/services/IngredientsService.js'
export default {
    props: {
        id: String
    },
    data() {
        return {
            recipe: {}
        }
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
    .picture {
        border-radius: 20px;
        width: 100%;
    }
    .numbers {
        display: flex;
        margin: 25px 0 25px 0;
        .number {
            //border-right: 1px solid #dedede;
            margin: 0 7px;
            text-align: center;
            background: #f3f3f3;
            border-radius: 15px;
            width: 90px;
            height: 75px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            p:first-child {
                font-weight: 600;
                font-family: 'Poppins';
                color: $pink;
                margin-bottom: 0;
                font-size: 22px;
                i {
                    font-size: 18px;
                    position: relative;
                    top: -2px;
                }
            }
            p:last-child {
                color: #a0a0a0;
                margin-bottom: 0;
                font-size: 12px;
                font-weight: 500;
                margin-top: -2px;
            }
            &:first-child {
                margin-left: 0;
            }
            &:last-child {
                border: none;
            }
        }
    }
    .list {
        display: flex;
        align-items: center;
        margin: 10px 0;

        .name {
            font-weight: 600;
            color: #c06c84;
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
            //box-shadow: 0px 1px 6px 0px #00000026;
            padding: 4px;

            div {
                height: 45px;
                width: 45px;
                //border: 1px solid black;
                background-repeat: no-repeat;
                background-position: center;
                background-size: contain;
                border-radius: 50%;
                //box-shadow: 0px 2px 9px 1px rgba(0, 0, 0, 0.3);
            }
        }
    }
}
</style>
