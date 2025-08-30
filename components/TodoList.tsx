"use client";

import type { Todo } from "@/lib/types";
import { useContext, useEffect, useState } from "react";
import { loadTodoList } from "@/lib/storage";
import { TodoContext } from "@/contexts/TodoContext";

function TodoItem({
  id
}: Todo & { id: string }) {
  const { currentItem, setCurrentItem } = useContext(TodoContext);
  
  return (
    <div id={id}>

    </div>
  );
}

export function TodoList() {
  const [todoList, setTodoList] = useState<Map<string, Todo>>(new Map());

  useEffect(() => {
    setTodoList(loadTodoList());
  }, []);

  return (
    <aside>
      {Array.from(todoList).map(([id ,item]) => <TodoItem {...item} id={id} key={id}/>)}
    </aside>
  );
}
