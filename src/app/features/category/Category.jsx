import React from "react";

function Category(props) {
  const { category } = props;
  return (
    <div>
      <h1 className="bg-mantis-400 text-mantis-50 px-5 rounded-md font-extrabold">
        {category}
      </h1>
    </div>
  );
}

export default Category;
