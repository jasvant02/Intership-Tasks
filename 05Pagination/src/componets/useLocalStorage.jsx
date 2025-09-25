import { useState, useEffect } from "react";

export const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    try {
      const storedValue = localStorage.getItem(key);

      if (storedValue) {
        return JSON.parse(storedValue);
      }
    } catch (error) {
      console.error(error);
    }

    return typeof initialValue === "function" ? initialValue() : initialValue;
  });

  useEffect(() => {
    if (value !== undefined) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error("Error setting localStorage item:", error);
      }
    }
  }, [key, value]);

  return [value, setValue];
};
