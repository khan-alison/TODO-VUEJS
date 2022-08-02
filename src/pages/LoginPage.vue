<template>
  <div>
    <h1>Login</h1>
    <ValidationObserver ref="formLogin">

      <form @submit.prevent="onLogin">
        <ValidationProvider name="email" rules="email|min:8|required" :bails="false" v-slot="{ errors }">
          <div class="form-group">
            <label>Email address</label>
            <input type="email" v-model="email" class="form-control">
            <span class="error">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>
        <ValidationProvider name="password" rules="min:8|required" :bails="false" v-slot="{ errors }">
          <div class="form-group">
            <label>Password</label>
            <input type="password" v-model="password" class="form-control">
            <span class="error">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <button type="submit" class="btn btn-primary" >Login</button>

<!--        <button class="btn btn-light" type="button" @click="goToChangePwd()" >Change Password</button>-->

        <br><br>
        <button type="submit" class="btn btn-danger" @click="goToReg()">Not Registered yet? Click here for
          Registration
        </button>

      </form>
    </ValidationObserver>
  </div>
</template>

<script>

export default {
  name:"LoginPage",
  data() {
    return {
      email: '',
      password: ''
    }
  },
  created() {
    if (this.$store.getters.isAuthenticated) {
      this.$router.push('/tasks')
    }
  },
  methods:{
    goToReg() {
      this.$router.push("/registration");
    },
    onLogin: async function () {
      this.$refs.formLogin.validate().then(async (success) => {
        if (!success) {
          return;
        }
        this.$store.dispatch('Login',{email: this.email, password: this.password,ability:this.$ability})
      })
    },
    created() {
      console.log("this.ability",this.$ability)
    }
  }
}
</script>