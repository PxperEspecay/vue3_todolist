import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EditView from '../views/EditView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'todo-list',
      component: HomeView,
    },
    
    {
      path: '/todo/edit/:id',
      name: 'edit-todo',
      component: EditView,
    },
    
  ],
})

export default router
