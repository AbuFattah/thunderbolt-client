import React from "react";
import { Link, Outlet } from "react-router-dom";
import { MdOutlineDashboard as DashboardIcon } from "react-icons/md";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase.config";
import useIsAdmin from "../../hooks/useIsAdmin";
const Dashboard = () => {
  const [user] = useAuthState(auth);
  const [isAdmin] = useIsAdmin(user.email);
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
        <ul class=" menu p-4 overflow-y-auto w-80 text-black bg-gray-100 ">
          {/* <!-- Sidebar content here --> */}
          <li>
            <Link to="">My Profile</Link>
          </li>
          {!isAdmin && (
            <>
              <li>
                <Link to="my-orders">My orders</Link>
              </li>
              <li>
                <Link to="add-review">Add a review</Link>
              </li>
            </>
          )}
          {isAdmin && (
            <>
              <li>
                <Link to="manage-orders">Manage Orders</Link>
              </li>
              <li>
                <Link to="add-product">Add Product</Link>
              </li>
              <li>
                <Link to="manage-products">Manage Products</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
