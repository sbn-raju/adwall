import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <>
      <div className="bg-gray-900">
      <Header />
      <Outlet />
      <Footer />
      </div>
    </>
  );
};
