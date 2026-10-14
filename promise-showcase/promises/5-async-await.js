const URL = "https://jsonplaceholder.typicode.com/todos/1";

// The same request written two ways

// 1. Promise chain
fetch(URL)
    .then(response => response.json())
    .then(todo => console.log("then:", todo))
    .catch(error => console.error(error));

// 2. async / await
async function getTodo() {
    try {
        const response = await fetch(URL);
        const todo = await response.json();
        console.log("await:", todo);
    } catch (error) {
        console.error(error);
    }
}

getTodo();
