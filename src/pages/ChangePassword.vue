<template>
<div>
  <h1>Change Password</h1>
  <ValidationObserver ref="formPwd">
  <form @submit.prevent="onChangePassword">
    <ValidationProvider name="password" rules="min:8|required" :bails="false" v-slot="{ errors }">
      <div class="form-group">
        <label>Password</label>
        <input type="password" v-model="password" class="form-control">
        <span class="error">{{ errors[0] }}</span>
      </div>
    </ValidationProvider>

    <ValidationProvider vid="newPassword" name="newPassword" rules="min:8|required|is_not:@password" :bails="false" v-slot="{ errors }">
      <div class="form-group">
        <label>Password</label>
        <input type="password" v-model="newPassword" class="form-control">
        <span class="error">{{ errors[0] }}</span>
      </div>
    </ValidationProvider>

    <ValidationProvider name="confirmPassword" rules="min:8|required|confirmed:newPassword" :bails="false" v-slot="{ errors }">
      <div class="form-group">
        <label>Password</label>
        <input type="password" v-model="confirmPassword" class="form-control">
        <span class="error">{{ errors[0] }}</span>
      </div>
    </ValidationProvider>

    <button type="submit"
        class="btn btn-primary"> Submit</button>
  </form>
  </ValidationObserver>
</div>
</template>

<script>
import axios from "axios";

export default {
  name: "ChangePassword",
  data(){
    return{
      id:this.getUserId(),
      password:"",
      newPassword:"",
      confirmPassword:""
    }
  },
  methods:{
    onChangePassword: function () {
      this.$refs.formPwd.validate().then(async (success) => {
        if (!success) {
          return;
        }
        try {
          const res = await axios.get(`http://localhost:2001/users?id=${this.id}&password=${this.password}`)
          console.log('check password repose', res)
          if (res.status === 200 && res.data.length > 0) {
            await this.updatePassword();
          } else {
            this.$refs.formPwd.setErrors({password: 'Password incorrect'});
          }
        } catch (e) {
          alert(e.toString())
        }
      })
    },
    async updatePassword(){
        try{
          console.log(this.newPassword)
          await axios.patch(`http://localhost:2001/users/${this.id}`,{password:this.newPassword})
              .then((res)=>{
                console.log(res)
              })
        }catch(error) {
        console.log(error)
      }
    },
    getUserId(){
      const localStorageData = localStorage.getItem('user')
      const userData = JSON.parse(localStorageData)
      return userData.id
    }
  },
  created() {

      if(this.$ability.cannot('update', 'Password')) {
        this.$router.push({name: "tasks"})
      } else if(!this.user.isAuthenticated ) {
        this.$router.push({name: "login"})
      }

    }
}
</script>

<style scoped>

</style>