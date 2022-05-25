import React, { useEffect, useState } from "react";
import ManageUsersRow from "./ManageUsersRow";
import { BsFillGearFill as GearIcon } from "react-icons/bs";
import { toast } from "react-toastify";
import axiosFetch from "../../../vendors/axios";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const handleMakeAdmin = (email) => {
    axiosFetch.patch(`http://localhost:5000/makeAdmin/${email}`).then((res) => {
      console.log(res);
      if (!res.statusText === "OK") {
        toast.error("Something went wrong");
        return;
      }
      setRefetch(!refetch);
      toast.success("make admin successfull");
    });
  };
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, [refetch]);
  return (
    <>
      <div class="overflow-x-auto">
        <h1 className="text-3xl font-semibold mb-5 uppercase p-3 border-l-2">
          Manage Users
        </h1>
        <table class="table w-full">
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
