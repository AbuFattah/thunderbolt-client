import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase.config";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import axiosFetch from "../../../vendors/axios";
import { useNavigate } from "react-router-dom";
// end of imports

const AddProduct = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      details: "",
      quantity: "",
      minOrder: "",
      price: "",
      category: "",
      img: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("provide name of product"),
      details: Yup.string().required("some details required"),
      quantity: Yup.number().required("Quantity is required"),
      minOrder: Yup.number().required("minimum order is required"),
      price: Yup.number().required("Please provide a price"),
      category: Yup.string().required("Please provide a category"),
    }),
    onSubmit: async (values, { resetForm }) => {
      let { details } = values;
      details = details.split(",");
      // const data = await axiosFetch.post(
      //   "http://18.61.173.75:4000/products",
      //   {
      //     ...values,
      //     details,
      //   }
      // );

      await fetch(`http://18.61.173.75:4000/products`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({ ...values, details }),
      });

      // if (!data.statusText === "success") {
      //   signOut(auth);
      // }

      resetForm();
      toast.success("Product added successfully");
      navigate("/");
    },
  });

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
        <h1 className="text-4xl text-center font-semibold ">Add a Product</h1>
        <div className="form-group  h-[50px] my-5  rounded-sm ">
          <span>Name</span>

          <input
            required
            placeholder="Motherboard B450M"
            className="p-2 focus:outline-none w-full border border-purple-200 flex-auto"
            type="text"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
        </div>
        {formik.touched.name && formik.errors.name ? (
          <span className=" text-red-500">{formik.errors.name}</span>
        ) : null}
        <div className="form-group  h-[50px] my-5  rounded-sm ">
          <>
            <span>Details</span>
          </>
          <input
            required
            placeholder="Comma separated eg. 2333MHz, USB3.0, PCIe 3.0"
            className="p-2 focus:outline-none w-full border border-purple-200 flex-auto"
            type="text"
            name="details"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.details}
          />
        </div>
        {formik.touched.details && formik.errors.details ? (
          <span className=" text-red-500">{formik.errors.details}</span>
        ) : null}
        <div className="form-group  h-[50px] my-5  rounded-sm ">
          <span>Quantity</span>

          <input
            required
            placeholder="3000"
            className="p-2 focus:outline-none w-full border border-purple-200 flex-auto"
            type="number"
            name="quantity"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.quantity}
          />
        </div>
        {formik.touched.quantity && formik.errors.quantity ? (
          <span className=" text-red-500">{formik.errors.quantity}</span>
        ) : null}
        <div className="form-group  h-[50px] my-5  rounded-sm ">
          <span>Minimum Order</span>

          <input
            required
            placeholder="300"
            className="p-2 focus:outline-none w-full border border-purple-200 flex-auto"
            type="number"
            name="minOrder"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.minOrder}
          />
        </div>
        {formik.touched.minOrder && formik.errors.minOrder ? (
          <span className=" text-red-500">{formik.errors.minOrder}</span>
        ) : null}
        <div className="form-group  h-[50px] my-5  rounded-sm ">
          <span>Price (in $)</span>

          <input
            required
            placeholder="300"
            className="p-2 focus:outline-none w-full border border-purple-200 flex-auto"
            type="number"
            name="price"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.price}
          />
        </div>
        {formik.touched.price && formik.errors.price ? (
          <span className=" text-red-500">{formik.errors.price}</span>
        ) : null}
        <div className="form-group  h-[50px] my-5  rounded-sm ">
          <span>Category</span>
          <input
            required
            placeholder="motherboard"
            className="p-2 focus:outline-none w-full border border-purple-200 flex-auto"
            type="text"
            name="category"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.category}
          />
        </div>
        <div className="form-group  h-[50px] my-5  rounded-sm ">
          <span>Image URL</span>
          <input
            required
            placeholder="motherboard"
            className="p-2 focus:outline-none w-full border border-purple-200 flex-auto"
            type="text"
            name="imageURL"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.imageURL}
          />
        </div>
        {formik.touched.imageURL && formik.errors.imageURL ? (
          <span className=" text-red-500">{formik.errors.imageURL}</span>
        ) : null}
        <button
          type="submit"
          className="w-full bg-secondary text-white p-2 my-2 rounded"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
