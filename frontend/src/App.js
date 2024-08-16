import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./layouts/Layout";
import AddUpdateUser from "./pages/AddUpdateUser";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/user/:id" element={<AddUpdateUser />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
