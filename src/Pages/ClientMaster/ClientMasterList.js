/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onGetVariable } from "../../Store/Slices/variableSlice";
import Loader from "../../Components/Loader/Loader";
import Norecord from '../../Components/NoRecord/NoRecord'
import ReactPaginate from "react-paginate";
import InputField from "../../Components/InputField/InputField";
import ClientMasterForm from "./ClientMasterForm";
import Button from "../../Components/Button";
import { onGetclientMaster } from "../../Store/Slices/clientMasterSlice";
const ClientMasterList = () => {
  const clientMasterData = useSelector((state) => state?.clientMasterReducer);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const [istrue,setistrue]=useState(true)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(onGetVariable());
  }, []);

  const handlePageChange = (selected) => {
    setPage(selected.selected + 1);
  };
  useEffect(()=>{
dispatch(onGetclientMaster())
  },[])
  const [filterValue, setFilterValue] = useState('');
  const [filteredData, setFilteredData] = useState(clientMasterData?.getclientMasterData);
  const handleInputChange = (e) => {
    const value = e.target.value;
    setFilterValue(value);
    const filtered = clientMasterData?.getclientMasterData.filter(item =>
      item.clientName?.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };
  const handledelete=(data)=>{
console.log(data)
  }
  return (
    <>

      <ClientMasterForm />
      <div class="container-fluid pt-0">
        <div class="row">
          <div class="col-lg-12">
            <div class="card">
              <div class="container-fluid mt-2 mb-2">
                <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                  <div class="card-header">
                    <h4 class="card-title">Client List</h4>
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
                  {(clientMasterData?.isLoading) ? (<div style={{ height: "150px" }}>
                    <Loader classType={"absoluteLoader"} />
                  </div>) :
               filteredData?.length ? (
                      <div class="table-responsive">
                        <table className="table header-border table-responsive-sm">
                          <thead>
                            <tr>
                              <th>Client Name</th>
                              <th>Description</th>
                              <th>Date</th>
                              <th>Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
  {filteredData.slice(startIndex, endIndex).map((item, index) => (
    istrue && (
      <tr key={index}>
        <td>{item.clientName}</td>
        <td>{item.description}</td>
        <td>{item.date}</td>
        <td>
          <span
            className={
              item.status === "Active" ? "badge badge-success" : "badge badge-danger"
            }
          >
            {item.status === "Active" ? "active" : "nonActive"}
          </span>
        </td>
        <td>
          <div className="d-flex">
            <Button className="btn btn-danger shadow btn-xs sharp" onClick={()=>handledelete(item)} icon={"fa fa-trash"}>
              <i className="fa fa-trash"></i>
            </Button>
          </div>
        </td>
      </tr>
    )
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

export default ClientMasterList;
/* eslint-enable react-hooks/exhaustive-deps */
