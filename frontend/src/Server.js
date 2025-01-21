
import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar.js";
import ProtectedRoute from "./Components/ProtectedRoute/protectedRoutes.js";
import { Layout } from "antd";
import  CartPage from  "./Pages/Cart/CartPage.js";
import  SignInPage from "./Pages/Signin/SignInPage.js";
import  SignUpPage from "./Pages/Signup/SignUpPage.js";
import  Profile from "./Pages/Profile/Profile.js";
import  Product from "./Redux/products/ProductDetail.js";
import  DashBoard from "./Pages/dash/DashBoard.js";

const { Footer, Content } = Layout;

// Lazy loading components
const HomePage = lazy(() => import("./Pages/Home/Homepage.js"));


function Server() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Main Layout */}
      <Layout>
        <Router>
          <Navbar style={{}} />
          <Content
            style={{
              margin: "20px",
              padding: "20px",
              background: "#f8f9fa",
              transition: "margin-left 0.2s",
            }}
          >
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/dashboard" element={<DashBoard />} />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route path="/product/:id" element={<Product />} />
              </Routes>
            </Suspense>
          </Content>
        </Router>
      </Layout>

      {/* Footer */}
      <Footer style={{ textAlign: "center", background: "#333333", color: "#fff" }}>
        &copy; 2024 E-SHOP. All rights reserved.
      </Footer>
    </Layout>
  );
}

export default Server;
