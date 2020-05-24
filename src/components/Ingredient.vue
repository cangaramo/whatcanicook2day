<template>
    <div
        @click="selectProduct"
        v-bind:class="[{ active: isActive }, 'product']"
    >
        {{ capitaLizeLetter(name) }}
    </div>
</template>

<script>
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
        capitaLizeLetter(word) {
            if (typeof word !== 'string') return ''
            return word.charAt(0).toUpperCase() + word.slice(1)
        },
        selectProduct() {
            this.isActive = !this.isActive
            this.$emit('productSelected', this.name)
        }
    }
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
    &:hover {
        background: $light_pink;
        border: 1px solid $light_pink;
        color: white;
    }
    &.active {
        background: $pink;
        border: 1px solid $pink;
        color: white;
    }
}
</style>
