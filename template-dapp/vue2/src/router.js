import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './pages/Home';
import About from './pages/About';

Vue.use(VueRouter);
const basename = window?.blocklet?.prefix || '/';

export default new VueRouter({
  base: basename,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
  ],
});
