import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

const EventCard = () => {
  return (
    <div>
      <Card sx={345}>
        <CardMedia
          sx={{ height: 345 }}
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZgaNLr3QwE9Oy36FQS0CIuIFdn9YI2srUxQ&s"
        />
        <CardContent>
          <Typography variant="h5">Indian Fast Food</Typography>
          <Typography variant="Body2">50% Off on First Order</Typography>
          <div className="py-2 space-y-2">
            <p>{"Mumbai"}</p>
            <p className="text-sm text-blue-500">Febouary 14 , 2024 12:00 AM</p>
            <p className="text-sm text-red-500">Febouary 15 , 2024 12:00 AM</p>
          </div>
        </CardContent>
        {true && (
          <CardActions>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </CardActions>
        )}
      </Card>
    </div>
  );
};

export default EventCard;
