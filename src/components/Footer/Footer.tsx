import { Col, Row } from "antd"
import './Footer.scss'
import Orders from '../../assets/icons/Cylinder/clipboard-list.svg'
import Home from '../../assets/icons/Cylinder/homeicon.svg'
import { Link } from "react-router-dom"
import { useState } from "react"


const FooterDetails=()=>{
  const [homeColor ,setHomeColor]=useState("#000000")
  const [orderColor,setOrderColor]=useState("#000000")
  const [addToCartColor ,setAddToCartColor]=useState("#000000")
  return (
    <section >
      <Row className="footer-main">
       <Col xs={24} md={8}>
       <Link style={{color:"#000000" ,cursor:"pointer"}} to="/services">   <div style={{textAlign:"center",padding:"40px",cursor:"pointer"}}>
          <img src={Home} height={25} width={32}></img>
         
          <p style={{color:homeColor}} onClick={()=>{setHomeColor("#D1372D");setOrderColor("");setAddToCartColor("")}}> Home</p>
        </div></Link>
       </Col> 
       <Col  xs={24} md={8}>
       <Link to="/orders" style={{color:"#000000" ,cursor:"pointer"}} >  <div style={{textAlign:"center",padding:"40px",cursor:"pointer"}}>
          <img src={Orders}></img>
          <p  style={{color:orderColor}} onClick={()=>{setOrderColor("#D1372D");setHomeColor("");setAddToCartColor("")}} > My Orders </p>
        </div>
        </Link>
       </Col>
       <Col  xs={24} md={8}>
        <div style={{textAlign:"center",padding:"40px" ,cursor:"pointer"}}>
          <img src={Orders}></img>
          <p style={{color:addToCartColor}}  onClick={()=>{setAddToCartColor("#D1372D");setHomeColor("");setOrderColor("")}}>Add To Cart</p>
        </div>
       </Col>
      </Row>
     
    </section>
      
  )
}
export default FooterDetails