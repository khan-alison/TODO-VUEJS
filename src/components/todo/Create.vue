<template>
  <div>
  <h2>Create new Task</h2>
  <div class="input-group mb-3">
    <input type="text" class="form-control" v-model="taskName" placeholder="Enter task name">
    <div class="input-group-append">
      <button class="btn btn-primary" type="button" @click="onCreate" >Add</button>
    </div>
  </div>
  </div>
</template>

<script>
import axios from "axios"

export default{

  name:"CreateComponent",
  data: function () {
    return {
      taskName:""

    }
  },
  props:['tasks'],
  methods:{
    onCreate(){
      const newTodo = {title:this.taskName,active:0}
      // eslint-disable-next-line
      this.$emit('add-todo',newTodo)
      // console.log(this.task)
      axios.post('http://localhost:2001/tasks/', newTodo).then((res) => {
        if(res.status === 201) {
          this.taskName = ''
          this.$emit('event-create-from-child', newTodo)
          alert('create task successfully')
        } else {
          alert('create task fail')
        }
      }).catch((error) => {
        alert(error.toString())
      })

      }

  }
}
</script>