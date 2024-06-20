/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Button from "../../Components/Button";
import Loader from "../../Components/Loader/Loader";
import Dropdown from "../../Components/Dropdown/Dropdown";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { onPosttemplateTypeMaster, onPosttemplateTypeMasterReset } from "../../Store/Slices/templateTypeMasterSlice";

const TemplateTypeMasterForm = () => {
  const templateTypemasterData = useSelector((state) => state.templateTypeMasterReducer);
  const clientMasterData = useSelector((state) => state?.clientMasterReducer?.getclientMasterData);

  const dispatch = useDispatch();
  const validations = Yup.object().shape({
    templatetype: Yup.string().required("Template Name is required"),
    description: Yup.string().required("Description is required"),
    enabled: Yup.string().required("Status is required"),
    fileName_Rule: Yup.string().required("File Type Rule is required"),
    clientid: Yup.string().required("Client is required"),
  });
  const handleSubmit = (values) => {
    const templateTypeData = {
      ...values,
      enabled: values.enabled === "true" ? true : false,
    };
    dispatch(onPosttemplateTypeMaster(templateTypeData))
  };
  useEffect(()=>{
    if(templateTypemasterData?.post_status_code==="201"){
      toast.success(templateTypemasterData.postMessage)
      dispatch(onPosttemplateTypeMasterReset())
    }else if(templateTypemasterData?.post_status_code){
      toast.error(templateTypemasterData.postMessage)
      dispatch(onPosttemplateTypeMasterReset())
    }
     },[templateTypemasterData]);
  const statusOptions = [
    { value: true, label: "Active" },
    { value: false, label: "Non Active" }
  ];
  console.log(clientMasterData)
  const clientOptions = clientMasterData.map(clientData => ({
    value: clientData.id,
    label: clientData.clientName
  }));


   return (
    <>
    <ToastContainer/>
        <div className="row">
          <div className="col-xl-12 col-xxl-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Template Type Master</h4>
              </div>
              <div className="card-body">
                {templateTypemasterData?.postLoading ? (
                  <div style={{ height: "100px" }}>
                    <Loader classType={"absoluteLoader"} />
                  </div>
                ) : (
                  <div className="container-fluid">
                    <Formik
                      initialValues={{
                        templatetype: "",
                        description: "",
                        fileName_Rule: "",
                        enabled: "",
                        clientid:"",
                        deleted:false,
                      }}
                      validationSchema={validations}
                      onSubmit={handleSubmit}
                    >
                      {({ errors, touched }) => (
                        <Form>
                          <div className="row">
                            <div className="col-sm-4 form-group mb-2">
                              <label htmlFor="amount">
                                Template Name
                                <span className="text-danger">*</span>
                              </label>
                              <Field
                                type="text"
                                name="templatetype"
                                className={`form-control ${errors.templatetype && touched.templatetype
                                  ? "is-invalid"
                                  : ""
                                  }`}
                                placeholder="Enter Template Name"
                              />
                              <ErrorMessage
                                name="templatetype"
                                component="div"
                                className="error-message"
                              />
                            </div>

                            <div className="col-sm-4 form-group mb-2">
                              <label >
                                File Type Rule
                                <span className="text-danger">*</span>
                              </label>
                              <Field
                                type="text"
                                name="fileName_Rule"
                                className={`form-control ${errors.fileName_Rule && touched.fileName_Rule
                                  ? "is-invalid"
                                  : ""
                                  }`}
                                placeholder="Enter Discription"
                              />
                              <ErrorMessage
                                name="fileName_Rule"
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
                              <label htmlFor="status">
                                Client Name
                              <span className="text-danger">*</span>
                              </label>

                              <Field
                                name="clientid"
                                component={Dropdown}
                                options={clientOptions}
                                className={`form-select ${errors.clientid && touched.clientid
                                  ? "is-invalid"
                                  : ""
                                  }`}                              />
                              <ErrorMessage
                                name="clientid"
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
                                name="enabled"
                                component={Dropdown}
                                options={statusOptions}
                                className={`form-select ${errors.enabled && touched.enabled
                                  ? "is-invalid"
                                  : ""
                                  }`}                              />
                              <ErrorMessage
                                name="enabled"
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
    </>
  );
};

export default TemplateTypeMasterForm;
/* eslint-enable react-hooks/exhaustive-deps */
