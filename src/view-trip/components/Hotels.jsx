import React from "react";
import { Link } from "react-router-dom";
import { googleMapURL } from "../../constants/options";

const Hotels = ({ hotels }) => {
  console.log(hotels?.[0]);
  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Hotel Recommendations</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {hotels?.map((hotel, index) => (
          <Link
            to={googleMapURL + hotel?.hotelName + "," + hotel?.hotelAddress}
            target="_blank"
          >
            <div className="hover:scale-105 transition-all cursor-pointer">
              <img src="/placeholder.jpg" className="rounded-xl" />
              <div className="my-2 flex flex-col gap-2">
                <h2 className="font-medium text-lg mt-2">{hotel?.hotelName}</h2>
                <h2 className="text-xs text-gray-500">
                  📍 {hotel?.hotelAddress}
                </h2>
                <h2 className="text-xs text-gray-500">
                  ⭐ Rating: {hotel?.rating}
                </h2>
                <h2 className="text-sm">💸 {hotel?.price}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Hotels;
