import React from "react";
const AllUsers = props => {
  const { users, modal, modalDelete } = props;
  return (
    <div className="col-12">
      <div className="card col-12">
        <h2 className="table-caption">Sales Record</h2>
        <table className="table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>

              <th>Role</th>
              <th>Email</th>
              <th>Username </th>
              <th>Date of creation</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => {
              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.role}</td>
                  <td>{user.email}</td>
                  <td>{user.username}</td>

                  <td>
                    <span>
                      {" "}
                      {new Date(user.joined).getDate()} /
                      {new Date(user.joined).getMonth()} /
                      {new Date(user.joined).getFullYear()}
                    </span>
                  </td>
                  <td>
                    <i
                      className="far fa-edit "
                      onClick={() => modal(user.id)}
                    />{" "}
                    &nbsp;
                    <i
                      className="far fa-trash-alt trigger"
                      onClick={() => modalDelete(user.id, "user")}
                    />
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

export default AllUsers;
