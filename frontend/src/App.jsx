import { BrowserRouter, Route, Routes } from "react-router-dom";
import LayoutAdmin from "./layouts/admin/LayoutAdmin";
import LayoutPublic from "./layouts/public/LayoutPublic";
import LayoutUser from "./layouts/user/LayoutUser";
import Dashboard from "./pages/admin/Dashboard";
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
