import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LayoutMain from "./layouts/main/LayoutMain";
import Home from "./pages/main/Home";
import { purple } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import AddUpdateCategoryForm from "./pages/admin/categories/AddUpdateCategoryForm";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: purple[500],
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LayoutMain />}>
            <Route index element={<Home />} />
            <Route
              path="/admin/add-update-category/:id"
              element={<AddUpdateCategoryForm />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
