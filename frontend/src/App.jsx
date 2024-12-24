import { Button } from "flowbite-react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/admin/Dashboard";
import AdminLayout from "./layouts/admin/AdminLayout";
import CategoriesList from "./pages/admin/categories/CategoriesList";
import CategoriesForm from "./pages/admin/categories/CategoriesForm";
import SubCategoriesList from "./pages/admin/subCategories/SubCategoriesList";
import SubCategoriesForm from "./pages/admin/subCategories/SubCategoriesForm";
import ProductsForm from "./pages/admin/products/ProductsForm";
import ProductsList from "./pages/admin/products/ProductsList";
import OrdersList from "./pages/admin/orders/OrdersList";
import OrdersForm from "./pages/admin/orders/OrdersForm";
import UsersList from "./pages/admin/users/UsersList";
import UsersForm from "./pages/admin/users/UsersForm";
import Home from "./pages/public/Home";
import PublicLayout from "./layouts/public/PublicLayout";
import PagesList from "./pages/admin/pages/PagesList";
import PagesForm from "./pages/admin/pages/PagesForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
        </Route>
        {/*<Route path="/user" element={<UserLayout />}>
          <Route />
        </Route> */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="categories" element={<CategoriesList />} />
          <Route path="categories/:id" element={<CategoriesForm />} />
          <Route path="subCategories" element={<SubCategoriesList />} />
          <Route path="subCategories/:id" element={<SubCategoriesForm />} />
          <Route path="products" element={<ProductsList />} />
          <Route path="products/:id" element={<ProductsForm />} />
          <Route path="pages" element={<PagesList />} />
          <Route path="pages/:id" element={<PagesForm />} />
          <Route path="orders" element={<OrdersList />} />
          <Route path="orders/:id" element={<OrdersForm />} />
          <Route path="users" element={<UsersList />} />
          <Route path="users/:id" element={<UsersForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
