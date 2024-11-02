import { createRouter, createWebHistory } from 'vue-router';
import Menu from '../views/Menu.vue';
import Board from '../views/Board.vue';

const routes = [
  {
    path: '/',
    name: 'menu',
    component: Menu,
  },
  {
    path: '/player',
    name: 'player',
    component: Board,
  },
  {
    path: '/multiplayer',
    name: 'multiplayer',
    component: Board,
  },
  {
    path: '/spectator',
    name: 'spectator',
    component: Board,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;