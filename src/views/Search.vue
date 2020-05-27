<template>
    <div class="container">
        <div class="row">
            <div class="col-md-3 pr-md-0">
                <h1 class="mb-3">What can I cook today?</h1>
                <p>
                    Select ingredients from different categories and find
                    recipes based on what's in your fridge.
                </p>
                <button class="btn d-none d-md-block" @click="goToResults">
                    Find recipe
                </button>
            </div>
            <!-- Ingredients selection -->
            <div class="col-md-8 offset-md-1 pl-md-0">
                <div class="row">
                    <div class="col-md-6 mt-4 mt-md-0">
                        <IngredientsGroup
                            title="Dairy 🥛"
                            :group="ingredients.dairy"
                            @productSelected="selectProduct($event)"
                        >
                        </IngredientsGroup>
                        <IngredientsGroup
                            title="Meat 🥩"
                            :group="ingredients.meats"
                            @productSelected="selectProduct($event)"
                        >
                        </IngredientsGroup>
                        <IngredientsGroup
                            title="Seafood 🐟"
                            :group="ingredients.seafood"
                            @productSelected="selectProduct($event)"
                        >
                        </IngredientsGroup>
                        <IngredientsGroup
                            title="Bakery 🍞"
                            :group="ingredients.bakery"
                            @productSelected="selectProduct($event)"
                        >
                        </IngredientsGroup>
                        <IngredientsGroup
                            title="Legumes"
                            :group="ingredients.legumes"
                            @productSelected="selectProduct($event)"
                        >
                        </IngredientsGroup>
                        <IngredientsGroup
                            title="Spices 🧂"
                            :group="ingredients.spices"
                            @productSelected="selectProduct($event)"
                        >
                        </IngredientsGroup>
                    </div>
                    <div class="col-md-6 mt-4 mt-md-0">
                        <IngredientsGroup
                            title="Vegetables 🥦"
                            :group="ingredients.vegetables"
                            @productSelected="selectProduct($event)"
                        >
                        </IngredientsGroup>
                        <IngredientsGroup
                            title="Rice and pasta 🍚"
                            :group="ingredients.grains"
                            @productSelected="selectProduct($event)"
                        >
                        </IngredientsGroup>
                        <IngredientsGroup
                            title="Fruits 🍐"
                            :group="ingredients.fruits"
                            @productSelected="selectProduct($event)"
                        >
                        </IngredientsGroup>
                        <IngredientsGroup
                            title="Herbs 🌿"
                            :group="ingredients.herbs"
                            @productSelected="selectProduct($event)"
                        >
                        </IngredientsGroup>
                        <IngredientsGroup
                            title="Nuts 🥜"
                            :group="ingredients.nuts"
                            @productSelected="selectProduct($event)"
                        >
                        </IngredientsGroup>
                        <IngredientsGroup
                            title="Condiments 🥫"
                            :group="ingredients.condiments"
                            @productSelected="selectProduct($event)"
                        >
                        </IngredientsGroup>
                    </div>
                </div>
            </div>
            <button class="btn ml-3 mt-4 d-md-none" @click="goToResults">
                Find recipe
            </button>
        </div>
        <br /><br />
    </div>
</template>

<script>
import IngredientsService from '@/services/IngredientsService.js'
import IngredientsGroup from '@/components/IngredientsGroup'

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
        IngredientsGroup
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

<style scoped lang="scss"></style>
