import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalStateProvider } from "./context/GlobalState";
import Navbar from "./components/Navbar";
import TodoList from "./pages/TodoList";
import About from "./pages/About";
import './App.css'

function App() {
  return (
    <GlobalStateProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<TodoList />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </GlobalStateProvider>
  )
}

export default App
