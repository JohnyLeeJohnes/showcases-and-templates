let p = new Promise((resolve) => {
    setTimeout(() => {
        resolve(10);
    }, 3 * 100);
});

// Every .then() returns a new promise with the value you returned
p.then((result) => {
    console.log(result); // 10
    return result * 2;
}).then((result) => {
    console.log(result); // 20
    return result * 3;
}).then((result) => {
    console.log(result); // 60
    return result * 4;
}).then((result) => {
    console.log(result); // 240
}).catch((error) => {
    // One catch at the end handles an error from any step above
    console.error(error);
});
