<template>
  <div>Vue Workshop 🤌</div>

  <div v-if="isLoading">Loading...</div>
  <div v-else v-for="todo in todos">{{ todo.description }}</div>
</template>

<script>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";

import { useTodosStore } from "./store/todos";
import { useAsyncAction } from "./hooks/useAsyncAction";

export default {
  setup() {
    const todosStore = useTodosStore();

    const { callAction, isLoading } = useAsyncAction(todosStore.fetchTodos);

    const { isTodosLoading, todos } = storeToRefs(todosStore);

    onMounted(() => {
      callAction(null, {
        error: "Error fetching todos",
        success: "Todos fetched",
      });
    });

    return {
      isLoading,
      todos,
    };
  },
};
</script>

<style lang="scss" scoped></style>
