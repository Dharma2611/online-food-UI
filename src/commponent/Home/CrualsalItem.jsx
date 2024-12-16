import React from "react";

export const CrualsalItem = ({ image, title }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <img
        className="w-[10rrem] h-[10rem] lg:h-[14rem] lg:w-[14rem] rounded-full object-cover object-center"
        alt=""
        src={image}
      />
      <span className="py-5 font-semibold text-xl text-gray-400">{title}</span>
    </div>
  );
};
