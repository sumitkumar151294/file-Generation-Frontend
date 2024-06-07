/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Button from "../../Components/Button";
import Loader from "../../Components/Loader/Loader";
import Dropdown from "../../Components/Dropdown/Dropdown";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { onPostfileType, onPostfileTypeReset } from "../../Store/Slices/fileTypeSlice";

const FileTypeForm = () => {
  const fileTypeData = useSelector((state) => state.fileTypeReducer);
  const dispatch = useDispatch();
  const Validations = Yup.object().shape({
    fileType: Yup.string().required("File Type is required"),
    fileExtension: Yup.string().required("File Extension is required"),
    status: Yup.string().required("Status is required"),
  });
  const handleSubmit = (values) => {
    dispatch(onPostfileType(values))
  };
  useEffect(()=>{
    if(fileTypeData?.post_status_code==="201"){
      toast.success(fileTypeData.postMessage)
      dispatch(onPostfileTypeReset())
    }else if(fileTypeData?.post_status_code){
      toast.error(fileTypeData.postMessage)
      dispatch(onPostfileTypeReset())
    }
     },[fileTypeData]);
  const statusOptions = [
    { value: "Active", label: "Active" },
    { value: "Non-Active", label: "Non-Active" }
  ];
   return (
    <>
    <ToastContainer/>
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
                      initialValues={{
                        fileType: "",
                        fileExtension: "",
                        status: "",
                      }}
                      validationSchema={Validations}
                      onSubmit={handleSubmit}
                    >
                      {({ errors, touched }) => (
                        <Form>
                          <div className="row">
                            <div className="col-sm-4 form-group mb-2">
                              <label htmlFor="amount">
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
                              <label htmlFor="availabelAmount">
                              File extension
                                <span className="text-danger">*</span>
                              </label>
                              <Field
                                type="text"
                                name="fileExtension"
                                className={`form-control ${errors.fileExtension && touched.fileExtension
                                  ? "is-invalid"
                                  : ""
                                  }`}
                                placeholder="Enter File Extension"
                              />
                              <ErrorMessage
                                name="fileExtension"
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
    </>
  );
};

export default FileTypeForm;
/* eslint-enable react-hooks/exhaustive-deps */
