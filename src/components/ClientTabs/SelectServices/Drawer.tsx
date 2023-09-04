import React, { useState } from 'react';
import { Button, Drawer, Radio, Space } from 'antd';
import type { DrawerProps } from 'antd/es/drawer';
import type { RadioChangeEvent } from 'antd/es/radio';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

const ProductsDrawer = ({openDrawer,setOpenDrawer}:any) => {
  const [placement, setPlacement] = useState<DrawerProps['placement']>('right')
  const [quantityNumber ,setQuantityNumber]=useState(0)

  const onClose = () => {
    setOpenDrawer(false);
  };

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
       
       <p> <PlusOutlined  style={{color:"red"}}/> {quantityNumber} <MinusOutlined  style={{color:"red"}}/></p>  
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