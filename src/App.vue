<template>
  <div>Vue Workshop 🤌</div>

  <div v-if="isLoading">Loading...</div>
  <div v-else v-for="todo in todos">{{ todo.description }}</div>

  <form class="space-y-2" @submit.prevent="onSubmit">
    <div class="mb-6">
      <BaseInput
        v-model="description"
        label="Description"
        :error="errors.description"
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
import { ErrorMessage, useForm, useField } from "vee-validate";
import * as yup from "yup";

import { onMounted } from "vue";
import { storeToRefs } from "pinia";

import { useTodosStore } from "./store/todos";
import { useAsyncAction } from "./hooks/useAsyncAction";
import BaseInput from "./components/BaseInput.vue";

export default {
  components: {
    BaseInput,
    ErrorMessage,
  },

  setup() {
    const todosStore = useTodosStore();
    const { callAction, isLoading } = useAsyncAction(todosStore.fetchTodos);
    const { todos } = storeToRefs(todosStore);

    const { errors, handleSubmit } = useForm({
      initialValues: {
        description: "",
      },
      validationSchema: yup.object().shape({
        description: yup.string().required().label("Description"),
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
