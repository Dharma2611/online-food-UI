import React, { useEffect } from "react";
import "./Home.css";
import { MultiItemCruousal } from "./MultiItemCruousal";
import { RestaurantCart } from "../Restaurant/RestaurantCart";
import { useDispatch, useSelector } from "react-redux";
import { getAllRestaurantsAction } from "../../State/Restaurant/Action";
// import { findCart } from "../../State/Cart/Action";

const restaurants = [1, 1, 1, 1, 1, 1, 1, 1];

export const Homes = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  console.log(jwt);
  const { restaurant } = useSelector((store) => store);
  console.log("resturant", restaurant);

  useEffect(() => {
    dispatch(getAllRestaurantsAction(jwt));
  }, []);

  return (
    <div className="">
      <section className="banner -z-50 relative flex flex-col justify-center">
        <div className="w-[50w] z-10 text-center">
          <p className="text-2xl lg: text-6xl font-bold z-10 py-5">
            Foodies Zosh
          </p>
          <p className="z-10 text-gray-300 text-xl lg:text-4xl">
            Test the the convience : Food, Fast And Delivery
          </p>
        </div>
        <div className="cover absolute top-0 right-0 left-0"></div>
        <div className=" fadout"></div>
      </section>
      <section className="p-10 lg:py-10 lg:px-10">
        <p className="text-2xl font-semibold text-gray-300 py-3 pb-1">
          Top Meals
        </p>
        <MultiItemCruousal />
      </section>
      <section className="p-5  lg:px-20">
        <h1 className="text-2xl font-semibold text-gray-300 py-3 ">
          From Our Handpick Fevorites{" "}
        </h1>
        <div className="flex flex-wrap items-center justify-around gap-2">
          {restaurant.restaurants.map((item) => (
            <RestaurantCart item={item} />
          ))}
        </div>
      </section>
    </div>
  );
};
