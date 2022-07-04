import { defineStore } from "pinia";
import ky from "~/utils/ky";

export const useTodosStore = defineStore("todos", {
  state: () => ({
    todos: [],
    isTodosLoading: false,
  }),

  actions: {
    async fetchTodos() {
      this.isTodosLoading = true;
      this.todos = await ky.get("todos").json();
      this.isTodosLoading = false;
    },
  },
});
