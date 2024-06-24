/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Components/Loader/Loader";
import Norecord from "../../Components/NoRecord/NoRecord";
import ReactPaginate from "react-paginate";
import InputField from "../../Components/InputField/InputField";
import Button from "../../Components/Button/Button";
import TemplateMasterForm from "./TemplateMasterForm";
import { onGettemplateMaster } from "../../Store/Slices/templateMasterSlice";
const ClientMasterList = () => {
  const templateMasterData = useSelector((state) => state?.templateMasterReducer);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const dispatch = useDispatch();
  const handlePageChange = (selected) => {
    setPage(selected.selected + 1);
  };
  useEffect(() => {
    dispatch(onGettemplateMaster());
  }, []);
  useEffect(() => {
    if (templateMasterData?.gettemplateMasterData) {
      setFilteredData(templateMasterData?.gettemplateMasterData);
    }
  }, [templateMasterData?.gettemplateMasterData]);
  const [filterValue, setFilterValue] = useState("");
  const [filteredData, setFilteredData] = useState(
    templateMasterData?.gettemplateMasterData
  );
  const handleInputChange = (e) => {
    const value = e.target.value;
    setFilterValue(value);
    const filtered = templateMasterData?.gettemplateMasterData.filter((item) =>
      item.templateName?.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };
  const handledelete = (data) => {
    console.log(data);
  };
  return (
    <div className="container-fluid">

      <TemplateMasterForm />
      <div className="container-fluid pt-0">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="container-fluid mt-2 mb-2">
                <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                  <div className="card-header">
                    <h4 className="card-title">Template Master List</h4>
                  </div>
                  <div className="customer-search mb-sm-0 mb-3">
                    <div className="input-group search-area">
                      <InputField
                        type="text"
                        className="form-control only-high"
                        placeholder="Search here...."
                        value={filterValue}
                        onChange={handleInputChange}
                      />
                      <span className="input-group-text">
                        <i className="fa fa-search"></i>
                      </span>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap"></div>
                </div>
              </div>
              <div className="container-fluid">
                <div className="card-body">
                  {templateMasterData?.isLoading ? (
                    <div style={{ height: "150px" }}>
                      <Loader classType={"absoluteLoader"} />
                    </div>
                  ) : filteredData?.length ? (
                    <div className="table-responsive">
                      <table className="table header-border table-responsive-sm">
                        <thead>
                          <tr>
                            <th>Client Code</th>
                            <th>File Type</th>
                            <th>Template Name</th>
                            <th>Template type</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredData
                            .slice(startIndex, endIndex)
                            .map((item, index) => (
                              <tr key={index}>
                                <td>{item.clientCode}</td>
                                <td>{item.fileType}</td>
                                <td>{item.templateName}</td>
                                <td>{item.templateType}</td>
                                <td>{item.date}</td>
                                <td>
                                  <span
                                    className={
                                      item.status === "Active"
                                        ? "badge badge-success"
                                        : "badge badge-danger"
                                    }
                                  >
                                    {item.status === "Active"
                                      ? "active"
                                      : "nonActive"}
                                  </span>
                                </td>
                                <td>
                                  <div className="d-flex">
                                    <Button
                                      className="btn btn-danger shadow btn-xs sharp"
                                      onClick={() => handledelete(item)}
                                      icon={"fa fa-trash"}
                                    >
                                      <i className="fa fa-trash"></i>
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                      {filteredData.length > 5 && (
                        <div className="pagination-container">
                          <ReactPaginate
                            previousLabel={"<"}
                            nextLabel={" >"}
                            breakLabel={"..."}
                            pageCount={Math.ceil(
                              filteredData.length / rowsPerPage
                            )}
                            marginPagesDisplayed={2}
                            onPageChange={handlePageChange}
                            containerClassName={"pagination"}
                            activeClassName={"active"}
                            initialPage={page - 1}
                            previousClassName={
                              page === 0 ? "disabled_Text" : ""
                            }
                          />
                        </div>
                      )}
                    </div>
                  ) : (
                    <Norecord />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
  );
};

export default ClientMasterList;
/* eslint-enable react-hooks/exhaustive-deps */
