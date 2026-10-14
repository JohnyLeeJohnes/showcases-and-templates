const promise1 = Promise.resolve(3);
const promise2 = 42; // plain values are treated as already resolved promises
const promise3 = new Promise((resolve) => {
    setTimeout(resolve, 100, 'foo');
});

// Waits for all of them, fails as soon as one of them fails
Promise.all([promise1, promise2, promise3]).then((values) => {
    console.log("all:", values); // [3, 42, 'foo']
});

// Waits for all of them and never fails - you get the status of each one
Promise.allSettled([promise1, Promise.reject(new Error("nope"))]).then((results) => {
    console.log("allSettled:", results.map(result => result.status)); // ['fulfilled', 'rejected']
});

// Takes whichever promise settles first
Promise.race([promise3, new Promise(resolve => setTimeout(resolve, 50, 'fast'))]).then((value) => {
    console.log("race:", value); // 'fast'
});
