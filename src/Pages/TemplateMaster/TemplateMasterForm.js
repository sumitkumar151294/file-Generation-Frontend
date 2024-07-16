/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from "react";
import Dropdown from "../../Components/Dropdown/Dropdown";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Select from "react-select";
import * as Yup from "yup";
import Button from "../../Components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  onGettemplateMaster,
  onPosttemplateMaster,
  onPosttemplateMasterReset,
  onUpdatetemplateMaster,
} from "../../Store/Slices/templateMasterSlice";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../../Components/Loader/Loader";
import VariableDictionary from "../VariableDictionary/VariableDictionary";
import { onGetclientMaster } from "../../Store/Slices/clientMasterSlice";
import { onGettemplateTypeMaster } from "../../Store/Slices/templateTypeMasterSlice";
import { onGetfileType } from "../../Store/Slices/fileTypeSlice";
import { onPosttemplateVariableMaster, onUpdatetemplateVariableMaster } from "../../Store/Slices/templateVariableMasterSlice";
import HtmlEditor from "../../Components/HtmlEditor/HtmlEditor";
import Swal from 'sweetalert2';
const statusOptions = [
  { value: true, label: "Active" },
  { value: false, label: "Non Active" },
];
const TemplateMasterForm = ({ templateMaster, variableMaster }) => {
  const [error, setError] = useState("");
  const [intialValue, setInitialValue] = useState({
    clientId: "",
    templateName: "",
    templateContent: "",
    templateTypeId: "",
    fileTypeId: "",
    enabled: "",
    isChild: "",
    childTemplateId: [],
  });
  const [tempContent, setTempContent] = useState("");
  const [variableUsed, setVariableUsed] = useState([]);
  const [TemplateType, setTemplateType] = useState("");
  const [button, setButton] = useState("Submit");
  const dispatch = useDispatch();
  const clientMasterData = useSelector(
    (state) => state?.clientMasterReducer?.getclientMasterData
  );
  const showAlert = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'All previous data of Template Content Will be Removed',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        setTempContent("")
      }
    });
  };
  var updatedVariables = variableMaster?.map(item => {
    return variableUsed?.includes(item.variableId) ? { id: item.id, variableId: item.variableId, templateId: item.templateId } : { id: item.id, isremoved: true, variableId: item.variableId, templateId: item.templateId };
  });

  const templateTypeMasterData = useSelector(
    (state) => state?.templateTypeMasterReducer?.gettemplateTypeMasterData
  );

  const fileTypeData = useSelector(
    (state) => state?.fileTypeReducer?.getfileTypeData
  );
  const templateMasterData = useSelector(
    (state) => state.templateMasterReducer
  );

  const clientOptions = clientMasterData
    ?.filter((clientData) => clientData?.enabled)
    .map((clientData) => ({
      value: clientData?.id,
      label: clientData?.clientName,
    }));
  const templateTypeOptions = templateTypeMasterData
    ?.filter((templateType) => templateType?.enabled)
    .map((templateType) => ({
      value: templateType?.id,
      label: templateType?.templateType,
    }));
  const fileTypeOptions = fileTypeData
    ?.filter((fileTypeData) => fileTypeData?.enabled)
    .map((fileTypeData) => ({
      value: fileTypeData?.id,
      label: fileTypeData?.fileType,
    }));
  const templateMasterOptions = templateMasterData?.gettemplateMasterData
    ?.filter((templateMaster) => templateMaster?.enabled && templateMaster?.isChild)
    .map((templateMaster) => ({
      value: templateMaster?.id,
      label: templateMaster?.templateName,
    }));
  const validations = Yup.object().shape({
    clientId: Yup.string().required("Client is required"),
    templateName: Yup.string().required("Template Name is required"),
    templateTypeId: Yup.string().required("Template Type is required"),
    fileTypeId: Yup.string().required("File Type is required"),
    enabled: Yup.string().required("Status is required"),
  });
  const templateVariableData = variableUsed.map(variable => ({
    enabled: true,
    deleted: false,
    createdBy: 0,
    updatedBy: 0,
    templateId: templateMasterData?.postData?.[0]?.id,
    variableId: variable
  }));
  const updatevariables = updatedVariables?.map(variable => ({
    enabled: variable.isremoved ? false : true,
    deleted: false,
    createdBy: 0,
    updatedBy: 0,
    templateId: variable?.templateId,
    variableId: variable.variableId,
    id: variable.id
  }));
  const handleSumbit = (values) => {
    if (!tempContent) {
      setError("Templent Content is required");
    } else {
      const templateMasterData = {
        ...values,
        templateContent: tempContent,
        enabled: values.enabled ? true : false,
        deleted: false,
        isChild: values.isChild ? true : false,
        childTemplateId: Array.isArray(values.childTemplateId)
          ? values.childTemplateId.join(",")
          : values.childTemplateId.length ? values.childTemplateId : "",
      };
      if (button === "Submit") {
        dispatch(onPosttemplateMaster(templateMasterData));
        setTempContent(null)
      } else {
        dispatch(onUpdatetemplateMaster(templateMasterData));
        dispatch(onUpdatetemplateVariableMaster(updatevariables))
        setInitialValue({
          clientId: "",
          templateName: "",
          templateTypeId: "",
          fileTypeId: "",
          enabled: "",
          isChild: "",
        });
        setTempContent("");
        setButton("Submit");
      }
    }
  };
  useEffect(() => {
    if (templateMasterData?.post_status_code === "201") {
      toast.success(templateMasterData.postMessage);
      dispatch(onPosttemplateVariableMaster(templateVariableData))
      dispatch(onGettemplateMaster());
      dispatch(onPosttemplateMasterReset());
      setTemplateType("");
    } else if (templateMasterData?.post_status_code) {
      toast.error(templateMasterData.postMessage);
      dispatch(onPosttemplateMasterReset());
    }else if (templateMasterData?.update_status_code === "201") {
      setTemplateType("")
    }
  }, [templateMasterData]);
  useEffect(() => {
    if (templateMaster) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      setInitialValue(templateMaster);
      setTempContent(templateMaster?.templateContent);
      setButton("Update");
      setTemplateType(templateMaster?.templateTypeId)
    }
  }, [templateMaster]);
  useEffect(() => {
    const fetchData = async () => {
      if (!clientMasterData?.length) {
        dispatch(onGetclientMaster());
      }
      if (!templateTypeMasterData?.length) {
        dispatch(onGettemplateTypeMaster());
      }
      if (!fileTypeData?.lengt) {
        dispatch(onGetfileType());
      }
    };
    fetchData();
  }, []);
  const handleTemplateTypeChange = (value) => {
    const number = Number(value)
    if (templateMaster || tempContent) {
      if (templateMaster?.templateTypeId === number) {
        setTemplateType(number);
      } else {
        setTemplateType(number);
        showAlert()
      }
    } else {
      setTemplateType(number);
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="row">

        <div className="col-xl-8">
          <div className="card mb-4">

            <div className="card-header">


              <h4 className="card-title">Template Master</h4>
            </div>
            <div className="card-body ">
              {templateMasterData?.postLoading ? (
                <div style={{ height: "200px" }}>
                  <Loader classType={"absoluteLoader"} />
                </div>
              ) : (
                <div className="container-fluid">
                  <Formik
                    initialValues={intialValue}
                    enableReinitialize={true}
                    validationSchema={validations}
                    onSubmit={handleSumbit}
                  >
                    {({
                      errors,
                      touched,
                      values,
                      setFieldValue,
                      handleChange,
                    }) => (

                      <Form>
                        <div className="row">
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
                              onChange={handleTemplateTypeChange}
                            />
                            <ErrorMessage
                              name="templateTypeId"
                              component="div"
                              className="error-message"
                            />
                          </div>
                          <div className="col-sm-6 form-group mb-2">
                            <label>Template Name</label>
                            <span className="text-danger">*</span>

                            <Field
                              type="text"
                              name="templateName"
                              className={`form-control ${errors.templateName && touched.templateName
                                ? "is-invalid"
                                : ""
                                }`}
                              placeholder="Enter Template Name"
                              disabled={!values.templateTypeId}
                            />
                            <ErrorMessage
                              name="templateName"
                              component="div"
                              className="error-message"
                            />
                          </div>

                          <div className="form-group mb-2">
                            <label>Template Content </label>
                            <HtmlEditor
                              data={tempContent}
                              setData={setTempContent}
                              setVariableUsed={setVariableUsed}
                              variableUsed={variableUsed}
                              disabled={!values.templateTypeId}
                              TemplateType={TemplateType}
                            />
                            <p className="error-message">{error}</p>
                          </div>
                          <div className="col-lg-4 py-4">
                            <div className="form-check  mb-2 padd">
                              <Field
                                type="checkbox"
                                className="form-check-input"
                                name="isChild"
                                onChange={(e) => {
                                  setFieldValue("isChild", e.target.checked);
                                  if (e.target.checked) {
                                    setFieldValue("childTemplateId", []); // Reset dropdown value
                                  }
                                }}
                                disabled={!values.templateTypeId}


                              />
                              <label className="px-1">Child Template</label>
                            </div>
                          </div>
                          <div className="col-sm-4 form-group mb-2">
                            <label >Select Child Template</label>
                            <Field name="childTemplateId">
                              {({ field }) => (
                                <Select
                                  {...field}
                                  options={templateMasterOptions}
                                  isMulti
                                  className={`form-select  ${errors.childTemplateId &&
                                    touched.childTemplateId
                                    ? "is-invalid"
                                    : ""
                                    }`}
                                  onChange={(selectedOption) => {
                                    handleChange({
                                      target: {
                                        name: "childTemplateId",
                                        value: selectedOption.map(
                                          (option) => option.value
                                        ),
                                      },
                                    });
                                  }}
                                  value={templateMasterOptions?.filter(
                                    (option) =>
                                      field.value?.includes(option?.value)
                                  )}
                                  isDisabled={
                                    values?.isChild ||
                                    !templateMasterOptions?.length || !values.templateTypeId
                                  }
                                  maxMenuHeight={150}


                                />
                              )}
                            </Field>
                          </div>

                          <div className="col-sm-4 form-group mb-2">
                            <label> Client Name</label>
                            <span className="text-danger">*</span>

                            <Field
                              name="clientId"
                              component={Dropdown}
                              options={clientOptions}
                              className={`form-select ${errors.clientId && touched.clientId
                                ? "is-invalid"
                                : ""
                                }`}
                              disabled={!values.templateTypeId}

                            />
                            <ErrorMessage
                              name="clientId"
                              component="div"
                              className="error-message"
                            />
                          </div>


                          <div className="col-sm-4 form-group mb-2">
                            <label for="pass"> File Type </label>
                            <span className="text-danger">*</span>

                            <Field
                              name="fileTypeId"
                              component={Dropdown}
                              options={fileTypeOptions}
                              className={`form-select ${errors.fileTypeId && touched.fileTypeId
                                ? "is-invalid"
                                : ""
                                }`}
                              disabled={!values.templateTypeId}

                            />
                            <ErrorMessage
                              name="fileTypeId"
                              component="div"
                              className="error-message"
                            />
                          </div>
                          <div className="col-sm-4 form-group mb-2">
                            <label for="pass"> Status </label>
                            <span className="text-danger">*</span>

                            <Field
                              name="enabled"
                              component={Dropdown}
                              options={statusOptions}
                              className={`form-select ${errors.enabled && touched.enabled
                                ? "is-invalid"
                                : ""
                                }`}
                              disabled={!values.templateTypeId}

                            />
                            <ErrorMessage
                              name="enabled"
                              component="div"
                              className="error-message"
                            />
                          </div>

                          <div className="row">
                            <div className="col-sm-12 form-group mb-0 mt-2">
                              <Button
                                disabled={!values.templateTypeId}
                                text={button}
                                icon="fa fa-arrow-right"
                                className="btn btn-primary float-right pad-aa mt-2"
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
        <VariableDictionary variableUsed={variableUsed} TemplateType={TemplateType} />
      </div>
    </>
  );
};

export default TemplateMasterForm;
/* eslint-enable react-hooks/exhaustive-deps */
