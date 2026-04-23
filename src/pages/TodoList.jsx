import { useState } from "react";
import { useGlobalState, GlobalState } from "../context/GlobalState";
import {
  Card, CardContent, Typography, TextField, Button, 
  List, ListItem, IconButton, Box
} from "@mui/material";

export default function TodoList() {
  const { todos = [] } = useGlobalState();
  
  const [inputValue, setInputValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editTitleValue, setEditTitleValue] = useState("");
  const [editDescriptionValue, setEditDescriptionValue] = useState("");

  const handleAddTodo = (e) => {
    if (e && e.preventDefault) e.preventDefault();
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

    setInputValue(""); 
    setDescriptionValue(""); 
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

  const activeCount = todos.filter(t => t.status !== 1).length;

  return (
    <Box sx={{ width: '100%', maxWidth: '1100px', mx: 'auto', display: 'flex', flexDirection: 'column', gap: 4 }}>
      {/* Add Task Section */}
      <Card sx={{ 
        borderRadius: 2, 
        boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)' 
      }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }} color="text.primary">
            Add To Do item
          </Typography>
          <Box component="form" onSubmit={handleAddTodo} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box>
              <Typography variant="caption" fontWeight="bold" color="text.secondary" sx={{ textTransform: 'uppercase', mb: 0.5, display: 'block' }}>
                Title
              </Typography>
              <TextField 
                variant="outlined"
                size="small"
                fullWidth
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter task title..."
              />
            </Box>
            <Box>
              <Typography variant="caption" fontWeight="bold" color="text.secondary" sx={{ textTransform: 'uppercase', mb: 0.5, display: 'block' }}>
                Description (Optional)
              </Typography>
              <TextField 
                variant="outlined"
                size="small"
                fullWidth
                multiline
                rows={3}
                value={descriptionValue}
                onChange={(e) => setDescriptionValue(e.target.value)}
                placeholder="Enter task description..."
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                disableElevation
                sx={{ px: 4, py: 1, fontWeight: 'bold' }}
              >
                Add
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Task List Section */}
      <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" fontWeight="bold" color="text.primary">
              Current Tasks:
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {activeCount} Tasks remaining
            </Typography>
          </Box>

          <Card sx={{ 
            borderRadius: 2, 
            boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)' 
          }}>
            <List disablePadding>
              {todos.length === 0 ? (
                <Box sx={{ p: 6, textAlign: 'center' }}>
                  <Typography variant="body1" color="text.secondary">
                    No tasks. Get started by creating a new task.
                  </Typography>
                </Box>
              ) : (
                todos.map((todo) => (
                  <ListItem 
                    key={todo.id} 
                    divider
                    sx={{ 
                      p: 2.5, 
                      display: 'flex', 
                      alignItems: 'flex-start',
                      bgcolor: todo.status === 1 ? 'rgba(0,0,0,0.02)' : 'inherit',
                      '&:hover': { bgcolor: 'rgba(63, 81, 181, 0.04)' },
                      '&:hover .actions': { opacity: 1 }
                    }}
                  >
                    <Box 
                      onClick={() => handleToggleStatus(todo.id)}
                      sx={{ 
                        width: 24, height: 24, borderRadius: 1, 
                        border: '2px solid',
                        borderColor: todo.status === 0 ? '#ccc' : (todo.status === 1 ? 'primary.main' : 'error.main'), 
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', mt: 0.5, mr: 2, flexShrink: 0,
                        bgcolor: todo.status === 1 ? 'primary.main' : todo.status === 2 ? 'error.main' : 'transparent',
                        color: 'white'
                      }}
                    >
                      {todo.status === 1 && (
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                        </svg>
                      )}
                      {todo.status === 2 && (
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                      )}
                    </Box>
                    
                    {editingId === todo.id ? (
                      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1, mr: 2 }}>
                        <TextField size="small" value={editTitleValue} onChange={(e) => setEditTitleValue(e.target.value)} />
                        <TextField size="small" multiline rows={2} value={editDescriptionValue} onChange={(e) => setEditDescriptionValue(e.target.value)} />
                        <Button variant="outlined" size="small" onClick={handleSaveEdit} sx={{ alignSelf: 'flex-start' }}>Save</Button>
                      </Box>
                    ) : (
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle1" fontWeight="600" sx={{ textDecoration: todo.status === 1 ? 'line-through' : 'none', color: todo.status === 1 ? 'text.disabled' : 'text.primary', wordBreak: 'break-word' }}>
                          {todo.text}
                        </Typography>
                        {todo.description && (
                          <Typography variant="body2" sx={{ mt: 0.5, color: todo.status === 1 ? 'text.disabled' : 'text.secondary', wordBreak: 'break-word' }}>
                            {todo.description}
                          </Typography>
                        )}
                      </Box>
                    )}

                    {editingId !== todo.id && (
                      <Box className="actions" sx={{ opacity: { xs: 1, md: 0 }, transition: 'opacity 0.2s', display: 'flex', gap: 0.5 }}>
                        <IconButton size="small" onClick={() => handleEditClick(todo)} title="Edit" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main', bgcolor: 'rgba(63, 81, 181, 0.1)' }}}>
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="20" height="20">
                            <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                          </svg>
                        </IconButton>
                        <IconButton size="small" onClick={() => handleDeleteTodo(todo.id)} title="Delete" sx={{ color: 'text.secondary', '&:hover': { color: 'error.main', bgcolor: 'rgba(211, 47, 47, 0.1)' }}}>
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="20" height="20">
                            <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                          </svg>
                        </IconButton>
                      </Box>
                    )}
                  </ListItem>
                ))
              )}
            </List>
          </Card>
      </Box>
    </Box>
  );
}
