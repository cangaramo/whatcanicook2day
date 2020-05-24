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
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ '../views/About.vue')
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
