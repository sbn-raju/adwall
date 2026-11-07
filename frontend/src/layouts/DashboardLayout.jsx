import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  Menu,
  X,
  LayoutDashboard,
  ShoppingCart,
  User,
  LogOut,
  BadgeIndianRupee,
  BadgeCheck,
  ShoppingBag,
  History,
  ImagePlus,
  RotateCcw,
  BrickWall
} from "lucide-react";
import Header from "../components/Header";
import { useAuth } from "../hooks/AuthHooks";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const role = sessionStorage.getItem("userRole");
  const buyerOptions = [
    {
      id: 1,
      icon: <User className="mr-2" />,
      optionName: "Profile",
      link: "/buyer/dashboard/profile",
    },
    {
      id: 2,
      icon: <BadgeIndianRupee className="mr-2" />,
      optionName: "Transactions",
      link: "/buyer/dashboard/tansactions",
    },
    
    {
      id: 4,
      icon: <History className="mr-2" />,
      optionName: "Rented Walls",
      link: "/buyer/dashboard/rented-walls",
    },
  ];

  const sellerOptions = [
    {
      id: 1,
      icon: <User className="mr-2" />,
      optionName: "Profile",
      link: "seller/dashboard/profile",
    },
    {
      id: 2,
      icon: <ImagePlus className="mr-2" />,
      optionName: "Post Ad",
      link: "/seller/dashboard/add/wall",
    },
    {
      id: 5,
      icon: <BrickWall  className="mr-2" />,
      optionName: "Walls",
      link: "/seller/dashboard/walls",
    },
    {
      id: 4,
      icon: <BadgeCheck className="mr-2" />,
      optionName: "Walls on the Rent",
      link: "/seller/dashboard/rented-walls",
    },
    
  ];

  const { logout } = useAuth();

  const handleLogout = () =>{
    logout();
  }

  return (
    <div className="bg-gray-900">
      <Header />
      <div className="flex min-h-screen  bg-gray-900 w-full">
        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-50 bg-white shadow-md w-64 transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-64"
          } transition-transform lg:relative lg:translate-x-0`}
        >
          <div className="flex items-center justify-between p-4 border-b lg:hidden">
            <h2 className="text-lg font-semibold">Dashboard</h2>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="text-gray-500 hover:text-orange-700"
            >
              {/* <X size={24} /> */}
              Close
            </button>
          </div>
          <nav className="p-4 bg-gray-800 h-full">
            <ul className="space-y-4">
              {role === "seller"
                ? sellerOptions?.map((option) => (
                    <li key={option.id}>
                      <Link
                        to={option.link}
                        className="flex items-center p-2 text-white hover:bg-gray-500 rounded-md"
                      >
                        {option.icon} {option.optionName}
                      </Link>
                    </li>
                  ))
                : buyerOptions?.map((option) => (
                    <li key={option.id}>
                      <Link
                        to={option.link}
                        className="flex items-center p-2 text-white hover:bg-gray-500 rounded-md"
                      >
                        {option.icon} {option.optionName}
                      </Link>
                    </li>
                  ))}
              <li>
                <button onClick={handleLogout} className="flex items-center p-2 text-red-600 hover:bg-red-100 w-full rounded-md">
                  <LogOut className="mr-2" /> Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Top Navbar */}
          <header className="flex items-center justify-between bg-white shadow-md p-4 lg:hidden">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="text-gray-600"
            >
              {/* <Menu size={24} /> */}
              Menu
            </button>
            <h2 className="text-lg font-semibold">Dashboard</h2>
            <div className="w-6"></div> {/* Placeholder for balance */}
          </header>

          {/* Main Page Content */}
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
