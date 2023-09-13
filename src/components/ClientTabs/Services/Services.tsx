import { Col, Row } from "antd"

import SelectServices from "../SelectServices/SelectServices";

const Services=()=>{

    return(
    
    <Row>
<Col xs={24}>
 <SelectServices/>
</Col>
{/* <Col xs={24} md={24} style={{marginTop:"15px"}}>
 <SelectServicesDetails/>
</Col>
<Col xs={24} md={24} style={{marginTop:"15px"}}>
 <ShoeProductDetails/>
</Col> */}
    </Row>)
}
export default Services