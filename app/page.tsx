"use client";

import { Card } from "@/components/ui/card";
import { Sidebar } from "@/components/sidebar";
import { AddTodoForm } from "@/components/add-todo-form";
import { useState } from "react";
import { TodoContext } from "@/contexts/todo-context";
import { EditTodoForm } from "@/components/edit-todo-form";
import { loadTodoList } from "@/lib/storage";

export default function Page() {
  const [currentItem, setCurrentItem] = useState<string | null>(null);
  const currentTodo = currentItem ? loadTodoList().get(currentItem) : undefined;

  return (
    <main className="w-full h-full flex justify-center items-center">
      <Card className="w-[900px] h-[660px] py-0 rounded-md flex flex-col gap-0">
        <div className="px-5 pt-4 pb-3 border-b">
          <h1>
            <span className="font-bold">代办事项</span>
            <span className="text-muted-foreground ml-4">SAST Web研发组免试题</span>
          </h1>
        </div>
        <div className="flex-1 flex overflow-hidden">
          <TodoContext.Provider value={{ currentItem, setCurrentItem }}>
            <Sidebar />
            {
              !currentTodo
              ? <AddTodoForm />
              : <EditTodoForm {...currentTodo}/>
            }
          </TodoContext.Provider>
        </div>
      </Card>
    </main>
  );
}
