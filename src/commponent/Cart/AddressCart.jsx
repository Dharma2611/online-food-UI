import React from "react";

import HomeIcon from "@mui/icons-material/Home";
import { Button, Card } from "@mui/material";

export const AddressCart = ({ item, showBuuton, handelAddress }) => {
  return (
    <Card className="flex gap-5 w-64 p-5">
      <HomeIcon />
      <div className="space-y-3 text-gray-400">
        <h1 className="font-semibold text-lg text-white">Home</h1>
        <p>Indore Baghya shree Conly Vijay nagar 452010 madhya pradesh india</p>
        {showBuuton && (
          <Button onClick={() => handelAddress()} variant="outlined">
            Select
          </Button>
        )}
      </div>
    </Card>
  );
};
