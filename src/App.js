import React, { Component } from "react";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Admin from "./components/Admin";
import AttendantDashboard from "./components/AttendantDashboard";
import Footer from "./components/Footer";
import "./App.css";
import "./Modal.css";
import "./Slider.css";

const defaultState = {
  inputfield: "",
  user: {
    id: localStorage.getItem("id") || "",
    name: localStorage.getItem("name") || "",
    email: localStorage.getItem("email") || "",
    username: localStorage.getItem("username") || "",
    token: localStorage.getItem("token") || "",
    role: localStorage.getItem("role") || ""
  }
};
class App extends Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
  }
  onButtonClick = () => {
    const user = {
      id: localStorage.getItem("id"),
      name: localStorage.getItem("name"),
      email: localStorage.getItem("email"),
      username: localStorage.getItem("username"),
      role: localStorage.getItem("role"),
      token: localStorage.getItem("token")
    };

    this.setState({
      user
    });
  };

  handleLogout = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    localStorage.removeItem("route");
    localStorage.removeItem("cart");
    localStorage.removeItem("cartCount");
    // localStorage.removeItem("uniqueCart");
    window.location.reload();
  };
  render() {
    return (
      <React.Fragment>
        <NavBar user={this.state.user} logout={this.handleLogout} />
        {!this.state.user.token ? (
          <Login onbuttonclick={this.onButtonClick} />
        ) : this.state.user.role === "admin" ? (
          <Admin />
        ) : (
          <AttendantDashboard />
        )}
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
