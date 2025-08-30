import type { Todo } from "./types";
import { v4 as uuidv4 } from "uuid";

const todoStorageKey = "todolist";

export function loadTodoList(): Map<string, Todo> {
  if(!localStorage.getItem(todoStorageKey)) {
    saveTodoList(new Map());
  }
  return new Map(JSON.parse(localStorage.getItem(todoStorageKey) ?? ""));
}

export function saveTodoList(todoList: Map<string, Todo>) {
  const arr = Array.from(todoList);
  localStorage.setItem(todoStorageKey, JSON.stringify(arr));
}

export function addTodoItem(item: Todo): string {
  const todoList = loadTodoList();
  const id = uuidv4();
  todoList.set(id, item);
  saveTodoList(todoList);
  return id;
}

export function removeTodoItem(id: string) {
  const todoList = loadTodoList();
  todoList.delete(id);
  saveTodoList(todoList);
}

export function editTodoItem(id: string, item: Todo) {
  const todoList = loadTodoList();
  todoList.set(id, item);
  saveTodoList(todoList);
}
