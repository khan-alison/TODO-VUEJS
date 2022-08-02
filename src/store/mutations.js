

import router from "@/router/router"
import {abilityRoles} from "@/casl";

export default {
LOGIN (state,{user,ability}) {
    state.isAuthenticated = true;
    state.user = user;
    //Update permission for user
    let permissions = abilityRoles(user.role, user.id)
    ability.update([...permissions.rules, ...ability.rules])
    console.log("new ability after login", ability)
    router.push('/tasks')
},

Logout(state){
    localStorage.removeItem('user'),
        state.isAuthenticated = false,
        router.push('/login')
}
}