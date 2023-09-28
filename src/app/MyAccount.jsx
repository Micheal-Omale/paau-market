import React, { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { ModalContext } from "../App";
import Modal from "./utilities/Modal";
import ProductHistory from "./features/productHistory/ProductHistory";
import Navbar from "./utilities/Navbar";

import { uploadFile } from "./utilities/uploadFile";
import { useCreateProductMutation } from "./serviceAPI/jsonServerApi";
import { addProduct } from "./features/products/productsSlice";
import { addProductPhoneNumber } from "./features/products/productPhoneNumberSlice";

function MyAccount() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isModal, setIsModal } = useContext(ModalContext);

  const { isLoggedIn, info } = useSelector((state) => state.user);
  const categories = useSelector((state) => state.categories);
  const [product, setProduct] = useState({
    category: "",
    description: "",
    price: "",
    phoneNumber: "",
    imgURL: "",
    postUserId: "",
  });

  const [createProduct] = useCreateProductMutation();

  function onChangedProductValue(ev) {
    let name = ev.target.name,
      value = ev.target.value;

    setProduct({ ...product, [name]: value });
  }

  async function onSellHandler(ev) {
    ev.preventDefault();

    const { category, description, imgURL, phoneNumber, price } = product;

    if (category && description && imgURL && phoneNumber && price) {
      console.log("Product Published");

      const {
        data: { isProduct, message, newProducts, newPhoneNumbers },
      } = await createProduct({
        category,
        description,
        imgURL,
        phoneNumber,
        price,
        postUserId: info.id,
      });

      if (isProduct) {
        setIsModal({
          open: true,
          content: message,
        });
        dispatch(addProduct(newProducts));
        dispatch(addProductPhoneNumber(newPhoneNumbers));
      }

      setProduct({
        category: "",
        description: "",
        price: "",
        phoneNumber: "",
        imgURL: "",
        postUserId: "",
      });
    } else {
      setIsModal({
        open: true,
        content: "Please enter require fields!",
      });
    }
  }

  useEffect(() => {
    if (!isLoggedIn && !info.id) {
      navigate("/login");
    }
  }, []);

  return (
    <React.Fragment>
      <Navbar />

      <h1>My Account</h1>
      {isModal.open && <Modal content={isModal.content} />}
      <article>
        <form method="post">
          <div>
            <label htmlFor="select-category">Category:</label>
            <select
              value={product.category}
              onChange={(ev) => onChangedProductValue(ev)}
              name="category"
              id="select-category"
            >
              <option value="">--Please choose a category</option>
              {categories.map((category) => {
                return (
                  <option key={category.id} value={category.category}>
                    {category.category}
                  </option>
                );
              })}
            </select>
          </div>

          <div>
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              name="description"
              id="description"
              value={product.description}
              onChange={(ev) => onChangedProductValue(ev)}
            />
          </div>

          <div>
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              name="price"
              id="price"
              value={product.price}
              onChange={(ev) => onChangedProductValue(ev)}
            />
          </div>
          <div>
            <label htmlFor="telephone">Phone Number:</label>
            <input
              type="number"
              name="phoneNumber"
              id="telephone"
              value={product.phoneNumber}
              onChange={(ev) => onChangedProductValue(ev)}
            />
          </div>

          <div>
            <label htmlFor="file">Product Image:</label>
            <input
              type="file"
              id="file"
              name="imgURL"
              accept=".jpg, .jpeg, .png"
              onChange={(ev) => uploadFile(ev, { product, setProduct })}
            />
          </div>

          <div>
            <input
              type="submit"
              value="Sell"
              onClick={(ev) => onSellHandler(ev)}
            />
          </div>
        </form>
      </article>
      <ProductHistory user={info} />
    </React.Fragment>
  );
}

export default MyAccount;
