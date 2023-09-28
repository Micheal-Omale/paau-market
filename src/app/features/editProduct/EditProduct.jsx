import React, { useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import { useEditProductMutation } from "../../serviceAPI/jsonServerApi";
import { addProduct } from "../products/productsSlice";
import { addProductPhoneNumber } from "../products/productPhoneNumberSlice";

import { ModalContext } from "../../../App";
import Modal from "../../utilities/Modal";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productsToEdit = useSelector((state) => state.products);
  const categories = useSelector((state) => state.categories);
  const productPhoneNumber = useSelector((state) => state.productPhoneNumber);
  const [editProduct] = useEditProductMutation();
  const { isModal, setIsModal } = useContext(ModalContext);

  const product = productsToEdit.filter((product) => product._id === id)[0];
  const fillteredPhoneNumber = productPhoneNumber.filter(
    (phoneNumber) => phoneNumber.productId === id
  )[0];

  const [productEdit, setProductEdit] = useState(product);
  const [editPhoneNumber, setEditPhoneNumber] = useState(fillteredPhoneNumber);

  const { category, description, price } = productEdit;
  const { phoneNumber } = editPhoneNumber;

  async function onSaveHandler(ev) {
    ev.preventDefault();
    const {
      data: { isProduct, message, phoneNumbers, products },
    } = await editProduct({ productEdit, editPhoneNumber });

    if (isProduct) {
      setIsModal({
        open: true,
        content: message,
      });

      dispatch(addProduct(products));
      dispatch(addProductPhoneNumber(phoneNumbers));

      setTimeout(() => {
        navigate("/user");
      }, 2000);
    }
  }

  function onValueChanged(ev) {
    let name = ev.target.name;
    let value = ev.target.value;
    setProductEdit({ ...productEdit, [name]: value });
  }

  function onPhoneNumberValueChanged(ev) {
    let name = ev.target.name;
    let value = ev.target.value;
    setEditPhoneNumber({ ...editPhoneNumber, [name]: value });
  }

  return (
    <article>
      <h1>Edit Product</h1>
      {isModal.open && <Modal content={isModal.content} />}

      <form method="post">
        <div>
          <label htmlFor="select-category">Category:</label>
          <select
            defaultValue={category}
            onChange={(ev) => onValueChanged(ev)}
            name="category"
            id="select-category"
          >
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
            defaultValue={description}
            onChange={(ev) => onValueChanged(ev)}
          />
        </div>

        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="text"
            name="price"
            id="price"
            defaultValue={price}
            onChange={(ev) => onValueChanged(ev)}
          />
        </div>
        <div>
          <label htmlFor="telephone">Phone Number:</label>
          <input
            type="number"
            name="phoneNumber"
            id="telephone"
            defaultValue={phoneNumber}
            onChange={(ev) => onPhoneNumberValueChanged(ev)}
          />
        </div>

        <div>
          <input
            type="submit"
            value="Save"
            onClick={(ev) => onSaveHandler(ev)}
          />
        </div>
      </form>
    </article>
  );
}

export default EditProduct;
