const express = require("express");
const fs = require("fs");
const app = express();

app.get("/", (request, response) => {
    return response.send("Hello World!");
});

app.get("/todos", (request, response) => {

    const showPendingTodos = request.query.showpending;

    fs.readFile("./store/todo.json", "utf-8", (err, data) => {
        if (err) {
            return response.status(500).send("Sorry, something wnet wrong.");
        }

        const todos = JSON.parse(data);

        if (showPendingTodos !== "1") {
            return response.json({ todos: todos });
        } else {
            return response.json({
                todos: todos.filter((t) => {
                    return t.complete === false;
                }),
            });
        }
    });
});

app.put("/todos/:id/complete", (request, response) => {
    const id = request.params.id;

    const findTodoById = (todos, id) => {
        for (let i = 0; i < todos.length; i++) {
            if (todos[i].id === parseInt(id)) {
                return i;
            }
        }
        return -1;
    };

    fs.readFile("./store/todo.json", "utf-8", (err, data) => {
        if (err) {
            return response.status(500).send("Sorry, something wnet wrong.");
        }

        let todos = JSON.parse(data);
        const todoIndex = findTodoById(todos, id);

        if (todoIndex === -1) {
            return response.status(404).send("Sorry, Not Found.");
        }
        todos[todoIndex].complete = true;

        fs.writeFile("./store/todo.json", JSON.stringify(todos), () => {
            return response.json({ status: "ok" });
        });
    });
});

app.listen(3000, () => {
    console.log("Application Running on http://localhost:3000");
});
