function useData() {
    let localData = [];
    function setData(newData) {
        localData = newData;
    }
    function deleteData(id) {
        localData = localData.filter(item => item.id !== id);
    }
    function addData(newData) {
        localData.push(newData);
    }
    function updateData(newData) {
        deleteData(newData.id);
        addData(newData);
    }
    function getData(){
        return localData;
    }
    return [addData, deleteData, updateData, getData, setData]
}

export default useData;