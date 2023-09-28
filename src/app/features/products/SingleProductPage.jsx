import React from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import Navbar from "../../utilities/Navbar";
import ProductPhoneNumber from "./ProductPhoneNumber";

function SingleProductPage() {
  let { id: productId } = useParams();
  const location = useLocation();
  const products = useSelector((state) => state.products);
  const productPhoneNumber = useSelector((state) => state.productPhoneNumber);

  const { _id, category, imgURL, price, description } = products.filter(
    (product) => product._id === productId
  )[0];

  const user = useSelector((state) => state.user);
  const isLoggedIn = user.isLoggedIn && user.info.id;

  const phoneNumber = productPhoneNumber.filter(
    (phoneNumber) => phoneNumber.productId === _id
  );

  return (
    <React.Fragment>
      <Navbar />
      <h1>{category}</h1>
      <section>
        <img src={imgURL} alt={description} />
        <p>{description}</p>
        <p>{price}</p>

        {!isLoggedIn ? (
          <Link to="/login" state={{ background: location }}>
            Buy
          </Link>
        ) : (
          <div>
            {productPhoneNumber.map((phoneNumber) => {
              if (phoneNumber.productId == _id)
                return (
                  <ProductPhoneNumber
                    key={phoneNumber._id}
                    phoneNumber={phoneNumber}
                  />
                );
            })}
          </div>
        )}
      </section>
    </React.Fragment>
  );
}

export default SingleProductPage;
