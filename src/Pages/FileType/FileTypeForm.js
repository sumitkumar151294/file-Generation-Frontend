/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Button from "../../Components/Button/Button";
import Loader from "../../Components/Loader/Loader";
import Dropdown from "../../Components/Dropdown/Dropdown";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { onGetfileType, onPostfileType, onPostfileTypeReset, onUpdatefileType } from "../../Store/Slices/fileTypeSlice";
import Swal from "sweetalert2";

const FileTypeForm = ({ fileData }) => {

  const [button, setButton] = useState("Submit");
  const fileTypeData = useSelector((state) => state.fileTypeReducer);
  const dispatch = useDispatch();
  const Validations = Yup.object().shape({
    fileType: Yup.string().required("File Type is required"),
    extension: Yup.string()
      .required("File Extension is required")
      .test(
        'is-pdf',
        'Only pdf File Extension is accepted',
        value => value.toLowerCase().endsWith('pdf')
      ),
    enabled: Yup.string().required("Status is required"),
  });
  const [intialValue, setInitialValue] = useState({
    fileType: "",
    extension: "",
    enabled: "",
  })

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
          fileType: "",
          extension: "",
          enabled: "",
        });
        setButton("Submit");
      }
    });
  };
  const handleSubmit = (values) => {
    const fileTypeDatas = {
      ...values,
      deleted: false,
      enabled: JSON.parse(values.enabled),
    }
      if (button === "Submit") {
        if(fileTypeData?.getfileTypeData?.filter(fileType=>fileType?.extension==="pdf")?.length){
        toast.error("File Extension with same name already exists")
        }else{
          dispatch(onPostfileType(fileTypeDatas))
        }
      } else {
        setInitialValue(
          {
            fileType: "",
            extension: "",
            enabled: "",
          }
        )
        setButton("Submit")
        dispatch(onUpdatefileType(fileTypeDatas))
      }


  };
  useEffect(() => {
    if (fileTypeData?.post_status_code === "200") {
      toast.success(fileTypeData.postMessage)
      dispatch(onGetfileType())
      dispatch(onPostfileTypeReset())
    } else if (fileTypeData?.post_status_code) {
      toast.error(fileTypeData.postMessage)
      dispatch(onPostfileTypeReset())
    }
  }, [fileTypeData]);
  const statusOptions = [
    { value: true, label: "Active" },
    { value: false, label: "Non Active" }
  ];
  useEffect(() => {
    if (fileData) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      setInitialValue(fileData);
      setButton("Update");
    }
  }, [fileData])
  return (
    <>
      <ToastContainer />
      <div className="row">
        <div className="col-xl-12 col-xxl-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">File Type</h4>
            </div>
            <div className="card-body">
              {fileTypeData?.postLoading ? (
                <div style={{ height: "200px" }}>
                  <Loader classType={"absoluteLoader"} />
                </div>
              ) : (
                <div className="container-fluid">
                  <Formik
                    initialValues={intialValue}
                    validationSchema={Validations}
                    onSubmit={handleSubmit}
                    enableReinitialize={true}

                  >
                    {({ errors, touched ,resetForm}) => (
                      <Form>
                        <div className="row">
                          <div className="col-sm-4 form-group mb-2">
                            <label >
                              File Type
                              <span className="text-danger">*</span>
                            </label>
                            <Field
                              type="text"
                              name="fileType"
                              className={`form-control ${errors.fileType && touched.fileType
                                ? "is-invalid"
                                : ""
                                }`}
                              placeholder="Enter File Type"
                            />
                            <ErrorMessage
                              name="fileType"
                              component="div"
                              className="error-message"
                            />
                          </div>

                          <div className="col-sm-4 form-group mb-2">
                            <label >
                              File extension
                              <span className="text-danger">*</span>
                            </label>
                            <Field
                              type="text"
                              name="extension"
                              className={`form-control ${errors.extension && touched.extension
                                ? "is-invalid"
                                : ""
                                }`}
                              placeholder="Enter File Extension"
                            />
                            <ErrorMessage
                              name="extension"
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
                              className={`form-select ${errors.enabled && touched.enabled ? "is-invalid" : ""
                                }`} />
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

export default FileTypeForm;
/* eslint-enable react-hooks/exhaustive-deps */
