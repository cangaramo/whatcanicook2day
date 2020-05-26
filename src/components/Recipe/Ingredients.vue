<template>
    <div>
        <h4 class="mb-4">Ingredients</h4>
        <div
            v-for="ingredient in ingredients"
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
                <p class="description">
                    {{ ingredient.original }}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import { myMixin } from '@/mixins/mixin.js'

export default {
    props: {
        ingredients: Array
    },
    mixins: [myMixin]
}
</script>
