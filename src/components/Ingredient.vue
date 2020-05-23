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
    border: 1px solid #47a591;
    display: inline-block;
    margin: 5px 6px;
    padding: 3px 8px;
    border-radius: 8px;
    cursor: pointer;
    &.active {
        background: #47a591;
        color: white;
    }
}
</style>
