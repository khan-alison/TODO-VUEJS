export default {
    isAuthenticated: (state) =>{
        return state.isAuthenticated

},
    role:(state)=>{
        return state.user.role ? state.user.role : "guest"
    }
}