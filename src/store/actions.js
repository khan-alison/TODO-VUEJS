import Vue from "vue";
import UserService from "@/service/user.service";

export default {
async Login({commit},{email,password,ability}){
    try {
        // const res = await axios.get(`http://localhost:2000/users?email=${email}&password=${password}`)
        const params = {
            email, password
        }
        const res = await UserService.index(params)
        console.log('login', res)
        /*
      * Count length array. No found account return array eq []
      *
      * */
        if (res.status === 200 && res.data.length > 0) {
            alert('login successfully')
            /*
          * Save user login in local storage
          * LocalStorage in browser. save data for client
          * */
            const user = res.data.pop();
            localStorage.setItem('user', JSON.stringify(user))
            // state.isAuthenticated = true;
            commit('LOGIN', {user, ability})
        } else {
            /*
            * Login fail
            * Set error message
            * */
            // this.$refs.formLogin.setErrors({email: 'User or password incorrect'});
            // alert('User or password incorrect')
            Vue.notify({
                type: 'error',
                title: 'Login',
                text: 'User or password incorrect!'
            })
        }
    } catch (e) {
        Vue.notify({
            type: 'error',
            title: 'Login',
            text: e.toString()
        })
    }
},
Logout({commit},state){
    commit('Logout',state)
}

}