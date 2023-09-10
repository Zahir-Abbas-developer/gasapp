import { Space, Spin } from 'antd';

const ApiLoader = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
    <Space size="middle">
      <Spin size="large" style={{color:"red"}}/>
    </Space>
  </div>
);

export default ApiLoader;