import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Home from "./app/Home";
import Login from "./app/Login";
import Register from "./app/Register";
import MyAccount from "./app/MyAccount";
import SingleProductPage from "./app/features/products/SingleProductPage";
import EditProduct from "./app/features/editProduct/EditProduct";

export const ModalContext = React.createContext();

function App() {
  const [isModal, setIsModal] = useState({ open: false, content: "" });
  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <React.Fragment>
      <ModalContext.Provider value={{ isModal, setIsModal }}>
        <Routes location={background || location}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user" element={<MyAccount />} />
          <Route path="/product/:id" element={<SingleProductPage />} />
          <Route path="/editProduct/:id" element={<EditProduct />} />
          <Route
            path="*"
            element={
              <>
                <h1>404</h1>
                <p>Sorry, something unusual occurred!</p>
              </>
            }
          />
        </Routes>

        {background && (
          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes>
        )}
      </ModalContext.Provider>
    </React.Fragment>
  );
}

export default App;
