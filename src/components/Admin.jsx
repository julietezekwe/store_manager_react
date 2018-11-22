import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Checkout from "./Checkout";
import AllSales from "./AllSales";
import ProductList from "./ProductList";
import ProductDetail from "./ProductDetail";
import "./Modals.css";
import Modals from "./Modals";
import AllUsers from "./AllUsers";
import Button from "./Button";
import Form from "./Form";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      search: [],
      allUsers: [],
      allSales: [],
      records: { totalSales: 0, amount: 0, totalProducts: 0 },
      show: false,
      item: "",
      categories: [],
      productName: "",
      quantity: "",
      price: "",
      min: "",
      image: "image.png",
      description: "",
      categoryName: "",
      category: "",
      id: "",
      email: "",
      username: "",
      password: "",
      role: ""
    };
  }

  showModal = id => {
    this.setState({ show: true });
    if (typeof id !== "object") this.setState({ id: id });
    else this.setState({ id: "" });
  };
  modalDelete = (id, item) => {
    this.setState({ show: "delete" });
    this.setState({ id: id });
    this.setState({ item: item });
  };
  hideModal = () => {
    this.setState({ show: false });
    this.setState({ id: "" });
  };
  componentDidMount() {
    this.getAllProducts();
    this.getAllPersonalSales();
    this.getAllCategory();
    this.getAllUsers();
  }
  getAllUsers = () => {
    fetch("http://localhost:8000/api/v1/users", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ allUsers: data.UsersModel });
      });
  };
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
      });
  };
  getAllPersonalSales = () => {
    let totalProducts = 0;
    let amount = 0;
    let totalSales = [];
    fetch("http://localhost:8000/api/v1/sales", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      }
    })
      .then(response => response.json())
      .then(data => {
        data.SalesModel.map(sale => {
          totalProducts += sale.quantity;
          amount += sale.price * sale.quantity;
          if (totalSales.indexOf(sale.id) === -1) totalSales.push(sale.id);
          return true;
        });
        this.setState({ allSales: data.SalesModel });
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

  onNameChange = event => {
    this.setState({
      productName: event.target.value
    });
  };
  oncategoryChange = event => {
    this.setState({
      categoryName: event.target.value
    });
  };
  onQuantityChange = event => {
    this.setState({
      quantity: event.target.value
    });
  };
  onPriceChange = event => {
    this.setState({
      price: event.target.value
    });
  };
  onDesChange = event => {
    this.setState({
      description: event.target.value
    });
  };
  onMinChange = event => {
    this.setState({
      min: event.target.value
    });
  };
  onEmailChange = event => {
    this.setState({
      email: event.target.value
    });
  };
  onUserChange = event => {
    this.setState({
      username: event.target.value
    });
  };
  onPassChange = event => {
    this.setState({
      password: event.target.value
    });
  };
  onRoleChange = event => {
    this.setState({
      role: event.target.value
    });
  };
  onSubmitProduct = () => {
    fetch(`http://localhost:8000/api/v1/products/${this.state.id}/category`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      },
      body: JSON.stringify({
        categoryName: this.state.category
      })
    })
      .then(response => response.json())
      .then(data => {});
  };
  handleAddProduct = () => {
    fetch(`http://localhost:8000/api/v1/products`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      },
      body: JSON.stringify({
        productName: this.state.productName,
        quantity: this.state.quantity,
        description: this.state.description,
        min: this.state.min,
        price: this.state.price,
        image: this.state.image
      })
    })
      .then(response => response.json())
      .then(data => {});
  };
  handleEditProduct = () => {
    const id = this.state.id;

    let method = "put";
    if (id === "") {
      method = "post";
    }
    fetch(`http://localhost:8000/api/v1/products/${id}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      },
      body: JSON.stringify({
        productName: this.state.productName,
        quantity: this.state.quantity,
        description: this.state.description,
        min: this.state.min,
        price: this.state.price,
        image: this.state.image
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        window.location.reload();
      });
    if (method === "put") {
      fetch(`http://localhost:8000/api/v1/products/${id}/category`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token")
        },
        body: JSON.stringify({
          categoryName: this.state.categoryName
        })
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          window.location.reload();
        });
    }
  };
  handleDelete = () => {
    const id = this.state.id;
    let url;
    if (this.state.item === "product") {
      url = `http://localhost:8000/api/v1/products/${id}`;
    }
    if (this.state.item === "user") {
      url = `http://localhost:8000/api/v1/users/${id}`;
    }
    fetch(url, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        window.location.reload();
      });
  };
  handleUser = () => {
    const id = this.state.id;

    let method = "put";
    let url = `http://localhost:8000/api/v1/users/${id}`;
    if (id === "") {
      method = "post";
      url = `http://localhost:8000/api/v1/auth/createUser`;
    }
    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      },
      body: JSON.stringify({
        name: this.state.productName,
        username: this.state.username,
        password: this.state.password,
        email: this.state.email,
        role: this.state.role
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        window.location.reload();
      });
  };

  render() {
    return (
      <section id="page" className="admin-page">
        <Modals show={this.state.show} handleClose={this.hideModal}>
          {this.state.show === "delete" ? (
            <div className="content">
              <span className="close" onClick={this.hideModal}>
                ×
              </span>
              <div className="card">
                <div className="product-detail">
                  <h3 style={{ textAlign: "center" }}>
                    <a href="product-detail.html">Complete delete action?</a>{" "}
                  </h3>
                  <p className="text-left">
                    <a href="/">
                      <button className="button">Cancel</button>
                    </a>
                  </p>
                  <p className="text">
                    {" "}
                    <a href="/">
                      <button
                        onClick={this.handleDelete}
                        className="button delete-btn"
                      >
                        Delete
                      </button>
                    </a>
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <Form
              hideModal={this.hideModal}
              onQuantityChange={this.onQuantityChange}
              onNameChange={this.onNameChange}
              onMinChange={this.onMinChange}
              onPriceChange={this.onPriceChange}
              onDesChange={this.onDesChange}
              handleEditProduct={this.handleEditProduct}
              handleAddProduct={this.handleAddProduct}
              categories={this.state.categories}
              oncategoryChange={this.oncategoryChange}
              onEmailChange={this.onEmailChange}
              onRoleChange={this.onRoleChange}
              onPassChange={this.onPassChange}
              onUserChange={this.onUserChange}
              handleUser={this.handleUser}
            />
          )}
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
                  <p className="active">Sales Record</p>
                </Link>
              </i>
              <i>
                <hr />
                <Link to="/users">
                  <p className="active">Users</p>
                </Link>
              </i>

              <Link to="/products" />
            </div>

            <div className="col-8">
              <Route
                exact
                path="/"
                render={state => (
                  <Button
                    action={this.showModal}
                    tag="Add product"
                    {...state}
                  />
                )}
              />
              <Route
                exact
                path="/"
                render={state => (
                  <ProductList
                    products={this.state.products}
                    handleSearch={this.handleSearch}
                    modal={this.showModal}
                    modalDelete={this.modalDelete}
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
                  <AllSales
                    allSales={this.state.allSales}
                    records={this.state.records}
                    {...state}
                  />
                )}
              />
              <Route
                exact
                path="/users"
                render={state => (
                  <Button tag="Add User" action={this.showModal} {...state} />
                )}
              />
              <Route
                exact
                path="/users"
                render={state => (
                  <AllUsers
                    users={this.state.allUsers}
                    {...state}
                    modal={this.showModal}
                    modalDelete={this.modalDelete}
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
