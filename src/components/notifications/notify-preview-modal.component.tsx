import { Button, Col, Form, Input, Modal, Row } from "antd";
import "./notification.styles.scss";

interface Props {
  open: boolean;
  setOpen: any;
}
const NotifyPreviewModal = (props: Props) => {
  const { open, setOpen } = props;
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    setOpen(false);
    form.resetFields();
    console.log("Success:", values);
  };
  return (
    <Modal
      title={
        <span className="fs-24 fw-600 m-0 notifyModalTitle">
          Profile Change Request
        </span>
      }
      centered
      wrapClassName="custom-modal-class modal-theme"
      open={open}
      style={{ borderRadius: "4px" }}
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      footer={false}
      width="888px"
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{ paddingTop: "30px" }}
      >
        <Row gutter={[50, 30]}>
          <Col md={12} xs={24}>
            <Form.Item
              label="Full Name"
              style={{ marginBottom: 0 }}
              name="fullName"
              rules={[{ required: true, message: "Required field" }]}
            >
              <Input type="text" />
            </Form.Item>
            <small style={{ color: "red" }}>Old Name: Dani Baba</small>
          </Col>
          <Col md={12} xs={24}>
            <Form.Item
              label="Phone number"
              style={{ marginBottom: 0 }}
              name="phoneNumber"
              rules={[{ required: true, message: "Required field" }]}
            >
              <Input type="number" />
            </Form.Item>
            <small style={{ color: "red" }}>Old Number: 3239865354</small>
          </Col>
          <Col md={12} xs={24}>
            <Form.Item
              label="Shift"
              name="shift"
              style={{ marginBottom: 0 }}
              rules={[{ required: true, message: "Required field" }]}
            >
              <Input type="text" />
            </Form.Item>
            <small style={{ color: "red" }}>Old Shift: NIght</small>
          </Col>
          <Col md={12} xs={24}>
            <Form.Item
              label="Department"
              style={{ marginBottom: 0 }}
              name="department"
              rules={[{ required: true, message: "Required field" }]}
            >
              <Input type="text" />
            </Form.Item>
            <small style={{ color: "red" }}>Old Department: HR</small>
          </Col>
          <Col md={12} xs={24}>
            <Form.Item
              label="Designation"
              style={{ marginBottom: 0 }}
              name="designation"
              rules={[{ required: true, message: "Required field" }]}
            >
              <Input type="text" />
            </Form.Item>
            <small style={{ color: "red" }}>Old Designation: Mid BA</small>
          </Col>
        </Row>
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            gap: "10px",
            paddingTop: "20px",
          }}
        >
          <Button onClick={() => setOpen(false)}>Reject</Button>
          <Button className="btn-primary" htmlType="submit">
            Accept
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default NotifyPreviewModal;
