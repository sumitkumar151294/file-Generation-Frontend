/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from "react";
import Footer from "../Layout/Footer/Footer";
import Button from "../Components/Button/Button";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { onLoginSubmit, onLogout } from "../Store/Slices/LoginSlice";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader/Loader";
import ScrollToTop from "../Components/ScrollToTop/ScrollToTop";
import { onLoginAuthSubmit } from "../Store/Slices/authSlice";
const LoginPage = () => {
  const dispatch = useDispatch();
  const loginData = useSelector((state) => state.loginReducer);   //login data from redux using state
  const navigate = useNavigate();                                 //navigate to route on other pages
  const [Sumbit, setSumbit] = useState(false);                    //state to show toast one time
    //functions for validations in login form for formik
  const loginValidations = Yup.object().shape({
    email: Yup.string()
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        "Invalid email address"
      )
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  //function to handle login on sumbit
  const handleSubmit = (values) => {
    if (values) {
      dispatch(onLoginSubmit(values));
      setSumbit(true);
    }
  };
  const Unauthorized = sessionStorage.getItem("Unauthorized");

  useEffect(()=>{
    if(Unauthorized){
      dispatch(onLoginAuthSubmit({accessKey: "demo1",
        partnerCode : "UIMasterAdmin",
        secretKey: "demo1"}))
      dispatch(onLogout());
      sessionStorage.clear();}
  },[])
  useEffect(() => {
    if (Sumbit && loginData.status_code === "201") {
      toast.success(loginData?.message);
      sessionStorage.setItem("userLogin",loginData?.isUserLogin)
      navigate("/dashboard");
    } else if (Sumbit && loginData.status_code) {
      const Unauthorized = sessionStorage.getItem("Unauthorized");
      if(!Unauthorized){
        toast.error(loginData?.message);
      }
    }
  }, [loginData]);
  return (
    <>
    <ScrollToTop/>
      {loginData?.isLoading ? (
        <Loader />
      ) : (
        <div className="vh-100">
          <div className="authincation h-100">
            <div className="container h-100">
              <div className="row justify-content-center h-100 align-items-center">
                <div className="col-md-6">
                  <div className="authincation-content">
                    <div className="row no-gutters">
                      <div className="col-xl-12">
                        <div className="auth-form">
                          <div className="text-center mb-3">
                          </div>
                          <h4 className="text-center mb-4">
                            Sign in to your account
                          </h4>
                          <Formik
                            initialValues={{
                              email: "",
                              password: "",
                            }}
                            validationSchema={loginValidations}
                            onSubmit={handleSubmit}
                          >
                            {({ errors, touched }) => (
                              <Form>
                                <div className="mb-3">
                                  <label className="mb-1">
                                    <strong>Email</strong>
                                  </label>
                                  <Field
                                    type="email"
                                    name="email"
                                    placeholder="hello@example.com"
                                    className={`form-control ${
                                      errors.email && touched.email
                                        ? "is-invalid"
                                        : ""
                                    }`}
                                  />
                                  <ErrorMessage
                                    name="email"
                                    component="div"
                                    className="error-message"
                                  />
                                </div>
                                <div className="mb-3">
                                  <label className="mb-1">
                                    <strong>Password</strong>
                                  </label>
                                  <Field
                                    type="password"
                                    name="password"
                                    placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                                    className={`form-control ${
                                      errors.password && touched.password
                                        ? "is-invalid"
                                        : ""
                                    }`}
                                  />
                                  <ErrorMessage
                                    name="password"
                                    component="div"
                                    className="error-message"
                                  />
                                </div>

                                <div className="text-center pt-1" >
                                  <Button
                                    type="sumbit"
                                    text="Sign me in"
                                    className="btn btn-primary btn-block btn-sm float-right p-btn mt-2"
                                  />
                                </div>
                              </Form>
                            )}
                          </Formik>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />

      <Footer isLogin={true} />
    </>
  );
};
export default LoginPage;
/* eslint-enable react-hooks/exhaustive-deps */
