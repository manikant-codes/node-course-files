import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/main/Home";
import LayoutMain from "./layouts/main/LayoutMain";
import Dashboard from "./pages/admin/Dashboard";
import LayoutAdmin from "./layouts/admin/LayoutAdmin";
import CategoriesList from "./pages/admin/categories/CategoriesList";
import SubCategoriesList from "./pages/admin/subCategories/SubCategoriesList";
import OrdersList from "./pages/admin/orders/OrdersList";
import UsersList from "./pages/admin/users/UsersList";
import AddUpdateCategory from "./pages/admin/categories/AddUpdateCategory";
import AddUpdateSubCategory from "./pages/admin/subCategories/AddUpdateSubCategory";
import AddUpdateProduct from "./pages/admin/products/AddUpdateProduct";
import UpdateOrder from "./pages/admin/orders/UpdateOrder";
import UpdateUser from "./pages/admin/users/UpdateUser";
import PagesList from "./pages/admin/pages/PagesList";
import AddUpdatePage from "./pages/admin/pages/AddUpdatePage";
import Page from "./pages/main/Page";
import ProductsList from "./pages/main/ProductsList";
import ProductsListAdmin from "./pages/admin/products/ProductsList";
import ProductDetails from "./pages/main/ProductDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutMain />}>
          <Route index element={<Home />} />
          <Route path="page/:categorySlug" element={<Page />} />
          <Route
            path="page/:categorySlug/:subCategorySlug"
            element={<ProductsList />}
          />
          <Route
            path="page/:categorySlug/:subCategorySlug/:productSlug"
            element={<ProductDetails />}
          />
        </Route>
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="categories" element={<CategoriesList />} />
          <Route path="categories/:id" element={<AddUpdateCategory />} />
          <Route path="subCategories" element={<SubCategoriesList />} />
          <Route path="subCategories/:id" element={<AddUpdateSubCategory />} />
          <Route path="products" element={<ProductsListAdmin />} />
          <Route path="products/:id" element={<AddUpdateProduct />} />
          <Route path="pages" element={<PagesList />} />
          <Route path="pages/:id" element={<AddUpdatePage />} />
          <Route path="orders" element={<OrdersList />} />
          <Route path="orders/:id" element={<UpdateOrder />} />
          <Route path="users" element={<UsersList />} />
          <Route path="users/:id" element={<UpdateUser />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
