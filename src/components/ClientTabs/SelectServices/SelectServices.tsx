import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { ManageUsersData } from "../../../mock/ManageUserData";
import { Button, Card, Col, Layout, Row } from "antd";
import "./SelectServices.scss";
import "../../../sass/common.scss";
// import AddUserTypeModal from "../AddUserTypeModal/AddUserTypeModal";
import { useEffect, useState } from "react";
import { useGetAuthUserTypeRequestQuery } from "../../../store/Slices/ManageUser";
import AddUserType from "../../../assets/icons/ManageUser/add-user-type.svg";
import BreadCrumb from "../../../layout/BreadCrumb/BreadCrumb";

import ApiLoader from "../../ApiLoader/ApiLoader";

import { useDispatch } from "react-redux";

import { useAppSelector } from "../../../store";
import { selectUserType } from "../../../mock/SelectCylinderTypes";
import ProductsDrawer from "./Drawer";
import { useGetAllProductsQuery } from "../../../store/Slices/Products";
const SelectGroundTypes = () => {

  const [openDrawer, setOpenDrawer] = useState(false);
  const [orderData ,setOrderData]=useState({})
  const paramsObj: any = {};
  const query = "&" + new URLSearchParams(paramsObj).toString();
  const { data: dataProducts, isSuccess: isSuccessProducts } = useGetAllProductsQuery({ query })
 
  let productsData: any
  if (isSuccessProducts) {
      productsData = dataProducts
  }



  //BreadCrumb Items 
  const breadCrumbItems =
    [
      { title: "User Type", path: "", }
      , { title: "Dashboard", path: "/dashboard", },
    ];
  
  return (
    <div>
      {/* <BreadCrumb breadCrumbItems={breadCrumbItems} /> */}
      <Layout
        className="border-radius-8 select-user-types"
        style={{ backgroundColor: "#FFFFFF", padding: "40px 84px 94px 84px" }}
      >

        <div style={{ textAlign: "center" }}>
          <p
            className="fs-28 fw-500 grey-color"
            style={{ marginTop: "0px", paddingBottom: "58px" }}
          >
        Home
          </p>
        </div>
        {productsData?.length>0 ?
        <Row gutter={[80, 30]}>
          {productsData.map((card: any) => (
            <Col xs={24} md={8} sm={24} lg={8} xl={8} xxl={8} key={card._id}>
              <Card
                className="card-hover-color cursor-pointer"
                style={{
                  boxShadow: "none",
                  borderRadius: "22px",
                  minHeight: "260px",
                }}
                // onClick={() =>
                //   navigate("/select-stadium-location", { state: card })
                // }
              >
                <Row>
                  <Col xs={12} md={12} sm={12} lg={12} xl={12} xxl={12}>
                  <div
                  style={{
                    display: "flex",
                    color: "#212121",
                    paddingTop: "4px",
                    justifyContent: "center",
                    flexDirection: "column",
                    borderRadius: "6px",
                  }}
                >
                 
                  <div style={{ display: "block" }}>
                    <p
                      className="fs-16 fw-500"
                      style={{
                        color: "#14142B",
                        marginTop: "18px 18px",
                        textTransform: "capitalize",
                       
                      }}
                    >
                      {card?.category.replace("_", ' ')}
                    </p>
                    <p className="fs-16 fw-400" style={{ color: "#4E4B66" }}>
                      {card?.description}
                    </p>
                  </div>
                </div>
                   <Button
                   onClick={()=>{setOpenDrawer(true);setOrderData(card)}}
                    type="primary"
                    // htmlType="submit"
                    // loading={isLoading}
                    style={{fontSize:"14PX",width:"135.49px"}}
                    className=" login-button-gas-app "
                    block
                  >
                    Order Now
                  </Button>
                  </Col>
                  <Col xs={12} md={12} sm={12} lg={12} xl={12} xxl={12}>
                  <img
                  src={card?.thumbnail}
                  alt="icon"
                  className={"add-user-image"}
                  height={card?.name==="SMALL"? 97.38:card?.name==="MEDIUM"?137.49:145}
                  width={card?.name==="SMALL"? 91.19:card?.name==="MEDIUM"?117.34:125}
                  style={{
                    display: "block",
                    margin: "auto",
                  }}
                />
                  </Col>
                </Row>
                <div>
              
                
                </div>
               
               
              </Card>

            </Col>
          ))}

          {/* <Col xs={24} md={24} sm={24} lg={24} xl={24} xxl={8}>
            <Card
              className="card-hover-color cursor-pointer"
              onClick={() => {
                setIsOpenuserTypeModal(true);
              }}
              style={{
                boxShadow: "none",
                borderRadius: "22px",
                border: "1px dashed #A0A3BD",
                minHeight: "260px",
              }}
            >
              <div
                className={"add-user-image"}
                style={{
                  display: "flex",
                  color: "#212121",
                  paddingTop: "4px",
                  justifyContent: "center",
                  flexDirection: "column",
                  borderRadius: "6px",
                }}
              >
                <img
                  src={AddUserType}
                  alt="icon"
                  className={"add-user-image"}
                  height={51}
                  width={51}
                  style={{
                    display: "block",
                    margin: "auto",
                  }}
                />
                <div style={{ display: "block", textAlign: "center" }}>
                  <p
                    className="fs-16 fw-500"
                    style={{ color: "#14142B", marginTop: "18px 18px" }}
                  >
                    Add User Type
                  </p>
                </div>
              </div>
            </Card>
          </Col> */}

          {/* <AddUserTypeModal
            handleSave={handleSaveSelectUser}
            setIsOpenuserTypeModal={setIsOpenuserTypeModal}
            isOpenUserTypeModal={isOpenUserTypeModal}
          /> */}
        </Row>:<ApiLoader/>}
      <ProductsDrawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} orderData={orderData}/>
      </Layout>
    </div>
  );
};

export default SelectGroundTypes;
