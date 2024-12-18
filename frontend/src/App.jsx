import { Button } from "flowbite-react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicLayout from "./layouts/public/PublicLayout";
import UserLayout from "./layouts/user/UserLayout";
import AdminLayout from "./layouts/admin/AdminLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route
            index
            element={<h1 className="text-red-500">Public Page!</h1>}
          />
        </Route>
        <Route path="/user" element={<UserLayout />}>
          <Route index element={<h1 className="text-red-500">User Page!</h1>} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route
            index
            element={<h1 className="text-red-500">Admin Page!</h1>}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
