import { Col, Row } from "antd"
import './Footer.scss'
import Orders from '../../assets/icons/Cylinder/clipboard-list.svg'
import Home from '../../assets/icons/Cylinder/homeicon.svg'
import { Link } from "react-router-dom"


const FooterDetails=()=>{
  return (
    <section >
      <Row className="footer-main">
       <Col xs={24} md={8}>
       <Link style={{color:"#000000" ,cursor:"pointer"}} to="/services">   <div style={{textAlign:"center",padding:"40px",cursor:"pointer"}}>
          <img src={Home} height={25} width={32}></img>
         
          <p className="widget-text"> Home</p>
        </div></Link>
       </Col>
       <Col  xs={24} md={8}>
       <Link to="/orders">  <div style={{textAlign:"center",padding:"40px",cursor:"pointer"}}>
          <img src={Orders}></img>
          <p className="widget-text" > My Orders </p>
        </div>
        </Link>
       </Col>
       <Col  xs={24} md={8}>
        <div style={{textAlign:"center",padding:"40px"}}>
          <img src={Orders}></img>
          <p className="widget-text">Add To Cart</p>
        </div>
       </Col>
      </Row>
     
    </section>
      
  )
}
export default FooterDetails