import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MyLayout from "./layouts/MyLayout";
import AddUpdatedTodo from "./pages/AddUpdatedTodo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MyLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/todo/:id" element={<AddUpdatedTodo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
