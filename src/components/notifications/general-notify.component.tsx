import { useState } from "react";
import { Avatar, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import NotifyPreviewModal from "./notify-preview-modal.component";
import './notification.styles.scss'

interface Props {
  name: string;
}
const GeneralNotify = (props: Props) => {
  const { name } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      {[0, 1, 3,4,5,6,7,8,9,10,11].map(() => (
        <div className="notifyDetials">
          <div style={{ display: "flex", alignItems: "center", paddingBottom:name==='General'?"20px":'0px' }}>
            <div>
              <Avatar icon={<UserOutlined />} />
            </div>
            <div>
              <p className="title-color" style={{ margin: "0 10px", fontSize: "11px" }}>
                Allen John <small style={{ fontSize: "10px" }}> 27 min ago</small>
              </p>
              <p className="fs-14 title-color" style={{ margin: "0 10px" }}>Your attendence is marked as late today</p>
            </div>
          </div>
        </div>
      ))}
      {open && <NotifyPreviewModal setOpen={setOpen} open={open} />}
    </>
  );
};

export default GeneralNotify;
