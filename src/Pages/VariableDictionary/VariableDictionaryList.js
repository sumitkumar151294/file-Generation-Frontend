/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import VariableDictionaryForm from "./VariableDictionaryForm";
import { useDispatch, useSelector } from "react-redux";
import { onGetVariable } from "../../Store/Slices/variableSlice";
import Loader from "../../Components/Loader/Loader";
import Norecord from '../../Components/NoRecord/NoRecord'
import ReactPaginate from "react-paginate";
import InputField from "../../Components/InputField/InputField";
const VariableDictionaryList = () => {
  const variableData = useSelector((state) => state?.variableReducer);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(onGetVariable());
  }, []);

  const handlePageChange = (selected) => {
    setPage(selected.selected + 1);
  };
  const [filterValue, setFilterValue] = useState('');
  const [filteredData, setFilteredData] = useState(variableData?.getVariableData);
  const handleInputChange = (e) => {
    const value = e.target.value;
    setFilterValue(value);
    const filtered = variableData?.getVariableData.filter(item =>
      item.variableName.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };
  return (
    <>
      <VariableDictionaryForm />
      <div class="container-fluid pt-0">
        <div class="row">
          <div class="col-lg-12">
            <div class="card">
              <div class="container-fluid mt-2 mb-2">
                <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                  <div class="card-header">
                    <h4 class="card-title">Variable List</h4>
                  </div>
                  <div class="customer-search mb-sm-0 mb-3">
                    <div class="input-group search-area">
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

                  <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap"></div>
                </div>
              </div>
              <div class="container-fluid">
                <div class="card-body">
                  {(variableData?.isLoading) ? (<div style={{ height: "150px" }}>
                    <Loader classType={"absoluteLoader"} />
                  </div>) :
                  filteredData?.length ? (
                      <div class="table-responsive">
                        <table className="table header-border table-responsive-sm">
                          <thead>
                            <tr>
                              <th>Variable Name</th>
                              <th>Variable</th>
                              <th>Date</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredData.slice(startIndex, endIndex).map((item, index) => (
                              <tr key={index}>
                                <td>{item.variableName}</td>
                                <td>{item.variable}</td>
                                <td>{item.date}</td>
                                <td>
                                  <div className="d-flex">
                                    <a
                                    href="/none"
                                      className="btn btn-danger shadow btn-xs sharp"
                                    >
                                      <i className="fa fa-trash"></i>
                                    </a>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        {filteredData?.length > 5 && (
                            <div className="pagination-container">
                              <ReactPaginate
                                previousLabel={"<"}
                                nextLabel={" >"}
                                breakLabel={"..."}
                                pageCount={Math.ceil(
                                  variableData?.getVariableData.length / rowsPerPage
                                )}
                                marginPagesDisplayed={2}
                                onPageChange={handlePageChange}
                                containerClassName={"pagination"}
                                activeClassName={"active"}
                                initialPage={page - 1}
                                previousClassName={page === 0 ? "disabled_Text" : ""}
                              />
                            </div>
                          )}
                      </div>) : (<Norecord />)
                  }
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default VariableDictionaryList;
/* eslint-enable react-hooks/exhaustive-deps */
