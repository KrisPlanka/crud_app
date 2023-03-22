import { createRouter, createWebHashHistory } from 'vue-router';
import Home from './components/Home.vue';
import User from './components/User.vue';
import CreateUser from "./components/CreateUser.vue";

const routes = [
  { path: '/', component: Home },
  { path: '/user/:id', component: User, props: true, name: 'User' },
  { path: '/create-user', component: CreateUser},
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

