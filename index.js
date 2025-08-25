// index.js

const fs = require('fs');
const path = require('path');

const dbPath = path.resolve(__dirname, 'db.txt');

function createTodoSync(title) {
  const newTodo = {
    id: Date.now(),
    title,
    isCompleted: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  const todoString = JSON.stringify(newTodo, null, 2) + '\n';
  fs.appendFileSync(dbPath, todoString);
  return newTodo;
}

function getTodosSync() {
  if (!fs.existsSync(dbPath)) {
    return '';
  }
  return fs.readFileSync(dbPath, 'utf8');
}

function getTodoSync(id) {
  const fileContent = getTodosSync();
  const todos = fileContent.split('\n').filter(line => line.trim() !== '').map(line => JSON.parse(line));
  const todo = todos.find(t => t.id === Number(id));
  return todo ? JSON.stringify(todo, null, 2) : null;
}

function updateTodoSync(id, updates) {
  const fileContent = getTodosSync();
  let todos = fileContent.split('\n').filter(line => line.trim() !== '').map(line => JSON.parse(line));
  const todoIndex = todos.findIndex(t => t.id === Number(id));

  if (todoIndex === -1) {
    return null;
  }

  const updatedTodo = {
    ...todos[todoIndex],
    ...updates,
    updatedAt: new Date().toISOString()
  };

  todos[todoIndex] = updatedTodo;
  const updatedContent = todos.map(todo => JSON.stringify(todo, null, 2)).join('\n') + '\n';
  fs.writeFileSync(dbPath, updatedContent);
  return updatedTodo;
}

function deleteTodoSync(id) {
  const fileContent = getTodosSync();
  let todos = fileContent.split('\n').filter(line => line.trim() !== '').map(line => JSON.parse(line));
  const initialLength = todos.length;
  todos = todos.filter(t => t.id !== Number(id));

  if (todos.length === initialLength) {
    return false;
  }

  const updatedContent = todos.map(todo => JSON.stringify(todo, null, 2)).join('\n') + '\n';
  fs.writeFileSync(dbPath, updatedContent);
  return true;
}

module.exports = {
    createTodoSync,
    getTodosSync,
    getTodoSync,
    updateTodoSync,
    deleteTodoSync
  };
