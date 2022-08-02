<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <p>
        <router-link to="/">Go to Home</router-link>
        <router-link to="/login" v-if="this.$store.getters.isAuthenticated===false">Login</router-link>
        <router-link to="/registration" v-if="this.$store.getters.isAuthenticated===false">Registration</router-link>
        <router-link to="/tasks" v-if="this.$store.getters.isAuthenticated===true">See all tasks</router-link>
        <router-link to="/changePassword" v-if="this.$store.getters.isAuthenticated===true" class="nav-link" >ChangePwd</router-link>
        <a class="nav-link" v-if="this.$store.getters.isAuthenticated===true" @click="onLogout">Logout</a>

      </p>
    </nav>

    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import {abilityRoles} from "./casl/index"

export default {
  name: 'App',
  methods:{
    onLogout(){
        this.$store.dispatch('Logout')
      this.$ability.update([])
    }
  },
  created(){
    const ability = this.$ability
    const role = this.$store.getters.role
    console.log(this.$store.getters.role)
    let permissions = abilityRoles(role)
    ability.update([...permissions.rules,...ability.rules])
}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
