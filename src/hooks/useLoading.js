import {ref} from "vue";

function useLoading() {
    const loading = ref(false);
    function endLoading() {
        loading.value = false;
    }
    function startLoading() {
        loading.value = true;
        setTimeout(() => loading.value = false, 5000);
    }
    return [loading, startLoading, endLoading]
}

export default useLoading;