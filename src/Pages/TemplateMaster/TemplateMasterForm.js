import React from "react";
import Dropdown from "../../Components/Dropdown/Dropdown";
import HtmlEditor from "../../Components/HtmlEditor/HtmlEditor";
const TemplateMasterForm = () => {
  const statusOptions = [
    { value: "Active", label: "Active" },
    { value: "Non-Active", label: "Non-Active" }]
  return (
    <div class="row">
      <div class="col-xl-8">
        <div class="card mb-4">
          <div class="card-header">
            <h4 class="card-title">Template Master</h4>
          </div>

          <div class="card-body ">
            <div class="container-fluid">
              <div class="row">
              <div class="col-sm-4 form-group mb-2">
                  <label for="pass"> Template Type </label>
                <Dropdown
                className="form-select"
                options={statusOptions}
                />
                </div>

                <div class="col-sm-8 form-group mb-2">
                  <label for="status">Template Name</label>
                  <input
                    type="text"
                    name="code"
                    class="form-control"
                    id="code"
                    placeholder="Enter Template Name"
                    required
                  />
                </div>

                <div className="form-group mb-2">
                  <label htmlFor="name-f">Template Content </label>

                  <HtmlEditor />
                </div>

                <div class="col-sm-4 form-group mb-2">
                  <label for="pass"> Template Type </label>
                <Dropdown
                className="form-select"
                options={statusOptions}
                />
                </div>

                <div class="col-sm-4 form-group mb-2">
                  <label for="pass"> Template Type </label>
                <Dropdown
                className="form-select"
                options={statusOptions}
                />
                </div>
                <div class="col-sm-4 form-group mb-2">
                  <label for="pass"> Template Type </label>
                <Dropdown
                className="form-select"
                options={statusOptions}
                />
                </div>

                <div class="row">
                  <div class="col-sm-12 form-group mb-0 mt-2">
                    <button class="btn btn-primary float-right pad-aa">
                      Submit <i class="fa fa-arrow-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
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
  );
};

export default TemplateMasterForm;
