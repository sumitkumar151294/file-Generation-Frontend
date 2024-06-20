/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Components/Loader/Loader";
import Norecord from "../../Components/NoRecord/NoRecord";
import ReactPaginate from "react-paginate";
import InputField from "../../Components/InputField/InputField";
import Button from "../../Components/Button";
import FileTypeForm from "./FileTypeForm";
import { onGetfileType, onUpdatefileType, onUpdatefileTypeReset } from "../../Store/Slices/fileTypeSlice";
import { toast } from "react-toastify";
const FileTypeList = () => {
  const fileTypeData = useSelector((state) => state?.fileTypeReducer);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const [fileData, setFileType] = useState();
  const dispatch = useDispatch();
  const handlePageChange = (selected) => {
    setPage(selected.selected + 1);
  };
  useEffect(() => {
    dispatch(onGetfileType());
  }, []);
  useEffect(() => {
    if (fileTypeData?.getfileTypeData) {
      setFilteredData(fileTypeData?.getfileTypeData);
    }
  }, [fileTypeData?.getfileTypeData]);
  const [filterValue, setFilterValue] = useState("");
  const [filteredData, setFilteredData] = useState(
    fileTypeData?.getfileTypeData
  );
  const handleInputChange = (e) => {
    const value = e.target.value;
    setFilterValue(value);
    const filtered = fileTypeData?.getfileTypeData.filter((item) =>
      item.fileType?.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };
  const handleData = (fileData,isEdit) => {
  const fileInfo={
    enabled: true,
    deleted: true,
    createdBy: 0,
    updatedBy: 0,
    fileType: fileData.fileType,
    extension: fileData.extension,
    id: fileData.id
  }
  if(isEdit){
setFileType(fileInfo)
  }else{

    dispatch(onUpdatefileType(fileInfo))
  }
  };
  useEffect(()=>{
  if(fileTypeData.update_status_code==="201"){
  toast.success(fileTypeData.updateMessage)
  dispatch(onGetfileType());
  dispatch(onUpdatefileTypeReset())
  }
  },[fileTypeData])
  return (
    <div className="container-fluid">
      <FileTypeForm  fileData={fileData}/>
      <div class="container-fluid pt-0">
        <div class="row">
          <div class="col-lg-12">
            <div class="card">
              <div class="container-fluid mt-2 mb-2">
                <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                  <div class="card-header">
                    <h4 class="card-title">File Type</h4>
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
                  {fileTypeData?.isLoading ? (
                    <div style={{ height: "150px" }}>
                      <Loader classType={"absoluteLoader"} />
                    </div>
                  ) : filteredData?.length ? (
                    <div class="table-responsive">
                      <table className="table header-border table-responsive-sm">
                        <thead>
                          <tr>
                            <th>File Name</th>
                            <th>File Extension</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredData
                            .slice(startIndex, endIndex)
                            .map((fileData, index) => (
                              <tr key={index}>
                                <td>{fileData.fileType}</td>
                                <td>{fileData.extension}</td>
                                <td>{fileData.date}</td>
                                <td>
                                  <span
                                    className={
                                      fileData.status === "Active"
                                        ? "badge badge-success"
                                        : "badge badge-danger"
                                    }
                                  >
                                    {fileData.status === "Active"
                                      ? "active"
                                      : "nonActive"}
                                  </span>
                                </td>
                                <td>
                                <div className="d-flex">
                                    <Button
                                      className="btn btn-primary shadow btn-xs sharp me-1"
                                      icon={"fas fa-pencil-alt"}
                                      onClick={() => handleData(fileData, { isEdit: true })}
                                    >
                                      <i className="fas fa-pencil-alt"></i>
                                    </Button>
                                    <Button
                                      className="btn btn-danger shadow btn-xs sharp"
                                      icon={"fa fa-trash"}
                                      onClick={() => handleData(fileData)}
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

export default FileTypeList;
/* eslint-enable react-hooks/exhaustive-deps */
