import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from './components/Home';
import login from './components/Login';
import reg from './components/reg';
import forget from './components/forget';
import search from './components/search';
import city from './components/city';
import personal from './components/personal';
import detail from './components/detail';
import personInfo from './components/personInfo';

import updatePwd from './components/updatePwd';
Vue.use(VueRouter);

var routes = [{
    path:"/",
    component:HomePage
},{
    path:"/login",
    component:login
},{
    path:"/reg",
    component:reg
},{
    path:"/forget",
    component:forget
},{
    path:"/search",
    component:search
},{
    path:"/city",
    component:city
},{
    path:"/personal",
    component:personal
},{
    path:"/detail",
    component:detail
},{
    path:"/personInfo",
    component:personInfo
},{
    path:"/updatePwd",
    component:updatePwd
}];

const router = new VueRouter({
    routes
});

export default router;