/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Button from "../../Components/Button";
import Loader from "../../Components/Loader/Loader";
import Dropdown from "../../Components/Dropdown/Dropdown";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { onPostclientMaster, onPostclientMasterReset } from "../../Store/Slices/clientMasterSlice";

const ClientMasterForm = () => {
  const clientMasterData = useSelector((state) => state.clientMasterReducer);
  const dispatch = useDispatch();
  const clientFormValidations = Yup.object().shape({
    clientName: Yup.string().required("Client Name is required"),
    description: Yup.string().required("Description is required"),
    url: Yup.string().required("Url is required"),
    status: Yup.string().required("Status is required"),
  });
  const handleSubmit = (values) => {
    dispatch(onPostclientMaster(values))
  };
  useEffect(()=>{
    if(clientMasterData?.post_status_code==="201"){
      toast.success(clientMasterData.postMessage)
      dispatch(onPostclientMasterReset())
    }else if(clientMasterData?.post_status_code){
      toast.error(clientMasterData.postMessage)
      dispatch(onPostclientMasterReset())
    }
     },[clientMasterData]);
  const statusOptions = [
    { value: "Active", label: "Active" },
    { value: "Non-Active", label: "Non-Active" }
  ];
   return (
    <>
    <ToastContainer/>
      <div className="container-fluid form">
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
                              <span className="text-danger">*</span>
                              </label>

                              <Field
                                name="status"
                                component={Dropdown}
                                options={statusOptions}
                                className={`form-select ${errors.status && touched.status ? "is-invalid" : ""
                              }`}                              />
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
