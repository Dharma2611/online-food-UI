import {
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import PlaceIcon from "@mui/icons-material/Place";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getRestaurantsCategoryAction,
  getRestaurnatsByIdAction,
} from "../../State/Restaurant/Action";
import { getMenuItemByRestaurantIdAction } from "../../State/Menu/Action";
import { MenuCard } from "./MenuCard";

const FoodType = [
  {
    label: "all",
    value: "all",
  },
  {
    label: "vegetarian only",
    value: "vegetarian",
  },
  {
    label: "non-vegetarian only",
    value: "non-vegetarian",
  },
  {
    label: "Seasonal",
    value: "seasonal",
  },
];
// const menu = [1, 1, 1, 1, 1];
export const RestaurantDetails = () => {
  const [foodType, setFoodType] = useState("All");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");
  const { auth, restaurant, menu } = useSelector((store) => store);
  const { id } = useParams();
  const [selectCategoryItem, setSelectCategoryItem] = useState("");

  const handleFilter = (e) => {
    setFoodType(e.target.value);
    console.log(e.target.value, e.target.name);
  };
  const handleFilterCategory = (e, value) => {
    setSelectCategoryItem(value);
    console.log(e.target.value, e.target.name, value);
  };

  useEffect(() => {
    dispatch(getRestaurnatsByIdAction({ jwt, restaurantId: id }));
    dispatch(getRestaurantsCategoryAction({ restaurantId: id, jwt }));
  }, [dispatch, jwt, id]);
  useEffect(() => {
    dispatch(
      getMenuItemByRestaurantIdAction({
        jwt,
        restaurantId: id,
        vegetarian: foodType === "vegetarian",
        nonveg: foodType === "non-vegetarian",
        seasonal: foodType === "seasonal",

        foodCategory: selectCategoryItem,
      })
    );
  }, [selectCategoryItem, foodType]);
  return (
    <div className="px-5 lg:px-20">
      <div>
        <section>
          <h3 className="text-gray-500 py-2 mt-10 ">
            Home /india/Indian Fast food/3
          </h3>
          <div>
            <Grid container spacing={2}>
              <Grid item xs={12} lg={6}>
                <img
                  src={restaurant.restaurant?.images[0]}
                  alt=""
                  className="w-full h-[40vh] object-cover"
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <img
                  src="https://cdn.pixabay.com/photo/2019/08/25/11/41/chair-4429296_640.jpg"
                  alt=""
                  className="w-full h-[40vh] object-cover"
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <img
                  src="https://cdn.pixabay.com/photo/2014/09/17/20/26/restaurant-449952_640.jpg"
                  alt=""
                  className="w-full h-[40vh] object-cover"
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <img
                  src={restaurant.restaurant?.images[1]}
                  alt=""
                  className="w-full h-[40vh] object-cover"
                />
              </Grid>
            </Grid>
          </div>
          <div className="pt-3 pb-5">
            <h1 className="text-4xl font-semibold">
              {restaurant.restaurant?.name}
            </h1>
            <span className="text-gray-500 mt-2">
              {restaurant.restaurant?.description}
            </span>
            <div className="space-y-3 pb-5">
              <p className="text-gray-500 flex items-center gap-3">
                <PlaceIcon />
                <span className="text-gray-500 mt-2">Mumbai maharatrya</span>
              </p>
              <p className="text-gray-500 flex items-center gap-3">
                <CalendarTodayIcon />
                <span>{restaurant.restaurant?.openingHours}</span>
              </p>
            </div>
          </div>
        </section>
      </div>
      <Divider />
      <section className="pt-[2rem] lg:flex relative">
        <div className="space-y-10 lg:w-[20%] filter">
          <div className="box space-y-5 lg:sticky top-28  p-5 shadow-md">
            <div>
              <p>
                <Typography>Food Type</Typography>
                <FormControl className="py-10 space-y-5" component={"fieldset"}>
                  <RadioGroup
                    onChange={handleFilter}
                    name="food_type"
                    value={foodType}
                  >
                    {FoodType.map((item) => (
                      <FormControlLabel
                        value={item.value}
                        control={<Radio />}
                        label={item.label}
                        key={item.value}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </p>
            </div>
            <Divider />
            <div>
              <p>
                <Typography>Food Category</Typography>
                <FormControl className="py-10 space-y-5" component={"fieldset"}>
                  <RadioGroup
                    onChange={handleFilterCategory}
                    name="food_category"
                    value={selectCategoryItem}
                  >
                    {restaurant.categories.map((item) => (
                      <FormControlLabel
                        value={item.name}
                        control={<Radio />}
                        label={item.name}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-5 lg:w-[80%] lg:pl-10">
          {menu.menuItem.map((item) => (
            <MenuCard item={item} />
          ))}
        </div>
      </section>
    </div>
  );
};
