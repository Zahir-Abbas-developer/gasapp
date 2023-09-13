import { Col, Layout, Row } from "antd";
import { ClientCard } from "./RecruitmentDetails/ClientCard/ClientCard";
import { StaffCard } from "./RecruitmentDetails/StaffCard/StaffCard";
import { RecruitmentCard } from "./RecruitmentDetails/RecruitmentCard/RecruitmentCard";
import { TopCandidates } from "./ComprehensionCandidates/TopCandidates/TopCandidates";
import { StaffBirthDay } from "./StaffBirthDay/BirthDay/BirthDay";
import { ShiftComprehension } from "./ComprehensionCandidates/ShiftComprehension/ShiftComprehension";
import { ShiftsCard } from "./ShiftsInvoiceSheet/ShiftsCard/ShiftsCard";
import { InvoiceCard } from "./ShiftsInvoiceSheet/InvoiceCard/InvoiceCard";
import { StaffStatusCard } from "./StaffBirthDay/StaffStatusCard/StaffCard";
import { v4 as uuidv4 } from "uuid";
import { useGetAllCardsDataQuery } from "../../store/Slices/AdminDashboard";
import "../../sass/common.scss";
import BreadCrumb from "../../layout/BreadCrumb/BreadCrumb";
import OurCollectionTab from "../ClientTabs/OurCollectionTab/OurCollection";


const DashboardAdmin = () => {
  return (
    <>

      <Layout className=" dashboard" style={{ backgroundColor: "transparent" }}>
        <Row gutter={[29, 29]} style={{ paddingBottom: "30px" }}>
          <Col xs={24} sm={24} md={24} lg={24}>
            <OurCollectionTab />
          </Col>
        </Row>

        <Row>
         
        </Row>
      </Layout>
    </>
  );
};

export default DashboardAdmin;
