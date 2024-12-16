import { Card, Chip, IconButton } from "@mui/material";
import React from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorite } from "../../State/Authentication/Action";
import { isPresentInFavorite } from "../config/logic";

export const RestaurantCart = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);
  const handleAddtoFavorite = (restaurantId) => {
    const jwt = localStorage.getItem("jwt");
    console.log("restaurant id is", restaurantId);
    if (restaurantId) {
      dispatch(addToFavorite(jwt, restaurantId));
    } else {
      console.error("Restaurant ID is undefined.");
    }
  };
  const handleNavigateToRestaurant = () => {
    navigate(`/restaurant/${item.address.city}/${item.name}/${item.id}`);
  };
  return (
    <Card className="w-[18rem]">
      <div
        className={`${true ? "cursor-pointer" : "cursor-not-allowed"} required`}
      >
        <img
          alt=""
          src={item.images[1]}
          className="w-full h-[10rem] rounded-t-md object-cover"
        />
        <Chip
          size="small"
          className="absolute top-2 left-2"
          color={item.open ? "success" : "error"}
          label={item.open ? "open" : "closed"}
        ></Chip>
      </div>
      <div className="p-4 textpart lg:flex w-full justify-between">
        <div className="space-y-1">
          <p
            onClick={handleNavigateToRestaurant}
            className="font-semibold text-lg cursor-pointer"
          >
            {item.name}
          </p>
          <p className="text-gray-400 text-sm">{item.description}</p>
        </div>
      </div>
      <div>
        <IconButton onClick={() => handleAddtoFavorite(item.id)}>
          {isPresentInFavorite(auth.favorites, item) ? (
            <FavoriteIcon />
          ) : (
            <FavoriteBorderIcon />
          )}
        </IconButton>
      </div>
    </Card>
  );
};
