import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LayoutMain from "./layouts/main/LayoutMain";
import Home from "./pages/main/Home";
import { purple, grey } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import AddUpdateCategoryForm from "./pages/admin/categories/AddUpdateCategoryForm";
import CategoriesList from "./pages/admin/categories/CategoriesList";
import LayoutAdmin from "./layouts/admin/LayoutAdmin";
import SubCategoriesList from "./pages/admin/subCategories/SubCategoriesList";

import OrdersList from "./pages/admin/orders/OrdersList";
import UsersList from "./pages/admin/users/UsersList";
import AddUpdateSubCategoryForm from "./pages/admin/subCategories/AddUpdateSubCategoryForm";
import AddUpdateProductForm from "./pages/admin/products/AddUpdateProductForm";
import Dashboard from "./pages/admin/Dashboard";
import PagesList from "./pages/admin/pages/PagesList";
import AddUpdatePageForm from "./pages/admin/pages/AddUpdatePageForm";
import Page from "./pages/main/Page";
import ProductsList from "./pages/main/ProductsList";
import AdminProductsList from "./pages/admin/products/ProductsList";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: grey[900]
      },
      secondary: {
        main: grey[800]
      },
      text: {
        main: grey[700]
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LayoutMain />}>
            <Route index element={<Home />} />
            <Route path="category/:slug" element={<Page />} />
            <Route
              path="category/:slug/:slugSubCategory"
              element={<ProductsList />}
            />
          </Route>
          <Route path="/admin" element={<LayoutAdmin />}>
            <Route index element={<Dashboard />} />
            <Route path="categories" element={<CategoriesList />} />
            <Route path="categories/:id" element={<AddUpdateCategoryForm />} />
            <Route path="subCategories" element={<SubCategoriesList />} />
            <Route
              path="subCategories/:id"
              element={<AddUpdateSubCategoryForm />}
            />
            <Route path="products" element={<AdminProductsList />} />
            <Route path="products/:id" element={<AddUpdateProductForm />} />
            <Route path="pages" element={<PagesList />} />
            <Route path="pages/:id" element={<AddUpdatePageForm />} />
            <Route path="orders" element={<OrdersList />} />
            <Route path="users" element={<UsersList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
