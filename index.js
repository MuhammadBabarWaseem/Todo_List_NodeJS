const express = require("express");
const fs = require("fs");
const app = express();

app.get("/", (request, response) => {
  return response.send("Hello World!");
});

app.get("/todos", (request, response) => {
    fs.readFile('./store/todo.json', 'utf-8', (err, data) => {
        if (err) {
            return response.status(500).send('Sorry, something wnet wrong.')
        }

        const todos = JSON.parse(data)
        return response.json({todos: todos})
    })
});

app.listen(3000, () => {
  console.log("Application Running on http://localhost:3000");
});
