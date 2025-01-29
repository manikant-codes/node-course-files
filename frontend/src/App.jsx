import { Button } from "flowbite-react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicLayout from "./layouts/public/PublicLayout";
import UserLayout from "./layouts/user/UserLayout";
import AdminLayout from "./layouts/admin/AdminLayout";
import CategoriesList from "./pages/admin/categories/CategoriesList";
import SubCategoriesList from "./pages/admin/subCategories/SubCategoriesList";
import Dashboard from "./pages/admin/Dashboard";
import PagesList from "./pages/admin/pages/PagesList";
import UsersList from "./pages/admin/users/UsersList";
import OrdersList from "./pages/admin/orders/OrdersList";
import CategoriesForm from "./pages/admin/categories/CategoriesForm";
import SubCategoriesForm from "./pages/admin/subCategories/SubCategoriesForm";
import ProductsForm from "./pages/admin/products/ProductsForm";
import PagesForm from "./pages/admin/pages/PagesForm";
import UsersForm from "./pages/admin/users/UsersForm";
import OrdersForm from "./pages/admin/orders/OrdersForm";
import Contact from "./pages/public/Contact";
import Home from "./pages/public/Home";
import Page from "./pages/public/Page";
import Products from "./pages/public/Products";
import ProductsList from "./pages/admin/products/ProductsList";
import ProductDetails from "./pages/public/ProductDetails";
import HomePageForm from "./pages/admin/HomePageForm";
import Register from "./pages/public/Register";
import Login from "./pages/public/Login";
import AdminAuthGuard from "./guards/AdminAuthGuard";
import UserAuthGuard from "./guards/UserAuthGuard";
import Checkout from "./pages/public/Checkout";
import CheckoutStatus from "./pages/public/CheckoutStatus";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path=":slug" element={<Page />} />
          <Route path=":slug/:subCategorySlug" element={<Products />} />
          <Route
            path=":slug/:subCategorySlug/:productSlug"
            element={<ProductDetails />}
          />
          <Route path="contact" element={<Contact />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route
            path="checkout"
            element={
              <UserAuthGuard>
                <Checkout />
              </UserAuthGuard>
            }
          />
          <Route
            path="checkout/:status"
            element={
              <UserAuthGuard>
                <CheckoutStatus />
              </UserAuthGuard>
            }
          />
        </Route>
        <Route
          path="/user"
          element={
            <UserAuthGuard>
              <UserLayout />
            </UserAuthGuard>
          }
        >
          <Route index element={<h1 className="text-red-500">User Page!</h1>} />
        </Route>
        <Route
          path="/admin"
          element={
            <AdminAuthGuard>
              <AdminLayout />
            </AdminAuthGuard>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="categories" element={<CategoriesList />} />
          <Route path="categories/:id" element={<CategoriesForm />} />
          <Route path="subcategories" element={<SubCategoriesList />} />
          <Route path="subcategories/:id" element={<SubCategoriesForm />} />
          <Route path="products" element={<ProductsList />} />
          <Route path="products/:id" element={<ProductsForm />} />
          <Route path="homePage" element={<HomePageForm />} />
          <Route path="pages" element={<PagesList />} />
          <Route path="pages/:id" element={<PagesForm />} />
          <Route path="users" element={<UsersList />} />
          <Route path="users/:id" element={<UsersForm />} />
          <Route path="orders" element={<OrdersList />} />
          <Route path="orders/:id" element={<OrdersForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
