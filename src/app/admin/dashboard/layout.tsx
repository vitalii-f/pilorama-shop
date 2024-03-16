import { ReactNode } from "react";
import { DashboardContainer } from "./Dashboard.styled";

const DashboardLayout = ({ payment, purchase }: { payment: ReactNode, purchase: ReactNode }) => {
  return <DashboardContainer>
    {purchase}
    {payment}
  </DashboardContainer>;
};

export default DashboardLayout;
