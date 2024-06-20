function sleep(sec) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(), sec * 1000);
    })
}

export default sleep;