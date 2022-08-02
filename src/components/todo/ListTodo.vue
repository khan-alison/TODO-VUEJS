<template>
  <div>
    <h2>List Active</h2>
    {{JSON.stringify(tasks)}}
    <table-component>
      <tr v-for="task in tasks"  v-bind:key="task.id">
        <td>
          <input class="mark" type="checkbox" v-model="task.completed" />
          <span class="checkmark"> </span>
        </td>
        <td :class="{ completed: task.completed }">
          <label @click="edit(task)" v-show="editting !== task">{{ task.title }}</label>
          <input
              v-if="editting == task && task.completed != true"
              v-model="task.title"
              :class="{}"
              @keyup.escape="doneEdit"
              @keyup.enter="doneEdit"
          />
        </td>
        <td class="text-right">
          <button class="btn btn-sm btn-danger" @click="onRemove(task.id)">Remove</button>
        </td>
      </tr>
    </table-component>

    <!--    <b-table striped hover :items="tasks"></b-table>-->
  </div>
</template>

<script>
import Table from '@/components/Table'
import axios from 'axios'

export default {
  name:"ListTodoComponent",
  data: function () {
    return {
      editting: "",
      edittingIndex:0
    }
  },
  props:['tasks'],
  components:{
    'table-component':Table
  },
  methods:{
    onRemove(id){

      const index = this.findTaskByID(id);
      this.removeItemByIndex(index)
      console.log(id)

      /**
       * 1. Du lieu trong State Vue
       * 2. Du lieu trong DB
       *
       * => 1. Xoa State Vue -> hien lai thong tin. 2 GOI LAI API GET TASK => UPDATE LAI HIEN THI THONG TIN
       * => Xoa du lieu trong DB => 1
       */

      axios.delete(`http://localhost:2001/tasks/${id}`)
          .then((res)=>console.log(res))
          .catch((error)=>console.log(error))

      console.log(id)
    },

    findTaskByID(id){
      return this.tasks.findIndex((obj =>obj.id === id))
    },
    removeItemByIndex(index){
      // eslint-disable-next-line
       this.tasks.splice(index,1)
    },
    edit(item){
      console.log(item)
      this.editting = item
      this.edittingIndex = item.id
    },
    doneEdit() {
      axios.patch(`http://localhost:2001/tasks/${this.edittingIndex}`, {...this.editting})
          .then((res)=>{
            console.log('res',res)
          })
          .catch((error)=>{
            console.log(error)
          })
      this.editting = null;
    },
  },

}
</script>

<style scoped>

.completed  {
  color: #cccaca;
  text-decoration: line-through;
}
</style>