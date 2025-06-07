import React from "react";
import { useEffect, useState } from "react";
import { GetPlacesDetails, PHOTO_REF_URL } from "../service/GlobalApi"; // Adjust the import path as necessary

const UserTripCardItem = ({ trip }) => {
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.destination?.label,
    };

    const result = await GetPlacesDetails(data).then((res) => {
      console.log(res.data.places[0].photos[3].name);

      const PhotoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        res.data.places[0].photos[3].name
      );

      setPhotoUrl(PhotoUrl);
    });
  };

  return (
    <Link to={`/view-trip/${trip.id}`} className="flex flex-col gap-3">
      <div className="hover:scale-105 transition-all hover:shadow-md">
        <img
          className="object-cover rounded-xl h-[220px]"
          src="placeHolder.jpg"
        ></img>
        <div>
          <h2 className="font-bold text-lg">
            {trip?.userSelection?.location?.label}
          </h2>
          <h2 className="text-sm text-gray-500">
            {trip?.userSelection?.noOfDays} Days trip With
            {trip?.userSelection?.budget} Budget
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default UserTripCardItem;
