import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import useUserProfile from "../../hooks/useUserProfile";
import axiosFetch from "../../vendors/axios";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase.config";
const AddReview = () => {
  const [userProfile] = useUserProfile();

  const [user] = useAuthState(auth);
  const [avatarLink, setAvatarLink] = useState("");
  const formik = useFormik({
    initialValues: {
      rating: "",
      description: "",
    },
    validationSchema: Yup.object({
      rating: Yup.number()
        .min(1, "must be between 1 - 5")
        .max(5, "must be between 1 - 5")
        .required("please provide rating"),
      description: Yup.string().required("required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const { description, rating } = values;
      const data = await fetch("http://18.61.173.75:4000/reviews/", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({
          name: userProfile?.name,
          image: avatarLink,
          description,
          rating,
        }),
      }).then((res) => res.json());
      resetForm();
      toast.success("added review successfully");
    },
  });

  useEffect(() => {
    fetch(`http://18.61.173.75:4000/users/${user.email}`)
      .then((response) => response.text())
      .then((data) => setAvatarLink(data));
  }, []);
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-5 uppercase p-3 border-l-4">
        Add Review
      </h1>
      <form
        onSubmit={formik.handleSubmit}
        className=" max-w-[400px] p-4 shadow-md rounded"
      >
        <span className="text-lg font-semibold">Your rating:</span>
        <input
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.rating}
          name="rating"
          placeholder="1 - 5"
          min={1}
          max={5}
          className="border-2 w-20 ml-2 p-1 border-slate-400"
          type="number"
        />
        <textarea
          placeholder="Write a review"
          className="border-2 block my-3 p-2 w-full h-[100px]"
          name="description"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
          rows="10"
        ></textarea>
        <div className="text-right">
          <span>
            <button
              onClick={formik.resetForm}
              className="text-blue-600 font-semibold mx-2"
            >
              Cancel
            </button>
            <button type="submit" className="text-blue-600 font-semibold">
              Post
            </button>
          </span>
        </div>
      </form>
    </div>
  );
};

export default AddReview;
