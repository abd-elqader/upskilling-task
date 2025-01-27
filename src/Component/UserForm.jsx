import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

// Validation Schema using Yup
const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    phoneNumber: Yup.string()
        .matches(/^\d{11}$/, "Phone number must be 11 digits")
        .required("Phone Number is required"),
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    photo: Yup.mixed().required("picture is required"),
});

const UserForm = () => {
    const initialValues = {
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        picture: null,
    };

    const [previewImage, setPreviewImage] = useState(null); // State to store the image preview

    const handleSubmit = async (values) => {
        console.log("Form Data:", values);
        try {
            const payload = {
                firstName: values.firstName,
                lastName: values.lastName,
                phoneNumber: values.phoneNumber,
                email: values.email,
                picture: values.picture, // If the API expects a file URL or base64 encoded string
            };

            const apiUrl = "https://dummyapi.io/data/v1/user/create";

            const headers = {
                "app-id": "64fc4a747b1786417e354f31", // Replace with your actual app_key
            };

            const response = await axios.post(apiUrl, payload, { headers });

            console.log("API Response:", response.data);
            alert("Form submitted successfully!");
        } catch (error) {
            console.error("API Error:", error);
            alert("An error occurred while submitting the form.");
        }
    };

    const handleImageChange = (event, setFieldValue) => {
        const file = event.currentTarget.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
            setFieldValue("photo", file);
        }

    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-xl shadow-lg w-4/5">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ setFieldValue }) => (
                        <Form>
                            {/* Image Upload */}
                            <div className="mb-4 text-center">
                                <label className="cursor-pointer">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(event) => handleImageChange(event, setFieldValue)}
                                    />
                                    <div className="w-24 h-24 rounded-full overflow-hidden mx-auto border-2 border-gray-300">
                                        {previewImage ? (
                                            <img
                                                src={previewImage}
                                                alt="Profile Preview"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                                <span className="text-gray-500">Upload</span>
                                            </div>
                                        )}
                                    </div>
                                </label>
                                <ErrorMessage
                                    name="photo"
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>
                            <h1 className="text-2xl font-bold mb-6 text-center">Upload Photo</h1>

                            {/* Rest of the Form */}
                            <div className="grid grid-cols-2 gap-4">
                                {/* First Name */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        First Name
                                    </label>
                                    <Field
                                        type="text"
                                        name="firstName"
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <ErrorMessage
                                        name="firstName"
                                        component="div"
                                        className="text-red-500 text-sm mt-1"
                                    />
                                </div>

                                {/* Last Name */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Last Name
                                    </label>
                                    <Field
                                        type="text"
                                        name="lastName"
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <ErrorMessage
                                        name="lastName"
                                        component="div"
                                        className="text-red-500 text-sm mt-1"
                                    />
                                </div>

                                {/* Phone Number */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Phone Number
                                    </label>
                                    <Field
                                        type="text"
                                        name="phoneNumber"
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <ErrorMessage
                                        name="phoneNumber"
                                        component="div"
                                        className="text-red-500 text-sm mt-1"
                                    />
                                </div>

                                {/* Email */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email
                                    </label>
                                    <Field
                                        type="email"
                                        name="email"
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <ErrorMessage
                                        name="email"
                                        component="div"
                                        className="text-red-500 text-sm mt-1"
                                    />
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                >
                                    Save
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default UserForm;