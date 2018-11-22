import React from "react";
const SearchBox = props => {
  return (
    <p className="text">
      Search by{" "}
      <select onChange={props.searchProduct}>
        {props.categories.map(category => {
          return (
            <option key={category.id} value={category.categoryname}>
              {category.categoryname}
            </option>
          );
        })}
      </select>
    </p>
  );
};

export default SearchBox;
