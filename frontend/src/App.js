import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import LayoutMain from "./layouts/main/LayoutMain";
import Dashboard from "./pages/admin/Dashboard";
import LayoutAdmin from "./layouts/admin/LayoutAdmin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutMain />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
