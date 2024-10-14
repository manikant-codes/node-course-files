import { grey } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LayoutAdmin from "./layouts/admin/LayoutAdmin";
import LayoutMain from "./layouts/main/LayoutMain";
import AddUpdateCategoryForm from "./pages/admin/categories/AddUpdateCategoryForm";
import CategoriesList from "./pages/admin/categories/CategoriesList";
import SubCategoriesList from "./pages/admin/subCategories/SubCategoriesList";
import Home from "./pages/main/Home";

import Dashboard from "./pages/admin/Dashboard";
import OrdersList from "./pages/admin/orders/OrdersList";
import AddUpdatePageForm from "./pages/admin/pages/AddUpdatePageForm";
import PagesList from "./pages/admin/pages/PagesList";
import AddUpdateProductForm from "./pages/admin/products/AddUpdateProductForm";
import AdminProductsList from "./pages/admin/products/ProductsList";
import AddUpdateSubCategoryForm from "./pages/admin/subCategories/AddUpdateSubCategoryForm";
import UsersList from "./pages/admin/users/UsersList";
import Page from "./pages/main/Page";
import ProductDetails from "./pages/main/ProductDetails";
import ProductsList from "./pages/main/ProductsList";
import { Provider } from "react-redux";
import store from "./redux/store";

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
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LayoutMain />}>
              <Route index element={<Home />} />
              <Route path="category/:categorySlug" element={<Page />} />
              <Route
                path="category/:categorySlug/:subCategorySlug"
                element={<ProductsList />}
              />
              <Route
                path="category/:categorySlug/:subCategorySlug/:productSlug"
                element={<ProductDetails />}
              />
            </Route>

            <Route path="/admin" element={<LayoutAdmin />}>
              <Route index element={<Dashboard />} />
              <Route path="categories" element={<CategoriesList />} />
              <Route
                path="categories/:id"
                element={<AddUpdateCategoryForm />}
              />
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
      </Provider>
    </ThemeProvider>
  );
}

export default App;
