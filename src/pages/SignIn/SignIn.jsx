import { toast } from "react-toastify";
import { MdEmail as EmailIcon } from "react-icons/md";
import { FaUser as UserIcon } from "react-icons/fa";
import { AiFillLock as LockIcon } from "react-icons/ai";
import { FcGoogle as GoogleIcon } from "react-icons/fc";
import loadingIcon from "../../assets/svg/loadingIcon.svg";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../../firebase.config";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import OAuth from "../../components/Login/OAuth";
import useToken from "../../hooks/useToken";
// import OAuth from "../components/OAuth";
// import Loading from "../components/Loading";

// COMPONENT
const SignIn = () => {
  const [signInError, setSignInError] = useState(null);
  const navigate = useNavigate();
  let location = useLocation();
  let path = location.state?.from || "/";
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth, { sendEmailVerification: true });
  const token = useToken(user?.user);
  // FORMIK
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, "Must be atleast 6 characters")
        .required("Password required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: async (values) => {
      await signInWithEmailAndPassword(values.email, values.password);
    },
  });
  let errorMsg = "";
  if (error) {
    errorMsg = "Bad credentials";
    // toast.error("Bad credentials");
  }
  // if (loading) {
  //   return <p>Loading...</p>;
  // }
  if (user) {
    navigate(path, { replace: true });
  }

  return (
    <div
      style={{ minHeight: "calc(100vh - 64px)" }}
      className="flex flex-col justify-center items-center"
    >
      <div>
        <h1 className="font-semibold">For Admin:</h1>
        <p>
          <span className="font-semibold"> Email:</span> admin@admin.com
          <span className="font-semibold"> Password:</span> root123
        </p>
        <hr className="mb-4" />
      </div>
      <div>
        <h1 className="font-semibold">For User:</h1>
        <p>
          <span className="font-semibold"> Email:</span> john@gmail.com
          <span className="font-semibold"> Password:</span> 123123
        </p>
      </div>
      <form
        onSubmit={formik.handleSubmit}
        style={{
          position: "relative",
          zIndex: 200,
        }}
        className="min-w-[350px]  border-2  bg-white p-5 text-black rounded-lg my-5"
      >
        <h1 className="text-4xl text-center font-semibold ">Sign In</h1>
        {errorMsg && (
          <p className="text-red-800 bg-red-300 rounded p-3 mt-3">{errorMsg}</p>
        )}
        <div className="form-group flex h-[50px] my-5  rounded-sm ">
          <input
            required
            placeholder="Email"
            className="px-4 focus:outline-none w-full border-2 border-purple-100 flex-auto"
            type="email"
            name="email"
            id="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
        </div>
        {formik.touched.email && formik.errors.email ? (
          <div className="text-red-500">{formik.errors.email}</div>
        ) : null}
        <div className="form-group flex h-[50px] my-5  rounded-sm ">
          <input
            required
            placeholder="Password"
            className="px-4 focus:outline-none w-full border-2 border-purple-100 flex-auto"
            type="password"
            name="password"
            id="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
        </div>
        {formik.touched.password && formik.errors.password ? (
          <div className="text-red-500">{formik.errors.password}</div>
        ) : null}
        <button className="btn w-full bg-blue" type="submit">
          {loading ? <img src={loadingIcon} alt="loading" /> : "Sign In"}
        </button>
        {/* Line */}
        <div className="line w-full h-[1px] my-5 bg-gray-300"></div>
        <OAuth text={"Sign Up With Google"} />
        <p className="my-4 text-center">
          Don't have an account?{" "}
          <Link className="link text-blue-500 mt-4" to="/signup">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
