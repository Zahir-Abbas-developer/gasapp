import {  useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {  Button } from "antd";
import {
  MenuOutlined,

  UserOutlined,

} from "@ant-design/icons";
import {  Drawer,  Space, } from "antd";

import Bell from "../../assets/images/Cylinder/bell.png";

import DrawerComp from "./drawer";
import NotifyTabs from "../../components/notifications/notification-tabs.component";

import "./navbar.styles.scss";

import Logo from "../../assets/images/Cylinder/cylinder.svg"

import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../../store/Slices/Signin";

import GlobalSearch from "../../components/ClientTabs/GlobalSearch/GlobalSearchDrawer";


const NavBar = () => {
  const [toggleDrawer, setToggleDrawer] = useState({
    open: false,
    placement: "",
    type: "",
  });
  const [toggleNotifications, setToggleNotifications] = useState({
    open: false,
    placement: "",
    type: "",
  });

  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);

  const [logOutUser]:any=useLogoutMutation()
  const { pathname } = useLocation();
  const dispatch = useDispatch();
 

 
  useEffect(() => {
   
  }, [pathname.includes("my-account")]);
 

  // const userData: any = JSON.parse(localStorage.getItem("UserData") || "{}");
  const { role,username }: any = JSON.parse(
    localStorage.getItem("user") || "{}"
  );


 
  return (
    <>
      <div className=" header-main-wrapper-ecommerce header-bg " style={{ position: "sticky", top: "0", zIndex: "100",padding:"10px 30px" }}>
      
   
          <div style={{display:"flex" ,justifyContent:"space-between"}}>
      {/* <p style={{color:"white"}} className="solace-leather-online">welcome to LNG APP</p> */}
    { !role &&  <img src={Logo} height={50} width={50} ></img>}
   {role &&    <img src={Logo} height={50} width={50} className="logo-cylinder"></img>}
      <h1 style={{fontWeight:"500" ,fontSize:"32px",marginTop:"10px" ,marginBottom:"0px"}} className="lng-heading"></h1>
      <div className="short_hands">
        {/* <img src={SearchImg}  onClick={handleOpenGlobalSearchDrawer}  style={{cursor:"pointer"}}/> */}
          
          {/* <ShoppingCartOutlined style={{ fontSize: '24px' }} onClick={handleOpenDrawer} /> */}
      
        <div className="adminDetail">
   
        
          <Space onClick={() => setOpen(!open)}>
            {!role ? <Link to="/login"><UserOutlined style={{fontSize: '24px'}} /></Link>:      <> <p>Welcome {username}</p>  {role && <img
              className="cursor-pointer white-img-theme-class "
              src={Bell}
              alt="notification_icon"
              onClick={() =>
                setToggleNotifications({
                  open: true,
                  placement: "right",
                  type: "",
                })
              }
            /> }<Button
                  type="primary"
                  htmlType="submit"
                  className=" logout-button-gas-app "
                  block
                  onClick={() => {
                  
                      localStorage.removeItem("user");
                      localStorage.clear();
                      navigate("/login");
                      logOutUser()
                      
                    
                    // if (item?.title === "Change Password") {
                    //   navigate("/change-password");
                    // }
                    // if (item?.title === "Profile Preview") {
                    //   setIsProfileModal(true);
                    //   setviewClientModal(true);
                    // }
                  }}
                >
                  Log Out
                </Button> 
               
                {/* <img height={50} width={50} src={ `https://ui-avatars.com/api/?rounded=true&name=${username}`}></img> */}
                </>}
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
         
              </p>
            </div>
          </Space>
       
    
        <GlobalSearch/>
      </div>
{/* 
      <div className="togglebar" onClick={() => setIsOpen(true)}>
        <MenuOutlined className="fs-18  text-white" />
      </div> */}
        </div>
        </div>
      <div className="header-main-wrapper header-bg">
        <div className="logo">
          <MenuOutlined
            className="menu-bar"
            onClick={() =>
              setToggleDrawer({ open: true, placement: "left", type: "navbar" })
            }
          />
          {/* <img
            // src={Logo}
            alt="brand_logo"
            height={60}
            className="brand cursor-pointer"
            onClick={() => {
              navigate("/dashboard");
            }}
          /> */}
        </div>
       

      </div>
      </div>
      {toggleDrawer && (
        <DrawerComp
          open={toggleDrawer.open}
          placement={toggleDrawer.placement}
          onClose={() =>
            setToggleDrawer({ ...toggleDrawer, open: false, type: "navbar" })
          }
          width={270}
        >
       
        </DrawerComp>
      )}
      {toggleNotifications && (
        <Drawer
          className="notificationDrawer"
          maskStyle={{ background: "none", border: "none" }}
          style={{
            padding: "10px",
            height: "80%",
            position: "absolute",
            top: "65px",
            right: "15px",
            borderRadius: "6px",
          }}
          placement="right"
          width={window.innerWidth > 1200 ? "30%" : "90%"}
          onClose={() =>
            setToggleNotifications({
              ...toggleNotifications,
              open: false,
              type: "",
            })
          }
          open={toggleNotifications.open}
          closable={false}
        >
          <p className="fs-24 fw-600 p-0 m-0 title-color">Notifications</p>
          <NotifyTabs />
        </Drawer>
        
      )}
    </>
  );
};
export default NavBar;
