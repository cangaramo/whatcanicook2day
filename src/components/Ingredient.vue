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
.product {
    border: 1px solid #c06c84;
    //display: inline-block;
    margin: 5px 6px;
    padding: 3px 8px;
    border-radius: 8px;
    float: left;
    cursor: pointer;
    &:hover {
        background: #deaab8;
        border: 1px solid #deaab8;
        color: white;
    }
    &.active {
        background: #c06c84;
        border: 1px solid #c06c84;
        color: white;
    }
}
</style>
