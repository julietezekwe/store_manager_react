import React, { Component } from "react";

class Checkout extends Component {
  state = { productsDetail: [], totalPrice: 0 };
  componentDidMount() {
    if (localStorage.getItem("cart")) {
      const carts = localStorage.getItem("cart");
      const newCart = carts.split(",");
      const uniqueCart = [];
      newCart.map(cart => {
        if (uniqueCart.indexOf(cart) === -1 && Number(cart))
          uniqueCart.push(cart);

        return uniqueCart;
      });
      this.getAllCartProducts(uniqueCart);
    }
  }
  getAllCartProducts = uniqueCart => {
    let totalPrice = 0;
    uniqueCart.forEach(id => {
      fetch(`http://localhost:8000/api/v1/products/${id}`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token")
        }
      })
        .then(response => response.json())
        .then(data => {
          const joined = this.state.productsDetail.concat(data.productDetail);
          this.setState({ productsDetail: joined });
          totalPrice += data.productDetail[0].price;
          this.setState({ totalPrice });
        })
        .catch(err => err);
    });
  };
  handleRemoveFromCart = id => {
    const carts = localStorage.getItem("cart");

    let newCart = carts.split(",");

    for (let i = 0; i < newCart.length; i++) {
      if (Number(newCart[i]) === Number(id)) {
        newCart.splice(i, 1);
      }
    }
    localStorage.setItem("cartCount", newCart.length - 1);
    localStorage.setItem("cart", newCart.join(","));
    window.location.reload();
  };
  onQuantityChange = (event, id, price) => {
    if (event < 1 || isNaN(event)) event = 0;
    document.getElementById(`Q${id}`).innerHTML = event;
    let totalPrice = this.state.totalPrice;
    const quantity = event;
    const product = document.getElementById(id);
    totalPrice = totalPrice - Number(product.innerHTML);
    product.innerHTML = quantity * Number(price);
    totalPrice = totalPrice + quantity * Number(price);
    this.setState({ totalPrice });
  };
  handleCheckout = event => {
    const rows = document.getElementById("checkout").rows;
    const sales = [];
    for (let i = 1; i < rows.length - 2; i++) {
      let sale = {
        productId: rows[i].cells[3].innerHTML,
        productName: rows[i].cells[1].innerHTML,
        quantity: rows[i].cells[5].innerHTML
      };
      sales.push(sale);
    }
    const body = JSON.stringify({
      sales
    });
    const token = localStorage.getItem("token");
    fetch("http://localhost:8000/api/v1/sales", {
      method: "post",
      headers: { "Content-Type": "application/json", Authorization: token },
      body
    })
      .then(response => response.json())
      .then(data => {
        localStorage.setItem("cart", "");
        localStorage.setItem("cartCount", "");
        window.location.reload();
      });
  };
  render() {
    return (
      <div
        className="card col-12"
        style={{
          float: "none",
          textAlign: "center",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "35px"
        }}
      >
        <div className="card col-9" id="alert" />
        <table className="table" style={{ width: "100%" }} id="checkout">
          <thead>
            <tr>
              <th>S/N</th>
              <th>Product Name</th>
              <th>Description</th>
              <th>ID</th>
              <th />
              <th>Quantity</th>
              <th>Amount (&#8358;)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.productsDetail.map(product => {
              return (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.productname}</td>
                  <td>{product.description}</td>
                  <td>{product.id}</td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      style={{ textAlign: "center", width: "50px" }}
                      onChange={e =>
                        this.onQuantityChange(
                          e.target.value,
                          product.id,
                          product.price
                        )
                      }
                    />{" "}
                  </td>
                  <td id={`Q${product.id}`}>1</td>
                  <td id={product.id}>{product.price}</td>
                  <td>
                    <i
                      className="far fa-trash-alt trigger"
                      onClick={() => this.handleRemoveFromCart(product.id)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="4" />
              <td>Total</td>

              <td />
              <td>{this.state.totalPrice}</td>
            </tr>
            <tr>
              <td />
              <td />
              <td colSpan="3">
                <button
                  className="button"
                  onClick={() => this.handleCheckout()}
                >
                  Checkout Now
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }
}

export default Checkout;
