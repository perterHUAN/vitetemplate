// 服务端给数据生成id
function generateRandomId() {
    return Math.floor((Math.random() * 1000)) + 1;
}

export default generateRandomId;