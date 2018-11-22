import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Checkout from "./Checkout";
import PersonalSales from "./PersonalSales";
import ProductList from "./ProductList";
import ProductDetail from "./ProductDetail";
import "./Modals.css";
import Modals from "./Modals";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      search: [],
      mySales: [],
      numberInCart: 0,
      records: { totalSales: 0, amount: 0, totalProducts: 0 },
      show: false,
      categories: [],
      category: "",
      proId: ""
    };
  }

  showModal = (id, action = "edit") => {
    this.setState({ show: true });
    this.setState({ proId: id });
  };

  hideModal = () => {
    this.setState({ show: false });
    this.setState({ proId: "" });
  };
  componentDidMount() {
    this.getAllProducts();
    this.getAllPersonalSales();
    this.getAllCategory();
  }
  getAllProducts = () => {
    fetch("http://localhost:8000/api/v1/All/products", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ products: data.ProductsModel });
        this.setState({ search: data.ProductsModel });
      });
  };
  getAllCategory = () => {
    fetch("http://localhost:8000/api/v1/categories", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ categories: data.CategoriesModel });
      })
      .catch(err => err);
  };
  getAllPersonalSales = () => {
    let totalProducts = 0;
    let amount = 0;
    let totalSales = [];
    fetch("http://localhost:8000/api/v1/user/sales", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      }
    })
      .then(response => response.json())
      .then(data => {
        data.saleDetail.map(sale => {
          totalProducts += sale.quantity;
          amount += sale.price * sale.quantity;
          if (totalSales.indexOf(sale.salesid) === -1)
            totalSales.push(sale.salesid);
          return true;
        });
        this.setState({ mySales: data.saleDetail });
        this.setState({
          records: { totalProducts, amount, totalSales: totalSales.length }
        });
      })
      .catch(err => err);
  };
  handleSearch = category => {
    const Products = this.state.search.filter(product => {
      return product.category === category.target.value;
    });

    this.setState({ products: Products });
  };

  toggleModal = () => {};
  handleAddToCart = id => {
    const currentCart = localStorage.getItem("cart");
    const newCart = currentCart + "," + id;
    localStorage.setItem("cart", newCart);
    const carts = newCart.split(",");
    const uniqueCart = [];
    carts.map(cart => {
      if (uniqueCart.indexOf(cart) === -1 && Number(cart))
        uniqueCart.push(cart);

      return uniqueCart;
    });
    localStorage.setItem("cartCount", uniqueCart.length);
    window.location.reload();
  };
  handleCategoryChange = event => {
    this.setState({ category: event.target.value });
  };
  onSubmitCategory = () => {
    fetch(
      `http://localhost:8000/api/v1/products/${this.state.proId}/category`,
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token")
        },
        body: JSON.stringify({
          categoryName: this.state.category
        })
      }
    )
      .then(response => response.json())
      .then(data => {})
      .catch(err => err);
  };

  render() {
    return (
      <section id="page" className="admin-page">
        <Modals show={this.state.show} handleClose={this.hideModal}>
          <div>
            <div className="editContent">
              <span className="close" onClick={this.hideModal}>
                ×
              </span>

              <h1 className="login-heading">Edit Product category</h1>
              <div className="form login">
                <div>
                  <select name="category" onChange={this.handleCategoryChange}>
                    <option value="" />
                    {this.state.categories.map(category => {
                      return (
                        <option key={category.id} value={category.categoryname}>
                          {category.categoryname}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div>
                  <input
                    onClick={this.onSubmitCategory}
                    type="submit"
                    value="Add to category"
                  />
                </div>
              </div>
            </div>
          </div>
        </Modals>
        <Router>
          <React.Fragment>
            <div className="dashboard card col-2">
              <h3> Dashboard</h3>

              <i>
                <hr />
                <Link to="/">
                  <p className="active">Products</p>
                </Link>
              </i>
              <i>
                <hr />
                <Link to="/sales">
                  <p className="active">My Sales Record</p>
                </Link>
              </i>

              <Link to="/checkout" />

              <Link to="/products" />
            </div>
            <div className="col-8">
              <Route
                exact
                path="/"
                render={() => <div className="col-4 text-left" />}
              />
              <Route
                exact
                path="/"
                render={state => (
                  <ProductList
                    products={this.state.products}
                    handleSearch={this.handleSearch}
                    handleAddToCart={this.handleAddToCart}
                    modal={this.showModal}
                    categories={this.state.categories}
                    {...state}
                  />
                )}
              />
              <Route path="/checkout" component={Checkout} />
              <Route
                exact
                path="/sales"
                render={state => (
                  <PersonalSales
                    mySales={this.state.mySales}
                    records={this.state.records}
                    {...state}
                  />
                )}
              />
              <Route path="/products" component={ProductDetail} />
            </div>
          </React.Fragment>
        </Router>
      </section>
    );
  }
}

export default Dashboard;
