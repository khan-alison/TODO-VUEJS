<template>
  <div>
    <h1>Todo List</h1>
    <TotalComponent :total="total"/>
    {{ JSON.stringify(tasks) }}
    <CreateComponent :tasks="tasks" @add-todo="onCreate"/>
    <ListTodoComponent :tasks="tasks"/>
  </div>
</template>

<script>
import TotalComponent from "@/components/todo/Total";
import CreateComponent from '@/components/todo/Create'
import ListTodoComponent from '@/components/todo/ListTodo'
import axios from 'axios'

export default {
  name:"TodoPage",
  data(){
    return{
      tasks:[]
    }
  }, created() {
    if(this.$store.getters.isAuthenticated){
      axios.get('http://localhost:2001/tasks/').then((res) => {
        if(res.status === 200) {
          this.tasks = res.data
        } else {
          console.log("a")
        }
      }).catch((error) => {
        alert(error.toString())
      })
    }else{
      console.log("else")
      this.$router.push({name:'login'})
    }

  },
  components:{
    TotalComponent,
    CreateComponent,
    ListTodoComponent
  },
  computed:{
    total(){
      return this.tasks.length
    }
  },
  methods:{
    onCreate(taskFromChild){
        this.tasks = [...this.tasks,taskFromChild]
    }
  }
}
</script>