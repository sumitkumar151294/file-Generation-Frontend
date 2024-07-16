/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import VariableDictionaryForm from "./VariableDictionaryForm";
import { useDispatch, useSelector } from "react-redux";
import {
  onGetVariable,
  onUpdateVariable,
  onUpdateVariableReset,
} from "../../Store/Slices/variableSlice";
import Loader from "../../Components/Loader/Loader";
import Norecord from "../../Components/NoRecord/NoRecord";
import ReactPaginate from "react-paginate";
import InputField from "../../Components/InputField/InputField";
import Button from "../../Components/Button/Button";
import { toast } from "react-toastify";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";

const VariableDictionaryList = () => {
  const variableData = useSelector((state) => state?.variableReducer);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [filterValue, setFilterValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const dispatch = useDispatch();
  const templateMasterData = useSelector(
    (state) => state.templateMasterReducer?.gettemplateMasterData
  );
  useEffect(() => {
    dispatch(onGetVariable());
  }, []);
  const findMatches = (a, b) => {
    var matches = [];
    b?.forEach(function (element) {
      if (
        a?.some(function (str) {
          return str.includes(element);
        })
      ) {
        matches.push(element);
      }
    });
    return matches;
  };
  const templateTypeMasterData = useSelector(
    (state) => state?.templateTypeMasterReducer?.gettemplateTypeMasterData
  );
  const result = findMatches(
    templateMasterData?.map((template) => template?.templateContent),
    variableData?.getVariableData?.map((variable) => variable.variableName)
  );

  useEffect(() => {
    if (variableData?.getVariableData) {
      setFilteredData(variableData.getVariableData);
      const totalItems = variableData?.getVariableData?.length;
      const totalPages = Math.ceil(totalItems / rowsPerPage);
      if (page > totalPages && page > 1) {
        setPage(page - 1);
      }
    }
  }, [variableData.getVariableData]);

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const handlePageChange = (selected) => {
    setPage(selected.selected + 1);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setFilterValue(value);
    const filtered = variableData.getVariableData?.filter((item) =>
      item.variableName.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };
  const handleData = (variableData) => {
    if (
      result.filter((varname) => varname === variableData.variableName).length
    ) {
      toast.error(
        "Unable to Delete Variable: Variable is in Use, To Proceed first remove from the template"
      );
    } else {
      const variableDatatoDelete = {
        deleted: true,
        createdBy: 0,
        updatedBy: 0,
        variableName: variableData.variableName,
        variable: variableData?.variable,
        templateTypeId: variableData?.templateTypeId,
        id: variableData?.id,
      };
      dispatch(onUpdateVariable(variableDatatoDelete));
    }
  };
  useEffect(() => {
    if (variableData?.update_status_code === "201") {
      toast.success("Deleted Successfully");
      dispatch(onGetVariable());
      dispatch(onUpdateVariableReset());
    } else if (variableData?.update_status_code) {
      toast.error(variableData?.updateMessage);
      dispatch(onUpdateVariableReset());
    }
  }, [variableData]);
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;
    return formattedDate;
  };
  return (
    <>
      <ScrollToTop />
      <div className="container-fluid">
        <VariableDictionaryForm />
        <div className="container-fluid pt-0">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="container-fluid mt-2 mb-2">
                  <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                    <div className="card-header">
                      <h4 className="card-title">Variable List</h4>
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
                    {variableData?.isLoading ? (
                      <div style={{ height: "150px" }}>
                        <Loader classType={"absoluteLoader"} />
                      </div>
                    ) : filteredData?.length ? (
                      <div className="table-responsive">
                        <table className="table header-border table-responsive-sm">
                          <thead>
                            <tr>
                              <th>Variable Name</th>
                              <th>Variable</th>
                              <th>Template Type</th>
                              <th>Date</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredData
                              .slice(startIndex, endIndex)
                              .map((variableData, index) => (
                                <tr key={index}>
                                  <td>{variableData.variableName}</td>
                                  <td>{variableData.variable}</td>
                                  <td>
                                    {templateTypeMasterData
                                      .filter(
                                        (type) =>
                                          type.id ===
                                          variableData.templateTypeId
                                      )
                                      .map((type) => type.templateType)}
                                  </td>
                                  <td>{formatDate(variableData.createdOn)}</td>
                                  <td>
                                    <div className="d-flex">
                                      <div className="d-flex">
                                        <Button
                                          className="btn btn-danger shadow btn-xs sharp"
                                          icon={"fa fa-trash"}
                                          onClick={() =>
                                            handleData(variableData)
                                          }
                                        >
                                          <i className="fa fa-trash"></i>
                                        </Button>
                                      </div>
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
                                variableData?.getVariableData.length /
                                  rowsPerPage
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
    </>
  );
};

export default VariableDictionaryList;
/* eslint-enable react-hooks/exhaustive-deps */
