import React from "react";
import PlaceCardItem from "./PlaceCardItem";

const PlacesToVisit = ({ trip }) => {
  return (
    <div className="font-bold text-lg">
      <h2>PlacesToVisit</h2>

      <div>
        {trip.tripData?.itinerary.map((item, index) => (
          <div className="mt-5">
            <h2 className="font-medium text-lg">{item.day}</h2>
            <div className="grid md:grid-cols-2 gap-5">
              {item.plan.map((place, idx) => (
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
