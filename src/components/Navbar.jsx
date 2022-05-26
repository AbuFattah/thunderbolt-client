import React from "react";
import logo from "../assets/images/logo.png";
import { signOut } from "firebase/auth";
import { AiOutlineUser as UserIcon } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
const Navbar = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  return (
    <div className="shadow relative z-50">
      <div className="container mx-auto max-w-[1200px]">
        <div className="navbar ">
          <div className="navbar-start">
            <div className="dropdown">
              <label tabIndex="0" className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </label>
              <ul
                tabIndex="0"
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                  <Link to="/dashboard">My Portfolio</Link>
                  <Link to="/blogs">Blogs</Link>
                  {/* <Link to="/my-profile">My Profile</Link> */}
                </li>
              </ul>
            </div>
            <Link to="/" className="flex cursor-pointer normal-case text-xl">
              <img width={"32px"} src={logo} alt="logo" />
              <span>Thunderbolt</span>
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal p-0">
              <li>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/dashboard">My Portfolio</Link>
                <Link to="/blogs">Blogs</Link>
                {/* <Link to="/my-profile">My Profile</Link> */}
              </li>
            </ul>
          </div>
          <div className="navbar-end">
            <button className="btn btn-ghost btn-circle dropdown dropdown-end">
              <UserIcon className="text-2xl" />
              <label tabIndex="0" class=""></label>
              <ul
                tabIndex="0"
                class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                {user ? (
                  <>
                    <li>
                      <Link to="/dashboard">{user.displayName}</Link>
                    </li>
                    <li>
                      <a
                        onClick={() => {
                          signOut(auth);
                          navigate("/", { replace: true });
                        }}
                      >
                        Sign Out
                      </a>
                    </li>
                  </>
                ) : (
                  <li>
                    <Link to="signin">Sign In</Link>
                  </li>
                )}
              </ul>
            </button>
            {/* <button className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="badge badge-xs badge-primary indicator-item"></span>
            </div>
          </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
