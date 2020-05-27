<template>
    <div class="col-md-6 recipe">
        <h5>{{ recipe.title }}</h5>
        <div class="row mt-3">
            <div class="col-sm-5">
                <img class="picture" :src="recipe.image" />
                <router-link
                    tag="button"
                    class="btn d-none d-sm-block"
                    :to="{
                        name: 'Recipe',
                        params: { id: recipe.id.toString(), query: this.query }
                    }"
                    >Read more</router-link
                >
            </div>
            <div class="col-sm-7 mt-4 mt-sm-0">
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
                <div v-if="recipe.unusedIngredients.length > 1">
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
                <div>
                    <router-link
                        tag="button"
                        class="btn d-sm-none"
                        :to="{
                            name: 'Recipe',
                            params: { id: recipe.id.toString(), query: this.query }
                        }"
                        >Read more</router-link
                    >
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        recipe: {},
        query: String
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
