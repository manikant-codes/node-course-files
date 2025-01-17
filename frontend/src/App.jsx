import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AdminLayout from "./layouts/admin/AdminLayout";
import PublicLayout from "./layouts/public/PublicLayout";
import CategoriesForm from "./pages/admin/categories/CategoriesForm";
import CategoriesList from "./pages/admin/categories/CategoriesList";
import Dashboard from "./pages/admin/Dashboard";
import OrdersForm from "./pages/admin/orders/OrdersForm";
import OrdersList from "./pages/admin/orders/OrdersList";
import PagesForm from "./pages/admin/pages/PagesForm";
import PagesList from "./pages/admin/pages/PagesList";
import ProductsForm from "./pages/admin/products/ProductsForm";
import ProductsList from "./pages/admin/products/ProductsList";
import SubCategoriesForm from "./pages/admin/subCategories/SubCategoriesForm";
import SubCategoriesList from "./pages/admin/subCategories/SubCategoriesList";
import UsersForm from "./pages/admin/users/UsersForm";
import UsersList from "./pages/admin/users/UsersList";
import Home from "./pages/public/Home";
import FormWrapper from "./components/admin/common/FormWrapper";
import CategoryPage from "./pages/public/CategoryPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path=":categorySlug" element={<CategoryPage />} />
        </Route>
        {/*<Route path="/user" element={<UserLayout />}>
          <Route />
        </Route> */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="categories" element={<CategoriesList />} />
          <Route
            path="categories/:id"
            element={
              <FormWrapper title={"Category"}>
                <CategoriesForm />
              </FormWrapper>
            }
          />
          <Route path="subCategories" element={<SubCategoriesList />} />
          <Route
            path="subCategories/:id"
            element={
              <FormWrapper title={"Sub-Category"}>
                <SubCategoriesForm />
              </FormWrapper>
            }
          />
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
