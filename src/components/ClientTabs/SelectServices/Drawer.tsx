import React, { useState } from 'react';
import { Button, Col, Drawer, Radio, Row, Space } from 'antd';
import type { DrawerProps } from 'antd/es/drawer';
import type { RadioChangeEvent } from 'antd/es/radio';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { usePostOrdersMutation } from '../../../store/Slices/Orders';
import AppSnackbar from '../../../utils/AppSnackbar';

const ProductsDrawer = ({openDrawer,setOpenDrawer,orderData}:any) => {
  const [placement, setPlacement] = useState<DrawerProps['placement']>('right')
  const { role }: any = JSON.parse(localStorage.getItem("user") || "{}");
  const [quantityNumber ,setQuantityNumber]=useState(1)
  const [postOrders]=usePostOrdersMutation({})

  const onClose = () => {
    setOpenDrawer(false);
  };
const handleIncrement=()=>{
    setQuantityNumber(quantityNumber+1)
}
const handleDecreament=()=>{
    setQuantityNumber(quantityNumber-1)
}
const handleConfirmOrder=()=>{
  const orderPayload={userId:"26V7YwGVsZubhuMkGaec",productId:orderData?.id,address:"Fazal Town",subtotal:orderData?.price,total:orderData?.price * quantityNumber,quantity:quantityNumber}
 try{
  postOrders({payload:orderPayload}).unwrap()
  AppSnackbar({ type: "success", messageHeading: "Successfully Order", message: "Order Successful!" });
  setOpenDrawer(false)
 }
 catch(error:any){
  AppSnackbar({
    type: "error",
    messageHeading: "Error",
    message: error?.data?.message ?? "Something went wrong!"
  });
 }
}
console.log(orderData)
  return (
    <>
      <Drawer
        title="Order Details"
        placement={placement}
        width={500}
        onClose={onClose}
        open={openDrawer}

      >
      <Row>
        <Col sm={18}>
        <Row>
          <Col sm={12} >
            <p>Name :</p>
          </Col>
          <Col sm={12}>
          <p>{orderData?.name}</p>
          </Col>
          <Col sm={12}>
          <p>Category :</p>
          </Col>
          <Col sm={12}>
         <p> {orderData?.category}</p>
          </Col>
          <Col sm={12}>
          <p>Amount :</p>
          </Col>
          <Col sm={12}>
         <p> {orderData?.price}</p>
          </Col>
          <Col sm={12}>
         <p> Size :</p>
          </Col>
          <Col sm={12}>
         <p> {orderData?.size}</p>
          </Col>
        </Row>
        </Col>
        <Col sm={6}>
        <img src={orderData?.thumbnail}></img>
        </Col>
      </Row>
       
       <p> <MinusOutlined  style={{color:"red",marginRight:"10px"}}  onClick={handleDecreament}   /> {quantityNumber>0? quantityNumber:1} <PlusOutlined  style={{color:"red",marginLeft:"10px"}} onClick={handleIncrement}  /> </p>  
       
       <p>Toatl : {orderData?.price * quantityNumber}</p>
       {!role ?<p style={{color:"red",marginBottom:"0px"}}>Please Sign In First</p>:""}
        <Button  onClick={handleConfirmOrder}
                    type="primary"
                    disabled={!role}
                    // htmlType="submit"
                    // loading={isLoading}
                    style={{fontSize:"14PX",width:"200.49px",marginTop:"20px"}}
                    className=" login-button-gas-app "
                    block
                  >
                   Confirm Order
                  </Button>
      </Drawer>
    </>
  );
};

export default ProductsDrawer;