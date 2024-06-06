import React, { useEffect, useState } from 'react'
import Footer from './Footer/Footer'
import Header from './Header/Header'
import Sidebar from '../Layout/Sidebar/Sidebar'
import { useNavigate } from 'react-router-dom'
const Layout = (props) => {
  const { Component } = props;
  const [showSideBar, setShowSideBar] = useState(false);
  const userLoginAccess=sessionStorage.getItem("userLogin")
  const navigate=useNavigate();
useEffect(()=>{
  if(!userLoginAccess){
navigate("/")
  }
},[])
  return (
    <>
      <div
        id="main-wrapper"
        className={showSideBar ? "show menu-toggle" : "show"}
      >
        <Header setSideBar={setShowSideBar} sidebar={showSideBar} />
        <Sidebar />
        <div className="content-body">
          <Component />
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Layout