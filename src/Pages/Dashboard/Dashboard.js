/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";
import { onGetclientMaster } from "../../Store/Slices/clientMasterSlice";
import { onGettemplateTypeMaster } from "../../Store/Slices/templateTypeMasterSlice";
import { onGettemplateMaster } from "../../Store/Slices/templateMasterSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const clientMasterData = useSelector(
    (state) => state?.clientMasterReducer?.getclientMasterData
  );
  const templateMasterData = useSelector(
    (state) => state?.templateMasterReducer?.gettemplateMasterData
  );

  const templateTypemasterData = useSelector(
    (state) => state.templateTypeMasterReducer?.gettemplateTypeMasterData
  );
  useEffect(() => {
    if (!clientMasterData?.length) {
      dispatch(onGetclientMaster());
    } else if (!templateTypemasterData?.length) {
      dispatch(onGettemplateTypeMaster());
    } else if (!templateMasterData?.length) {
      dispatch(onGettemplateMaster());
    }
  }, []);
  return (
    <>
      <ScrollToTop />
      <div className="m-h100">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-6 ">
              <div className="inline">
                <div className="col-xl-6 col-sm-6">
                  <div className="card">
                    <div className="card-body d-flex align-items-center justify-content-between">
                      <div className="menu">
                        <span className="font-w500 fs-16 d-block mb-2">
                          Clients
                        </span>
                        <h2>{clientMasterData?.length}</h2>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6 col-sm-6">
                  <div className="card">
                    <div className="card-body d-flex align-items-center justify-content-between">
                      <div className="menu">
                        <span className="font-w500 fs-16 d-block mb-2">
                          Templates
                        </span>
                        <h2>{templateMasterData?.length}</h2>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6 col-sm-6">
                  <div className="card">
                    <div className="card-body d-flex align-items-center justify-content-between">
                      <div className="menu">
                        <span className="font-w500 fs-16 d-block mb-2">
                          Generated Pdfs
                        </span>
                        <h2>100</h2>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6 col-sm-6">
                  <div className="card">
                    <div className="card-body d-flex align-items-center justify-content-between">
                      <div className="menu">
                        <span className="font-w500 fs-16 d-block mb-2">
                          Template Type
                        </span>
                        <h2>{templateTypemasterData?.length}</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-12 col-xxl-12">
              <div className="row">
                <div className="col-xl-12">
                  <div className="card">
                    <div className="card-header border-0  flex-wrap">
                      <div>
                        <h4 className="fs-20 mb-1">Total Pdf Data</h4>
                        <span>Graph data is based on full system manners</span>
                      </div>
                      <div className="d-flex">
                        <div className="card-action coin-tabs mt-3 mt-sm-0">
                          <ul className="nav nav-tabs" role="tablist">
                            <li className="nav-item">
                              <a
                                className="nav-link active"
                                data-bs-toggle="tab"
                                href="#Monthly"
                                role="tab"
                              >
                                Monthly
                              </a>
                            </li>
                            <li className="nav-item">
                              <a
                                className="nav-link "
                                data-bs-toggle="tab"
                                href="#Daily"
                                role="tab"
                              >
                                Daily
                              </a>
                            </li>
                            <li className="nav-item">
                              <a
                                className="nav-link"
                                data-bs-toggle="tab"
                                href="#Today"
                                role="tab"
                              >
                                Today
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="card-body pb-2">
                      <div className="tab-content">
                        <div className="tab-pane fade show active" id="Monthly">
                          <div
                            id="chartTimeline1"
                            className="chart-timeline"
                          ></div>
                        </div>
                        <div className="tab-pane fade " id="Daily">
                          <div
                            id="chartTimeline2"
                            className="chart-timeline"
                          ></div>
                        </div>
                        <div className="tab-pane fade " id="Today">
                          <div
                            id="chartTimeline3"
                            className="chart-timeline"
                          ></div>
                        </div>
                      </div>
                    </div>
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

export default Dashboard;
/* eslint-enable react-hooks/exhaustive-deps */
