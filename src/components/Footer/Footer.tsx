import { Col, Row } from "antd"
import './Footer.scss'
import Orders from '../../assets/icons/Cylinder/clipboard-list.svg'
import Home from '../../assets/icons/Cylinder/homeicon.svg'
import { Link } from "react-router-dom"
import { useState } from "react"
import { DashboardOutlined, HomeOutlined, ShoppingCartOutlined, UsergroupAddOutlined } from "@ant-design/icons"


const FooterDetails=()=>{
  const [homeColor, setHomeColor] = useState("#000000");
  const [orderColor, setOrderColor] = useState("#000000");
  const [addToCartColor, setAddToCartColor] = useState("#000000");

  const handleHomeClick = () => {
    setHomeColor("#D1372D");
    setOrderColor("#000000");
    setAddToCartColor("#000000");
  };

  const handleOrderClick = () => {
    setHomeColor("#000000");
    setOrderColor("#D1372D");
    setAddToCartColor("#000000");
  };

  const handleAddToCartClick = () => {
    setHomeColor("#000000");
    setOrderColor("#000000");
    setAddToCartColor("#D1372D");
  };

  const { role }: any = JSON.parse(localStorage.getItem("user") || "{}");
  return (
    <section >
     {role==="user"?  <Row className="footer-main">
      <Col xs={24} md={12}>
        <Link to="/services" style={{ color: "#000000", cursor: "pointer" }}>
          <div style={{ textAlign: "center", padding: "40px", cursor: "pointer" }}>
            <HomeOutlined style={{ fontSize: "32px", color: homeColor }} onClick={handleHomeClick} />

            <p style={{ color: homeColor }} onClick={handleHomeClick}> Home</p>
          </div>
        </Link>
      </Col>
      <Col xs={24} md={12}>
        <Link to="/orders" style={{ color: "#000000", cursor: "pointer" }}>
          <div style={{ textAlign: "center", padding: "40px", cursor: "pointer" }}>
            <UsergroupAddOutlined style={{ fontSize: "32px", color: orderColor }} onClick={handleOrderClick} />

            <p style={{ color: orderColor }} onClick={handleOrderClick}> My Orders </p>
          </div>
        </Link>
      </Col>
  
    </Row>:  <Row className="footer-main">
      <Col xs={24} md={6}>
        <Link to="/admin-dashboard" style={{ color: "#000000", cursor: "pointer" }}>
          <div style={{ textAlign: "center", padding: "40px", cursor: "pointer" }}>
          <DashboardOutlined  style={{ fontSize: "32px", color: homeColor }} onClick={handleHomeClick} />

            <p style={{ color: homeColor }} onClick={handleHomeClick}>Dashboard</p>
          </div>
        </Link>
      </Col>
      <Col xs={24} md={6}>
        <Link to="/add-categories" style={{ color: "#000000", cursor: "pointer" }}>
          <div style={{ textAlign: "center", padding: "40px", cursor: "pointer" }}>
            <UsergroupAddOutlined style={{ fontSize: "32px", color: orderColor }} onClick={handleOrderClick} />

            <p style={{ color: orderColor }} onClick={handleOrderClick}>Orders</p>
          </div>
        </Link>
      </Col>
      <Col xs={24} md={6}>
        <Link to="/add-products" style={{ color: "#000000", cursor: "pointer" }}>
          <div style={{ textAlign: "center", padding: "40px", cursor: "pointer" }}>
            <ShoppingCartOutlined style={{ fontSize: "32px", color: addToCartColor }} onClick={handleAddToCartClick} />

            <p style={{ color: addToCartColor }} onClick={handleAddToCartClick}>Products</p>
          </div>
        </Link>
      </Col>
      <Col xs={24} md={6}>
        <Link to="/users-list" style={{ color: "#000000", cursor: "pointer" }}>
          <div style={{ textAlign: "center", padding: "40px", cursor: "pointer" }}>
          <UsergroupAddOutlined style={{ fontSize: "32px", color: addToCartColor }} onClick={handleAddToCartClick} />

            <p style={{ color: addToCartColor }} onClick={handleAddToCartClick}>Users</p>
          </div>
        </Link>
      </Col>
    </Row> }
     
    </section>
      
  )
}
export default FooterDetails