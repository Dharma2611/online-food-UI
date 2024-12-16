import React, { useState } from "react";
import { ProfileNavigation } from "./ProfileNavigation";
import { Route, Routes } from "react-router-dom";
import UserProfile from "./UserProfile";
import Orders from "./Order";
import Address from "./Address";
import Favorite from "./Favorite";
import Event from "./Event";

export const Profile = () => {
  const [openSideBar, setOpenSideBar] = useState(false);

  const toggleSideBar = () => setOpenSideBar(!openSideBar);

  return (
    <div className="lg:flex justify-between">
      <div className="sticky h-[80vh] lg:w-[20%]">
        <ProfileNavigation open={openSideBar} toggle={toggleSideBar} />
      </div>
      <div className="lg:w-[80%]">
        <Routes>
          <Route path="/" element={<UserProfile />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/address" element={<Address />} />
          <Route path="/favorites" element={<Favorite />} />
          <Route path="/event" element={<Event />} />
        </Routes>
      </div>
    </div>
  );
};
