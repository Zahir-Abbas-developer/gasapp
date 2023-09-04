import React from 'react';
import { Col, Row, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import CylinderOrders from './CylinderOrders';
import PastOrders from './PastOrders';
import { Link } from 'react-router-dom';
import arrow from "../../../assets/images/Cylinder/arrow.svg"
const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'current orders',
    children: <CylinderOrders/>,
  },
  {
    key: '2',
    label: 'Past Orders',
    children: <PastOrders/>,
  },
  
];

const OrdersTabs = () => {
    return(
        <>
        
        <Row>
            <Col  sm={12}>
         <Link to="/services">   <img src={arrow} width={18} height={18}  style={{cursor:"pointer"}}/></Link>
            </Col>
            <Col sm={12}>
            <p
            className="fs-28 fw-500 grey-color"
            style={{ marginTop: "0px", paddingBottom: "58px" }}
          >
          My Orders
          </p>
            </Col>
          </Row>
        
         <Row>
            <Col sm={24}>
            <Tabs defaultActiveKey="1" style={{backgroundColor:"#D1372D",color:"white",fontSize:"20px",margin:"20px"}} items={items} onChange={onChange} />
            </Col>
         </Row>
        </>
    )
};

export default OrdersTabs;