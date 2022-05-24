import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase.config";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
const Purchase = () => {
  const { id } = useParams();
  const [user] = useAuthState(auth);
  const [product, setProduct] = useState({});
  const [error, setError] = useState(null);
  const [refetch, setRefetch] = useState(false);
  // const [btnDisabled, setBtnDisabled] = useState(true);
  const { img, minOrder, name, price, details, quantity } = product;
  useEffect(() => {
    fetch(`http://localhost:5000/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data));
  }, [refetch]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      address: "",
      phone: "",
      orderQuantity: product.minOrder,
    },
    validationSchema: Yup.object({
      address: Yup.string().required("address is required"),
      phone: Yup.number()
        .typeError("Must be a number")
        .required("phone is required"),
      orderQuantity: Yup.number()
        .min(minOrder, `Cannot order less than ${minOrder}`)
        .max(quantity, `Cannot order more than ${quantity}`)
        .required("Quantity is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const result = await fetch(`http://localhost:5000/orders/${id}`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          email: user.email,
          userName: user.displayName,
          paid: false,
          img,
          name,
          price,
        }),
      }).then((res) => res.json());
      console.log(result.success);
      if (result.success) {
        toast.success("Order has been placed, please pay to proceed");
      } else {
        toast.error(result.message);
      }
      setRefetch(!refetch);
      resetForm();
    },
  });

  const { address, phone, orderQuantity } = formik.values;

  let btnDisabled = true;

  if (
    address &&
    phone &&
    orderQuantity &&
    Object.entries(formik.errors).length === 0
  ) {
    btnDisabled = false;
  }

  return (
    <div className="container mx-auto max-w-[1200px] p-5">
      <div class="card lg:card-side bg-base-100 shadow-xl gap-10">
        <figure>
          <img
            // src="https://api.lorem.space/image/album?w=400&h=400"
            src={img}
            className="w-[200px] md:w-[400px]"
            alt="Album"
          />
        </figure>
        <div class="card-body">
          <h2 class="card-title">{name}</h2>
          <ul className="list-disc text-slate-500">
            {details?.map((detail) => (
              <li key={Math.random().toString()}>{detail}</li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-4 my-5">
            <div className="shadow p-2 px-6">
              <p className="font-semibold">Price</p>
              <p className="text-secondary text-center">${price}</p>
            </div>
            <div className="shadow p-2 px-6">
              <p className="font-semibold">Minimum Order:</p>
              <p className="text-secondary text-center">{minOrder}</p>
            </div>
            <div className="shadow p-2 px-6">
              <p className="font-semibold">Available</p>
              <p className="text-secondary text-center">{quantity}</p>
            </div>
          </div>
          {/* <div class="card-actions justify-end">
            <button class="btn btn-primary">Listen</button>
          </div> */}
        </div>
      </div>
      <div className="card w-full bg-base-100 shadow-xl my-10 p-5">
        <div className=" flex justify-between">
          <h2 className="card-title ">{user?.displayName}</h2>
          <p className="text-slate-500">{user?.email}</p>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className=" grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div class="form-control w-full ">
              <label class="label">
                <span class="label-text">Address:</span>
              </label>
              <input
                name="address"
                required
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address}
                type="text"
                placeholder="Type here"
                class="input input-bordered w-full "
              />
              {formik.touched.address && formik.errors.address && (
                <label class="label">
                  <span class="label-text-alt text-red-500">
                    {formik.errors.address}
                  </span>
                </label>
              )}
            </div>
            <div class="form-control w-full ">
              <label class="label">
                <span class="label-text">Phone No.</span>
              </label>
              <input
                name="phone"
                required
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
                type="text"
                placeholder="Type here"
                class="input input-bordered w-full"
              />
              {formik.touched.phone && formik.errors.phone && (
                <label class="label">
                  <span class="label-text-alt text-red-500">
                    {formik.errors.phone}
                  </span>
                </label>
              )}
            </div>
            <div class="form-control w-full ">
              <label class="label">
                <span class="label-text">Quantity</span>
              </label>
              <input
                name="orderQuantity"
                min={minOrder}
                max={quantity}
                required
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.orderQuantity}
                type="number"
                placeholder="Type here"
                class="input input-bordered w-full"
              />
              {formik.touched.orderQuantity && formik.errors.orderQuantity && (
                <label class="label">
                  <span class="label-text-alt text-red-500">
                    {formik.errors.orderQuantity}
                  </span>
                </label>
              )}
            </div>
          </div>
          <div className="flex justify-between">
            <span></span>
            <button
              className="btn btn-primary my-3 w-full sm:w-32"
              type="submit"
              disabled={btnDisabled}
            >
              Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Purchase;
