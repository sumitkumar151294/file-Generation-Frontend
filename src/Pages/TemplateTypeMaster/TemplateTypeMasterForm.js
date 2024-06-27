/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Button from "../../Components/Button/Button";
import Loader from "../../Components/Loader/Loader";
import Dropdown from "../../Components/Dropdown/Dropdown";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { onGettemplateTypeMaster, onPosttemplateTypeMaster, onPosttemplateTypeMasterReset, onUpdatetemplateTypeMaster } from "../../Store/Slices/templateTypeMasterSlice";
const statusOptions = [
  { value: true, label: "Active" },
  { value: false, label: "Non Active" }
];
const TemplateTypeMasterForm = ({ templateTypeData }) => {
  const templateTypemasterData = useSelector((state) => state.templateTypeMasterReducer);
  const clientMasterData = useSelector((state) => state?.clientMasterReducer?.getclientMasterData);
  const [button, setButton] = useState("Submit");
  const [intialValue, setInitialValue] = useState({
    templateType: "",
    description: "",
    fileName_Rule: "",
    enabled: "",
    clientId: "",

  })
  const dispatch = useDispatch();
  const validations = Yup.object().shape({
    templateType: Yup.string().required("Template Name is required"),
    enabled: Yup.string().required("Status is required"),
    fileName_Rule: Yup.string().required("File Type Rule is required"),
    clientId: Yup.string().required("Client is required"),
  });
  const handleSubmit = (values) => {
    const templateTypeData = {
      ...values,
      deleted: false,
      enabled: values.enabled === "true" ? true : false,
    };
    if (button === "Submit") {
      dispatch(onPosttemplateTypeMaster(templateTypeData))
    } else {
      dispatch(onUpdatetemplateTypeMaster(templateTypeData))
      setInitialValue({
        templateType: "",
        description: "",
        fileName_Rule: "",
        enabled: "",
        clientId: "",
      })
      setButton("Submit")
    }
  };
  useEffect(() => {
    if (templateTypemasterData?.post_status_code === "201") {
      toast.success(templateTypemasterData.postMessage)
      dispatch(onPosttemplateTypeMasterReset())
      dispatch(onGettemplateTypeMaster())
    } else if (templateTypemasterData?.post_status_code) {
      toast.error(templateTypemasterData.postMessage)
      dispatch(onPosttemplateTypeMasterReset())
    }

  }, [templateTypemasterData]);


  const clientOptions = clientMasterData.map(clientData => ({
    value: clientData.id,
    label: clientData.clientName
  }));

  useEffect(() => {
    if (templateTypeData) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      setInitialValue(templateTypeData)
      setButton("Update")
    }
  }, [templateTypeData])
  return (
    <>
      <ToastContainer />
      <div className="row">
        <div className="col-xl-12 col-xxl-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Template Type Master</h4>
            </div>
            <div className="card-body">
              {templateTypemasterData?.postLoading ? (
                <div style={{ height: "200px" }}>
                  <Loader classType={"absoluteLoader"} />
                </div>
              ) : (
                <div className="container-fluid">
                  <Formik
                    initialValues={intialValue}
                    validationSchema={validations}
                    onSubmit={handleSubmit}
                    enableReinitialize={true}
                  >
                    {({ errors, touched }) => (
                      <Form>
                        <div className="row">
                          <div className="col-sm-4 form-group mb-2">
                            <label>
                              Template Name
                              <span className="text-danger">*</span>
                            </label>
                            <Field
                              type="text"
                              name="templateType"
                              className={`form-control ${errors.templateType && touched.templateType
                                ? "is-invalid"
                                : ""
                                }`}
                              placeholder="Enter Template Name"
                            />
                            <ErrorMessage
                              name="templateType"
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
                              placeholder="Enter File Type Rule "
                            />
                            <ErrorMessage
                              name="fileName_Rule"
                              component="div"
                              className="error-message"
                            />
                          </div>
                          <div className="col-sm-4 form-group mb-2">
                            <label >
                              Description
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
                          </div>
                          <div className="col-sm-4 form-group mb-2">
                            <label >
                              Client Name
                              <span className="text-danger">*</span>
                            </label>

                            <Field
                              name="clientId"
                              component={Dropdown}
                              options={clientOptions}
                              className={`form-select ${errors.clientId && touched.clientId
                                ? "is-invalid"
                                : ""
                                }`} />
                            <ErrorMessage
                              name="clientId"
                              component="div"
                              className="error-message"
                            />

                          </div>
                          <div className="col-sm-4 form-group mb-2">
                            <label >
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
                                }`} />
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

export default TemplateTypeMasterForm;
/* eslint-enable react-hooks/exhaustive-deps */
