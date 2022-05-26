import React, { useEffect, useRef, useState } from "react";
import { useAuthState, useUpdateProfile } from "react-firebase-hooks/auth";
import { auth } from "../../firebase.config";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import useUserProfile from "../../hooks/useUserProfile";
import axiosFetch from "../../vendors/axios";
const MyProfile = () => {
  const [updateProfile, updating, error] = useUpdateProfile(auth);
  // const { name, email } = profile;
  const [firebaseUser] = useAuthState(auth);
  const [editable, setEditable] = useState(false);
  const [formData, setFormData] = useState();
  const [profile] = useUserProfile();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      address: profile?.address,
      phone: profile?.phone,
      name: profile?.name,
      email: profile?.email,
      education: profile?.education,
      linkedin: profile?.linkedin,
    },
    validationSchema: Yup.object({
      address: Yup.string(),
      phone: Yup.string().typeError("Must be a number"),
    }),
    onSubmit: async (values) => {
      const { name, address, phone, email } = values;

      await updateProfile({ displayName: name });
      const result = await axiosFetch.put(
        `https://quiet-sierra-02011.herokuapp.com/updateProfile/${email}`,
        {
          ...values,
        }
      );
      toast.success("updated Profile");
      setEditable(false);
      // await fetch('https://quiet-sierra-02011.herokuapp.com/updateProfile')
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
            className="card-title border-b-2 w-fit p-1 my-1 focus:outline-none"
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
          <input
            disabled
            type="email"
            value={formik.values.email}
            className="border-b-2 p-1 disabled:text-slate-500 w-auto"
          ></input>
        </div>
        <div>
          <div className="text-sm font-semibold">Adress:</div>
          <input
            name="address"
            className="text-slate-700 border-b-2 p-1 my-1 focus:outline-none w-fit"
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
            className="text-slate-700 border-b-2 p-1 my-1 focus:outline-none "
            disabled={!editable}
            type="number"
            name="phone"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
          ></input>
        </div>
        <div>
          <div className="text-sm font-semibold">Education:</div>
          <input
            className="text-slate-700 border-b-2 p-1 my-1 focus:outline-none "
            disabled={!editable}
            type="text"
            name="education"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.education}
          ></input>
        </div>
        <div>
          <div className="text-sm font-semibold">Linkedin Profile:</div>
          <input
            className="text-slate-700 border-b-2 p-1 my-1 focus:outline-none "
            disabled={!editable}
            type="text"
            name="linkedin"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.linkedin}
          ></input>
        </div>
        <button className="btn btn-secondary btn-sm">Update Profile</button>
      </form>
    </div>
  );
};

export default MyProfile;
