import React, { useEffect, useState } from "react";
import ManageUsersRow from "./ManageUsersRow";
import { BsFillGearFill as GearIcon } from "react-icons/bs";
import { toast } from "react-toastify";
import axiosFetch from "../../../vendors/axios";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [refetch, setRefetch] = useState(false);
  // setRefetch(!refetch);
  // toast.success("make admin successfull");
  const handleMakeAdmin = async (email) => {
    const data = await fetch(
      `https://thunderbolt-devfattah0.b4a.run/makeAdmin/${email}`,
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    ).then((response) => response.json());

    setRefetch(!refetch);
    toast.success("make admin successfull");
  };
  useEffect(() => {
    fetch("https://thunderbolt-devfattah0.b4a.run/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, [refetch]);
  return (
    <>
      <div className="overflow-x-auto">
        <h1 className="text-3xl font-semibold mb-5 uppercase p-3 border-l-2">
          Manage Users
        </h1>
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>User Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Phone</th>
              <th>
                <GearIcon className="text-xl" />
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <ManageUsersRow
                handleMakeAdmin={handleMakeAdmin}
                key={user._id}
                user={user}
                index={index}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ManageUsers;
