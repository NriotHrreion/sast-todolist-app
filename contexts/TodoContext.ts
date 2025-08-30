import React from "react";

interface TodoContextType {
  currentItem: string | null
  setCurrentItem: React.Dispatch<React.SetStateAction<string | null>>
}

export const TodoContext = React.createContext<TodoContextType>(undefined!);
