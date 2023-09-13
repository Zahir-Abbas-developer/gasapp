import { FC, lazy, LazyExoticComponent, Suspense } from "react";
import { Navigate } from "react-router-dom";


import Login from "./components/Authentication/Login";
import NotFound from "./components/Authentication/NotFound";
import Unathorized from "./components/Authentication/Unathorized";

import RequireAuth from "./components/Authentication/RequireAuth";
import LoadingSvg from "../src/assets/Login/loader-icon.gif";

import AddStyles from "./components/Admin/Users/Users";
import DashboardLayout from "./layout/Header/dashboard.layout";



const Loadable = (Component: LazyExoticComponent<FC>) => (props: any) =>
  (
    <Suspense
      fallback={
        <div
          className="d-flex justify-center align-center"
          style={{ height: "80vh" }}
        >
          <img src={LoadingSvg} height={200} width={200} alt="LoadingSvg" /> 
        </div>
      }
    >
      <Component {...props} />
    </Suspense>
  );


const OtpPage=Loadable(lazy(()=>import("./pages/Otp")))

const CylinderOrders = Loadable(lazy(() => import("./pages/CylinderOrders")));

const ConfirmationPage =Loadable(lazy(()=>import("./pages/ConfirmationPage")))

//Cart Details

//UserVerification page
const UserVerficationPage=Loadable(
  lazy(() => import("./pages/UserVerification"))
);

const StaffAllocationPage = Loadable(
  lazy(() => import("./pages/AdminDashboard"))
);


const AddProductsPage = Loadable(
  lazy(() => import("./pages/AddProducts"))
);
const AddCategoriesPage = Loadable(
  lazy(() => import("./pages/AddCategories"))
);

const UsersData = Loadable(
  lazy(() => import("./pages/AddStyles"))
);


const Services=Loadable(
  lazy(() => import("./components/ClientTabs/Services/Services"))
);


export const routes: any = [
  { path: "/", element: <Navigate to="services" /> },
  
  {
    path: "login",
    element: <Login />,
  },

  {
    path:"user-verification",
    element:<UserVerficationPage/>
  },
 
  {
    path: "sign-up",
    element: <Login />,
  },
  {
    path: "unauthorized",
    element: <Unathorized />,
  },
  
  {
    path:"confirmation-signup",
    element:<ConfirmationPage/>
  },
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        path: "services",
        element: (
         
            <Services />
         
        ),
      },
      {
        path: "orders",
        element: (
          // <RequireAuth allowedRoles={[ROLES.admin || "admin"]}>
            <CylinderOrders />
          // </RequireAuth>
        ),
      },
      {
        path: "admin-dashboard",
        element: (
          <RequireAuth allowedRoles={["admin"]}>
            <StaffAllocationPage />
            </RequireAuth>
        ),
      },
      {
        path: "otp-verification",
        element: (
          
            <OtpPage />
        
        ),
      },
      
    
      
      {
        path:"/add-products",
        element:  <RequireAuth allowedRoles={[ "admin"]}> <AddProductsPage/></RequireAuth>
      },
      // {
      //   path:"/otp",
      //   element:  <ConfirmationCode/>
      // },
      
      {
        path:"/add-categories",
        element:( <RequireAuth allowedRoles={["admin"]}><AddCategoriesPage/></RequireAuth> )
      },
     
      {
        path:"/users-list",
        element:(<RequireAuth allowedRoles={["admin"]}><UsersData/></RequireAuth> )
      },
      {
        path:"/add-styles",
        element:(<RequireAuth allowedRoles={["admin"]}><AddStyles/></RequireAuth> )
      },
    
     
    ],
  },
  {
    path: "*",
    element: <NotFound />
  }
];
