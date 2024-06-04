import React from 'react'
import PageError from '../../Components/PageError/PageError'
import TemplateMasterForm from './TemplateMasterForm'
import Loader from '../../Components/Loader/Loader'
import InputField from '../../Components/InputField/InputField'

const TemplateMasterList = () => {
  return (
<div>
      {true ? (
        <>
          {true && (
            <TemplateMasterForm
              // data={vendorData}
              // setData={setVendorData}
              // isDelete={isDelete}
              // setIsDelete={setIsDelete}

            />
          )}
          <div className="container-fluid pt-0">
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  {false ? (
                    <div style={{ height: "400px" }}>
                      <Loader classType={"absoluteLoader"} />
                    </div>
                  ) : (
                    <>
                      <div className="container-fluid pt-1">
                        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                          <div className="card-header">
                            <h4 className="card-title">File List</h4>
                          </div>
                          { true && (
                            <div className="customer-search mb-sm-0 mb-3">
                              <div className="input-group search-area">
                                <InputField
                                  type="text"
                                  className="form-control only-high"
                                  // placeholder={search_here_label}
                                  // value={searchQuery}
                                  // onChange={handleSearch}
                                />
                                <span className="input-group-text">
                                  <i className="fa fa-search"></i>
                                </span>
                              </div>
                            </div>
                          )}

                          {/* <div className="d-flex align-items-center flex-wrap">
                            {true&& (
                                <CSVLink
                                  data={excelData}
                                  headers={headers}
                                  filename={"SupplierMaster.csv"}
                                >
                                  {filteredVendorList.length > 0 && (
                                    <Button
                                      className="btn btn-primary btn-sm btn-rounded me-3 mb-2"
                                      icons={"fa fa-file-excel"}
                                      text={export_label}
                                    />
                                  )}
                                </CSVLink>
                              )}
                          </div> */}
                        </div>
                      </div>

                      {/* <>
                        {true (
                          <div className="card-body position-relative">
                            <div className="table-responsive">
                              <>
                                <table className="table header-border table-responsive-sm">
                                  <thead>
                                    <tr>
                                      <th>supplierName</th>
                                      <th>supplierClientID</th>
                                      <th>balance_Available</th>
                                      <th>minThresholdAmount}</th>
                                      <th>{status}</th>
                                      {getRoleAccess[0]?.editAccess && (
                                        <th>{action}</th>
                                      )}
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {filteredVendorList.length > 0 ? (
                                      Array.isArray(filteredVendorList) &&
                                      filteredVendorList
                                        .slice(startIndex, endIndex)
                                        .map((vendor, index) => (
                                          <tr key={index}>
                                            <td>{vendor.name}</td>
                                            <td>{vendor.id}</td>
                                            <td>
                                              <span className="text-muted">
                                                {vendor.creditAmount}
                                              </span>
                                            </td>
                                            <td>
                                              {vendor.balanceThresholdAmount}
                                            </td>
                                            <td>
                                              <span
                                                className={`badge ${
                                                  vendor.enabled
                                                    ? "badge-success"
                                                    : "badge-danger"
                                                }`}
                                              >
                                                {vendor.enabled
                                                  ? active
                                                  : nonActive}
                                              </span>
                                            </td>
                                            {getRoleAccess[0]?.editAccess && (
                                              <td>
                                                <div className="d-flex">
                                                  <button
                                                    className="btn btn-primary shadow btn-xs sharp me-1"
                                                    icon={"fas fa-pencil-alt"}
                                                    onClick={() =>
                                                      handleEdit(vendor)
                                                    }
                                                  >
                                                    <i className="fas fa-pencil-alt"></i>
                                                  </button>
                                                  <button
                                                    className="btn btn-danger shadow btn-xs sharp"
                                                    icon={"fa fa-trash"}
                                                    onClick={() =>
                                                      handleDelete(vendor)
                                                    }
                                                  >
                                                    <i className="fa fa-trash"></i>
                                                  </button>
                                                </div>
                                              </td>
                                            )}
                                          </tr>
                                        ))
                                    ) : (
                                      <NoRecord />
                                    )}
                                  </tbody>
                                </table>
                                {filteredVendorList.length > 5 && (
                                  <div className="pagination-container">
                                    <ReactPaginate
                                      previousLabel={"<"}
                                      nextLabel={" >"}
                                      breakLabel={"..."}
                                      pageCount={Math.ceil(
                                        filteredVendorList.length / rowsPerPage
                                      )}
                                      marginPagesDisplayed={2}
                                      onPageChange={handlePageChange}
                                      containerClassName={"pagination"}
                                      activeClassName={"active"}
                                      initialPage={page - 1} // Use initialPage instead of forcePage
                                      previousClassName={
                                        page === 0 ? disabled_Text : ""
                                      }
                                    />
                                  </div>
                                )}
                              </>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <NoRecord />
                          </div>
                        )}
                      </> */}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <PageError
          pageError={{
            StatusCode: "401",
            ErrorName: "Permission Denied",
            ErrorDesription:
              "Your application url is not registerd to our application",
            url: "/",
            buttonText: "Back to Home",
          }}
        />
      )}
    </div>
  )
}

export default TemplateMasterList