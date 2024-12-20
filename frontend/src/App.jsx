import { Button } from "flowbite-react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/admin/Dashboard";
import AdminLayout from "./layouts/admin/AdminLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<PublicLayout />}>
          <Route />
        </Route>
        <Route path="/user" element={<UserLayout />}>
          <Route />
        </Route> */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
