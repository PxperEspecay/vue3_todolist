<script setup>
import { onMounted, ref } from "vue";
import { useTodoStore } from "../stores/todo";
import { RouterLink, useRoute, useRouter } from "vue-router";
import Loading from "../components/Loading.vue";

const todoStore = useTodoStore();
const route = useRoute();
const router = useRouter();

const todoID = ref(-1);
const todoText = ref("");
const isLoaded = ref(false);
const isUpdated = ref(false)

onMounted(async () => {
  await todoStore.getDetailTodo(route.params.id);
  isLoaded.value = true;
  todoID.value = parseInt(route.params.id);
  console.log(todoStore.selectedTodo);
});

const submitEdit = async (selectedTodo) => {
  try {
    isLoaded.value = false;
    const bodyData = {
      name: selectedTodo.name,
      status: selectedTodo.status,
    };
    await todoStore.editTodo(bodyData, todoID.value);
    isLoaded.value = true
    isUpdated.value = true
    setTimeout(() => {
      isUpdated.value = false
      // router.push({ name: "todo-list" });
    }, 3000)
    
  } catch (error) {
    console.log('error',error);
  }
};

const backToHome = () => {
  router.push({ name: "todo-list" });
};

</script>

<template>
  <div class="w-1/2 mx-auto mt-5" v-if="isLoaded">
    <div class="toast toast-top toast-end">
      <div v-if="isUpdated" class="alert alert-success">
        <span>Update successfully.</span>
      </div>
    </div>
    <div class="my-5">Edit Page</div>
    <div class="badge badge-soft badge-primary mb-3">ID {{ todoID }}</div>
    <div class="form-control w-full max-w-xs">
      <label class="label">
        <span class="label-text">Name</span>
      </label>
      <input class="input input-bordered w-full" type="text" v-model="todoStore.selectedTodo.name" placeholder="Type here"/>
    </div>
    <div class="form-control w-full max-w-xs">
      <label class="label">
        <span class="label-text">Status</span>
      </label>
      <select class="select select-bordered" v-model="todoStore.selectedTodo.status">
        <option>Select status</option>
        <option v-for="status in todoStore.statuses" :value="status">
          {{ status }}
        </option>
      </select>
    </div>
    <div class="flex mt-3">
      <button class="btn btn-primary w-1/2" @click="submitEdit(todoStore.selectedTodo)">Submit</button>
      <button class="btn btn-cancel ml-3 w-1/2" @click="backToHome()">Cancel</button>
    </div>
    
  </div>
  <div v-else>
    <Loading></Loading>
  </div>
</template>
