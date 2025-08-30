/* eslint-disable @typescript-eslint/no-explicit-any */
import { emitter } from "./emitter";
import type { Todo } from "./types";
import { v4 as uuidv4 } from "uuid";

const todoStorageKey = "todolist";

export function loadTodoList(): Map<string, Todo> {
  if(typeof window === "undefined") return new Map();
  if(!localStorage.getItem(todoStorageKey)) {
    saveTodoList(new Map());
  }
  
  const map = new Map(JSON.parse(localStorage.getItem(todoStorageKey) ?? "")) as Map<string, {[key: string]: any}>;
  for(const [, item] of map) {
    if(item.expiresAt) {
      item.expiresAt = new Date(item.expiresAt);
    }
  }

  return map as Map<string, Todo>;
}

export function saveTodoList(todoList: Map<string, Todo>) {
  const arr = Array.from(todoList);
  localStorage.setItem(todoStorageKey, JSON.stringify(arr));
  emitter.emit("todo-update", todoList);
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
  if(!todoList.has(id)) return;

  todoList.delete(id);
  saveTodoList(todoList);
}

export function editTodoItem(id: string, item: Todo) {
  const todoList = loadTodoList();
  if(!todoList.has(id)) return;

  todoList.set(id, item);
  saveTodoList(todoList);
}

export function setTodoItemDone(id: string, done: boolean) {
  const todoList = loadTodoList();
  if(!todoList.has(id)) return;

  const item = todoList.get(id);
  if(!item) return;
  editTodoItem(id, {
    ...item,
    done
  });
}

export function getAvailableTags(): Set<string> {
  const availableTags = new Set<string>();
  for(const [, item] of loadTodoList()) {
    for(const tag of item.tags) {
      availableTags.add(tag);
    }
  }
  return availableTags;
}
