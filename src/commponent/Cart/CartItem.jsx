import React from "react";
import { Chip, IconButton } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useDispatch, useSelector } from "react-redux";
import { updateCartItem, removeCartItem } from "../../State/Cart/Action";

export const CartItem = ({ item }) => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const handleUpdateCartItem = (change) => {
    if (!item.id) {
      console.error("Cart item update failed: ID is missing.");
      return;
    }

    const newQuantity = item.quantity + change;

    // Prevent quantity from going below 0
    if (newQuantity < 0) {
      console.error("Quantity cannot be less than zero.");
      return;
    }

    if (change === -1 && item.quantity === 1) {
      handleRemovedCartItem();
      return;
    }

    const data = { cartItemId: item.id, quantity: newQuantity };
    dispatch(updateCartItem({ data, jwt }));
  };

  const handleRemovedCartItem = () => {
    if (item.id) {
      dispatch(removeCartItem({ cartItemId: item.id, auth: auth.jwt || jwt }));
    } else {
      console.error("Cart item removal failed: ID is missing.");
    }
  };

  return (
    <div className="px-5">
      <div className="lg:flex items-center lg:space-x-5">
        <img
          src={item.food.images[0]}
          alt={item.food.name}
          className="w-[5rem] h-[5rem] object-cover"
        />

        <div className="flex items-center justify-between lg:w-[70%]">
          <div className="space-y-1 lg:space-y-3 w-full">
            <p>{item.food.name}</p>
            <div className="flex items-center">
              <IconButton onClick={() => handleUpdateCartItem(-1)}>
                <RemoveCircleOutlineIcon />
              </IconButton>
              <div className="w-5 text-xs flex items-center justify-center">
                {item.quantity}
              </div>
              <IconButton onClick={() => handleUpdateCartItem(1)}>
                <AddCircleOutlineIcon />
              </IconButton>
            </div>
          </div>
          <p>{item.totalPrice}</p>
        </div>
      </div>
      <div className="pt-3 space-x-3">
        {item.ingredients.map((ingredient, index) => (
          <Chip label={ingredient} key={index} /> // Added a key for mapping
        ))}
      </div>
    </div>
  );
};
