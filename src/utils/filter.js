function filter(data, conditions) {
    const result = [];
    for(const rowData of data) {
        let isok = true;
        for(const cd in conditions) {
            if(!(cd in rowData) || (conditions[cd] === rowData[cd] || conditions[cd] === "")) {
            }else {
                isok = false;
                break;
            }
        }
        if(isok) result.push(rowData);
    }
    return result;
}

export default filter;
