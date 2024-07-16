/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Button from "../../Components/Button/Button";
import Loader from "../../Components/Loader/Loader";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { onGetVariable, onPostVariable, onPostVariableReset } from "../../Store/Slices/variableSlice";
import Dropdown from "../../Components/Dropdown/Dropdown";

const VariableDictionaryForm = () => {
  const variableData = useSelector((state) => state.variableReducer);
  const templateTypeMasterData = useSelector(
    (state) => state?.templateTypeMasterReducer?.gettemplateTypeMasterData
  );
  const dispatch = useDispatch();
  const variableValidations = Yup.object().shape({
    variable: Yup.string().required("Variable is required"),
    variableName: Yup.string().required("Variable Name is required"),
    templateTypeId: Yup.string().required("Template Type is required"),
  });
  const templateTypeOptions = templateTypeMasterData
  ?.filter((templateType) => templateType?.enabled)
  .map((templateType) => ({
    value: templateType?.id,
    label: templateType?.templateType,
  }));
  const handleSubmit = (values) => {
      dispatch(onPostVariable(values));
  };
  useEffect(() => {
    if (variableData?.post_status_code === "201") {
      toast.success(variableData.postMessage)
      dispatch(onPostVariableReset())
      dispatch(onGetVariable())
    } else if (variableData?.post_status_code) {
      toast.error(variableData.postMessage)
      dispatch(onPostVariableReset())
    }
  }, [variableData])
  return (
    <>
      <div className="row">
        <div className="col-xl-12 col-xxl-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Variable Dictionary</h4>
            </div>
            <div className="card-body">
              {variableData?.postLoading ? (
                <div style={{ height: "150px" }}>
                  <Loader classType={"absoluteLoader"} />
                </div>
              ) : (
                <div className="container-fluid">
                  <Formik
                    initialValues={{
                      variable: "",
                      variableName: "",
                      templateTypeId:"",
                      deleted: false
                    }}
                    validationSchema={variableValidations}
                    onSubmit={handleSubmit}
                  >
                    {({ errors, touched, setFieldValue }) => (
                      <Form>
                        <div className="row">
                          <div className="col-sm-4 form-group mb-2">
                            <label >
                              Variable Name
                              <span className="text-danger">*</span>
                            </label>
                            <Field
                              type="text"
                              name="variableName"
                              className={`form-control ${errors.variableName && touched.variableName
                                  ? "is-invalid"
                                  : ""
                                }`}
                              onChange={(e) => {
                                setFieldValue('variableName', e.target.value.startsWith('@') ? e.target.value : '@' + e.target.value);
                              }}
                              placeholder="Enter Variable Name"
                            />
                            <ErrorMessage
                              name="variable_name"
                              component="div"
                              className="error-message"
                            />
                          </div>

                          <div className="col-sm-4 form-group mb-2">
                            <label >
                              Variable
                              <span className="text-danger">*</span>
                            </label>
                            <Field
                              type="text"
                              name="variable"
                              className={`form-control ${errors.variable && touched.variable
                                  ? "is-invalid"
                                  : ""
                                }`}
                              placeholder="Enter Variable"

                            />
                            <ErrorMessage
                              name="variable"
                              component="div"
                              className="error-message"
                            />
                          </div>
                          <div className="col-sm-4 form-group mb-2">
                            <label for="pass"> Template Type </label>
                            <span className="text-danger">*</span>

                            <Field
                              name="templateTypeId"
                              component={Dropdown}
                              options={templateTypeOptions}
                              className={`form-select ${errors.templateTypeId && touched.templateTypeId
                                  ? "is-invalid"
                                  : ""
                                }`}
                            />
                            <ErrorMessage
                              name="templateTypeId"
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
    </>
  );
};

export default VariableDictionaryForm;
/* eslint-enable react-hooks/exhaustive-deps */
