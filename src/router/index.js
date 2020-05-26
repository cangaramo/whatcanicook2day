import Vue from 'vue'
import VueRouter from 'vue-router'
import Search from '../views/Search.vue'
import Results from '../views/Results.vue'
import Recipe from '../views/Recipe.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Search',
        component: Search
    },
    {
        path: '/results/:query',
        name: 'Results',
        component: Results,
        props: true
    },
    {
        path: '/recipe/:id',
        name: 'Recipe',
        component: Recipe,
        props: true
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
