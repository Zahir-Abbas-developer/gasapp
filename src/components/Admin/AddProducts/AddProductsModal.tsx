import {
  Button,
  Modal,
  Input,
  Form,
  Row,
  Col,
  Select,
} from "antd";
import arrowDown from "../../../assets/icons/arrow-down-icon.svg"
import { useState } from 'react';
import AppSnackbar from "../../../utils/AppSnackbar";
import { ROLES } from "../../../constants/Roles";
import { useGetClientsQuery } from "../../../store/Slices/Setting/StaffSettings/RegisterationConfiguration";
import { handleInputTrimSpaces, handleInputTrimStart } from "../../../utils/useInputTrim";
import { useGetAllCategoriessQuery, useGetAllColorsQuery, useGetAllMaterialsQuery, useGetAllProductsQuery, usePostProductsMutation, useUpdateProductsMutation } from "../../../store/Slices/Products";
import UploadImage from "../../Setting/SettingKeyInfo/UploadImage/UploadImage";
import { PlusCircleOutlined } from "@ant-design/icons";
import Thumbnail from "../../Setting/SettingKeyInfo/UploadImage/Thumbnail";



function AddProductsModal(props: any) {
  const [form] = Form.useForm();
  const [certificateUrl, setCertificateUrl] = useState([])
  const [certificateUrlThumbnail, setCertificateUrlThumbnail] = useState("")

  const [fieldCount, setFieldCount] = useState(1);
  const [fields, setFields] = useState([{ quantity: "", size: "" }]);

  const { addEditJobRole, setAddEditJobRole, modalType, getTableRowValues, setGetFieldValues, role } = props;
  const { data: clientData, isSuccess: isClientDataSuccess, } = useGetClientsQuery({ refetchOnMountOrArgChange: true });
  const [postProducts, { isLoading: isPostJobRequestMutation }] = usePostProductsMutation();
  const [updateProducts, { isLoading: isUpdateJobRequestMutation }] = useUpdateProductsMutation();

  const { data: getMaterials, isSuccess: isSuccessMaterials } = useGetAllMaterialsQuery({})
  const { data: getCategories, isSuccess: isSuccessCategories } = useGetAllCategoriessQuery({})
  const { data: getColors, isSuccess: isSuccessColors } = useGetAllColorsQuery({})
  // ------------------ Error cases Variable ------------------
  let userRoleDropdown: any;
  let selectColor: any;
  let selectCategory: any
  let clientAPIData: any;

  let allMaterials: any
  if (isSuccessCategories) {
    selectCategory = getCategories
    selectCategory = selectCategory?.map((item: any) => ({
      value: item?._id,
      label: item?.name,
    }));
  }
  if (isSuccessColors) {
    selectColor = getColors

    selectColor = selectColor?.map((item: any) => ({
      value: item?._id,
      label: item?.name,
    }));

  }
  if (isSuccessMaterials) {
    allMaterials = getMaterials
    userRoleDropdown = allMaterials?.map((item: any) => ({
      value: item?._id,
      label: item?.name,
    }));

  }
  if (isClientDataSuccess) {
    clientAPIData = clientData;
    // Making new array for dropdown from data
    userRoleDropdown = allMaterials?.map((item: any) => ({
      value: item?._id,
      label: item?.name,
    }));
  }

  const uploadCertificateId = (url: any) => {
    setCertificateUrl(url)
  }
  const uploadCertificateThumbnail = (url: any) => {
    setCertificateUrlThumbnail(url)
  }
  const handleAddField = () => {
    setFieldCount(fieldCount + 1);

    setFields([...fields, { quantity: "", size: "" }]);
  };


  if (modalType !== "Add") {
    const formValues = {
      name: getTableRowValues.name,
      category: getTableRowValues.category,
      description: getTableRowValues?.description,
      price: getTableRowValues?.price,
      size: getTableRowValues?.size,
      quantity: getTableRowValues?.quantity,
      // eu:getTableRowValues?.shoeSizes[0]?.eu,
      // quantity:getTableRowValues?.shoeSizes[0]?.quantity
    }
    form.setFieldsValue(formValues)
  }


  // ---------------- Failed Form Fields ---------------- 
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };


  // ---------------- On Finish used to reset form fields in form ----------------
  const onFinish = async (values: any) => {
    // -------- for error cases --------


    const addProductValues = {
      ...values, price: parseInt(values?.price),quantity: parseInt(values?.quantity), thumbnail: certificateUrlThumbnail
    }

    
    const newValues = handleInputTrimSpaces(values);

    try {
      if (modalType === 'Edit') {
        await updateProducts({ id: getTableRowValues.id, payload: addProductValues }).unwrap();
        AppSnackbar({ type: "success", messageHeading: "Successfully Updated!", message: "Information updated successfully" });
        // apiErrorMessage = '';
      }
      else {
        await postProducts({ payload: addProductValues }).unwrap();
        AppSnackbar({ type: "success", messageHeading: "Successfully Added!", message: "Information added successfully" });
        // apiErrorMessage = '';
      }

      handleFormClear();

    } catch (error: any) {
      AppSnackbar({
        type: "error",
        messageHeading: "Error",
        message: error?.data?.message ?? "Something went wrong!"
      });
    }

  };


  const handleFormClear = () => {
    setAddEditJobRole(false);
    form.resetFields();
    setGetFieldValues({});
  }




  return (
    <Modal
      title="Add Product"
      open={addEditJobRole}
      onOk={() => handleFormClear()}
      onCancel={() => handleFormClear()}
      centered
      className="add-Manage-Job-Role"
      footer={false}
      width="888px"
      maskClosable={false}
    >
      <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Row gutter={20} style={{ marginTop: "20px" }}>
          <Col lg={12} xs={24} style={{ marginBottom: "20px" }}>
            <label className="fs-14 fw-600">Product Name</label>
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Required field " }]}
              style={{ marginBottom: "8px" }}
              normalize={(value: any) => handleInputTrimStart(value)}
            >
              <Input
                placeholder="Enter product name"
                id="Product Name"
                style={{ marginTop: "2px", height: "40px", }}
              />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24} style={{ marginBottom: "20px" }}>
            <label className="fs-14 fw-600">Select Category</label>
            <Form.Item
              name="category"
              rules={[{ required: true, message: "Required field " }]}
              style={{ marginBottom: "8px" }}
            >
              <Select
                suffixIcon={<img src={arrowDown} alt='arrow down' />}
                className="d-flex"
                placeholder="Select Category"
                options={[
                  { value: 'SMALL', label: 'Small' },
                  { value: 'MEDIUM', label: 'Medium' },
                  { value: 'LARGE', label: 'Large' },
                ]}
              />
            </Form.Item>
          </Col>
          
          {/* <Col lg={12} xs={24} style={{ marginBottom: "20px" }}>
            <label className="fs-14 fw-600">Select Type</label>
            <Form.Item
              name="material"
              rules={[{ required: true, message: "Required field " }]}
              style={{ marginBottom: "8px" }}
            >
              <Select
                suffixIcon={<img src={arrowDown} alt='arrow down' />}
                className="d-flex"
                placeholder="Select material"
                options={[
                  { value: 'regular', label: 'Regualr' },
                  // { value: 'medium', label: 'Medium' },
                  // { value: 'large', label: 'Large' },
                ]}
              />
            </Form.Item>
          </Col>
           */}
          <Col lg={12} xs={24} style={{ marginBottom: "20px" }}>
            <label className="fs-14 fw-600">Product Description</label>
            <Form.Item
              name="description"
              rules={[{ required: true, message: "Required field " }]}
              style={{ marginBottom: "8px" }}
              normalize={(value: any) => handleInputTrimStart(value)}
            >
              <Input
                placeholder="Enter product description"
                id="description"
                style={{ marginTop: "2px", height: "40px", }}
              />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24} style={{ marginBottom: "20px" }}>
            <label className="fs-14 fw-600">Product Amount</label>
            <Form.Item
              name="price"
              rules={[{ required: true, message: "Required field " }]}
              style={{ marginBottom: "8px" }}
              normalize={(value: any) => handleInputTrimStart(value)}
            >
              <Input
                placeholder="Enter product price"
                id="price"
                style={{ marginTop: "2px", height: "40px", }}
              />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24} style={{ marginBottom: "20px" }}>
            <label className="fs-14 fw-600">Product Size</label>
            <Form.Item
              name="size"
              rules={[{ required: true, message: "Required field " }]}
              style={{ marginBottom: "8px" }}
              normalize={(value: any) => handleInputTrimStart(value)}
            >
              <Input
                placeholder="Enter product price"
                id="price"
                style={{ marginTop: "2px", height: "40px", }}
              />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24} style={{ marginBottom: "20px" }}>
            <label className="fs-14 fw-600">Product Quantity</label>
            <Form.Item
              name="quantity"
              rules={[{ required: true, message: "Required field " }]}
              style={{ marginBottom: "8px" }}
              normalize={(value: any) => handleInputTrimStart(value)}
            >
              <Input
                placeholder="Enter product quantity"
                id="quantity"
                style={{ marginTop: "2px", height: "40px", }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} lg={24}>
          <p style={{fontWeight:600,color:"#6E7191"}}>Thumbnail</p>
          <Thumbnail uploadCertificateThumbnail={uploadCertificateThumbnail}  />
          </Col>
          
        </Row>

        <Form.Item>

          {/* {apiErrorMessage !== undefined && <p className="fs-14 fw-400 line-height-18 error-color  m-0" style={{ marginBottom: "1rem" }}>{apiErrorMessage?.status === 400 ? 'Request not fulfilled! Try again after some time.' : 'Something went wrong.'}</p>} */}
          <Button type="primary" style={{backgroundColor:"#D1372D"}} htmlType="submit" loading={isPostJobRequestMutation || isUpdateJobRequestMutation}>
            {modalType === 'Edit' ? 'Update' : "Save"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>

  );
}

export default AddProductsModal;
