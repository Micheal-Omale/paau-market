import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Category from "../category/Category";
import Product from "./Product";

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
        <ProductContext.Provider value={{ isLoggedIn }}>
          {categories.map((category) => {
            return (
              <article key={category.id}>
                <Category category={category.category} />
                <div className="grid md:grid-cols-4 grid-cols-2 gap-2 md:gap-5 py-5">
                  {products.map((product) => {
                    if (category.category === product.category) {
                      return <Product key={product._id} {...product} />;
                    }
                  })}
                </div>
              </article>
            );
          })}
        </ProductContext.Provider>
      </section>
    )
  );
}
export default ProductsList;
