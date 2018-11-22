import React from "react";
import image from "../img/pro3.jpg";
import SearchBox from "./SearchBox";

const ProductList = props => {
  return (
    <React.Fragment>
      <div className="col-7">
        <SearchBox
          searchProduct={props.handleSearch}
          categories={props.categories}
        />
      </div>
      {props.products.map(product => {
        return (
          <div key={product.id} className="card col-3 removewhilesearch">
            {product.quantity < 1 ? (
              <div className="ribbon ribbon-top-left">
                <span style={{ background: "red" }}>
                  {" "}
                  &nbsp; &nbsp; Out of stock
                </span>
              </div>
            ) : (
              <div className="ribbon ribbon-top-left">
                <span> &nbsp; &nbsp; In Stock ({product.quantity})</span>
              </div>
            )}

            <img src={image} alt="Avatar" />
            <div className="product-detail">
              <h3 style={{ textAlign: "center" }}>
                <a href={`/products?id=${product.id}`}>{product.productname}</a>{" "}
              </h3>
              <p className="text-left">&#8358; {product.price}</p>
              <p className="text">
                <span href="#" className="trigger-edit">
                  <i
                    className="far fa-edit"
                    onClick={() => props.modal(product.id)}
                  />{" "}
                  {localStorage.getItem("role") === "admin" ? (
                    <i
                      className="far fa-trash-alt trigger"
                      onClick={() => props.modalDelete(product.id, "product")}
                    />
                  ) : product.quantity < 1 ? (
                    <i
                      className="fas fa-shopping-cart trigger "
                      style={{
                        cursor: "not-allowed",
                        pointerEvents: "none",
                        color: "#c0c0c0",
                        background: "#ffffff"
                      }}
                      disabled
                      onClick={() => props.handleAddToCart(product.id)}
                    />
                  ) : (
                    <i
                      className="fas fa-shopping-cart trigger"
                      onClick={() => props.handleAddToCart(product.id)}
                    />
                  )}
                </span>
              </p>
            </div>
          </div>
        );
      })}
    </React.Fragment>
  );
};

export default ProductList;
