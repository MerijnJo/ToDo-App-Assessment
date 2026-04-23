import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalStateProvider } from "./context/GlobalState";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import Navbar from "./components/Navbar";
import TodoList from "./pages/TodoList";
import About from "./pages/About";

const theme = createTheme({
  palette: {
    primary: {
      main: '#3F51B5', // indigoFocus-primary
    },
    background: {
      default: '#fdf8fd', // surface
    }
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
  },
  shape: {
    borderRadius: 8,
  }
});

function App() {
  return (
    <GlobalStateProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Navbar>
            <Routes>
              <Route path="/" element={<TodoList />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </Navbar>
        </BrowserRouter>
      </ThemeProvider>
    </GlobalStateProvider>
  )
}

export default App
