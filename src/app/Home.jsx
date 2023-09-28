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
      <Navbar />
      <ProductsList />
    </React.Fragment>
  );
}

export default Home;
