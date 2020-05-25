<template>
    <div id="app">
        <main>
            <router-view />
        </main>
        <MyFooter></MyFooter>
    </div>
</template>

<script>
import Footer from '@/components/Footer.vue'
export default {
    components: {
        MyFooter: Footer
    }
}
</script>
<style lang="scss">
@import '@/sass/generic.scss';

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    color: $dark;
}
</style>
