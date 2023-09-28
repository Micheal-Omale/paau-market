import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Category from "../category/Category";
import Product from "./Project";

export const ProductContext = React.createContext();

import { useGetProductsQuery } from "../../serviceAPI/jsonServerApi";
import { addProduct } from "./productsSlice";

function ProductsList() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const categories = useSelector((state) => state.categories);
  const products = useSelector((state) => state.products);

  const isLoggedIn = user.isLoggedIn && user.info.id;

  const { data, isLoading, isSuccess } = useGetProductsQuery();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/api/products");
        if (response.status >= 200 && response.status <= 299) {
          dispatch(addProduct(response.data));
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    !isLoading && (
      <section>
        <div style={{ background: "green", fontSize: "2rem" }}>
          Advertisement
        </div>
        <ProductContext.Provider value={{ isLoggedIn }}>
          {categories.map((category) => {
            return (
              <article key={category.id}>
                <Category category={category.category} />

                {products.map((product) => {
                  if (category.category === product.category) {
                    return <Product key={product._id} {...product} />;
                  }
                })}
              </article>
            );
          })}
        </ProductContext.Provider>
      </section>
    )
  );
}
export default ProductsList;
