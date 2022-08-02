import Vue from "vue";
import Router from "vue-router"
// import LoginPage from "@/pages/LoginPage";
// import TodoPage from "@/pages/TodoPage";
import LoginPage from "@/pages/LoginPage";
import TodoPage from "@/pages/TodoPage";
import Registration from "@/pages/Registration";
import ChangePassword from "@/pages/ChangePassword";


Vue.use(Router)

export default new Router({
    routes:[
        {
            path: '/login',
            name: 'login',
            component: LoginPage
        },
        {
            path: '/tasks',
            name: 'tasks',
            component: TodoPage
        },
        {
            path: '/registration',
            name: 'registration',
            component: Registration
        },
        {
            path: '/changePassword',
            name: 'changePassword',
            component:ChangePassword
        },

    ],
    mode: 'history'
})