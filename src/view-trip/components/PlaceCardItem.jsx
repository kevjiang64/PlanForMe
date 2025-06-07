import React from "react";
import { Button } from "../../components/ui/button";
import { FaMapLocationDot } from "react-icons/fa6";
import { googleMapURL } from "../../constants/options";
import { GetPlacesDetails } from "../../service/GlobalApi";
import { PHOTO_REF_URL } from "../../service/GlobalApi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PlaceCardItem = ({ place }) => {
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    place && GetPlacePhoto();
  }, [place]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: place?.placeName,
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
    <Link to={googleMapURL + place.placeName} target="_blank">
      <div className="border rounded-xl p-3 mt-2 flex gap-5 hover:shadow-md hover:scale-105 transition-all cursor-pointer">
        <img
          src={photoUrl}
          className="w-[130px] h-[130px] rounded-xl obj-cover"
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
