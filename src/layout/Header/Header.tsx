import { useState } from "react";
import { useNavigate } from "react-router";


// Ant Components
import { Avatar, Popover, Space } from "antd";
import { CaretDownOutlined, DownOutlined, MenuOutlined, ShoppingCartOutlined, UpOutlined, UserOutlined } from "@ant-design/icons";





// RTK Hooks
import { useGetRequestByIdQuery } from "../../store/Slices/OnBoarding";


// Utils and Packages
import { v4 as uuidv4 } from "uuid";


// Assets
import ClickAwayListener from "react-click-away-listener";
import SearchImg from "../../assets/images/sidebar/Search.png";
import { ReactComponent as User } from "../../assets/icons/sidebar/user.svg";
import { ReactComponent as Logout } from "../../assets/icons/sidebar/logout.svg";
import { ReactComponent as ChangePassword } from "../../assets/icons/sidebar/changePassword.svg";
import { Badge } from 'antd';

// Styles
import "./Header.scss";
import { ROLES } from "../../constants/Roles";
import { useGetRoleLabel } from "../../utils/useGetRole";
import { useLogoutMutation } from "../../store/Slices/Signin";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../store";
import { openDrawer, openGlobalSearchDrawer } from "../../store/Slices/OpenDrawerSlice";
import { Link } from "react-router-dom";
import { navItems } from "./nav-data";
import { Fragment } from "@fullcalendar/core/preact";
import NavBar from "./navbar.layout";



const TopHeader = ({ setIsOpen }: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { products }: any = useAppSelector((state) => state.products);
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
  let roleName: { name: string, label: string } | undefined;
  roleName = useGetRoleLabel(role);
  


  const handleExpand = () => {
    const search: any = document.querySelector(".search-input");
    search.classList.toggle("search-expanded");
    setIsExpandedSearchbar(!isExpandedSEarchbar);
  };

  // ========================== RTK Query ==========================
  const { data, isSuccess } = useGetRequestByIdQuery({ id, detail: "ABOUT" })
  const [logOutUser]:any=useLogoutMutation()

  let carerProfile: any;
  if (isSuccess) {
    carerProfile = data
  }

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

    </div>

  );
};

export default TopHeader;
