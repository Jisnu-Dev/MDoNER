import type { Metadata } from "next";
import PortalDashboard from '@/components/PortalDashboard';

export const metadata: Metadata = {
  title: "Assessment Portal | DPR Quality Assessment System | MDoNER",
  description: "Access the AI-powered DPR assessment portal for project evaluation and risk prediction.",
};

export default function PortalPage() {
  return <PortalDashboard />;
}