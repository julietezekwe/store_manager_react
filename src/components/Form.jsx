import React from "react";
const Form = props => {
  const {
    hideModal,
    onQuantityChange,
    onNameChange,
    onMinChange,
    onPriceChange,
    onDesChange,
    handleEditProduct,
    oncategoryChange,
    onEmailChange,
    onUserChange,
    onPassChange,
    onRoleChange,
    handleUser
  } = props;
  return window.location.pathname === "/users" ? (
    <div className="content">
      <span className="close" onClick={hideModal}>
        ×
      </span>
      <h1 className="login-heading">Create Attendant</h1>
      <div className="form login">
        <div>
          <input
            type="text"
            id="name"
            placeholder="Full Name"
            required
            onChange={onNameChange}
          />
        </div>
        <div>
          <input
            type="email"
            id="email"
            placeholder="Email"
            required
            onChange={onEmailChange}
          />
        </div>
        <div>
          <input
            type="text"
            id="username"
            placeholder="Username"
            required
            onChange={onUserChange}
          />
        </div>
        <div>
          <input
            type="text"
            id="password"
            placeholder="Password"
            required
            onChange={onPassChange}
          />
        </div>
        <div>
          <select name="role" id="role" onChange={onRoleChange}>
            Role
            <option value="admin">Admin</option>
            <option value="attendant">Attendant</option>
          </select>
        </div>
        <div>
          <input type="submit" value="Submit" onClick={handleUser} />
        </div>
      </div>
    </div>
  ) : (
    <div className="content">
      <span className="close" onClick={hideModal}>
        ×
      </span>

      <h1 className="login-heading">Add/Update Product</h1>
      <div className="form login">
        <div>
          <input
            type="text"
            id="productName"
            placeholder="Product Name"
            required
            onChange={onNameChange}
          />
        </div>
        <div>
          <input
            type="text"
            id="quantity"
            placeholder="Quantity"
            required
            onChange={onQuantityChange}
          />
        </div>
        <div>
          <input
            type="text"
            id="min"
            placeholder="Minimum Inventory"
            required
            onChange={onMinChange}
          />
        </div>
        <div>
          <input
            type="text"
            id="description"
            placeholder="Description"
            required
            onChange={onDesChange}
          />
        </div>
        <div>
          <input
            type="text"
            id="price"
            placeholder="Unit Price"
            required
            onChange={onPriceChange}
          />
        </div>
        <div>
          <select name="category" onChange={oncategoryChange}>
            category
            {props.categories.map(category => {
              return (
                <option key={category.id} value={category.categoryname}>
                  {category.categoryname}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <input type="file" id="image" placeholder="Upload Image" />
        </div>

        <div>
          <input type="submit" onClick={handleEditProduct} value="Submit" />
        </div>
      </div>
    </div>
  );
};

export default Form;
