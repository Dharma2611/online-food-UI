import { Button, Card } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const OrderCard = (item) => {
  return (
    <Card className="flex justify-between items-center p-5">
      <div className="flex items-center space-x-5">
        <img className="h-16 w-16" src="" alt="" />
        <div>
          <p>biryani</p>
          <p>$399</p>
        </div>
      </div>
      <div>
        <Button className="cursor-not-allowed">
          {item.orders?.orderStatus}
        </Button>
      </div>
    </Card>
  );
};

export default OrderCard;
