<template>
    <div class="container">
        <div class="row">
            <div class="col-3 pr-0">
                <h2>What's in your fridge?</h2>
                <p>
                    Select ingredients from different categories and find
                    recipes based on what's in your fridge
                </p>
                <button class="btn" @click="goToResults">Find recipe</button>
            </div>
            <div class="col-9 pl-5">
                <!-- Ingredients selection -->
                <div>
                    <div class="category-group">
                        <h4>Dairy</h4>
                        <Ingredient
                            v-for="product in ingredients.dairy"
                            :key="product.id"
                            :name="product"
                            @productSelected="selectProduct($event)"
                        >
                        </Ingredient>
                    </div>
                    <div class="category-group">
                        <h4>Vegetables</h4>
                        <Ingredient
                            v-for="product in ingredients.vegetables"
                            :key="product.id"
                            :name="product"
                            @productSelected="selectProduct($event)"
                        >
                        </Ingredient>
                    </div>
                    <div class="category-group">
                        <h4>Fruits</h4>
                        <Ingredient
                            v-for="product in ingredients.fruits"
                            :key="product.id"
                            :name="product"
                            @productSelected="selectProduct($event)"
                        >
                        </Ingredient>
                    </div>
                </div>
            </div>
        </div>
        <br /><br />
    </div>
</template>

<script>
import IngredientsService from '@/services/IngredientsService.js'
import Ingredient from '@/components/Ingredient'

export default {
    data() {
        return {
            ingredients: {},
            selected_products: []
        }
    },
    created() {
        this.fetchIngredients()
    },
    components: {
        Ingredient
    },
    methods: {
        fetchIngredients() {
            this.ingredients = IngredientsService.getIngredients()
        },
        selectProduct(product) {
            var pos = this.selected_products.indexOf(product)
            if (pos == -1) {
                // Add
                this.selected_products.push(product)
            } else {
                // Remove
                this.selected_products.splice(pos, 1)
            }
            console.log(this.selected_products)
        },
        goToResults() {
            const query = this.selected_products.join(',+')
            this.$router.push({ name: 'Results', params: { query: query } })
        }
    }
}
</script>

<style scoped lang="scss">
@media (min-width: 1200px) {
    .container,
    .container-lg,
    .container-md,
    .container-sm,
    .container-xl {
        max-width: 1300px;
    }
}
.category-group {
    display: inline-block;
    width: 100%;
    margin-top: 30px;

    &:first-child {
        margin-top: 0;
    }
}
</style>
