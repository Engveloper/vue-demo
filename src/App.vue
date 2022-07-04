<template>
  <div>Vue Workshop 🤌</div>

  <div v-if="isLoading">Loading...</div>
  <div v-else v-for="todo in todos">{{ todo.description }}</div>

  <form>
    <div class="mb-6">
      <label
        for="description"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >Your description</label
      >
      <input
        type="text"
        id="description"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="name@flowbite.com"
        required
      />
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
import { useForm, useField } from "vee-validate";
import * as yup from "yup";

import { onMounted } from "vue";
import { storeToRefs } from "pinia";

import { useTodosStore } from "./store/todos";
import { useAsyncAction } from "./hooks/useAsyncAction";

export default {
  setup() {
    const todosStore = useTodosStore();
    const { callAction, isLoading } = useAsyncAction(todosStore.fetchTodos);
    const { isTodosLoading, todos } = storeToRefs(todosStore);

    const { errors, handleSubmit } = useForm({
      validationSchema: yup.object().shape({
        description: yup.string().required(),
      }),
    });

    const { value: description } = useField("description");

    const onSubmit = handleSubmit(async (values) => {
      console.log({ values });
    });

    onMounted(() => {
      callAction();
    });

    return {
      errors,
      description,
      isLoading,
      onSubmit,
      todos,
    };
  },
};
</script>

<style lang="scss" scoped></style>
