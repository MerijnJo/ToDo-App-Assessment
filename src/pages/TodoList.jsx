import { useState } from "react";
import { useGlobalState, GlobalState } from "../context/GlobalState";

export default function TodoList() {
  // Get todos from the global state, default to an empty array if it hasn't been created yet
  const { todos = [] } = useGlobalState();
  
  // Local state just for the input fields
  const [inputValue, setInputValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");

  // Local state to handle editing
  const [editingId, setEditingId] = useState(null);
  const [editTitleValue, setEditTitleValue] = useState("");
  const [editDescriptionValue, setEditDescriptionValue] = useState("");

  const handleAddTodo = () => {
    if (inputValue.trim() === "") return; // Prevent adding empty todos

    const newTodo = {
      id: Date.now(),
      text: inputValue.trim(),
      description: descriptionValue.trim(),
      status: 0, // 0 = blank, 1 = success (checked), 2 = failed (crossed)
    };

    // Dynamically add the 'todos' key in the Global State
    GlobalState.set({
      todos: [...todos, newTodo]
    });

    setInputValue(""); // Clear the title input field
    setDescriptionValue(""); // Clear the description input field
  };

  const handleToggleStatus = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        const currentStatus = todo.status || 0; // Default to 0 just in case
        return { ...todo, status: (currentStatus + 1) % 3 }; // Cycle 0 -> 1 -> 2 -> 0
      }
      return todo;
    });
    GlobalState.set({ todos: updatedTodos });
  };

  const handleEditClick = (todo) => {
    setEditingId(todo.id);
    setEditTitleValue(todo.text);
    setEditDescriptionValue(todo.description || "");
  };

  const handleSaveEdit = () => {
    if (editTitleValue.trim() === "") return; // Prevent saving an empty title

    const updatedTodos = todos.map((todo) => {
      if (todo.id === editingId) {
        return {
          ...todo,
          text: editTitleValue.trim(),
          description: editDescriptionValue.trim(),
        };
      }
      return todo;
    });
    GlobalState.set({ todos: updatedTodos });
    setEditingId(null); // Exit editing mode
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    GlobalState.set({ todos: updatedTodos });
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Total Tasks {todos.length}</h2>
      <div style={{ marginBottom: "1rem", display: "flex", flexDirection: "column", gap: "0.5rem", maxWidth: "300px" }}>
        <input 
          type="text" 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)} 
          placeholder="What needs to be done?" 
          style={{ padding: "0.5rem" }}
        />
        <textarea
          value={descriptionValue}
          onChange={(e) => setDescriptionValue(e.target.value)}
          placeholder="Description (optional)"
          style={{ padding: "0.5rem", resize: "vertical", minHeight: "60px" }}
        />
        <button onClick={handleAddTodo} style={{ padding: "0.5rem 1rem", cursor: "pointer" }}>Add</button>
      </div>
      
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {todos.map((todo) => (
          <li key={todo.id} style={{ padding: "1rem 0", borderBottom: "1px solid #eee" }}>
            <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
              <button 
                onClick={() => handleToggleStatus(todo.id)}
                style={{ 
                  width: "24px", 
                  height: "24px", 
                  cursor: "pointer", 
                  padding: 0, 
                  background: "white", 
                  border: "1px solid #ccc", 
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  color: todo.status === 1 ? "green" : todo.status === 2 ? "red" : "inherit"
                }}
              >
                {todo.status === 1 && "✓"}
                {todo.status === 2 && "✗"}
              </button>
              
              {editingId === todo.id ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", flex: 1 }}>
                  <input 
                    type="text" 
                    value={editTitleValue} 
                    onChange={(e) => setEditTitleValue(e.target.value)} 
                    style={{ padding: "0.5rem" }}
                  />
                  <textarea
                    value={editDescriptionValue}
                    onChange={(e) => setEditDescriptionValue(e.target.value)}
                    style={{ padding: "0.5rem", resize: "vertical", minHeight: "60px" }}
                  />
                  <button onClick={handleSaveEdit} style={{ padding: "0.5rem 1rem", cursor: "pointer", alignSelf: "flex-start" }}>Save changes</button>
                </div>
              ) : (
                <>
                  <div style={{ flex: 1 }}>
                    <strong style={{ wordBreak: "break-word", textDecoration: todo.status === 1 ? "line-through" : "none" }}>{todo.text}</strong>
                    {todo.description && (
                      <p style={{ margin: "0.5rem 0 0 0", color: "#555", fontSize: "0.9rem", wordBreak: "break-word" }}>{todo.description}</p>
                    )}
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button onClick={() => handleEditClick(todo)} style={{ cursor: "pointer", padding: "0.25rem 0.5rem" }}>Edit</button>
                    <button onClick={() => handleDeleteTodo(todo.id)} style={{ cursor: "pointer", padding: "0.25rem 0.5rem", color: "red" }}>Delete</button>
                  </div>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
