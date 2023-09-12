import { useState } from "react";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

import './notification.styles.scss'

import dayjs from "dayjs";
import { useGetAllNotificationsQuery } from "../../store/Slices/Notifications";

interface Props {
  name: string;
}
const GeneralNotify = (props: Props) => {
  const { name } = props;
  const [open, setOpen] = useState(false);
  const {data ,isSuccess}=useGetAllNotificationsQuery({})
  let notificationsData:any
  if(isSuccess){
    notificationsData=data
  }
  return (
    
    <>

{notificationsData?.map((item: any) => {
  // Calculate timestamp here
  const timestamp =
    item?.orderData?.createdAt?._nanoseconds / 1000000 +
    item?.orderData?.createdAt?._seconds * 1000;

  // Parse the timestamp using dayjs to get a valid dayjs object
  const parsedTimestamp:any = dayjs(timestamp);

  return (
    <div key={item.id} className="notifyDetials">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          paddingBottom: name === "General" ? "20px" : "0px",
        }}
      >
        <div>
          <Avatar icon={<UserOutlined />} />
        </div>
        <div>
          <p className="title-color" style={{ margin: "0 10px", fontSize: "11px" }}>
            Allen John <small style={{ fontSize: "10px" }}>
              {parsedTimestamp.format("YYYY-MM-DD HH:mm:ss").fromNow()} {/* Use format here */}
            </small>
          </p>
          <p className="fs-14 title-color" style={{ margin: "0 10px" }}>
            {item?.status}
          </p>
        </div>
      </div>
    </div>
  );
})}


    </>
  );
};

export default GeneralNotify;
