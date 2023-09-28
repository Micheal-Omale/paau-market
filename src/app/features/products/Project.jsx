import { useContext, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { ProductContext } from "./ProductsList";
import ProductPhoneNumber from "./ProductPhoneNumber";
import { useDispatch, useSelector } from "react-redux";
import { addProductPhoneNumber } from "./productPhoneNumberSlice";
import axios from "axios";

function Product(props) {
  const dispatch = useDispatch();
  const { _id, imgURL, price, description } = props;
  const { isLoggedIn } = useContext(ProductContext);
  const location = useLocation();
  const productPhoneNumber = useSelector((state) => state.productPhoneNumber);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/api/phone_numbers");
        if (response.status >= 200 && response.status <= 299) {
          dispatch(addProductPhoneNumber(response.data));
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    /********************************
     *      REMOVE STYLE LATER      *
     ********************************/
    <article
      style={{
        border: "1px solid",
        padding: "2rem",
        display: "inline-block",
        margin: "1rem",
      }}
    >
      <Link style={{ display: "block" }} to={`/product/${_id}`}>
        <img src={imgURL} alt={description} width={200} />
      </Link>
      <div>
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
      </div>
    </article>
  );
}

export default Product;
