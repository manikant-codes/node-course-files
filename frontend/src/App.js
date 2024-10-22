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
import SignIn from "./pages/main/SignIn";
import SignUp from "./pages/main/SignUp";
import AuthGuard from "./guards/AuthGuard";
import AuthGuardAdmin from "./guards/AuthGuardAdmin";
import UpdateUserForm from "./pages/admin/users/UpdateUserForm";
import VerifyEmail from "./pages/main/VerifyEmail";

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
              <Route path="signup" element={<SignUp />} />
              <Route path="signin" element={<SignIn />} />
              <Route path="verifyEmail" element={<VerifyEmail />} />
            </Route>

            <Route path="/admin" element={<LayoutAdmin />}>
              <Route
                index
                element={
                  <AuthGuardAdmin>
                    <Dashboard />
                  </AuthGuardAdmin>
                }
              />
              <Route
                path="categories"
                element={
                  <AuthGuardAdmin>
                    <CategoriesList />
                  </AuthGuardAdmin>
                }
              />
              <Route
                path="categories/:id"
                element={
                  <AuthGuardAdmin>
                    <AddUpdateCategoryForm />
                  </AuthGuardAdmin>
                }
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
              <Route path="users/:id" element={<UpdateUserForm />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
