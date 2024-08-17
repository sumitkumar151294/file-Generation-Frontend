/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
  onLoginAuthSubmit,
} from "../../Store/Slices/authSlice";
import RouteConfiq from "../../Routing/routes";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Components/Loader/Loader";
import api from "../../Common/Axios/axiosInstance";
import PageError from "../../Components/PageError/PageError";


const Auth = () => {
  const dispatch = useDispatch();
  const [showLoader, setShowLoader] = useState(false);
  const [showError, setShowError] = useState(false);
  const [pageError, setPageError] = useState({
    StatusCode: "",
    ErrorName: "",
    ErrorDesription: "",
    url: "",
    buttonText: "",
  });
  const loginAuthData = useSelector((state) => state.loginAuthReducer);
  useEffect(()=>{
    if(!loginAuthData?.data?.[0]?.token){
      dispatch(onLoginAuthSubmit({accessKey: "demo1",
        partnerCode : "UIMasterAdmin",
        secretKey: "demo1"}))
    }


  },[])
  if(loginAuthData?.data?.[0]?.token){
    api.defaults.headers.Authorization = `Bearer ${loginAuthData?.data?.[0]?.token}`;
  }
  useEffect(() => {
    if (loginAuthData?.status_code === 200) {
      sessionStorage.setItem("clientCode", loginAuthData?.data?.[0]?.clientId);
      api.defaults.headers.Authorization = `Bearer ${loginAuthData?.data?.[0]?.token}`;
    } else if (loginAuthData?.status_code ===401) {
      setShowError(true);
      setShowLoader(false);
      setPageError({
        StatusCode: loginAuthData?.status_code,
        ErrorName: "Internal Server Error",
        ErrorDesription: "You do not have permission to view this resource",
        url: "/",
        buttonText: "Back to Home",
      });
    }
  }, [loginAuthData]);

  return (
    <>
    {showLoader ? (
      <Loader />
    ) : (
      <>
         <RouteConfiq />
      </>
    )}
  </>
);
};


export default Auth;
/* eslint-enable react-hooks/exhaustive-deps */
