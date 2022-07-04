import { ref } from "vue";

/**
 * @param {Promise} action
 * */
export function useAsyncAction(action) {
  const isLoading = ref(false);

  const callAction = async (payload, { error = "", success = "" } = {}) => {
    try {
      isLoading.value = true;
      await action(payload);
      if (success) {
        alert(success);
      }
    } catch (ex) {
      if (error) {
        alert(error);
      }
      return Promise.reject(ex);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    callAction,
    isLoading,
  };
}
