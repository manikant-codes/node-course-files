import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import LayoutMain from "./layouts/main/LayoutMain";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutMain />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
