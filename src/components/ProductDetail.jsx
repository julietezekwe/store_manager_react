import React, { Component } from "react";
import image from "../img/pro3.jpg";

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { productDetail: {} };
  }
  componentDidMount() {
    this.getAProduct();
  }
  getAProduct = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = Number(urlParams.get("id"));
    fetch(`http://localhost:8000/api/v1/products/${id}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ productDetail: data.productDetail[0] });
      })
      .catch(err => err);
  };
  render() {
    return (
      <div className=" description">
        <div className="col-5 " style={{ marginTop: "30px" }}>
          <img src={image} alt="Products" />
        </div>
        <br />
        <h2>{this.state.productDetail.productname}</h2>
        <h3>
          {" "}
          Description: <p>{this.state.productDetail.description}</p>{" "}
        </h3>
        <br />
        <h3>
          Stock : <p> {this.state.productDetail.quantity} </p>
        </h3>{" "}
        <br />
        <h3>
          Price : <p>{this.state.productDetail.price}</p>{" "}
        </h3>{" "}
        <br />
        <h3>
          minimum inventory quantity : <p>{this.state.productDetail.min}</p>{" "}
        </h3>{" "}
        <br />
        <h3>
          Creation Date : <p>{this.state.productDetail.created_at}</p>{" "}
        </h3>{" "}
        <br />
        <h3>
          Category : <p>{this.state.productDetail.category}</p>{" "}
        </h3>{" "}
        <br />
        <h3>Features</h3>
        <p>Long Lasting, </p>
        <p>Durable, </p>
      </div>
    );
  }
}

export default ProductDetail;
