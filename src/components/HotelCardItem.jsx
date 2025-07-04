import React from "react";
import { Link } from "react-router-dom";
import { googleMapURL } from "../constants/options";
import { GetPlacesDetails } from "../service/GlobalApi";
import { PHOTO_REF_URL } from "../service/GlobalApi";
import { useEffect, useState } from "react";

const HotelCardItem = ({ hotel }) => {
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    hotel && GetPlacePhoto();
  }, [hotel]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: hotel?.hotelName,
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
    <Link
      to={googleMapURL + hotel?.hotelName + "," + hotel?.hotelAddress}
      target="_blank"
    >
      <div className="hover:scale-105 transition-all cursor-pointer">
        <img
          src={photoUrl}
          className="rounded-xl h-[180px] w-full object-cover"
        />
        <div className="my-2 flex flex-col gap-2">
          <h2 className="font-medium text-lg mt-2">{hotel?.hotelName}</h2>
          <h2 className="text-xs text-gray-500">📍 {hotel?.hotelAddress}</h2>
          <h2 className="text-xs text-gray-500">⭐ Rating: {hotel?.rating}</h2>
          <h2 className="text-sm">💸 {hotel?.price}</h2>
        </div>
      </div>
    </Link>
  );
};

export default HotelCardItem;
