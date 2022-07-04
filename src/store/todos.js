import { defineStore } from "pinia";
import ky from "~/utils/ky";

export const useTodosStore = defineStore("todos", {
  state: () => ({
    todos: [],
  }),

  actions: {
    async fetchTodos() {
      this.todos = await ky.get("todos").json();
    },
  },
});
