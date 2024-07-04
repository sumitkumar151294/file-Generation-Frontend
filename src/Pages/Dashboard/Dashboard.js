import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";
import { onGetclientMaster } from "../../Store/Slices/clientMasterSlice";
import { onGettemplateTypeMaster } from "../../Store/Slices/templateTypeMasterSlice";
import { onGettemplateMaster } from "../../Store/Slices/templateMasterSlice";
import { onGetdocumentVault } from "../../Store/Slices/documentVaultSlice";
import ChartYearly from "../../Components/apexChart/ChartYearly";
import ChartMonthly from "../../Components/apexChart/ChartMonthly";
import ChartWeekly from "../../Components/apexChart/ChartWeekly";

const Dashboard = () => {
  const dispatch = useDispatch();
  const clientMasterData = useSelector(
    (state) => state?.clientMasterReducer?.getclientMasterData
  );
  const templateMasterData = useSelector(
    (state) => state?.templateMasterReducer?.gettemplateMasterData
  );
  const documentVaultData = useSelector(
    (state) => state.documentVaultReducer?.getdocumentVaultData
  );
  const templateTypemasterData = useSelector(
    (state) => state.templateTypeMasterReducer?.gettemplateTypeMasterData
  );

  const [activeTab, setActiveTab] = useState('Yearly'); // State to track active tab

  useEffect(() => {
    const fetchData = async () => {
      if (!clientMasterData?.length) {
        dispatch(onGetclientMaster());
      }
      if (!templateTypemasterData?.length) {
        dispatch(onGettemplateTypeMaster());
      }
      if (!templateMasterData?.length) {
        dispatch(onGettemplateMaster());
      }
      if (!documentVaultData?.length) {
        dispatch(onGetdocumentVault());
      }
    };
    fetchData();
  }, [dispatch]);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <>
      <ScrollToTop />
      <div className="m-h100">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-6">
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
                        <h2>{documentVaultData?.length}</h2>
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
                    <div className="card-header border-0 flex-wrap">
                      <div>
                        <h4 className="fs-20 mb-1">Total Pdf Data</h4>
                      </div>
                      <div className="d-flex">
                        <div className="card-action coin-tabs mt-3 mt-sm-0">
                          <ul className="nav nav-tabs" role="tablist">
                            <li className="nav-item">
                              <a
                                className={`nav-link ${activeTab === 'Yearly' ? 'active' : ''}`}
                                data-bs-toggle="tab"
                                href="#Yearly"
                                role="tab"
                                onClick={() => handleTabClick('Yearly')}
                              >
                                Yearly
                              </a>
                            </li>
                            <li className="nav-item">
                              <a
                                className={`nav-link ${activeTab === 'Monthly' ? 'active' : ''}`}
                                data-bs-toggle="tab"
                                href="#Monthly"
                                role="tab"
                                onClick={() => handleTabClick('Monthly')}
                              >
                                Monthly
                              </a>
                            </li>
                            <li className="nav-item">
                              <a
                                className={`nav-link ${activeTab === 'Weekly' ? 'active' : ''}`}
                                data-bs-toggle="tab"
                                href="#Weekly"
                                role="tab"
                                onClick={() => handleTabClick('Weekly')}
                              >
                                Weekly
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="tab-content">
                        <div className={`tab-pane fade ${activeTab === 'Yearly' ? 'show active' : ''}`} id="Yearly">
                          <ChartYearly data={documentVaultData} />
                        </div>
                        <div className={`tab-pane fade ${activeTab === 'Monthly' ? 'show active' : ''}`} id="Monthly">
                          <ChartMonthly data={documentVaultData} />
                        </div>
                        <div className={`tab-pane fade ${activeTab === 'Weekly' ? 'show active' : ''}`} id="Weekly">
                          <ChartWeekly data={documentVaultData} />
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
