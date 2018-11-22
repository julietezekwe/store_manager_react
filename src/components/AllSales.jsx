import React from "react";
const AllSales = ({ allSales, records }) => {
  return (
    <div className="col-12">
      <div className="center">
        <div className="col-3 " id="totalProducts">
          Products Sold: {records.totalProducts}
        </div>
        <div className="col-4" id="totalPrice">
          Amount Realized: &#8358; {records.amount}
        </div>
        <div className="col-3" id="totalSales">
          Number of sales: {records.totalSales}
        </div>
      </div>
      <div className="card col-12">
        <h2 className="table-caption">Sales Record</h2>
        <table className="table" id="allSales">
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Transc ID</th>
              <th>Username</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price (&#8358;)</th>
              <th>Total price</th>
              <th>Date of Sales</th>
            </tr>
          </thead>
          <tbody>
            {allSales.map((sale, i) => {
              return (
                <tr key={i}>
                  <td>{sale.productid}</td>
                  <td>{sale.id}</td>
                  <td>{sale.name}</td>
                  <td>{sale.productname}</td>
                  <td>{sale.quantity}</td>
                  <td>{sale.price}</td>
                  <td>{sale.price * sale.quantity}</td>
                  <td>
                    <span>
                      {" "}
                      {new Date(sale.created_at).getDate()} /
                      {new Date(sale.created_at).getMonth()} /
                      {new Date(sale.created_at).getFullYear()}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllSales;
