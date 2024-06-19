/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect } from "react";
import Dropdown from "../../Components/Dropdown/Dropdown";
import HtmlEditor from "../../Components/HtmlEditor/HtmlEditor";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Button from "../../Components/Button";
import { useDispatch, useSelector } from "react-redux";
import { onPosttemplateMaster, onPosttemplateMasterReset } from "../../Store/Slices/templateMasterSlice";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../../Components/Loader/Loader";
const TemplateMasterForm = () => {
  const dispatch=useDispatch();
  const statusOptions = [
    { value: "Active", label: "Active" },
    { value: "Non-Active", label: "Non Active" },
  ];
  const templateMasterData=useSelector(state=>state.templateMasterReducer)
  const validations = Yup.object().shape({
    client: Yup.string().required("Client is required"),
    templateName: Yup.string().required("Template Name is required"),
    templateContent: Yup.string().required("Template Content is required"),
    templateType: Yup.string().required("Template Type is required"),
    fileType: Yup.string().required("File Type is required"),
    status: Yup.string().required("Status is required"),
  });
  const handleSumbit = (values) => {
  if(values){
dispatch(onPosttemplateMaster(values))
  }
  };
  useEffect(()=>{
    if(templateMasterData?.post_status_code==="201"){
      toast.success(templateMasterData.postMessage)
      dispatch(onPosttemplateMasterReset())
    }else if(templateMasterData?.post_status_code){
      toast.error(templateMasterData.postMessage)
      dispatch(onPosttemplateMasterReset())
    }
     },[templateMasterData]);
  return (
    <>

    <ToastContainer/>
    <div className="row">
      <div class="col-xl-8">
        <div class="card mb-4">
          <div class="card-header">
            <h4 class="card-title">Template Master</h4>
          </div>
          <div class="card-body ">
          {templateMasterData?.postLoading ? (
                  <div style={{ height: "200px" }}>
                    <Loader classType={"absoluteLoader"} />
                  </div>
                ) : (
            <div class="container-fluid">
              <Formik
                initialValues={{
                  client: "",
                  templateName: "",
                  templateContent: "",
                  templateType: "",
                  fileType: "",
                  status: "",
                }}
                validationSchema={validations}
                onSubmit={handleSumbit}
              >
                {({ errors, touched }) => (
                  <Form>
                    <div class="row">
                      <div class="col-sm-4 form-group mb-2">
                        <label> Client </label>
                        <Field
                          name="client"
                          component={Dropdown}
                          options={statusOptions}
                          className={`form-select ${
                            errors.client && touched.client ? "is-invalid" : ""
                          }`}
                        />
                        <ErrorMessage
                          name="client"
                          component="div"
                          className="error-message"
                        />
                      </div>

                      <div class="col-sm-8 form-group mb-2">
                        <label>Template Name</label>
                        <Field
                          type="text"
                          name="templateName"
                          className={`form-control ${
                            errors.templateName && touched.templateName
                              ? "is-invalid"
                              : ""
                          }`}
                          placeholder="Enter Template Name"
                        />
                        <ErrorMessage
                          name="templateName"
                          component="div"
                          className="error-message"
                        />
                      </div>

                      <div className="form-group mb-2">
                        <label>Template Content </label>
                        <Field name="templateContent" component={HtmlEditor} />
                        <ErrorMessage
                          name="templateContent"
                          component="div"
                          className="error-message"
                        />
                      </div>

                      <div class="col-sm-4 form-group mb-2">
                        <label for="pass"> Template Type </label>
                        <Field
                          name="templateType"
                          component={Dropdown}
                          options={statusOptions}
                          className={`form-select ${
                            errors.templateType && touched.templateType
                              ? "is-invalid"
                              : ""
                          }`}
                        />
                        <ErrorMessage
                          name="templateType"
                          component="div"
                          className="error-message"
                        />
                      </div>

                      <div class="col-sm-4 form-group mb-2">
                        <label for="pass"> File Type </label>
                        <Field
                          name="fileType"
                          component={Dropdown}
                          options={statusOptions}
                          className={`form-select ${
                            errors.fileType && touched.fileType
                              ? "is-invalid"
                              : ""
                          }`}
                        />
                        <ErrorMessage
                          name="fileType"
                          component="div"
                          className="error-message"
                        />
                      </div>
                      <div class="col-sm-4 form-group mb-2">
                        <label for="pass"> Status </label>
                        <Field
                          name="status"
                          component={Dropdown}
                          options={statusOptions}
                          className={`form-select ${
                            errors.status && touched.status ? "is-invalid" : ""
                          }`}
                        />
                        <ErrorMessage
                          name="status"
                          component="div"
                          className="error-message"
                        />
                      </div>

                      <div class="row">
                        <div class="col-sm-12 form-group mb-0 mt-2">
                          <Button
                            text="Submit"
                            icon="fa fa-arrow-right"
                            className="btn btn-primary float-right pad-aa mt-2"
                          />
                        </div>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>)}
          </div>
        </div>
      </div>

      <div class="col-lg-4">
        <h2>Variable Dictionary</h2>
        <div class="loafer">
          <table>
            <thead>
              <tr>
                <th scope="col">Variable Name</th>
                <th scope="col">Variable</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td data-label="Account">name</td>
                <td data-label="Account">@name</td>
              </tr>
              <tr>
                <td data-label="Account">username</td>
                <td data-label="Account">@username</td>
              </tr>
              <tr>
                <td data-label="Account">orderno</td>
                <td data-label="Account">@orderno</td>
              </tr>
              <tr>
                <td data-label="Account">otp</td>
                <td data-label="Account">@otp</td>
              </tr>
              <tr>
                <td data-label="Account">totalpoint</td>
                <td data-label="Account">@totalpoint</td>
              </tr>
              <tr>
                <td data-label="Account">total quantity</td>
                <td data-label="Account">@totalqty</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>
  );
};

export default TemplateMasterForm;
/* eslint-enable react-hooks/exhaustive-deps */

