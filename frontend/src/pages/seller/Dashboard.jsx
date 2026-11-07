import React from "react";
import { ImagePlus, BrickWall, BadgeCheck } from "lucide-react";
import DashboardWelcome from "../../components/common/DashboardWelcome";

const actions = [
  { to: "/seller/dashboard/add/wall", icon: ImagePlus, title: "Post an ad", description: "List a new wall with photos, size and price." },
  { to: "/seller/dashboard/walls", icon: BrickWall, title: "Your walls", description: "Manage every wall you've listed." },
  { to: "/seller/dashboard/rented-walls", icon: BadgeCheck, title: "Walls on rent", description: "See which walls are rented and by whom." },
];

const SellerDashboard = () => (
  <DashboardWelcome
    fallbackName="Seller"
    tagline="Ready to manage your products and boost your sales?"
    actions={actions}
  />
);

export default SellerDashboard;
