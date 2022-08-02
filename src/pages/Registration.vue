<template>
  <div>
    <h1>Registration</h1>
    <!--    <ValidationObserver v-slot="{ invalid }">-->
    <ValidationObserver ref="formRegister">
      <!--      <form @submit.prevent="handleSubmit(onReg)" @reset.prevent="reset">-->
      <form @submit.prevent="onReg" @reset.prevent="reset">
        <!--      <form @submit.prevent="onReg">-->
        <ValidationProvider  name="email" rules="email|min:8|required" :bails="false" v-slot="{ errors }">
          <div class="form-group">
            <label>Email address</label>
            <input type="email" v-model="email" class="form-control">
          </div>
          <!--        <span class="error">{{ errors[0] }}</span>-->
          <ul>
            <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
          </ul>
        </ValidationProvider>

        <ValidationProvider name="password" rules="required|min:8" vid="password" v-slot="{ errors }">
          <div class="form-group">
            <label>Password</label>
            <input type="password" v-model="password" class="form-control">
          </div>
          <ul>
            <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
          </ul>
        </ValidationProvider>

        <ValidationProvider name="Confirm Password" rules="required|confirmed:password" v-slot="{ errors }">
          <div class="form-group">
            <label>Password Confirm</label>
            <input type="password" v-model="passwordConfirm" class="form-control">
          </div>
          <ul>
            <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
          </ul>
        </ValidationProvider>

        <div>
          <button type="submit">Submit</button>
          <br><br>
          <button type="reset" class="btn btn-primary" >Reset</button>
          <br><br>
          <button type="submit" class="btn btn-info" @click="goToLogin()">Registered already? Click here for Login
          </button>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name:"RegistrationPage",
  data() {
    return {
      email: '',
      password: '',
      passwordConfirm:"",
      value: ''
    }
  },
  methods: {
    goToLogin() {
      this.$router.push("/login");
    },
    onReg() {
      this.$refs.formRegister.validate().then(success => {
        if (!success) {
          return;
        }
        // we create new task on here
        const user = {email: this.email, password: this.password}

        axios.post('http://localhost:2001/users/', user).then((res) => {
          if (res.status === 201) {
            this.email = '',
                this.password = '',
                /**
                 * Create event form child to parent listen data
                 * $emit is function create event of VUE Support
                 */
                this.$emit('event-create-from-child', user)
            alert('Registration is complete')
            this.$router.push('/login')
          } else {
            alert('Registration fail')
          }
        }).catch((error) => {
          alert(error.toString())
        })
      })
    }
  },
  created() {
    if(this.$store.getters.isAuthenticated){
      this.$router.push('/tasks')
    }
  }
}
</script>