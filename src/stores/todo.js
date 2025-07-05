import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

const BASE_URL = "https://68393b926561b8d882af795a.mockapi.io"


export const useTodoStore = defineStore("todo", {
  state: () => ({
    list: [],
    selectedTodo: {},
    statuses: ["Pending", "Doing", "Done"],
  }),
  actions: {
    async getTodoList() {
      try {
        const res = await axios.get(`${BASE_URL}/todos`);
        this.list = res.data;
      } catch (error) {
        console.log('erroe',error);
      }
    },
    async getDetailTodo(id) {
      try {
        const res = await axios.get(`${BASE_URL}/todos/${id}`);
        this.selectedTodo = res.data;
      } catch (error) {
        console.log('erroe',error);
      }
    },
    async createTodo(todoText) {
      const bodyData = {
        name : todoText,
        status : 'Pending'
      }
      try {
        const res = await axios.post(`${BASE_URL}/todos`,bodyData);
        console.log('create todo completed')
      } catch (error) {
        console.log('erroe',error);
      }
    },
    async editTodo(todoData, id) {
      try {
        const res = await axios.put(`${BASE_URL}/todos/${id}`,todoData);
        console.log('edit todo completed')
      } catch (error) {
        console.log('erroe',error);
      }
    },
    async deleteTodo(id) {
      try {
        const res = await axios.delete(`${BASE_URL}/todos/${id}`);
        console.log('delete todo completed')
      } catch (error) {
        console.log('erroe',error);
      }
    },
  },
});
