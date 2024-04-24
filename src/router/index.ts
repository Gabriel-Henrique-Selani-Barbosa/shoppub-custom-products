/**
 * Some imports from libraries need to me explicitly declared, otherwise they
 * won't be included in the final bundle, like these from `vue-router`.
 */
import { createRouter, createWebHistory } from 'vue-router';
import ViewMain from '@/views/ViewMain.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/:id', name: 'editor', component: ViewMain },
  ],
});

export default router;
