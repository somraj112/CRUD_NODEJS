const express = require("express");
const bodyParser = require("body-parser");
const {
  createTodoSync,
  getTodosSync,
  getTodoSync,
  updateTodoSync,
  deleteTodoSync
} = require("./index.js");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Routes
app.get("/todos", (req, res) => {
  res.send(getTodosSync());
});

app.get("/todos/:id", (req, res) => {
  const todo = getTodoSync(req.params.id);
  if (!todo) return res.status(404).send("Todo not found");
  res.send(todo);
});

app.post("/todos", (req, res) => {
  const { title } = req.body;
  const newTodo = createTodoSync(title);
  res.send(newTodo);
});

app.put("/todos/:id", (req, res) => {
  const updatedTodo = updateTodoSync(Number(req.params.id), req.body);
  if (!updatedTodo) return res.status(404).send("Todo not found");
  res.send(updatedTodo);
});

app.delete("/todos/:id", (req, res) => {
  const isDeleted = deleteTodoSync(Number(req.params.id));
  if (!isDeleted) return res.status(404).send("Todo not found");
  res.send({ success: true });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
