function useDrawer() {
    const showDrawer = ref(false);
    function closeDrawer() {
        showDrawer.value = false;
    }
    function openDrawer() {
        showDrawer.value = true;
    }
    return [showDrawer, closeDrawer, openDrawer];
}

export default useDrawer;