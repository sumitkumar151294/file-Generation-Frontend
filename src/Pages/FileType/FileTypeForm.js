/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import Button from "../../Components/Button";
import InputField from "../../Components/InputField/InputField";
import Loader from "../../Components/Loader/Loader";

import Dropdown from "../../Components/Dropdown/Dropdown";


const FileTypeForm = ({
  data,
  setData,
  isDelete,
}) => {

  const statusoptions = [
    { value: "Active" },
    { value: "Non-Active"},
  ];
  return (
    <>
      <div className="container-fluid form">
        <div className="row">
          <div className="col-xl-12 col-xxl-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">File Type</h4>
              </div>
              <div className="card-body">
                {false ? (
                  <div style={{ height: "400px" }}>
                    <Loader classType={"absoluteLoader"} />
                  </div>
                ) : (
                  <div className="container-fluid">
                    <form
                    // onSubmit={handleSubmit}
                    >
                      <div className="row">
                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="amount">
                            File type
                            <span className="text-danger">*</span>
                          </label>
                          <InputField
                            type="number"
                            name="text"
                            // value={vendorData?.balanceThresholdAmount}
                            // className={` ${
                            //   errors.balanceThresholdAmount
                            //     ? "border-danger"
                            //     : "form-control"
                            // }`}
                            className="form-control"

                            id="amominThresholdAmountunt"
                            placeholder="₹500000"
                            // onChange={(e) =>
                            //   handleChange(e, "balanceThresholdAmount")
                            // }
                          />
                        </div>

                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="availabelAmount">
                         File Extension
                            <span className="text-danger">*</span>
                          </label>
                          <InputField
                            type="number"
                            name="text"
                            // value={vendorData.creditAmount}
                            // className={` ${
                            //   errors.creditAmount
                            //     ? "border-danger"
                            //     : "form-control"
                            // }`}
                            className="form-control"

                            id="creditAmount"
                            placeholder="₹500000"
                            // onChange={(e) => handleChange(e, "creditAmount")}
                          />
                        </div>
                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="status">
                            status <span className="text-danger">*</span>
                          </label>
                          <Dropdown
                            // onChange={(e) => handleChange(e, "status")}
                            // error={errors?.enabled}
                            // value={
                            //   vendorData?.enabled
                            //     ? active
                            //     : vendorData?.enabled === undefined ||
                            //       vendorData?.enabled === ""
                            //     ? ""
                            //     : nonActive
                            // }
                            // className={`${
                            //   errors.enabled
                            //     ? "border-danger-select"
                            //     : "form-select"
                            // }`}
                            className="form-select"

                            options={statusoptions}
                          />

                        </div>
                        <div className="col-sm-12 form-group mb-0 mt-2">
                          <Button
                            text="{data.name ? update : submit}"
                            icon={"fa fa-arrow-right"}
                            className="btn btn-primary float-right pad-aa mt-2"
                          />
                          <ToastContainer />
                        </div>
                      </div>
                    </form>
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

export default FileTypeForm;
/* eslint-enable react-hooks/exhaustive-deps */
