/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import logout from "../../Assets/img/Logout.png";
import section from "../../Assets/img/section.png";
import add from "../../Assets/img/Add.png";
import content from "../../Assets/img/content.png";
import segment from "../../Assets/img/segment.png";
import dashboard from "../../Assets/img/dashboard.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { onLogout } from "../../Store/Slices/loginSlice";
const Sidebar = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const handleLogout=(e)=>{
    e.preventDefault();
    sessionStorage.clear()
    dispatch(onLogout())
    navigate("/");
  }
  const location = useLocation();
  const { pathname } = location;
  return (
    <div className="deznav">
      <div className="deznav-scroll mm-active ps ps--active-y">
        <ul className="metismenu mm-show" id="menu">
          <li className={pathname === '/dashboard' ? 'mm-active' : ''}>
            <Link to="/dashboard" className="ai-icon" aria-expanded="false">
              <img className="w-20px" src={dashboard} alt="file not exist" />
              <span className="nav-text ps-1">Dashboard</span>
            </Link>
          </li>
          <li className={pathname === '/file-type' ? 'mm-active' : ''}>
            <Link to="/file-type" className="ai-icon" aria-expanded="false">
              <img className="w-20px" src={segment} alt="file not exist" />
              <span className="nav-text ps-1">File Type</span>
            </Link>
          </li>
          <li className={pathname === '/variable-dictionary' ? 'mm-active' : ''}>
            <Link to="/variable-dictionary" className="ai-icon" aria-expanded="false">
              <img className="w-20px" src={segment} alt="file not exist" />
              <span className="nav-text ps-1">Variable Dictionary</span>
            </Link>
          </li>
          <li className={pathname === '/client-master' ? 'mm-active' : ''}>
            <Link to="/client-master" className="ai-icon" aria-expanded="false">
              <img className="w-20px" src={content} alt="file not exist" />
              <span className="nav-text ps-1">Client Master</span>
            </Link>
          </li>
          <li className={pathname === '/templatetype-master' ? 'mm-active' : ''}>
            <Link to="/templatetype-master" className="ai-icon" aria-expanded="false">
              <img className="w-20px" src={section} alt="file not exist" />
              <span className="nav-text ps-1">Template Type Master</span>
            </Link>
          </li>
          <li className={pathname === '/template-master' ? 'mm-active' : ''}>
            <Link to="/template-master" className="ai-icon" aria-expanded="false">
              <img className="w-20px" src={add} alt="file not exist" />
              <span className="nav-text ps-1">Template Master</span>
            </Link>
          </li>
          <li>
            <Link className="ai-icon" aria-expanded="false" onClick={handleLogout}>
              <img className="w-20px" src={logout} alt="file not exist" />
              <span className="nav-text ps-1">Logout</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
/* eslint-enable react-hooks/exhaustive-deps */
