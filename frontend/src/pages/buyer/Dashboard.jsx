import React from "react";
import { Store, History, BadgeIndianRupee } from "lucide-react";
import DashboardWelcome from "../../components/common/DashboardWelcome";

const actions = [
  { to: "/products-list", icon: Store, title: "Browse walls", description: "Find a high-visibility spot for your next campaign." },
  { to: "/buyer/dashboard/rented-walls", icon: History, title: "Rented walls", description: "See every wall you're currently renting." },
  { to: "/buyer/dashboard/tansactions", icon: BadgeIndianRupee, title: "Transactions", description: "Review your payments and their status." },
];

const BuyerDashboard = () => (
  <DashboardWelcome
    fallbackName="Buyer"
    tagline="Buy this space before your competitor does it! 👍"
    actions={actions}
  />
);

export default BuyerDashboard;
