import React from "react";
import { Link, Outlet } from "react-router-dom";
import { MdOutlineDashboard as DashboardIcon } from "react-icons/md";
const Dashboard = () => {
  return (
    <div class="drawer drawer-mobile">
      <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content">
        <label for="my-drawer-2" class="btn btn-ghost drawer-button lg:hidden">
          <DashboardIcon className="text-2xl" />
        </label>
        {/* <!-- Page content here --> */}
        <p className=" h-full p-5">
          <Outlet />
        </p>
      </div>
      <div class="drawer-side">
        <label for="my-drawer-2" class="drawer-overlay"></label>
        <ul class="menu p-4 overflow-y-auto w-80 text-black bg-gray-100 ">
          {/* <!-- Sidebar content here --> */}
          <li>
            <Link to="my-orders">My orders</Link>
          </li>
          <li>
            <Link to="add-review">Add a review</Link>
          </li>
          <li>
            <Link to="my-profile">My Profile</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
