import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/add-recipe',
      name: 'add-recipe',
      // route level code-splitting
      component: () => import('../components/AddRecipe.vue')
    },
    {
      path: '/yessir',
      name: 'yessir',
      // route level code-splitting
      component: () => import('../components/Yessir.vue')
    },
    {
      path: '/components',
      name: 'components',
      // route level code-splitting
      component: () => import('../components/recipe/IngredientSelect.vue')
    }
  ],
})

export default router
