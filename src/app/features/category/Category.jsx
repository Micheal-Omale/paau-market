import React from "react";

function Category(props) {
  const { category } = props;
  return (
    <div>
      <h1 style={{ background: "yellow" }}>{category}</h1>
    </div>
  );
}

export default Category;
