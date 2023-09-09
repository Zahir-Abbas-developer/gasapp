import { Col, Row } from "antd"
import './Footer.scss'
import Orders from '../../assets/icons/Cylinder/clipboard-list.svg'
import Home from '../../assets/icons/Cylinder/homeicon.svg'
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { DashboardOutlined, HomeOutlined, ShoppingCartOutlined, UsergroupAddOutlined } from "@ant-design/icons"


const FooterDetails=()=>{
  const [homeColor, setHomeColor] = useState("#000000");
  const [orderColor, setOrderColor] = useState("#000000");
  const [addToCartColor, setAddToCartColor] = useState("#000000");
  const [usersColor, setUsersColor] = useState("#000000");
  const navigate=useNavigate()
  const handleHomeClick = () => {
    setHomeColor("#D1372D");
    setOrderColor("#000000");
    setAddToCartColor("#000000");
    setUsersColor("#000000")
 
  };

  const handleOrderClick = () => {
    setHomeColor("#000000");
    setOrderColor("#D1372D");
    setAddToCartColor("#000000");
    setUsersColor("#000000")
 
  };

  const handleAddToCartClick = () => {
    setHomeColor("#000000");
    setOrderColor("#000000");
    setAddToCartColor("#D1372D");
    setUsersColor("#000000")
  
  };
  const handleUsersClick = () => {
    setHomeColor("#000000");
    setOrderColor("#000000");
    setAddToCartColor("#000000");
    setUsersColor("#D1372D")
  
  };

  const { role }: any = JSON.parse(localStorage.getItem("user") || "{}");
  return (
    <section >
     {role==="user"? 
      <Row className="footer-main">
      <Col xs={12} md={12}>
        <Link to="/services" style={{ color: "#000000", cursor: "pointer" }}>
          <div style={{ textAlign: "center", padding: "40px", cursor: "pointer" }}>
            <HomeOutlined style={{ fontSize: "32px", color: homeColor }} onClick={handleHomeClick} />

            <p style={{ color: homeColor }} onClick={handleHomeClick}> Home</p>
          </div>
        </Link>
      </Col>
      <Col xs={12} md={12}>
        
          <div style={{ textAlign: "center", padding: "40px", cursor: "pointer" }}>
            <UsergroupAddOutlined style={{ fontSize: "32px", color: orderColor }} onClick={()=>{handleOrderClick();navigate("/orders")}} />

            <p style={{ color: orderColor }} onClick={()=>{handleOrderClick();navigate("/orders")}}> My Orders </p>
          </div>
        
      </Col>
  
    </Row>: role==="admin"?
     <Row className="footer-main">
      <Col xs={6} md={6}>
    
          <div style={{ textAlign: "center", padding: "40px", cursor: "pointer" }}>
          <DashboardOutlined  style={{ fontSize: "32px", color: homeColor }} onClick={()=>{handleHomeClick();navigate("/admin-dashboard")}}  />

            <p style={{ color: homeColor }} onClick={()=>{handleHomeClick();navigate("/admin-dashboard")}}>Dashboard</p>
          </div>
      
      </Col>
      <Col xs={6} md={6}>
        <Link to="/add-categories" style={{ color: "#000000", cursor: "pointer" }}>
          <div style={{ textAlign: "center", padding: "40px", cursor: "pointer" }}>
            <UsergroupAddOutlined style={{ fontSize: "32px", color: orderColor }} onClick={()=>{handleOrderClick();navigate("/add-categories")}} />

            <p style={{ color: orderColor }} onClick={()=>{handleOrderClick();navigate("/add-categories")}}>Orders</p>
          </div>
        </Link>
      </Col>
      <Col xs={6} md={6}>
        <Link to="/add-products" style={{ color: "#000000", cursor: "pointer" }}>
          <div style={{ textAlign: "center", padding: "40px", cursor: "pointer" }}>
            <ShoppingCartOutlined style={{ fontSize: "32px", color: addToCartColor }}onClick={()=>{handleAddToCartClick();navigate("/add-products")}} />

            <p style={{ color: addToCartColor }} onClick={()=>{handleAddToCartClick();navigate("/add-products")}}>Products</p>
          </div>
        </Link>
      </Col>
      <Col xs={6} md={6}>
        <Link to="/users-list" style={{ color: "#000000", cursor: "pointer" }}>
          <div style={{ textAlign: "center", padding: "40px", cursor: "pointer" }}>
          <UsergroupAddOutlined style={{ fontSize: "32px", color: usersColor }} onClick={()=>{handleUsersClick();navigate("/users-list")}} />

            <p style={{ color: usersColor }} onClick={()=>{handleUsersClick();navigate("/users-list")}}>Users</p>
          </div>
        </Link>
      </Col>
    </Row>:"" }
     
    </section>
      
  )
}
export default FooterDetails