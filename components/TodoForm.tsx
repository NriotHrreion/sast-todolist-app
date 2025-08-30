"use client";

import { useContext } from "react";
import { TodoContext } from "@/contexts/TodoContext";

export function TodoForm() {
  const { currentItem, setCurrentItem } = useContext(TodoContext);

  return (
    <div></div>
  );
}
