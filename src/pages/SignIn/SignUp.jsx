import { toast } from "react-toastify";
import { MdEmail as EmailIcon } from "react-icons/md";
import { FaUser as UserIcon } from "react-icons/fa";
import { AiFillLock as LockIcon } from "react-icons/ai";
import { FcGoogle as GoogleIcon } from "react-icons/fc";
// import loadingIcon from "../assets/svg/loadingIcon.svg";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../../firebase.config";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useUpdateProfile } from "react-firebase-hooks/auth";
import OAuth from "../../components/OAuth";
// import OAuth from "../components/OAuth";
// import Loading from "../components/Loading";

// COMPONENT
const SignUp = () => {
  const navigate = useNavigate();
  let location = useLocation();
  let path = location.state?.from || "/";
  console.log(path);
  const [updateProfile, updating, updateError] = useUpdateProfile(auth);
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });

  // FORMIK
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().max(15, "Must be 15 characters or less"),
      password: Yup.string()
        .min(6, "Must be atleast 6 characters")
        .required("Password required"),
      confirmPassword: Yup.string()
        .min(6, "Must be atleast 6 characters")
        .required("Confirm Password required")
        .when("password", {
          is: (val) => (val && val.length > 0 ? true : false),
          then: Yup.string().oneOf(
            [Yup.ref("password")],
            "Passwords dont match"
          ),
        }),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: async (values) => {
      await createUserWithEmailAndPassword(values.email, values.password);
      await updateProfile({ displayName: formik.values.name });
      toast.success("Email Verification sent");
    },
  });

  if (error) {
    return toast.error("Something went wrong", error);
  }
  if (loading) {
    return <p>Loading...</p>;
  }
  if (user) {
    navigate(path, { replace: true });
  }
  // if (loading) {
  //   return <Loading />;
  // }

  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={formik.handleSubmit}
        style={{
          position: "relative",
          zIndex: 200,
        }}
        className="min-w-[350px]  border-2  bg-white p-5 text-black rounded-lg my-5"
      >
        <h1 className="text-4xl text-center font-semibold ">Sign Up</h1>
        <div className="form-group flex h-[50px] my-5  rounded-sm ">
          <input
            placeholder="Name"
            className="px-4 focus:outline-none w-full border-2 border-purple-100 flex-auto"
            type="text"
            name="name"
            id="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
        </div>
        {formik.touched.name && formik.errors.name ? (
          <div className="text-red-500">{formik.errors.name}</div>
        ) : null}
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
        <div className="form-group flex h-[50px] my-5  rounded-sm ">
          <input
            required
            placeholder="Confirm Password"
            className="px-4 focus:outline-none w-full border-2 border-purple-100 flex-auto"
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
          />
        </div>
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <div className="text-red-500">{formik.errors.confirmPassword}</div>
        ) : null}
        <button className="btn w-full bg-blue" type="submit">
          {loading ? <img src={loadingIcon} alt="loading" /> : "Sign up"}
        </button>
        {/* Line */}
        <div className="line w-full h-[1px] my-5 bg-gray-300"></div>
        <OAuth text={"Sign Up With Google"} />
        <p className="my-4 text-center">
          Already have an account?{" "}
          <Link className="link text-blue-500 mt-4" to="/signin">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
