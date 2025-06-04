import React from "react";
import { Button } from "../../components/ui/button";
import { FaMapLocationDot } from "react-icons/fa6";
import { googleMapURL } from "../../constants/options";

const PlaceCardItem = ({ place }) => {
  return (
    <Link to={googleMapURL + place.placeName} target="_blank">
      <div className="border rounded-xl p-3 mt-2 flex gap-5 hover:shadow-md hover:scale-105 transition-all cursor-pointer">
        <img
          src="/placeholder.jpg"
          className="w-[130px] h-[130px] rounded-xl"
        />
        <div>
          <h2 className="font-bold text-lg">{place.placeName}</h2>
          <p className="text-sm text-gray-400">{place.placeDetails}</p>
          <h2 className="mt-2">🕧 {place.timeToTravel}</h2>
          <Button size="sm">
            <FaMapLocationDot />
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default PlaceCardItem;
