/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Components/Loader/Loader";
import Norecord from "../../Components/NoRecord/NoRecord";
import ReactPaginate from "react-paginate";
import InputField from "../../Components/InputField/InputField";
import TemplateTypeMasterForm from "./TemplateTypeMasterForm";
import Button from "../../Components/Button/Button";
import { onGettemplateTypeMaster, onUpdatetemplateTypeMaster, onUpdatetemplateTypeMasterReset } from "../../Store/Slices/templateTypeMasterSlice";
import { toast } from "react-toastify";
const TemplateTypeMasterList = () => {
  const templateTypeMasterData = useSelector((state) => state?.templateTypeMasterReducer);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const dispatch = useDispatch();
  const [templateTypeData, setTemplateTypeData] = useState()
  const [isDelete, setIsdelete] = useState(false)
  const handlePageChange = (selected) => {
    setPage(selected.selected + 1);
  };
  useEffect(() => {
    dispatch(onGettemplateTypeMaster());
  }, []);
  useEffect(() => {
    if (templateTypeMasterData?.gettemplateTypeMasterData) {
      setFilteredData(templateTypeMasterData?.gettemplateTypeMasterData);
      const totalItems = templateTypeMasterData?.gettemplateTypeMasterData?.length;
      const totalPages = Math.ceil(totalItems / rowsPerPage);
      if (page > totalPages && page > 1) {
        setPage(page - 1);
      }
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
  const handleData = (templateTypedata, isEdit) => {
    const filieTypeInfo = {
      enabled: templateTypedata?.enabled,
      deleted: true,
      createdBy: 0,
      updatedBy: 0,
      clientId: templateTypedata?.clientId,
      templateType: templateTypedata?.templateType,
      fileName_Rule: templateTypedata?.fileName_Rule,
      description: templateTypedata?.description,
      id: templateTypedata?.id
    }
    if (isEdit) {
      setTemplateTypeData(filieTypeInfo)
    } else {
      setIsdelete(true)
      dispatch(onUpdatetemplateTypeMaster(filieTypeInfo))
    }
  };
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;
    return formattedDate;
  }
  useEffect(() => {
    if (templateTypeMasterData.update_status_code === "201") {
      if (isDelete) {
        toast.success("Deleted Successfully")
        setIsdelete(false)
      } else {
        toast.success(templateTypeMasterData.updateMessage)
      }
      dispatch(onGettemplateTypeMaster())
      dispatch(onUpdatetemplateTypeMasterReset())
    } else if (templateTypeMasterData.update_status_code) {
      toast.error(templateTypeMasterData.updateMessage)
      dispatch(onUpdatetemplateTypeMasterReset())
    }
  }, [templateTypeMasterData])

  return (
    <div className="container-fluid">
      <TemplateTypeMasterForm templateTypeData={templateTypeData} />
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
                  {templateTypeMasterData?.isLoading ? (
                    <div style={{ height: "150px" }}>
                      <Loader classType={"absoluteLoader"} />
                    </div>
                  ) : filteredData?.length ? (
                    <div className="table-responsive">
                      <table className="table header-border table-responsive-sm">
                        <thead>
                          <tr>
                            <th>Template Type</th>
                            <th>Description</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredData
                            .slice(startIndex, endIndex)
                            ?.map((templateType, index) => (
                              <tr key={index}>
                                <td>{templateType?.templateType}</td>
                                <td>{templateType?.templateType}</td>
                                <td>{formatDate(templateType?.createdOn)}</td>
                                <td>
                                  <span
                                    className={
                                      templateType.enabled
                                        ? "badge badge-success"
                                        : "badge badge-danger"
                                    }
                                  >
                                    {templateType.enabled
                                      ? "Active"
                                      : "Non Active"}
                                  </span>
                                </td>
                                <td>
                                  <div className="d-flex">
                                    <Button
                                      className="btn btn-primary shadow btn-xs sharp me-1"
                                      icon={"fas fa-pencil-alt"}
                                      onClick={() =>
                                        handleData(templateType, {
                                          isEdit: true,
                                        })
                                      }
                                    >
                                      <i className="fas fa-pencil-alt"></i>
                                    </Button>
                                    <Button
                                      className="btn btn-danger shadow btn-xs sharp"
                                      icon={"fa fa-trash"}
                                      onClick={() => handleData(templateType)}
                                    >
                                      <i className="fa fa-trash"></i>
                                    </Button>
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
