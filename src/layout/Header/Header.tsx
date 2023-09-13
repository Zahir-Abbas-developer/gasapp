import { useState } from "react";
import { useNavigate } from "react-router";


// Ant Components
import { Avatar, Popover, Space } from "antd";
import { CaretDownOutlined, DownOutlined, MenuOutlined,  UpOutlined, UserOutlined } from "@ant-design/icons";

// Utils and Packages
import { v4 as uuidv4 } from "uuid";


// Assets
import ClickAwayListener from "react-click-away-listener";

import { ReactComponent as Logout } from "../../assets/icons/sidebar/logout.svg";
import { ReactComponent as ChangePassword } from "../../assets/icons/sidebar/changePassword.svg";
import { Badge } from 'antd';

// Styles
import "./Header.scss";

import { useLogoutMutation } from "../../store/Slices/Signin";
import { useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import { navItems } from "./nav-data";
import { Fragment } from "@fullcalendar/core/preact";
import NavBar from "./navbar.layout";



const TopHeader = ({ setIsOpen }: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState<boolean>(false);
  const [active, setActive] = useState<string>("Dashboard");
  const [isProfileModal, setIsProfileModal] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isExpandedSEarchbar, setIsExpandedSearchbar] = useState<boolean>(false);
  const [viewClientModal, setviewClientModal] = useState<boolean>(false)
  const [dropDown, setDropDown] = useState(false);
  const [visible, setVisible] = useState(false);
  const [activeChild, setActiveChild] = useState("");
  // ========================== CONSTANTS ==========================
  const { role, id }: any = JSON.parse(localStorage.getItem("careUserData") || "{}");
  const handleExpand = () => {
    const search: any = document.querySelector(".search-input");
    search.classList.toggle("search-expanded");
    setIsExpandedSearchbar(!isExpandedSEarchbar);
  };

  // ========================== RTK Query ==========================

  const [logOutUser]:any=useLogoutMutation()

 

  // ========================== Profile Dropdown ==========================
  const profileDropdown = [
    
    {
      title: "Change Password",
      icon: <ChangePassword />,
    },
    {
      title: "Logout",
      icon: <Logout />,
    },
  ];


const handleRole = (item: any) => {
  if (role === "EMPLOYEE" && item.title === "Reports") {
    navigate("reports/project-task/1");
    setActive("Reports");
  } else {
    navigate(item.path);
    setActive(item.title);
  }
};
  return (
    <div
    className="header"
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "end",
      gap: "20px",
      marginRight: "20px",
      background: "transparent"
    }}
  >

    <div className={`container ${isExpandedSEarchbar && "expand-container"}`}>
      <input className="search-input" type="text" placeholder="Type here" />
      <button className="search-wrapper" onClick={handleExpand}>
        {/* <img src={SearchImg} alt="searchImg"  /> */}
      </button>
     
    </div>
    <div
        className={role === "user" ? "employeeMenu" : "menus"}
      >
        <nav className="nav">
          <ul className="nav-title">
            {navItems.map((item: any) => {
              return (
                <div key={uuidv4()}>
                  {(item.toshowforrole.includes(role ?role: "newUser")) && (
                    <div>
                      <li
                        className={`nav-link ${active === item.title && "activeNav"
                          }`}
                      >
                        <img
                          className="nav-img"
                          src={isDarkMode ? item.darkIcon : item.lightIcon}
                          alt={"icon"}
                          onClick={() => {
                            handleRole(item);
                          }}
                        />
                        <span
                          className="fs-12 nav-text title-color"
                          style={{
                            color: active === item.title ? "#e76f51" : "",
                            fontSize:"large"
                          }}
                          onClick={() => {
                            item.subItems
                              ? setDropDown(true)
                              : navigate(item.path);
                            setActive(item.title);
                          }}
                        >
                          {item.title}{" "}
                          {item.subItems &&
                            (dropDown && active && active === item.title ? (
                              <UpOutlined style={{ fontSize: "10px" }} />
                            ) : (
                              <DownOutlined style={{ fontSize: "10px" }} />
                            ))}
                        </span>
                      </li>
                      {item.subItems && dropDown && active === item.title && (
                        <ClickAwayListener
                          onClickAway={() => setDropDown(false)}
                        >
                          <div className="dropDown select-theme">
                            {item.subItems.map(
                              (subNav: any) =>
                                subNav.toshowforrole.includes(
                                  role ?role: "newUser"
                                ) && (
                                  <Fragment key={uuidv4()}>
                                    <p
                                      onClick={() => {
                                        navigate(subNav.path);
                                        setActiveChild(subNav.title);
                                        setDropDown(false);
                                      }}
                                      style={{
                                        color:
                                          activeChild === subNav.title
                                            ? "#e76f51"
                                            : "",
                                      }}
                                    >
                                      {subNav.title}
                                    </p>
                                  </Fragment>
                                )
                            )}
                          </div>
                        </ClickAwayListener>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </ul>
        </nav>
      </div>

   
    {/* <NotificationsPopup /> */}
    
    <div className="adminDetail">
      <Popover
        rootClassName="profile-dropdown"
        content={
          <div>
            {profileDropdown.map((item) => (
              <div
                key={uuidv4()}
                onClick={() => {
                  if (item?.title === "Logout") {
                    localStorage.removeItem("careUserData");
                    localStorage.clear();
                    navigate("/login");
                    logOutUser()
                    
                  }
                  if (item?.title === "Change Password") {
                    navigate("/change-password");
                  }
                  if (item?.title === "Profile Preview") {
                    setIsProfileModal(true);
                    setviewClientModal(true);
                  }
                }}
                className='profile-item'
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                  marginBlock: "10px",
                }}
              >
                {item.icon}
                <span className="fs-14 title-color cursor-pointer">{item.title}</span>
              </div>
            ))}
          </div>
        }
        trigger="click"
        open={open}
        onOpenChange={() => setOpen(false)}
      >
        <Space onClick={() => setOpen(!open)}>
          {!role ? <Link to="/login"><UserOutlined style={{fontSize: '24px' ,color:"black"}} /></Link>:
          <Avatar style={{ verticalAlign: "middle" }} size="large">
            
          </Avatar>}
          <div
            className="details"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <p
              className="m-0 label-color fw-600 fs-14 cursor-pointer"
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
             {role && <> <span style={{ height: "20px" }}>
               
                <CaretDownOutlined className="fs-16" style={{fontSize: '24px'}} />
              </span>
              <span
                className="fs-12 fw-400"
                style={{ textTransform: "capitalize" }}
              >
              {role==="admin"? <p  style={{marginTop:"0px",color:"white"}}>Admin</p> :<p style={{marginTop:"0px",color:"white"}}>User</p>}  
              </span></>}
            </p>
          </div>
        </Space>
      </Popover>
    </div>

    <div className="togglebar" onClick={() => setIsOpen(true)}>
      <MenuOutlined className="fs-18  text-white" />
    </div>
<NavBar />
    
  </div>

  );
};

export default TopHeader;
