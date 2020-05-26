<template>
    <div class="col-6 recipe">
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
                    v-for="(used, index) in recipe.usedIngredients"
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
</template>

<script>
export default {
    props: {
        recipe: {}
    }
}
</script>

<style lang="scss">
@import '@/sass/variables.scss';

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
