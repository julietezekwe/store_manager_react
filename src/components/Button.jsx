import React from "react";

const Button = ({ tag, action }) => {
  return (
    <div className="col-4">
      <button
        onClick={action}
        className="button text-left"
        style={{ marginTop: "20px" }}
      >
        {tag}
      </button>
    </div>
  );
};

export default Button;
