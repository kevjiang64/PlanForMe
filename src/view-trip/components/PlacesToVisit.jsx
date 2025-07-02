import React from "react";
import PlaceCardItem from "./PlaceCardItem";

const PlacesToVisit = ({ itinerary }) => {
  console.log(itinerary);
  return (
    <div className="mt-5 font-bold text-lg">
      <h2>Places To Visit</h2>

      <div>
        {itinerary &&
          Object.keys(itinerary).map((day, index) => (
            <div className="mt-5">
              <h2 className="font-medium text-lg">Day {index + 1}</h2>
              <div className="grid md:grid-cols-2 gap-5">
                {itinerary[day].map((place, idx) => (
                  <PlaceCardItem place={place} />
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PlacesToVisit;
