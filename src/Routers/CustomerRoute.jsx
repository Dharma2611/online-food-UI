import React from "react";
import { Navbar } from "../commponent/navbar/Navbar";
import { Route, Routes } from "react-router-dom";

import { RestaurantDetails } from "../commponent/Restaurant/RestaurantDetails";

import { Profile } from "../commponent/Profile/Profile";
import { Homes } from "../commponent/Home/Home";
import { Carts } from "../commponent/Cart/Carts";
import Auth from "../commponent/Auth/Auth";
const CustomerRoute = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homes />} />
        <Route path="/accout/:register" element={<Homes />} />
        <Route
          path="/restaurant/:city/:title/:id"
          element={<RestaurantDetails />}
        />
        <Route path="/cart" element={<Carts />} />
        <Route path="/my-profile/*" element={<Profile />} />
      </Routes>
      <Auth />
    </div>
  );
};

export default CustomerRoute;
