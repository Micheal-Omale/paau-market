import React, { useEffect } from "react";

import Navbar from "./utilities/Navbar";
import ProductsList from "./features/products/ProductsList";

function Home() {
  useEffect(() => {
    document.title =
      "PAAU Market - Online marketplace for student to buy or sell.";
  }, []);

  return (
    <React.Fragment>
      <section className="bg-mantis-50 h-full">
        <article className="px-5 min-h-screen md:w-4/5 md:m-auto">
          <Navbar />
          <ProductsList />
        </article>
      </section>
    </React.Fragment>
  );
}

export default Home;
