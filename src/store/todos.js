import { defineStore } from "pinia";
import ky from "~/utils/ky";

export const useTodosStore = defineStore("todos", {
  state: () => ({
    todos: [],
  }),

  actions: {
    async createTodo(payload) {
      const todo = await ky.post("/todos", { body: payload }).json();
      this.todos.push(todo);

      return todo;
    },
    async fetchTodos() {
      this.todos = await ky.get("todos").json();
    },
  },
});
