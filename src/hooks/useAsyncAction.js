import { ref } from "vue";

/**
 * @param {Promise} action
 */
export const useAsyncAction = (action) => {
  const isLoading = ref(false);

  const callAction = ({ error = "", success = "" } = {}) => {
    isLoading.value = true;

    return action()
      .then(() => {
        if (success) {
          alert(success);
        }
      })
      .catch(() => {
        if (error) {
          alert(error);
        }
      })
      .finally(() => {
        isLoading.value = false;
      });
  };

  return {
    callAction,
    isLoading,
  };
};
