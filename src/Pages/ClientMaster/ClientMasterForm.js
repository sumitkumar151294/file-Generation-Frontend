/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Button from "../../Components/Button/Button";
import Loader from "../../Components/Loader/Loader";
import Dropdown from "../../Components/Dropdown/Dropdown";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  onGetclientMaster,
  onPostclientMaster,
  onPostclientMasterReset,
  onUpdateclientMaster,
} from "../../Store/Slices/clientMasterSlice";

const ClientMasterForm = ({ clientData }) => {
  const [button, setButton] = useState("Submit");
  const clientMasterData = useSelector((state) => state.clientMasterReducer);
  const [intialValue, setInitialValue] = useState({
    clientName: "",
    description: "",
    url: "",
    enabled: "",
    clientCode: "",
  });
  const dispatch = useDispatch();
  const clientFormValidations = Yup.object().shape({
    clientName: Yup.string().required("Client Name is required"),
    url: Yup.string().required("Url is required"),
    enabled: Yup.boolean().required("Status is required"),
    clientCode: Yup.string().required("Client Code is required"),
  });
  const handleSubmit = (values, { resetForm }) => {
    if (button === "Submit") {
      const clientData = {
        ...values,
        enabled: values.enabled === "true" ? true : false,
        clientCode: String(values.clientCode),
      };
      dispatch(onPostclientMaster(clientData));
    } else {
      const clientData = {
        ...values,
        deleted: false,
        enabled: values.enabled === "true" ? true : false

      };
      setInitialValue({
        clientName: "",
        description: "",
        url: "",
        enabled: "",
        clientCode: "",
      });
      setButton("Submit");
      dispatch(onUpdateclientMaster(clientData));
    }
  };
  useEffect(() => {
    if (clientMasterData?.post_status_code === "201") {
      toast.success(clientMasterData.postMessage);
      dispatch(onGetclientMaster());
      dispatch(onPostclientMasterReset());
    } else if (clientMasterData?.post_status_code) {
      toast.error(clientMasterData.postMessage);
      dispatch(onPostclientMasterReset());
    }
  }, [clientMasterData]);
  const statusOptions = [
    { value: true, label: "Active" },
    { value: false, label: "Non Active" },
  ];
  useEffect(() => {
    if (clientData) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      setInitialValue(clientData);
      setButton("Update");
    }
  }, [clientData]);
  return (
    <>
      <ToastContainer />
      <div className="row">
        <div className="col-xl-12 col-xxl-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Client Master</h4>
            </div>
            <div className="card-body">
              {clientMasterData?.postLoading ? (
                <div style={{ height: "200px" }}>
                  <Loader classType={"absoluteLoader"} />
                </div>
              ) : (
                <div className="container-fluid">

                  <Formik
                    initialValues={intialValue}
                    validationSchema={clientFormValidations}
                    onSubmit={handleSubmit}
                    enableReinitialize={true}
                  >
                    {({ errors, touched }) => (
                      <Form>
                        <div className="row">
                          <div className="col-sm-4 form-group mb-2">
                            <label>
                              Client Name
                              <span className="text-danger">*</span>
                            </label>
                            <Field
                              type="text"
                              name="clientName"
                              className={`form-control ${
                                errors.clientName && touched.clientName
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
                            <label>Description</label>
                            <Field
                              type="text"
                              name="description"
                              className={`form-control ${
                                errors.description && touched.description
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
                            <label>
                              URL
                              <span className="text-danger">*</span>
                            </label>
                            <Field
                              type="text"
                              name="url"
                              className={`form-control ${
                                errors.url && touched.url ? "is-invalid" : ""
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
                            <label>
                              Client Code
                              <span className="text-danger">*</span>
                            </label>
                            <Field
                              type="text"
                              name="clientCode"
                              className={`form-control ${
                                errors.clientCode && touched.clientCode
                                  ? "is-invalid"
                                  : ""
                              }`}
                              placeholder="Enter Client Code"
                            />
                            <ErrorMessage
                              name="clientCode"
                              component="div"
                              className="error-message"
                            />
                          </div>
                          <div className="col-sm-4 form-group mb-2">
                            <label>
                              Status
                              <span className="text-danger">*</span>
                            </label>

                            <Field
                              name="enabled"
                              component={Dropdown}
                              options={statusOptions}
                              className={`form-select ${
                                errors.enabled && touched.enabled
                                  ? "is-invalid"
                                  : ""
                              }`}
                            />
                            <ErrorMessage
                              name="enabled"
                              component="div"
                              className="error-message"
                            />
                          </div>
                          <div className="col-sm-12 form-group mb-0 mt-2">
                            <Button
                              text={button}
                              icon="fa fa-arrow-right"
                              className="btn btn-primary float-right pad-aa mt-2"
                            />
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
    </>
  );
};

export default ClientMasterForm;
/* eslint-enable react-hooks/exhaustive-deps */
