"use client"
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'; 

// Reusable Input Component
const Input = ({ label = '', ...props }) => {
  return (
    <div className="flex flex-col space-y-2">
      <label className="leading-loose">{label}</label>
      <Field {...props} className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" />
      <ErrorMessage name={props.name} component="p" className="text-red-500 text-xs" />
    </div>
  );
};

// Signup Form Component
const SignUpForm = () => {
    
  // Initial Form Values
  const initialValues = {
    companyName: '',
    cin: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    CompanyLogo: null,
  };

  // Form Validation Schema
  const validationSchema = Yup.object().shape({
    companyName: Yup.string().required('Company Name is required'),
    cin: Yup.string().required('CIN is required').length(8, 'CIN must be 8 characters').matches(/^[0-9]+$/, 'CIN must be alphanumeric'),
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
        
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
      .required('Confirm Password is required'),
    CompanyLogo: Yup.mixed().required('Company Logo is required'),
  });

  // Form Submission
  const handleSubmit = async (values = {}) => {
    console.log('Form submitted:', values);
    location.href = '/register/Company/verify';
  };

  return (
    // Signup Form
    <div className="py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-1 sm:max-w-xl sm:mx-auto">
        <div className="relative px-2 py-5 bg-gray-900 mx-4 md:mx-0 shadow rounded-3xl sm:p-6">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-extrabold text-white text-center">Create an Account as Company
            </h1>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values) => handleSubmit(values)}
            >
              {({ isSubmitting }) => (
                <Form action="#" method="POST">
                  <div className="divide-y divide-gray-200">
                    <div className="py-8 text-base leading-6 space-y-4 sm:text-lg sm:leading-7">
                      <Input label="Company Name" name="companyName" type="text" />
                      <Input label="CIN" name="cin" type="text" />
                      <Input id="CompanyLogo" label="Company Logo" type="file" name="CompanyLogo" accept="image/png, image/jpeg , image/jpg , image/svg" />

                      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <Input label="First Name" name="firstName" type="text" />
                        <Input label="Last Name" name="lastName" type="text" />
                      </div>

                      <Input label="Email" name="email" type="email" />
                      <Input label="Password" name="password" type="password" />
                      <Input label="Confirm Password" name="confirmPassword" type="password" />
                    </div>  


                    <div className="pt-2 flex items-center space-x-2">
                      <button type="submit" disabled={isSubmitting}
                        className="flex justify-center items-center w-full text-white px-2 py-2 rounded-md focus:outline-none bg-blue-600 hover:bg-blue-600 hover:shadow-lg"
                      >
                        Create Account
                     </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
