import { useState } from "react";
import { useGlobalState, GlobalState } from "../context/GlobalState";

export default function TodoList() {
  // Get todos from the global state, default to an empty array if it hasn't been created yet
  const { todos = [] } = useGlobalState();
  
  // Local state just for the input field
  const [inputValue, setInputValue] = useState("");

  const handleAddTodo = () => {
    if (inputValue.trim() === "") return; // Prevent adding empty todos

    const newTodo = {
      id: Date.now(),
      text: inputValue.trim(),
      completed: false,
    };

    // Dynamically add/update the 'todos' key in the Global State
    GlobalState.set({
      todos: [...todos, newTodo]
    });

    setInputValue(""); // Clear the input field
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>TODO List</h2>
      <div style={{ marginBottom: "1rem" }}>
        <input 
          type="text" 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)} 
          placeholder="What needs to be done?" 
          style={{ padding: "0.5rem", marginRight: "0.5rem", width: "250px" }}
        />
        <button onClick={handleAddTodo} style={{ padding: "0.5rem 1rem" }}>Add</button>
      </div>
      
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {todos.map((todo) => (
          <li key={todo.id} style={{ padding: "0.5rem 0" }}>
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
