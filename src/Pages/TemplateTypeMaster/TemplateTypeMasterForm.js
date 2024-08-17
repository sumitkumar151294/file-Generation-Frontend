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
  onGettemplateTypeMaster,
  onPosttemplateTypeMaster,
  onPosttemplateTypeMasterReset,
  onUpdatetemplateTypeMaster,
} from "../../Store/Slices/templateTypeMasterSlice";
import Swal from "sweetalert2";
const statusOptions = [
  { value: true, label: "Active" },
  { value: false, label: "Non Active" },
];
const TemplateTypeMasterForm = ({ templateTypeData }) => {
  const [info, setInfo] = useState(false);
  const templateTypemasterData = useSelector(
    (state) => state.templateTypeMasterReducer
  );
  const clientMasterData = useSelector(
    (state) => state?.clientMasterReducer?.getclientMasterData
  );
  const [button, setButton] = useState("Submit");
  const [intialValue, setInitialValue] = useState({
    templateType: "",
    description: "",
    fileName_Rule: "",
    enabled: "",
    clientId: "",
  });
  const dispatch = useDispatch();
  const validations = Yup.object().shape({
    templateType: Yup.string().required("Template Name is required"),
    enabled: Yup.string().required("Status is required"),
    fileName_Rule: Yup.string().required("File Type Rule is required"),
    clientId: Yup.string().required("Client is required"),
  });
  const showAlert = (resetForm) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to Reset the Form ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        resetForm()
        setInitialValue({
          templateType: "",
          description: "",
          fileName_Rule: "",
          enabled: "",
          clientId: "",
        });
        setButton("Submit");
      }
    });
  };
  const handleSubmit = (values) => {

    const templateTypeData = {
      ...values,
      deleted: false,
      enabled: JSON.parse(values.enabled),
    };
    if (button === "Submit") {
      dispatch(onPosttemplateTypeMaster(templateTypeData));
    } else {
      dispatch(onUpdatetemplateTypeMaster(templateTypeData));
      setInitialValue({
        templateType: "",
        description: "",
        fileName_Rule: "",
        enabled: "",
        clientId: "",
      });
      setButton("Submit");
    }
  };
  useEffect(() => {
    if (templateTypemasterData?.post_status_code === "201") {
      toast.success(templateTypemasterData.postMessage);
      dispatch(onPosttemplateTypeMasterReset());
      dispatch(onGettemplateTypeMaster());
    } else if (templateTypemasterData?.post_status_code) {
      toast.error(templateTypemasterData.postMessage);
      dispatch(onPosttemplateTypeMasterReset());
    }
  }, [templateTypemasterData]);

  const clientOptions = clientMasterData
    .filter((client) => client.enabled)
    .map((clientData) => ({
      value: clientData.id,
      label: clientData.clientName,
    }));

  useEffect(() => {
    if (templateTypeData) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      setInitialValue(templateTypeData);
      setButton("Update");
    }
  }, [templateTypeData]);
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
                    {({ errors, touched,resetForm }) => (
                      <Form>
                        <div className="row">
                          <div className="col-sm-4 form-group mb-4">
                            <label>
                              Template Name
                              <span className="text-danger">*</span>
                            </label>
                            <Field
                              type="text"
                              name="templateType"
                              className={`form-control ${
                                errors.templateType && touched.templateType
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
                            <div className="flex">
                              <label>File Name Rule</label>
                              <div
                                className="info-icon"
                                onMouseEnter={() => setInfo(true)}
                                onMouseLeave={() => setInfo(false)}
                              >
                                <i
                                  className="fa fa-info-circle imginfo"
                                  aria-hidden="true"
                                ></i>
                                {info && (
                                  <div
                                    className="infoicon"
                                    style={{
                                      color: "black",
                                      bottom: "1rem",
                                      borderRadius: "1rem",
                                    }}
                                  >
                                   This is used to genrate the file <br/> name using variable name for ex:
                                   <br/>
                                    &#123;&#123;@variableName1 &#125;&#125;_&#123;&#123;@variableName2 &#125;&#125;
                                  </div>
                                )}
                              </div>
                            </div>
                            <Field
                              type="text"
                              name="fileName_Rule"
                              className={`form-control ${
                                errors.fileName_Rule && touched.fileName_Rule
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
                          </div>
                          <div className="col-sm-4 form-group mb-2">
                            <label>
                              Client Name
                              <span className="text-danger">*</span>
                            </label>

                            <Field
                              name="clientId"
                              component={Dropdown}
                              options={clientOptions}
                              className={`form-select ${
                                errors.clientId && touched.clientId
                                  ? "is-invalid"
                                  : ""
                              }`}
                            />
                            <ErrorMessage
                              name="clientId"
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
                            <div className="d-flex">
                              <Button
                                text={button}
                                icon="fa fa-arrow-right"
                                className="btn btn-primary float-right pad-aa mt-2"
                              />
                              <Button
                                text={"Reset"}
                                icon="fa fa-refresh"
                                onClick={(e) => {
                                  e.preventDefault(); // Prevent form submission
                                  showAlert(resetForm); // Call the reset handler
                                }}
                                className="btn btn-primary float-right pad-aa mt-2 ml-6"
                              />
                            </div>
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
