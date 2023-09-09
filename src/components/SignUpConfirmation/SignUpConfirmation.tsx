import {  Button, Row,Col } from "antd";
import confirmationImgae from "../../assets/icons/Cylinder/check-circle.svg"
import { Link } from "react-router-dom";
const ConfirmationSignUp = () => {
  
 
    return (
       <Row style={{marginTop:"120px",textAlign:"center"}}>
        <Col xs={24} style={{textAlign:"center"}}>
        <img src={confirmationImgae} height={176}  width={176}/>
        </Col>
        <Col xs={24} style={{textAlign:"center",marginTop:"40px"}} >
        <p>Thank you for Signing up with Company Name</p>
        </Col>
        <Col xs={24} style={{textAlign:"center",marginTop:"40px"}} >
       <Link to="/login">
       <Button
                  type="primary"
                  htmlType="submit"
                  className=" login-button-gas-app "
                  block
                  style={{height:"33px",width:"229px"}}
                >
                  Login
                </Button>
       </Link>
        </Col>
       </Row>       

    )
}
export default ConfirmationSignUp