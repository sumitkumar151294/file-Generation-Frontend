/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Components/Loader/Loader";
import Norecord from "../../Components/NoRecord/NoRecord";
import ReactPaginate from "react-paginate";
import InputField from "../../Components/InputField/InputField";
import ClientMasterForm from "./ClientMasterForm";
import {
  onGetclientMaster,
  onUpdateclientMaster,
  onUpdateclientMasterReset,
} from "../../Store/Slices/clientMasterSlice";
import { toast } from "react-toastify";
import Button from "../../Components/Button/Button";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";
import Swal from "sweetalert2";
const ClientMasterList = () => {
  const clientMasterData = useSelector((state) => state?.clientMasterReducer);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const [clientData, setClientData] = useState();
  const dispatch = useDispatch();
  const [isDelete, setisDelete] = useState(false);
  const showAlert = (clientData) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to Delete ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        handleData(clientData);
      }
    });
  };
  const handlePageChange = (selected) => {
    setPage(selected.selected + 1);
  };
  useEffect(() => {
    dispatch(onGetclientMaster());
  }, []);
  useEffect(() => {
    if (clientMasterData?.getclientMasterData) {
      setFilteredData(clientMasterData?.getclientMasterData);
    }
  }, [clientMasterData?.getclientMasterData]);
  const [filterValue, setFilterValue] = useState("");
  const [filteredData, setFilteredData] = useState(
    clientMasterData?.getclientMasterData
  );
  const handleInputChange = (e) => {
    const value = e.target.value;
    setFilterValue(value);
    const filtered = clientMasterData?.getclientMasterData.filter((item) =>
      item.clientName?.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };
  const handleData = (clientData, isEdit) => {
    const clientInfo = {
      ...clientData,
      deleted: true,
    };
    if (isEdit) {
      setClientData(clientInfo);
    } else {
      setisDelete(true);
      dispatch(onUpdateclientMaster(clientInfo));
    }
  };
  useEffect(() => {
    if (clientMasterData?.update_status_code === "200") {
      if (isDelete) {
        toast.success("Deleted Successfully");
        setisDelete(false);
      } else {
        toast.success(clientMasterData.updateMessage);
      }
      dispatch(onGetclientMaster());
      dispatch(onUpdateclientMasterReset());
    } else if (clientMasterData?.update_status_code) {
      toast.error(clientMasterData.updateMessage);
      dispatch(onUpdateclientMasterReset());
    }
  }, [clientMasterData]);
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
        <ClientMasterForm clientData={clientData} setClientData={setClientData}/>
        <div className="container-fluid pt-0">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="container-fluid mt-2 mb-2">
                  <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                    <div className="card-header">
                      <h4 className="card-title">Client List</h4>
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
                    {clientMasterData?.isLoading ? (
                      <div style={{ height: "150px" }}>
                        <Loader classType={"absoluteLoader"} />
                      </div>
                    ) : filteredData?.length ? (
                      <div className="table-responsive">
                        <table className="table header-border table-responsive-sm">
                          <thead>
                            <tr>
                              <th>Client Name</th>
                              <th>Description</th>
                              <th>Client Code</th>
                              <th>URL</th>
                              <th>Date</th>
                              <th>Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredData
                              .slice(startIndex, endIndex)
                              .map((clientData, index) => (
                                <tr key={index}>
                                  <td>{clientData.clientName}</td>
                                  <td>
                                    {clientData.description || (
                                      <span className="hyphen">-</span>
                                    )}
                                  </td>
                                  <td>{clientData.clientCode}</td>
                                  <td>
                                    {clientData.url || (
                                      <span className="hyphen">-</span>
                                    )}
                                  </td>
                                  <td>{formatDate(clientData.createdOn)}</td>
                                  <td>
                                    <span
                                      className={
                                        clientData.enabled
                                          ? "badge badge-success"
                                          : "badge badge-danger"
                                      }
                                    >
                                      {clientData.enabled
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
                                          handleData(clientData, {
                                            isEdit: true,
                                          })
                                        }
                                      >
                                        <i className="fas fa-pencil-alt"></i>
                                      </Button>
                                      <Button
                                        className="btn btn-danger shadow btn-xs sharp"
                                        icon={"fa fa-trash"}
                                        onClick={() => showAlert(clientData)}
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
                                filteredData?.length / rowsPerPage
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

export default ClientMasterList;
/* eslint-enable react-hooks/exhaustive-deps */
