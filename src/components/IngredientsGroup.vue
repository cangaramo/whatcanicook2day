<template>
    <div class="ingredients-group">
        <h4>{{ this.title }}</h4>
        <Ingredient
            v-for="product in group"
            :key="product.id"
            :name="product"
            @productSelected="selectProduct($event)"
        >
        </Ingredient>
    </div>
</template>

<script>
import Ingredient from '@/components/Ingredient'

export default {
    props: {
        group: Array,
        title: String
    },
    components: {
        Ingredient
    },
    methods: {
        selectProduct(product) {
            this.$emit('productSelected', product)
        }
    }
}
</script>

<style lang="scss">
.ingredients-group {
    display: inline-block;
    width: 100%;
    margin-top: 30px;

    &:first-child {
        margin-top: 0;
    }
}
</style>
