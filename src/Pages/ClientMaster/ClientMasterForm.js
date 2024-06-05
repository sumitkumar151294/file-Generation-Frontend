/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import Button from "../../Components/Button";
import InputField from "../../Components/InputField/InputField";
import Loader from "../../Components/Loader/Loader";
import Dropdown from "../../Components/Dropdown/Dropdown";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

const ClientMasterForm = () => {
  const clientFormValidations = Yup.object().shape({
    clientName: Yup.string().required("Client Name is required"),
    description: Yup.string().required("Description Name is required"),
    url: Yup.string().required("Url Name is required"),
    status: Yup.string().required("Status Name is required"),
  });
  const handleSubmit = (values) => {
    console.log(values);
  };
  const statusOptions = [
    { value: "Active", label: "Active" },
    { value: "Non-Active", label: "Non-Active" }
  ]; return (
    <>
    
      <div className="container-fluid form">
        <div className="row">
          <div className="col-xl-12 col-xxl-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Client Master</h4>
              </div>
              <div className="card-body">
                {false ? (
                  <div style={{ height: "400px" }}>
                    <Loader classType={"absoluteLoader"} />
                  </div>
                ) : (
                  <div className="container-fluid">
                    <Formik
                      initialValues={{
                        clientName: "",
                        description: "",
                        url: "",
                        status: "",
                      }}
                      validationSchema={clientFormValidations}
                      onSubmit={handleSubmit}
                    >
                      {({ errors, touched }) => (
                        <Form>
                          <div className="row">
                            <div className="col-sm-4 form-group mb-2">
                              <label htmlFor="amount">
                                Client Name
                                <span className="text-danger">*</span>
                              </label>
                              <Field
                                type="text"
                                name="clientName"
                                className={`form-control ${errors.clientName && touched.clientName
                                  ? "is-invalid"
                                  : ""
                                  }`}
                                placeholder="Enter Client Name"
                              />
                              <ErrorMessage
                                name="clientName"
                                component="div"
                                className="error-message"
                              />
                            </div>

                            <div className="col-sm-4 form-group mb-2">
                              <label htmlFor="availabelAmount">
                                Description
                                <span className="text-danger">*</span>
                              </label>
                              <Field
                                type="text"
                                name="description"
                                className={`form-control ${errors.description && touched.description
                                  ? "is-invalid"
                                  : ""
                                  }`}
                                placeholder="Enter Discription"
                              />
                              <ErrorMessage
                                name="description"
                                component="div"
                                className="error-message"
                              />
                            </div>
                            <div className="col-sm-4 form-group mb-2">
                              <label htmlFor="availabelAmount">
                                URL
                                <span className="text-danger">*</span>
                              </label>
                              <Field
                                type="text"
                                name="url"
                                className={`form-control ${errors.url && touched.url ? "is-invalid" : ""
                                  }`}
                                placeholder="Enter URL"
                              />
                              <ErrorMessage
                                name="url"
                                component="div"
                                className="error-message"
                              />
                            </div>
                            <div className="col-sm-4 form-group mb-2">
                              <label htmlFor="status">
                                Status
                              </label>
                              <Field
                                name="status"
                                component={Dropdown}
                                options={statusOptions}
                                className="form-select"
                              />
                              <ErrorMessage
                                name="status"
                                component="div"
                                className="error-message"
                              />

                            </div>
                            <div className="col-sm-12 form-group mb-0 mt-2">
                              <Button
                                text="Submit"
                                icon="fa fa-arrow-right"
                                className="btn btn-primary float-right pad-aa mt-2"
                              />
                              <ToastContainer />
                            </div>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientMasterForm;
/* eslint-enable react-hooks/exhaustive-deps */
