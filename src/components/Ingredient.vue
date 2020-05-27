<template>
    <div
        @click="selectProduct"
        v-bind:class="[{ active: isActive }, 'product']"
    >
        {{ capitaLizeLetter(name) }}
    </div>
</template>

<script>
import { myMixin } from '@/mixins/mixin.js'

export default {
    data() {
        return {
            isActive: false
        }
    },
    props: {
        name: String
    },
    methods: {
        selectProduct() {
            this.isActive = !this.isActive
            this.$emit('productSelected', this.name)
        }
    },
    mixins: [myMixin]
}
</script>

<style lang="scss">
@import '@/sass/variables.scss';

.product {
    border: 1px solid $pink;
    margin: 5px 6px 5px 0px;
    padding: 3px 8px;
    border-radius: 8px;
    float: left;
    cursor: pointer;
    transform: scale(1);
    transition: transform 0.3s;
    &:hover {
        background: $light_pink;
        border: 1px solid $light_pink;
        color: white;
        transform: scale(1.09);
        transition: transform 0.3s;
    }
    &.active {
        background: $pink;
        border: 1px solid $pink;
        box-shadow: 0px 0px 3px 0px #c06c84;
        color: white;
    }
}
</style>
