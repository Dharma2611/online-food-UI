import { Avatar, Badge, IconButton } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { pink } from "@mui/material/colors";
import "./Navbar.css";
import { Person } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const Navbar = () => {
  const { auth, cart } = useSelector((store) => store);
  const navigate = useNavigate();

  const handleAvatarClick = () => {
    console.log("role of user", auth.user.role);
    if (
      auth.user.role === "ROLE_CUSTOMER" ||
      auth.user.role === "ROLE_RESTAURANT_OWNER"
    ) {
      navigate("/my-profile");
    } else {
      navigate("/admin/restaurant");
    }
  };

  return (
    <div className="px-5 sticky top-0 z-50 pt-2 py-[.8re] bg-[#e91e63] lg:px-20 flex justify-between">
      {/* Logo Section */}
      <div className="lg:mr-10 cursor-pointer flex items-center space-x-4">
        <li
          className="logo font-semibold text-gray-600 text-lg"
          onClick={() => navigate("/")}
        >
          Foodies Zosh
        </li>
      </div>

      {/* Navigation Section */}
      <div className="flex items-center space-x-2 lg:space-x-10">
        {/* Search Icon */}
        <div>
          <IconButton>
            <SearchIcon sx={{ fontSize: "1.5rem" }} />
          </IconButton>
        </div>

        {/* User Avatar / Login Button */}
        <div>
          {auth?.user ? (
            <Avatar
              sx={{ bgcolor: "white", color: pink.A400 }}
              onClick={handleAvatarClick}
            >
              {auth.user?.fullName ? auth.user.fullName[0].toUpperCase() : ""}
            </Avatar>
          ) : (
            <IconButton onClick={() => navigate("/account/login")}>
              <Person />
            </IconButton>
          )}
        </div>

        {/* Shopping Cart Icon */}
        <div>
          <IconButton onClick={() => navigate("/cart")}>
            <Badge
              color="secondary"
              badgeContent={cart.cart?.items?.length || 0}
            >
              <ShoppingCartIcon sx={{ fontSize: "1.5rem" }} />
            </Badge>
          </IconButton>
        </div>
      </div>
    </div>
  );
};
