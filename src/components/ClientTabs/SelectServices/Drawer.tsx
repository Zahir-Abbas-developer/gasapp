import React, { useState } from 'react';
import { Button, Drawer, Radio, Space } from 'antd';
import type { DrawerProps } from 'antd/es/drawer';
import type { RadioChangeEvent } from 'antd/es/radio';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

const ProductsDrawer = ({openDrawer,setOpenDrawer}:any) => {
  const [placement, setPlacement] = useState<DrawerProps['placement']>('right')
  const [quantityNumber ,setQuantityNumber]=useState(1)

  const onClose = () => {
    setOpenDrawer(false);
  };
const handleIncrement=()=>{
    setQuantityNumber(quantityNumber+1)
}
const handleDecreament=()=>{
    setQuantityNumber(quantityNumber-1)
}
  return (
    <>
      <Drawer
        title="Order Details"
        placement={placement}
        width={500}
        onClose={onClose}
        open={openDrawer}

      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
       
       <p> <MinusOutlined  style={{color:"red",marginRight:"10px"}}  onClick={handleDecreament}   /> {quantityNumber>0? quantityNumber:1} <PlusOutlined  style={{color:"red",marginLeft:"10px"}} onClick={handleIncrement}  /> </p>  
        <Button
                    type="primary"
                    // htmlType="submit"
                    // loading={isLoading}
                    style={{fontSize:"14PX",width:"200.49px"}}
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