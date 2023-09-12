import { FC, lazy, LazyExoticComponent, Suspense } from "react";
import { Navigate } from "react-router-dom";


import Login from "./components/Authentication/Login";
import NotFound from "./components/Authentication/NotFound";
import SignUp from "./components/Authentication/SignUp";
import Unathorized from "./components/Authentication/Unathorized";
import ResetPassword from "./components/Authentication/ResetPassword";
import RequireAuth from "./components/Authentication/RequireAuth";
import LoadingSvg from "../src/assets/Login/loader-icon.gif";
import { ROLES } from "./constants/Roles";
import path from "path";
import AddStyles from "./components/Admin/AddStyles/AddStyles";
import OurCollectionTabDetails from "./components/ClientTabs/OurCollectionTabDetails/OurCollectionTabDetails";
import OurCustomOrderDetails from "./components/ClientTabs/CustomOrderTabDetails/CustomOrderTabDetails";
import DashboardLayout from "./layout/Header/dashboard.layout";
import { ConfirmationCode } from "./components/Otp/otp";


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

const DashboardPage = Loadable(lazy(() => import("./pages/Dashboard")));

const OtpPage=Loadable(lazy(()=>import("./pages/Otp")))

const CylinderOrders = Loadable(lazy(() => import("./pages/CylinderOrders")));
const ProductDetailsPage = Loadable(
  lazy(() => import("./pages/ProductDetails"))
);

const ConfirmationPage =Loadable(lazy(()=>import("./pages/ConfirmationPage")))

//Cart Details

//UserVerification page
const UserVerficationPage=Loadable(
  lazy(() => import("./pages/UserVerification"))
);

const StaffAllocationPage = Loadable(
  lazy(() => import("./pages/StaffAllocation"))
);


const AddProductsPage = Loadable(
  lazy(() => import("./pages/AddProducts"))
);
const AddCategoriesPage = Loadable(
  lazy(() => import("./pages/AddCategories"))
);
const AddColorsPage = Loadable(
  lazy(() => import("./pages/AddColors"))
);
const UsersData = Loadable(
  lazy(() => import("./pages/AddStyles"))
);
const AddOrdersPage = Loadable(
  lazy(() => import("./pages/AddOrders"))
);

// Reports and its Child Routes Ends Here

const SettingsPage = Loadable(lazy(() => import("./pages/Settings")));
const RatingsFeedback = Loadable(
  lazy(() => import("./pages/RatingAndFeedback"))
);



const KeyInfo = Loadable(lazy(() => import("./pages/Settings/KeyInfo")));
const JobRole = Loadable(lazy(() => import("./pages/Settings/JobRole")));

const Services=Loadable(
  lazy(() => import("./components/ClientTabs/Services/Services"))
);


export const routes: any = [
  { path: "/", element: <Navigate to="services" /> },
  
  {
    path: "login",
    element: <Login />,
  },
  {path:"forget-password", element: <Login />,
},
  {
    path: "change-password",
    element: <Login />,
  },
  {
    path:"user-verification",
    element:<UserVerficationPage/>
  },
  {
    path: "reset-password",
    element: <Login />,
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
    path: "reset-password",
    element: <ResetPassword />,
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
          <RequireAuth allowedRoles={[ROLES.admin || "admin"]}>
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
        path: "dashboard",
        element: (
          <RequireAuth allowedRoles={[ROLES.user]}>
            <DashboardPage />
           </RequireAuth>
        ),
      },
     
      {
        path:"productDetails",
        element:<ProductDetailsPage/>
      },
      
      {
        path:"/add-products",
        element:  <RequireAuth allowedRoles={[ROLES.admin || "admin"]}> <AddProductsPage/></RequireAuth>
      },
      // {
      //   path:"/otp",
      //   element:  <ConfirmationCode/>
      // },
      
      {
        path:"/add-categories",
        element:( <RequireAuth allowedRoles={[ROLES.admin || "admin"]}><AddCategoriesPage/></RequireAuth> )
      },
      {
        path:"/add-orders",
        element:(<RequireAuth allowedRoles={[ROLES.admin || "admin"]}><AddOrdersPage/></RequireAuth> )
      },
      {
        path:"/users-list",
        element:(<RequireAuth allowedRoles={[ROLES.admin || "admin"]}><UsersData/></RequireAuth> )
      },
      {
        path:"/add-styles",
        element:(<RequireAuth allowedRoles={[ROLES.admin || "admin"]}><AddStyles/></RequireAuth> )
      },
    
      {
        path: "shoes-products",
        element: (
          <RequireAuth allowedRoles={[ROLES.user]}>
          
            <OurCollectionTabDetails/>
          </RequireAuth>
        ),
      },
     
      {
        path: "ratings",
        element: (
          <RequireAuth allowedRoles={[ROLES.superAdmin]}>
            <RatingsFeedback />
          </RequireAuth>
        ),
      },
      
      {
        path: "",
        children: [
          {
            path: "settings",
            element: (
              <RequireAuth
                allowedRoles={[ROLES.admin, ROLES.coordinator, ROLES.client]}
              >
                <SettingsPage />
              </RequireAuth>
            ),
          },
          {
            path: "settings/Key-info",
            element: (
              <RequireAuth
                allowedRoles={[ROLES.admin,ROLES.client]}
              >
                <KeyInfo />
              </RequireAuth>
            ),
          },
          {
            path: "settings/job-role",
            element: (
              <RequireAuth
                allowedRoles={[ROLES.admin, ROLES.coordinator, ROLES.client]}
              >
                <JobRole />
              </RequireAuth>
            ),
          },
         
         

        ],
      },
     
      //client
      {
        path: "",
        children: [
          {
            path: "client-booking-calendar",
            element: (
              <RequireAuth allowedRoles={[ROLES.user]}>
                 <OurCustomOrderDetails /> 
              </RequireAuth>
            ),
          },
          
        ],
      },
     
    ],
  },
  {
    path: "*",
    element: <NotFound />
  }
];
