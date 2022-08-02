import Vue from "vue";
import Vuex from 'vuex'
import mutations from "@/store/mutations";
import getters from "@/store/getters";
import actions from "@/store/actions";


Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        user:JSON.parse(localStorage.getItem('user')),
        isAuthenticated:!!localStorage.getItem('user')
    },
    mutations:mutations,
    getters:getters,
    actions:actions
})