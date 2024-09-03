import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LayoutMain from "./layouts/main/LayoutMain";
import Home from "./pages/main/Home";
import { purple, grey } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import AddUpdateCategoryForm from "./pages/admin/categories/AddUpdateCategoryForm";
import CategoriesList from "./pages/admin/categories/CategoriesList";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: purple[500],
      },
      secondary: {
        main: grey[800],
      },
      text: {
        main: grey[700],
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LayoutMain />}>
            <Route index element={<Home />} />
          </Route>
          <Route path="/admin" element={<LayoutMain />}>
            <Route path="categories" element={<CategoriesList />} />
            <Route path="categories/:id" element={<AddUpdateCategoryForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;