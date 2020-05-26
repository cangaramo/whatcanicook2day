<template>
    <div>
        <h4 class="my-4">Diets and intolerances</h4>
        <div class="diets">
            <div :class="[{ active: recipe.dairyFree }, 'diet']">
                <img v-if="recipe.dairyFree" src="@/assets/dairy.png" />
                <img v-else src="@/assets/dairy-gray.png" />
                <span>Dairy free</span>
            </div>
            <div :class="[{ active: recipe.glutenFree }, 'diet']">
                <img v-if="recipe.glutenFree" src="@/assets/gluten.png" />
                <img v-else src="@/assets/gluten-gray.png" />
                <span>Gluten free</span>
            </div>
            <div :class="[{ active: recipe.vegetarian }, 'diet']">
                <img v-if="recipe.vegetarian" src="@/assets/veggie.png" />
                <img v-else src="@/assets/veggie-gray.png" />
                <span>Vegetarian</span>
            </div>
            <div :class="[{ active: recipe.vegan }, 'diet']">
                <img v-if="recipe.vegan" src="@/assets/vegan.png" />
                <img v-else src="@/assets/vegan-gray.png" />
                <span>Vegan</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        recipe: Object
    }
}
</script>

<style lang="scss">
@import '@/sass/variables.scss';

.single-recipe .diets {
    .diet {
        border: 1px solid #dadada;
        width: 160px;
        margin-bottom: 12px;
        margin-right: 10px;
        border-radius: 15px;
        padding: 6px 10px;
        display: inline-block;
        img {
            height: 35px;
        }
        span {
            color: #dadada;
            //font-family: 'Poppins';
            margin-left: 15px;
            text-transform: uppercase;
            font-weight: 600;
            font-size: 12px;
        }
        &.active {
            border: 1px solid #ffffff;
            box-shadow: 0px 0px 3px 0px $pink;
            color: $purple;
            img {
                height: 35px;
            }
            span {
                color: $pink;
            }
        }
    }
}
</style>
