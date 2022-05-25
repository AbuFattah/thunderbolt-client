import React from "react";

const ManageUsersRow = ({ handleMakeAdmin, user, index }) => {
  const { name, email, phone, role } = user;
  return (
    <tr>
      <th>{index + 1}</th>
      <td>{name}</td>
      <td>{email}</td>
      <td>{role ? role : "User"}</td>
      <td>{phone ? phone : "Not provided"}</td>
      <td class="flex gap-2 items-center">
        <button
          onClick={handleMakeAdmin.bind(null, email)}
          className="btn btn-sm btn-secondary"
        >
          Make Admin
        </button>
      </td>
    </tr>
  );
};

export default ManageUsersRow;
