const axios = require("axios");

// Successful request - axios parses the JSON for you (response.data)
axios.get("https://jsonplaceholder.typicode.com/users/1")
    .then(response => console.log(response.data.name))
    .catch(error => console.error(error.message));

// Failed request - axios rejects on 4xx/5xx status codes
axios.get("https://jsonplaceholder.typicode.com/posts/999")
    .then(response => console.log(response.data))
    .catch(error => console.error(error.message));

// Printed first, because the requests above are asynchronous
console.log("am I first?");
