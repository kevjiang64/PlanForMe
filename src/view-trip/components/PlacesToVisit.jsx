import React from "react";
import PlaceCardItem from "./PlaceCardItem";

const PlacesToVisit = ({ itinerary }) => {
  console.log(itinerary);
  return (
    <div className="font-bold text-lg">
      <h2>PlacesToVisit</h2>

      <div>
        {Object.keys(itinerary).forEach((day, index) => (
          <div className="mt-5">
            <h2 className="font-medium text-lg">{item.day}</h2>
            <div className="grid md:grid-cols-2 gap-5">
              {day.plan.map((place, idx) => (
                <div>
                  <h2 className="font-medium text-sm text-orange-600">
                    <PlaceCardItem place={place} />
                  </h2>
                  <div></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlacesToVisit;
