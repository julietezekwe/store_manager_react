import React from "react";

const NavBar = ({ user, logout }) => {
  return (
    <header id="header">
      <nav>
        {" "}
        <div className="logo">
          <i className="fab fa-stripe-s" />
          tore <i className="fab fa-medium-m" />
          anager
        </div>
        <ul>
          {user.role === "attendant" ? (
            <li>
              <a href="/checkout">
                <i className="fas fa-shopping-cart" />
                <i
                  style={{
                    display: "inline-block",
                    width: "13px",
                    height: "13px",
                    borderRadius: "100%",
                    background: "brown",
                    color: "white",
                    textAlign: "center",
                    lineHeight: "13px",
                    fontSize: "10px"
                  }}
                >
                  {localStorage.getItem("cartCount")}
                </i>
              </a>
            </li>
          ) : (
            <i />
          )}
          <li>
            <i className="fas fa-user-lock" />
            {user.username}
          </li>
          <li>
            <i className="fas fa-sign-in-alt">
              {" "}
              {user.token !== "" ? (
                <span onClick={() => logout()}> Logout</span>
              ) : (
                "login"
              )}
            </i>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
