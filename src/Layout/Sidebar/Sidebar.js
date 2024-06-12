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
import { onLogout } from "../../Store/Slices/LoginSlice";

const menuItems = [
  { path: "/dashboard", icon: dashboard, text: "Dashboard" },
  { path: "/file-type", icon: segment, text: "File Type" },
  { path: "/variable-dictionary", icon: segment, text: "Variable Dictionary" },
  { path: "/client-master", icon: content, text: "Client Master" },
  { path: "/templatetype-master", icon: section, text: "Template Type Master" },
  { path: "/template-master", icon: add, text: "Template Master" },
];

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    sessionStorage.clear();
    dispatch(onLogout());
    navigate("/");
  };

  const location = useLocation();
  const { pathname } = location;

  return (
    <div className="deznav">
      <div className="deznav-scroll mm-active ps ps--active-y">
        <ul className="metismenu mm-show" id="menu">
          {menuItems.map((item, index) => (
            <li key={index} className={pathname === item.path ? "mm-active" : ""}>
              <Link to={item.path} className="ai-icon" aria-expanded="false">
                <img className="w-20px" src={item.icon} alt="file not exist" />
                <span className="nav-text ps-1">{item.text}</span>
              </Link>
            </li>
          ))}
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
