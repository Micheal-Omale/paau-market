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

  const priceComma = Intl.NumberFormat();
  return (
    <article className="bg-white p-5 rounded-2xl shadow-sm ">
      <Link to={`/product/${_id}`}>
        <div
          className="before:table before:pt-[120%] bg-cover bg-[50%] bg-no-repeat relative rounded-2xl"
          style={{ backgroundImage: `url('${imgURL}')` }}
        ></div>
      </Link>
      <div className="pt-5 text-sm capitalize space-y-2">
        <div>
          <p className="font-bold ">{description}</p>
          <p>&#x20A6; {priceComma.format(price)}</p>
        </div>

        {!isLoggedIn ? (
          <Link
            to="/login"
            state={{ background: location }}
            className="font-bold block bg-mantis-400 text-center text-white rounded-full py-2"
          >
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
