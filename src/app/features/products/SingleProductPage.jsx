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

  const priceComma = Intl.NumberFormat();

  return (
    <React.Fragment>
      <main className="bg-mantis-50 h-full">
        <article className="px-5 min-h-screen md:w-4/5 md:m-auto">
          <Navbar />
          <h1 className="bg-mantis-400 text-mantis-50 px-5 rounded-md font-extrabold my-5">
            {category}
          </h1>

          <article className="grid md:grid-cols-3 gap-y-5 gap-x-20 items-center mt-10">
            <section className="bg-white p-5 rounded-2xl shadow-sm col-span-2">
              <div>
                <div
                  className="before:table before:pt-[70%] bg-cover bg-[50%] bg-no-repeat relative rounded-2xl md:w-[70%] m-auto"
                  style={{ backgroundImage: `url('${imgURL}')` }}
                ></div>
              </div>
            </section>

            <section className="md:text-lg">
              <div className="pb-2">
                <p className="font-bold text-mantis-900">{description}</p>
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
            </section>
          </article>
        </article>
        <footer className="text-center text-xs pb-5 text-mantis-900">
          Made with ❤ in Nigeria by Abel Emmanuel
        </footer>
      </main>
    </React.Fragment>
  );
}

export default SingleProductPage;
