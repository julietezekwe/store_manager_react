import React, { Component } from "react";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }
  onEmailChange = event => {
    this.setState({ email: event.target.value });
  };
  onPasswordChange = event => {
    this.setState({ password: event.target.value });
  };
  onButtonSubmit = () => {
    fetch("http://localhost:8000/api/v1/auth/login", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        password: this.state.password,
        email: this.state.email
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.message) {
          localStorage.setItem("message", data.message);
        }
        if (data.errors) {
          localStorage.setItem("errors", data.errors);
        }
        if (data.error === true) {
          localStorage.setItem("error", "true");
        } else {
          const token = data.token;
          localStorage.setItem("token", token);
          localStorage.setItem("role", data.authDetail.role);
          localStorage.setItem("username", data.authDetail.username);
          localStorage.setItem("cart", "");
          localStorage.setItem("id", data.authDetail.id);
          localStorage.setItem("email", data.authDetail.email);
          localStorage.setItem("name", data.authDetail.name);
          this.props.onbuttonclick();
        }
        // if (data.authDetail.role === "admin")
        //   window.location.replace("admin.html");
        // else window.location.replace("store-attendant.html");
      });
  };
  render() {
    // const { onbuttonclick } = this.props;
    return (
      <section className="login-page">
        <div className="login-form">
          <h1 className="login-heading">Log In</h1>
          <div className="card col-9" id="alert" />
          <div className="form login">
            <div>
              <input
                type="email"
                onChange={this.onEmailChange}
                id="email"
                placeholder="Email"
                required
              />
            </div>
            <div>
              <input
                type="password"
                id="password"
                placeholder="password"
                required
                onChange={this.onPasswordChange}
              />
            </div>

            <div>
              <input
                type="submit"
                onClick={this.onButtonSubmit}
                value="LOG IN"
              />
            </div>

            <div className="forgotpassword">
              <p>
                <i>Forgot Password?</i>
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Login;
