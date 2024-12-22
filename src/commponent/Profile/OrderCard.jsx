import { Button, Card } from "@mui/material";
import React from "react";

const OrderCard = ({ item, order }) => {
  // console.log("item", item.food);
  // console.log("order", order);
  return (
    <Card className="flex justify-between items-center p-5">
      <div className="flex items-center space-x-5">
        <img className="h-16 w-16" src="" alt="" />
        <div>
          <p>{item?.food.name}</p>
          <p>${item?.food.price}</p>
        </div>
      </div>
      <div>
        <Button className="cursor-not-allowed">{order.orderStatus}</Button>
      </div>
    </Card>
  );
};

export default OrderCard;
