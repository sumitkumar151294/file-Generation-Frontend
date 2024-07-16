/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";
import { onGetclientMaster } from "../../Store/Slices/clientMasterSlice";
import { onGettemplateTypeMaster } from "../../Store/Slices/templateTypeMasterSlice";
import { onGettemplateMaster } from "../../Store/Slices/templateMasterSlice";
import { onGetdocumentVault } from "../../Store/Slices/documentVaultSlice";
import ChartComponent from "../../Components/ChartComponent/ChartComponent"; // Assuming you have a consolidated ChartComponent

const Dashboard = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage errors

  // Redux state selectors
  const clientMasterData = useSelector(state => state.clientMasterReducer.getclientMasterData);
  const templateMasterData = useSelector(state => state.templateMasterReducer.gettemplateMasterData);
  const documentVaultData = useSelector(state => state.documentVaultReducer.getdocumentVaultData);
  const templateTypemasterData = useSelector(state => state.templateTypeMasterReducer.gettemplateTypeMasterData);

  const [activeTab, setActiveTab] = useState('Yearly'); // State to track active tab

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!clientMasterData?.length) {
          await dispatch(onGetclientMaster());
        }
        if (!templateTypemasterData?.length) {
          await dispatch(onGettemplateTypeMaster());
        }
        if (!templateMasterData?.length) {
          await dispatch(onGettemplateMaster());
        }
        if (!documentVaultData?.length) {
          await dispatch(onGetdocumentVault());
        }
        setLoading(false);
      } catch (error) {
        setError(error.message || 'An error occurred');
        setLoading(false);
      }
    };
    fetchData();
  }, [dispatch]);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
                            {['Yearly', 'Monthly', 'Weekly'].map(tabName => (
                              <li className="nav-item" key={tabName}>
                                <a
                                  className={`nav-link ${activeTab === tabName ? 'active' : ''}`}
                                  data-bs-toggle="tab"
                                  href={`#${tabName}`}
                                  role="tab"
                                  onClick={() => handleTabClick(tabName)}
                                >
                                  {tabName}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="tab-content">
                        {['Yearly', 'Monthly', 'Weekly'].map(tabName => (
                          <div
                            key={tabName}
                            className={`tab-pane fade ${activeTab === tabName ? 'show active' : ''}`}
                            id={tabName}
                          >
                            <ChartComponent data={documentVaultData} chartType={tabName.toLowerCase()} />
                          </div>
                        ))}
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
