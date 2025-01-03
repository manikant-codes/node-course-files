import { BrowserRouter, Route, Routes } from "react-router-dom";
import LayoutAdmin from "./layouts/admin/LayoutAdmin";
import LayoutPublic from "./layouts/public/LayoutPublic";
import LayoutUser from "./layouts/user/LayoutUser";
import CategoriesList from "./pages/admin/categories/CategoriesList";
import CategoryForm from "./pages/admin/categories/CategoryForm";
import Dashboard from "./pages/admin/Dashboard";
import OrderForm from "./pages/admin/orders/OrderForm";
import OrdersList from "./pages/admin/orders/OrdersList";
import PageForm from "./pages/admin/pages/PageForm";
import PagesList from "./pages/admin/pages/PagesList";
import ProductForm from "./pages/admin/products/ProductForm";
import ProductsList from "./pages/admin/products/ProductsList";
import SubCategoriesList from "./pages/admin/subCategories/SubCategoriesList";
import SubCategoryForm from "./pages/admin/subCategories/SubCategoryForm";
import UserForm from "./pages/admin/users/UserForm";
import UsersList from "./pages/admin/users/UsersList";
import Home from "./pages/public/Home";
import AccountInfo from "./pages/user/AccountInfo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutPublic />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/user" element={<LayoutUser />}>
          <Route index element={<AccountInfo />} />
        </Route>
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route index element={<Dashboard />} />
          <Route path="categories" element={<CategoriesList />} />
          <Route path="categories/:id" element={<CategoryForm />} />
          <Route path="subCategories" element={<SubCategoriesList />} />
          <Route path="subCategories/:id" element={<SubCategoryForm />} />
          <Route path="products" element={<ProductsList />} />
          <Route path="products/:id" element={<ProductForm />} />
          <Route path="pages" element={<PagesList />} />
          <Route path="pages/:id" element={<PageForm />} />
          <Route path="users" element={<UsersList />} />
          <Route path="users/:id" element={<UserForm />} />
          <Route path="orders" element={<OrdersList />} />
          <Route path="orders/:id" element={<OrderForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
