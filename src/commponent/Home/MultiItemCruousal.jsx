import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Topmeals } from "./Topmeal";
import { CrualsalItem } from "./CrualsalItem";
export const MultiItemCruousal = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };
  return (
    <div>
      <Slider {...settings}>
        {Topmeals.map((item) => (
          <CrualsalItem image={item.image} title={item.title} />
        ))}
      </Slider>
    </div>
  );
};
