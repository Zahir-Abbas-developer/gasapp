import { useEffect, useState } from "react";


// Ant Components
import {  MenuProps,  Space, Table,  } from "antd";


// Components
import BreadCrumb from "../../../layout/BreadCrumb/BreadCrumb";




// Utils, Constant and Packages
import AppSnackbar from "../../../utils/AppSnackbar";

// Assets

import editIcon from "../../../assets/icons/edit-blue.svg";
import deleteIcon from "../../../assets/icons/delete-icon-outlined.svg";



// Styling
import "./AddStyles.scss";
import DeleteModal from "../../../shared/DeleteModal/DeleteModal";
import { renderDashboard } from "../../../utils/useRenderDashboard";
import { useDeleteMaterialsMutation, useGetAllMaterialsQuery } from "../../../store/Slices/Products";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";


const UsersData= () => {

  const [pagination, setPagination] = useState({ limit: 10, page: 1 });


  // ============================== Filters ==============================
  const [searchName, setSearchName] = useState<string>("");

  // ============================== ACTION MODALS ==============================
  const [jobID, setJobID] = useState<string>("");

  const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);

 const [usersData ,setUsersData]=useState([])
  // ============================== Query Parameters Of Search and Filter ==============================
  const paramsObj: any = {};
  if (searchName) paramsObj["name"] = searchName;


  const query = "&" + new URLSearchParams(paramsObj).toString();

  // ============================== ROLES ==============================
  const { role }: any = JSON.parse(localStorage.getItem("careUserData") || "{}");


  // ============================== RTK Query ==============================
 
  const [deleteMaterials, { isLoading: isDeleteJobRequestMutation }] = useDeleteMaterialsMutation();
  const {data:getMaterials ,isSuccess:isSuccessMaterials}=useGetAllMaterialsQuery({})

  // ============================== Variables to Assign Values to it ==============================
  let optimizedUserRoleDropdown: any;
  let JobRole: any;
  let unchangeUserData: any;
  let clientAPIData: any;
  let allMaterials:any
  if(isSuccessMaterials){
    allMaterials=getMaterials
  }

  const fetchUsers = () => {
    onSnapshot(collection(db, "users"), (snapshot) => {
      const usersData: any = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      setUsersData(usersData)
    });
  };
 useEffect(()=>{
  fetchUsers()
 },[usersData])


  let careHomeDataDropdown: any;
 


  // ============================== Handle Delete Job Role ==============================
  const handleDeleteSubmit = async () => {
    try {
      await deleteMaterials({id:jobID}).unwrap();
      AppSnackbar({
        type: "success",
        messageHeading: "Deleted!",
        message: "Information deleted successfully",
      });
      setIsDeleteModal(false);

    } catch (error: any) {
      AppSnackbar({
        type: "error",
        messageHeading: "Error",
        message: error?.data?.message ?? "Something went wrong!",
      });
    }
  };




  // ============================== Table Action Dropdowns Items ==============================
  const items: MenuProps["items"] = [
    {
      label: (
        <Space
       
        >
          <img
            src={editIcon}
            alt="edit"
            className="d-flex align-center"
            height={18}
            width={16}
          />
          <span className="m-0">Edit Details</span>
        </Space>
      ),
      key: "1",
    },
    
    {
      label: (
        <Space
          onClick={() => {
            setIsDeleteModal(true);
          }}
        >
          <img
            src={deleteIcon}
            className="d-flex align-center"
            alt="delete"
            height={18}
            width={16}
          />
          <span>Delete</span>
        </Space>
      ),
      key: "3",
    },
  ];


  // ============================== Job Role Table Columns ==============================
  const columns: any = [
    {
      title: "Sr. No.",
      dataIndex: "_id",
      key: "_id",
      render: (value: any, record: any, index: any) => {
        return <span>{(index + pagination?.limit * pagination?.page) - pagination?.limit + 1}</span>;
      },
    },
    {
      title: "User Name",
      dataIndex: "username",
      align: "center"
    },
    {
      title: "User Phone Number",
      dataIndex: "phoneNumber",
      align: "center"
    },
    {
      title: "User Email",
      dataIndex: "email",
      align: "center"
    },
    {
      title: "User Address",
      dataIndex: "address",
      align: "center"
    },
    {
      title: "User Role",
      dataIndex: "role",
      align: "center"
    },

  ];



  return (
    <>

      <BreadCrumb breadCrumbItems={[
       {
        title: "Users",
        path: "",
      },
      {
        title: "Dashboard",
        path: renderDashboard(role),
      },
      ]} />

      <div className="setting-job-role">
        <div className="header border-radius-10">
          {/* <Button
            className="add-job-role-btn fs-14 fw-600 border-radius-10 d-flex justify-center align-items-center"
            onClick={() => {
              setGetFieldValues({});
              setAddEditJobRole(true);
              setModalType("Add");
            }}
          >
            Add Material
            <PlusCircleOutlined style={{ marginLeft: "20px" }} />
          </Button> */}

          {/* ============================== Job Role Top Filters ============================== */}
         

        </div>

      
        {/* ============================== Job Role Table ============================== */}
        <div className="record-table  border-radius-10">
          <Table
            scroll={{ x: 768 }}
            columns={columns}
            dataSource={usersData}
         
            pagination={{
              current: pagination.page,
              pageSize: pagination.limit,
              total: JobRole?.data?.metadata?.total,
              onChange: (page, limit) => setPagination({ limit, page }),
            }}
            className="common-setting-table"
          />
        </div>
      </div>

  
      {/* ============================== Delete Modal For Job Role ============================== */}
      <DeleteModal
        setDeleteModal={setIsDeleteModal}
        deleteModal={isDeleteModal}
        submitTitle="Yes"
        cancelTitle="No"
        title="Do you want to discard this Details?"
        onSubmit={handleDeleteSubmit}
        onCancel={() => setIsDeleteModal(false)}
        isLoading={isDeleteJobRequestMutation}
      />
    </>
  );
};

export default UsersData;