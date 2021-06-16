import { createRouter, createWebHistory } from 'vue-router';
import Register from './components/auth/Register.vue';
import Login from './components/auth/Login.vue';
import Home from './components/blogs/BlogHome.vue';
import addBlog from './components/blogs/AddBlog.vue';
//import firebase from 'firebase';
import MyBlog from './components/blogs/MyBlog.vue';
import OneBlog from './components/blogs/OneBlog.vue';
const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/home'},
        { path: '/register', component: Register},
        { path: '/login', component: Login},
        { path: '/home', component: Home, meta: {requiresAuth: true} },
        { path: '/addBlog', component: addBlog, meta: {requiresAuth: true}  },
        { path: '/myBlogs', component: MyBlog,  meta: {requiresAuth: true} },
        { path: '/blog/:id', component: OneBlog, meta: {requiresAuth: true} },
        { path: '/:notFound.(*)', redirect: '/home'},
    ]
});


router.beforeEach((to,from,next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    
    if( requiresAuth && !localStorage.getItem('mail'))
    {
        next('/login');
    } else {
        next();
    }
});


export default router;