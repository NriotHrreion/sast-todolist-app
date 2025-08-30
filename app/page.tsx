"use client";

import { Card } from "@/components/ui/card";
import { TodoList } from "@/components/TodoList";
import { TodoForm } from "@/components/TodoForm";
import { useState } from "react";
import { TodoContext } from "@/contexts/TodoContext";

export default function Page() {
  const [currentItem, setCurrentItem] = useState<string | null>(null);

  return (
    <main className="w-full h-full flex justify-center items-center">
      <Card className="w-[800px] h-[560px] py-4 rounded-md flex flex-col">
        <div className="px-5 pb-3 border-b">
          <h2 className="font-semibold">
            代办事项
            <span className="text-muted-foreground ml-4">SAST Web研发组免试题</span>
          </h2>
        </div>
        <div className="flex-1 flex">
          <TodoContext.Provider value={{ currentItem, setCurrentItem }}>
            <TodoList />
            <TodoForm />
          </TodoContext.Provider>
        </div>
      </Card>
    </main>
  );
}
