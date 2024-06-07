import React from "react";
import Dropdown from "../../Components/Dropdown/Dropdown";
import HtmlEditor from "../../Components/HtmlEditor/HtmlEditor";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Button from "../../Components/Button";
const TemplateMasterForm = () => {
  const statusOptions = [
    { value: "Active", label: "Active" },
    { value: "Non-Active", label: "Non-Active" },
  ];
  const validations = Yup.object().shape({
    client: Yup.string().required("Client is required"),
    templateName: Yup.string().required("Template Name is required"),
    templateContent: Yup.string().required("Template Content is required"),
    templateType: Yup.string().required("Template Type is required"),
    fileType: Yup.string().required("File Type is required"),
    status: Yup.string().required("Status is required"),
  });
  const handleSumbit = (values) => {
    debugger;
  };
  return (
    <div classNameName="d-flex">
      <div className="col-xl-8">
        <div className="card mb-4">
          <div className="card-header">
            <h4 className="card-title">Template Master</h4>
          </div>

          <div className="card-body ">
            <div className="container-fluid">
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
                    <div className="row">
                      <div className="col-sm-4 form-group mb-2">
                        <label> Client </label>
                        <Field
                          name="client"
                          component={Dropdown}
                          options={statusOptions}
                          classNameName={`form-select ${
                            errors.client && touched.client ? "is-invalid" : ""
                          }`}
                        />
                        <ErrorMessage
                          name="client"
                          component="div"
                          classNameName="error-message"
                        />
                      </div>

                      <div className="col-sm-8 form-group mb-2">
                        <label>Template Name</label>
                        <Field
                          type="text"
                          name="templateName"
                          classNameName={`form-control ${
                            errors.templateName && touched.templateName
                              ? "is-invalid"
                              : ""
                          }`}
                          placeholder="Enter Template Name"
                        />
                        <ErrorMessage
                          name="templateName"
                          component="div"
                          classNameName="error-message"
                        />
                      </div>

                      <div classNameName="form-group mb-2">
                        <label>Template Content </label>
                        <Field name="templateContent" component={HtmlEditor} />
                        <ErrorMessage
                          name="templateContent"
                          component="div"
                          classNameName="error-message"
                        />
                      </div>

                      <div className="col-sm-4 form-group mb-2">
                        <label for="pass"> Template Type </label>
                        <Field
                          name="templateType"
                          component={Dropdown}
                          options={statusOptions}
                          classNameName={`form-select ${
                            errors.templateType && touched.templateType
                              ? "is-invalid"
                              : ""
                          }`}
                        />
                        <ErrorMessage
                          name="templateType"
                          component="div"
                          classNameName="error-message"
                        />
                      </div>

                      <div className="col-sm-4 form-group mb-2">
                        <label for="pass"> File Type </label>
                        <Field
                          name="fileType"
                          component={Dropdown}
                          options={statusOptions}
                          classNameName={`form-select ${
                            errors.fileType && touched.fileType
                              ? "is-invalid"
                              : ""
                          }`}
                        />
                        <ErrorMessage
                          name="fileType"
                          component="div"
                          classNameName="error-message"
                        />
                      </div>
                      <div className="col-sm-4 form-group mb-2">
                        <label for="pass"> Status </label>
                        <Field
                          name="status"
                          component={Dropdown}
                          options={statusOptions}
                          classNameName={`form-select ${
                            errors.status && touched.status ? "is-invalid" : ""
                          }`}
                        />
                        <ErrorMessage
                          name="status"
                          component="div"
                          classNameName="error-message"
                        />
                      </div>

                      <div className="row">
                        <div className="col-sm-12 form-group mb-0 mt-2">
                          <Button
                            text="Submit"
                            icon="fa fa-arrow-right"
                            classNameName="btn btn-primary float-right pad-aa mt-2"
                          />
                        </div>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>

      <div className="col-lg-4">
        <h2>Variable Dictionary</h2>
        <div className="loafer">
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
  );
};

export default TemplateMasterForm;
