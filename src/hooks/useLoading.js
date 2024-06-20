import {ref} from "vue";

function useLoading() {
    const loading = ref(false);
    function endLoading() {
        loading.value = false;
    }
    function startLoading() {
        loading.value = true;
    }
    return [loading, startLoading, endLoading]
}

export default useLoading;