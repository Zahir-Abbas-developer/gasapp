import { Fragment, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {  Button } from "antd";
import {
  MenuOutlined,
  DownOutlined,
  UpOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import { Avatar, Badge, Drawer, Dropdown, Popover, Space, Switch } from "antd";
import { v4 as uuidv4 } from "uuid";
import Bell from "../../assets/images/Cylinder/bell.png";
import SearchImg from "../../assets/images/sidebar/Search.png";
import ClickAwayListener from "react-click-away-listener";
import { navItems } from "./nav-data";
import { ReactComponent as Logout } from "../../assets/icons/sidebar/logout.svg";
import { ReactComponent as ChangePassword } from "../../assets/icons/sidebar/changePassword.svg";
// import Logo from "../../src/assets/images/brands/Final-Clock.gif";
// import Bell from "../assets/images/header/bell.png";
import DrawerNavsLinks from "./drawer-navs-links";
import DrawerComp from "./drawer";
import NotifyTabs from "../../components/notifications/notification-tabs.component";
import type { MenuProps } from "antd";
import "./navbar.styles.scss";
import { useAppSelector } from "../../store";
import Logo from "../../assets/images/Cylinder/cylinder.svg"
import { openDrawer, openGlobalSearchDrawer } from "../../store/Slices/OpenDrawerSlice";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../../store/Slices/Signin";
import DrawerComponent from "../../components/ClientTabs/ProductDetails/Drawer";
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
  const [active, setActive] = useState<string>("Dashboard");
  const [dropDown, setDropDown] = useState(false);
  const [visible, setVisible] = useState(false);
  const [activeChild, setActiveChild] = useState("");
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [open, setOpen] = useState<boolean>(false);
  const [isProfileModal, setIsProfileModal] = useState<boolean>(false);
  const [isExpandedSEarchbar, setIsExpandedSearchbar] = useState<boolean>(false);
  const [viewClientModal, setviewClientModal] = useState<boolean>(false)
  const { products }: any = useAppSelector((state) => state.products);
  const [logOutUser]:any=useLogoutMutation()
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const renderComponent: any = {
    navbar: (
      <DrawerNavsLinks
        setToggleDrawer={setToggleDrawer}
        toggleDrawer={toggleDrawer}
        setIsDarkMode={setIsDarkMode}
        isDarkMode={isDarkMode}
      />
    ),
  };
  const onLogOut = async () => {
    setVisible(false);
    // const { error }: any = await postUserLogout({});
    

  };
  const handleMyAccount = () => {
    setVisible(false);
    setActive("");
    setActiveChild("");
  };
  useEffect(() => {
    handleMyAccount();
  }, [pathname.includes("my-account")]);
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Link
          to="/my-account"
          className="m-0 title-color fs-14 d-block links-hover"
          onClick={handleMyAccount}
        >
          My Account
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <p
          className="m-0 title-color fs-14 d-block links-hover"
          onClick={onLogOut}
        >
          Sign Out
        </p>
      ),
    },
  ];

  // const userData: any = JSON.parse(localStorage.getItem("UserData") || "{}");
  const { role,username }: any = JSON.parse(
    localStorage.getItem("user") || "{}"
  );
  const handleOpenDrawer=()=>{
    dispatch(openDrawer())
  }
  const handleOpenGlobalSearchDrawer=()=>{
    dispatch(openGlobalSearchDrawer())
  }
  const handleRole = (item: any) => {
    if (role === "EMPLOYEE" && item.title === "Reports") {
      navigate("reports/project-task/1");
      setActive("Reports");
    } else {
      navigate(item.path);
      setActive(item.title);
    }
  };
  // ========================== Profile Dropdown ==========================
  const profileDropdown = [
    {
      title: "Logout",
      icon: <Logout />,
    },
  ];
  // ###################### Effect to get theme mode #####################
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDarkMode ? "dark" : "light"
    );
  }, [isDarkMode]);

  useEffect(() => {
    navItems?.map((e: any) => {
      if (e?.path.includes(pathname)) {
        setActive(e?.title);
        setActiveChild("");
      }
      e?.subItems?.map((subitem: any) => {
        if (`/${subitem?.path}` === pathname) {
          setActive(e.title);
          setActiveChild(subitem.title);
        }
      });
    });
  }, [pathname]);
  const overlayStyle = { borderRadius: 0 };
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
            {!role ? <Link to="/login"><UserOutlined style={{fontSize: '24px'}} /></Link>:      <> <p>Welcome {username}</p>  <img
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
            /> <Button
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
       
        <DrawerComponent/>
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
          {renderComponent[toggleDrawer.type]}
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
