import React from "react";

const Modals = ({ show, children }) => {
  const showHideClassName =
    show || show === "delete" ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">{children}</section>
    </div>
  );
};

export default Modals;
