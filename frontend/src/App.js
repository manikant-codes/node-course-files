import grey from "@mui/material/colors/grey";
import createTheme from "@mui/material/styles/createTheme";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import AuthGuard from "./guards/AuthGuard";
import AuthGuardAdmin from "./guards/AuthGuardAdmin";
import LayoutAdmin from "./layouts/admin/LayoutAdmin";
import LayoutMain from "./layouts/main/LayoutMain";
import AddUpdateCategoryForm from "./pages/admin/categories/AddUpdateCategoryForm";
import CategoriesList from "./pages/admin/categories/CategoriesList";
import Dashboard from "./pages/admin/Dashboard";
import AddUpdateFilterForm from "./pages/admin/filters/AddUpdateFilterForm";
import FiltersList from "./pages/admin/filters/FiltersList";
import OrdersList from "./pages/admin/orders/OrdersList";
import AddUpdatePageForm from "./pages/admin/pages/AddUpdatePageForm";
import PagesList from "./pages/admin/pages/PagesList";
import AddUpdateProductForm from "./pages/admin/products/AddUpdateProductForm";
import AdminProductsList from "./pages/admin/products/ProductsList";
import AddUpdateSubCategoryForm from "./pages/admin/subCategories/AddUpdateSubCategoryForm";
import SubCategoriesList from "./pages/admin/subCategories/SubCategoriesList";
import UpdateUserForm from "./pages/admin/users/UpdateUserForm";
import UsersList from "./pages/admin/users/UsersList";
import Checkout from "./pages/main/Checkout";
import Home from "./pages/main/Home";
import Page from "./pages/main/Page";
import ProductDetails from "./pages/main/ProductDetails";
import ProductsList from "./pages/main/ProductsList";
import RequestVerificaion from "./pages/main/RequestVerificaion";
import SignIn from "./pages/main/SignIn";
import SignUp from "./pages/main/SignUp";
import VerifyEmail from "./pages/main/VerifyEmail";
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
              <Route path="signup" element={<SignUp />} />
              <Route path="signin" element={<SignIn />} />
              <Route path="verifyEmail" element={<VerifyEmail />} />
              <Route
                path="requestVerification"
                element={<RequestVerificaion />}
              />
              <Route
                path="checkout"
                element={
                  <AuthGuard>
                    <Checkout />
                  </AuthGuard>
                }
              />
            </Route>

            <Route
              path="/admin"
              element={
                <AuthGuardAdmin>
                  <LayoutAdmin />
                </AuthGuardAdmin>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="categories" element={<CategoriesList />} />
              <Route
                path="categories/:id"
                element={<AddUpdateCategoryForm />}
              />
              <Route path="filters" element={<FiltersList />} />
              <Route path="filters/:id" element={<AddUpdateFilterForm />} />
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
        <ToastContainer />
      </Provider>
    </ThemeProvider>
  );
}

export default App;
