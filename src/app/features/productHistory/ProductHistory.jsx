import React, { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { useDeleteProductMutation } from "../../serviceAPI/jsonServerApi";

import { ModalContext } from "../../../App";
import Modal from "../../utilities/Modal";

import { addProduct } from "../products/productsSlice";
import { addProductPhoneNumber } from "../products/productPhoneNumberSlice";

const ProductHistory = ({ user: { id } }) => {
  const dispatch = useDispatch();
  const productsByUser = useSelector((state) => state.products);
  const phoneNumbers = useSelector((state) => state.productPhoneNumber);
  const [deleteProduct] = useDeleteProductMutation();

  const { isModal, setIsModal } = useContext(ModalContext);

  const products = productsByUser.filter(
    (product) => product.postUserId === id
  );

  async function removeItem(id) {
    const productId = id;
    console.log(phoneNumbers);
    const { _id: phoneNumberId } = phoneNumbers.find(
      (phoneNumber) => phoneNumber.productId === id
    );

    const {
      data: { isDeleted, message, newProducts, newPhoneNumbers },
    } = await deleteProduct({ productId, phoneNumberId });

    if (isDeleted) {
      setIsModal({
        open: true,
        content: message,
      });

      dispatch(addProduct(newProducts));
      dispatch(addProductPhoneNumber(newPhoneNumbers));
    }
  }

  return (
    <section>
      {isModal.open && <Modal content={isModal.content} />}

      <table>
        <caption>History</caption>
        <thead>
          <tr>
            <th>#</th>
            <th>Product Image</th>
            <th>Category</th>
            <th>Description</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => {
            const { _id, category, description, price, imgURL } = product;
            return (
              <tr key={_id}>
                <td>{index + 1}</td>
                <td>
                  <img src={imgURL} alt={description} width={50} />
                </td>
                <td>{category}</td>
                <td>{description}</td>
                <td>{price}</td>
                <td>
                  <Link to={`/editProduct/${_id}`}>Edit</Link>
                  <button onClick={() => removeItem(_id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default ProductHistory;
