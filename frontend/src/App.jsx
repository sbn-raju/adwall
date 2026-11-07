import React, { useState } from "react";
import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Loader from "./components/Loader";

// Lazy-loaded components
const LoginPage = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const Home = lazy(() => import("./pages/Home"));
const AboutUs = lazy(() => import("./pages/About"));
const BuyerDashboard = lazy(() => import("./pages/buyer/Dashboard"));
const PrivateRoute = lazy(() => import("./routes/PrivateRoute"));
const SellerDashboard = lazy(() => import("./pages/seller/Dashboard"));
const Product = lazy(() => import("./products/ProductsList"));
const ProductDetails = lazy(() => import("./products/ProductDetails"));
const CheckoutPage = lazy(() => import("./products/CheckoutPage"));
const Error = lazy(() => import("./components/Error"));
import { Layout } from "./layouts/Layout";
import DashboardLayout from "./layouts/DashboardLayout";
import WallForm from "./pages/seller/WallForm";
import Transaction from "./pages/seller/Transactions";
import BASE_URI from "./utils/base_uri";
import Payments from "./Payments";
import AdsWall from "./pages/seller/AdsWall";
import ProductSellerDetails from "./pages/seller/Product";
import RentWall from "./pages/seller/rent/RentWalls";
import RentWallDetails from "./pages/seller/rent/RentWallDetails";
import EditProfile from "./EditProfile";
import PaymentSuccess from "./products/PaymentSuccess";
import RentedWall from "./pages/buyer/RentedWalls";
const Profile = lazy(() => import("./Profile"));

const App = () => {
  
  //Getting the user role from the session Storage.
  const role = sessionStorage.getItem("userRole");


  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route path="/register" element={<Register />} />

          <Route path="/" element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/products-list" element={<Product />} />
            <Route path="/product/:product_id" element={<ProductDetails />} />

            <Route
              path="/checkout/:id"
              element={
                <PrivateRoute>
                  <CheckoutPage />
                </PrivateRoute>
              }
            />

            <Route
              path={'/payment/:product_id'}
              element={<Payments />}
            />
            
            <Route
            path="/payment/success"
            element={<PaymentSuccess/>}
            />
          </Route>

          <Route
            path="/"
            element={
              <PrivateRoute>
                <DashboardLayout />
              </PrivateRoute>
            }
          >
            <Route path="/buyer/dashboard" element={<BuyerDashboard />} />

            <Route path="/seller/dashboard" element={<SellerDashboard />} />

            <Route path={`/${role}/dashboard/profile/`} element={<Profile />} />

            <Route path={`/dashboard/edit-profile/`} element={<EditProfile />} />

            <Route
              path="/seller/dashboard/add/wall"
              element={
                <WallForm/>
              }
            />

              <Route
              path="/seller/dashboard/walls"
              element={
                <AdsWall/>
              }
            />

            <Route
              path="/seller/dashboard/walls/details/:product_id"
              element={
                <ProductSellerDetails/>
              }
            />

            <Route
              path="/seller/dashboard/rented-walls"
              element={
                <RentWall/>
              }
            />


            <Route
              path="/seller/dashboard/rented-walls/details/:product_id"
              element={
                <RentWallDetails/>
              }
            />

              <Route
              path="/buyer/dashboard/rented-walls"
              element={
                <RentedWall/>
              }
            />

            <Route
              path={`/buyer/dashboard/tansactions`}
              element={<Transaction />}
            />


          </Route>
          {/* Other routes */}
          <Route path="*" element={<Error />} />
        </Routes>

        <Toaster position="top-center" />
      </Suspense>
    </Router>
  );
};

export default App;
