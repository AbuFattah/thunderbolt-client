import React, { useEffect, useRef, useState } from "react";
import { useAuthState, useUpdateProfile } from "react-firebase-hooks/auth";
import { auth } from "../../firebase.config";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
const MyProfile = () => {
  const [updateProfile, updating, error] = useUpdateProfile(auth);
  // const { name, email } = profile;
  const [firebaseUser] = useAuthState(auth);
  const [editable, setEditable] = useState(false);
  const [formData, setFormData] = useState();
  const [profile, setProfile] = useState(null);
  // console.log(user?.displayName);
  useEffect(() => {
    if (!firebaseUser) return;
    fetch(`http://localhost:5000/userProfile/${firebaseUser.email}`)
      .then((res) => res.json())
      .then((data) => setProfile(data));
  }, [firebaseUser]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      address: profile?.address,
      phone: profile?.phone,
      name: firebaseUser?.displayName,
      email: firebaseUser?.email,
    },
    validationSchema: Yup.object({
      address: Yup.string(),
      phone: Yup.string().typeError("Must be a number"),
    }),
    onSubmit: async (values) => {
      const { name, address, phone, email } = values;
      console.log(name);
      await updateProfile({ displayName: name });
      const result = await fetch(
        `http://localhost:5000/updateProfile/${email}`,
        {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ ...values }),
        }
      ).then((res) => res.json());
      toast.success("updated Profile");
      // await fetch('http://localhost:5000/updateProfile')
    },
  });

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-5 uppercase p-3 border-l-2">
        My Profile
      </h1>
      <form onSubmit={formik.handleSubmit} className="space-y-3">
        <button
          onClick={() => setEditable(!editable)}
          type="button"
          className="btn btn-secondary btn-sm"
        >
          Edit
        </button>
        <div>
          <div className="text-sm font-semibold">Name:</div>
          <input
            className="card-title border p-1 my-1 disabled:border-0"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            disabled={!editable}
            type="text"
          ></input>
        </div>
        <div>
          <div className="text-sm font-semibold">Email:</div>
          <div>{formik.values.email}</div>
        </div>
        <div>
          <div className="text-sm font-semibold">Adress:</div>
          <input
            name="address"
            className="text-slate-700 border p-1 my-1 disabled:border-0"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.address}
            disabled={!editable}
            type="text"
          ></input>
        </div>
        <div>
          <div className="text-sm font-semibold">Phone:</div>
          <input
            className="text-slate-700 border p-1 my-1 disabled:border-0 "
            disabled={!editable}
            type="number"
            name="phone"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
          ></input>
        </div>
        <button className="btn btn-secondary btn-sm">Update Profile</button>
      </form>
    </div>
  );
};

export default MyProfile;
