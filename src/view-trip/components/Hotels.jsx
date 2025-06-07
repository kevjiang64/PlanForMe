import React from "react";
import { Link } from "react-router-dom";
import { googleMapURL } from "../../constants/options";
import HotelCardItem from "../../components/HotelCardItem";

const Hotels = ({ hotels }) => {
  console.log(hotels?.[0]);
  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Hotel Recommendations</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {hotels?.map((hotel, index) => (
          <HotelCardItem key={index} hotel={hotel} />
        ))}
      </div>
    </div>
  );
};

export default Hotels;
