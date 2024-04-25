import React from "react";
import Header from "./components/Header";
import { BrowserRouter, Route,Routes } from "react-router-dom";
import Home from "./pages/Home";
import ResinCalculator from "./pages/ResinCalculator";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import DashBoard from "./pages/DashBoard";
import Product from "./pages/Product";
import ProductItems from "./components/ProductItems";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/resin-calculator" element={<ResinCalculator/>}/>
        <Route path="/sign-in" element={<SignIn/>}/>
        <Route path="/sign-up" element={<SignUp/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/productItem/:productId" element={<ProductItems/>}/>
        <Route element={<PrivateRoute/>}>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/dashboard" element={<DashBoard />}/>
          <Route path="/product" element={<Product/>}/>
        </Route>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
};

export default App;
