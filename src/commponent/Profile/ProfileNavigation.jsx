import React from "react";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeIcon from "@mui/icons-material/Home";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EventIcon from "@mui/icons-material/Event";
import LogoutIcon from "@mui/icons-material/Logout";
import { Divider, Drawer, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../State/Authentication/Action";

const Menu = [
  { title: "Orders", icon: <ShoppingBagIcon /> },
  { title: "Favorites", icon: <FavoriteIcon /> },
  { title: "Address", icon: <HomeIcon /> },
  { title: "Notifaction", icon: <NotificationsIcon /> },
  { title: "Event", icon: <EventIcon /> },
  { title: "Payment", icon: <AccountBalanceWalletIcon /> },
  { title: "LogOut", icon: <LogoutIcon /> },
];
export const ProfileNavigation = ({ open, handleClose }) => {
  const isSmallScreen = useMediaQuery("max-width:1080");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleNavigate = (item) => {
    // console.log(item.title);
    if (item.title === "LogOut") {
      dispatch(logout());
      navigate("/");
    } else navigate(`/my-profile/${item.title.toLowerCase()}`);
  };
  return (
    <div>
      <Drawer
        sx={{ zIndex: 1 }}
        anchor="left"
        open={open}
        variant={isSmallScreen ? "temporary" : "permanent"}
      >
        <div className="w-[50vw] lg:w-[20vw] h-[100vh] flex flex-col justify-center text-xl pt-10 gap-8 ">
          {Menu.map((item, i) => (
            <>
              <div
                onClick={() => handleNavigate(item)}
                className="px-5 items-center space-x-5 cursor-pointer"
              >
                {item.icon}
                <span>{item.title}</span>
              </div>
              {i !== Menu.length - 1 && <Divider />}
            </>
          ))}
        </div>
      </Drawer>
    </div>
  );
};
