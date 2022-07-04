<template>
  <div v-if="isLoading">Loading...</div>
  <ul v-else>
    <li v-for="todo in todos">
      {{ todo.description }}
    </li>
  </ul>
  <form
    class="w-1/2 bg-gray-100 p-4 mx-2 rounded"
    @submit.prevent="handleCreateForm"
  >
    <div class="mb-6">
      <label
        for="description"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >Description</label
      >
      <input
        v-model="description"
        type="text"
        id="description"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Do my homework"
      />
      <ErrorMessage class="text-red-500" name="description" />
    </div>
    <button
      type="submit"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Submit
    </button>
  </form>
</template>

<script>
import * as yup from "yup";
import { onMounted } from "vue";
import { ErrorMessage, useForm, useField } from "vee-validate";

import { storeToRefs } from "pinia";
import { useTodosStore } from "./store/todos";
import { useAsyncAction } from "./hooks/useAsyncAction";

export default {
  components: {
    ErrorMessage,
  },

  setup() {
    const todosStore = useTodosStore();
    const { todos } = storeToRefs(todosStore);
    const { callAction, isLoading } = useAsyncAction(todosStore.fetchTodos);

    const { handleSubmit } = useForm({
      validationSchema: yup.object().shape({
        description: yup.string().required().label("Description"),
      }),
    });

    const { value: description } = useField("description");

    const handleCreateForm = handleSubmit(async (data) => {
      console.log("adsfas");
      console.log({ data });
    });

    onMounted(() => {
      callAction();
    });

    return {
      description,
      handleCreateForm,
      isLoading,
      todos,
    };
  },
};
</script>

<style lang="scss" scoped></style>
