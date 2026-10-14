// Change to true to see the promise get rejected
const shouldFail = false;

const stateChangePromise = () => {
    return new Promise((resolve, reject) => {
        if (shouldFail) {
            reject(new Error("Something went wrong"));
        } else {
            resolve("very cool");
        }
    });
}

stateChangePromise()
    .then(message => console.log(message))
    .catch(error => console.error(error.name, error.message))
    .finally(() => console.log("done (runs after resolve AND reject)"));
