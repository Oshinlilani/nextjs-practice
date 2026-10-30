"use client";

import { useEffect, useState } from "react";

export default function Todos() {
  const [todos, setTodos] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // 1. Fixed Hydration: Only render content on the client after loading from localStorage
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos, isLoaded]);

  // Handles adding OR saving an edited item depending on state
  const handleAddOrUpdate = () => {
    if (inputValue.trim() === "") return;

    if (editingIndex !== null) {
      // We are editing an existing todo
      const newTodos = [...todos];
      newTodos[editingIndex] = inputValue.trim();
      setTodos(newTodos);
      setEditingIndex(null); // Reset edit state
    } else {
      // We are adding a new todo
      setTodos([...todos, inputValue.trim()]);
    }
    setInputValue("");
  };

  const handleDelete = (index: number) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    // Reset edit mode if we delete the item currently being edited
    if (editingIndex === index) {
      setEditingIndex(null);
      setInputValue("");
    }
  };

  // 2. Fixed Edit: Triggers when the "Edit" button next to a todo is clicked
  const startEdit = (index: number) => {
    setEditingIndex(index);
    setInputValue(todos[index]);
  };

  // Prevent server/client HTML mismatches during Next.js hydration
  if (!isLoaded) {
    return <div className="flex justify-center items-center p-4">Loading...</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Todos</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="border border-gray-300 p-2 text-white"
          placeholder={editingIndex !== null ? "Edit todo" : "Add a new todo"}
        />
        <button
          onClick={handleAddOrUpdate}
          className="bg-blue-500 text-white p-2 rounded"
        >
          {editingIndex !== null ? "Update" : "Add"}
        </button>
      </div>

      <ul className="list-disc w-64">
        {todos.length === 0 ? 
        (<p className="text-gray-500">No tasks added yet...</p>) : 
        (todos.map((todo, index) => (
          <li key={index} className="flex justify-between items-center mb-2">
            <span>{todo}</span>
            <div className="flex gap-2">
              <button
                onClick={() => startEdit(index)}
                className="bg-yellow-500 text-white p-1 text-xs rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(index)}
                className="bg-red-500 text-white p-1 text-xs rounded"
              >
                Delete
              </button>
            </div>
          </li> )
        ))}
      </ul>
    </div>
  );
}
