import { useState } from "react";

export function useTrigger() {
  const [, setA] = useState(false);
  return {
    trigger() {
      setA((current) => !current);
    }
  };
}
