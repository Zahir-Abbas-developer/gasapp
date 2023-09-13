
// Components
import BreadCrumb from '../../layout/BreadCrumb/BreadCrumb';


// Utils 
import { renderDashboard } from '../../utils/useRenderDashboard';

// SCSS
import "./Setting.scss";



const Setting = () => {
  const { role }: any = JSON.parse(localStorage.getItem("careUserData") || "{}");

  
  return (
    <>
      <div className='setting-main'>
        <BreadCrumb breadCrumbItems={[
          {
          title: "Settings",
          path: "",
          },
          {
            title: "Dashboard",
            path: renderDashboard(role),
          }
        ]} />

       
      </div>

    </>


  )
}

export default Setting