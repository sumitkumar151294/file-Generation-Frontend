/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Components/Loader/Loader";
import Norecord from "../../Components/NoRecord/NoRecord";
import ReactPaginate from "react-paginate";
import InputField from "../../Components/InputField/InputField";
import TemplateTypeMasterForm from "./TemplateTypeMasterForm";
import Button from "../../Components/Button";
import { onGettemplateTypeMaster } from "../../Store/Slices/templateTypeMasterSlice";
const TemplateTypeMasterList = () => {
  const templateTypeMasterData = useSelector((state) => state?.templateTypeMasterReducer);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const dispatch = useDispatch();
  const handlePageChange = (selected) => {
    setPage(selected.selected + 1);
  };
  useEffect(() => {
    dispatch(onGettemplateTypeMaster());
  }, []);
  useEffect(() => {
    if (templateTypeMasterData?.gettemplateTypeMasterData) {
      setFilteredData(templateTypeMasterData?.gettemplateTypeMasterData);
    }
  }, [templateTypeMasterData?.gettemplateTypeMasterData]);
  const [filterValue, setFilterValue] = useState("");
  const [filteredData, setFilteredData] = useState(
    templateTypeMasterData?.gettemplateTypeMasterData
  );
  const handleInputChange = (e) => {
    const value = e.target.value;
    setFilterValue(value);
    const filtered = templateTypeMasterData?.gettemplateTypeMasterData.filter((item) =>
      item.type?.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };
  const handledelete = (data) => {
    console.log(data);
  };
  return (
    <div classNameName="container-fluid">

      <TemplateTypeMasterForm />
      <div className="container-fluid pt-0">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="container-fluid mt-2 mb-2">
                <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                  <div className="card-header">
                    <h4 className="card-title">Template Type List</h4>
                  </div>
                  <div className="customer-search mb-sm-0 mb-3">
                    <div className="input-group search-area">
                      <InputField
                        type="text"
                        classNameName="form-control only-high"
                        placeholder="Search here...."
                        value={filterValue}
                        onChange={handleInputChange}
                      />
                      <span classNameName="input-group-text">
                        <i classNameName="fa fa-search"></i>
                      </span>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap"></div>
                </div>
              </div>
              <div className="container-fluid">
                <div className="card-body">
                  {templateTypeMasterData?.isLoading ? (
                    <div style={{ height: "150px" }}>
                      <Loader classNameType={"absoluteLoader"} />
                    </div>
                  ) : filteredData?.length ? (
                    <div className="table-responsive">
                      <table classNameName="table header-border table-responsive-sm">
                        <thead>
                          <tr>
                            <th>Template Type</th>
                            <th>Template Type Description</th>
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
                                <td>{item.type}</td>
                                <td>{item.description}</td>
                                <td>{item.date}</td>
                                <td>
                                  <span
                                    classNameName={
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
                                  <div classNameName="d-flex">
                                  <Button
                                      classNameName="btn btn-danger shadow btn-xs sharp"
                                      onClick={() => handledelete(item)}
                                      icon={"fa fa-trash"}
                                    >
                                      <i classNameName="fa fa-trash"></i>
                                    </Button> <Button
                                      classNameName="btn btn-primary shadow btn-xs sharp me-1"
                                      onClick={() => handledelete(item)}
                                      icon="fas fa-pencil-alt"
                                    >
                                      <i classNameName="fa fa-trash"></i>
                                    </Button>

                                  </div>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                      {filteredData?.length > 5 && (
                        <div classNameName="pagination-container">
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

export default TemplateTypeMasterList;
/* eslint-enable react-hooks/exhaustive-deps */
