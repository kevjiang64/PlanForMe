import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../service/firebaseConfig"; // Adjust the import path as necessary
import InfoSection from "../components/InfoSection";
import { Hotel } from "lucide-react";
import Hotels from "../components/Hotels";
import PlacesToVisit from "../components/PlacesToVisit";

const ViewTrip = () => {
  const { tripId } = useParams();
  const [trip, setTrip] = useState([]);

  useEffect(() => {
    GetTripData();
  }, [tripId]);

  const GetTripData = async () => {
    const docRef = doc(db, "AITrips", tripId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log(docSnap.data());
      setTrip(docSnap.data());
    } else {
      console.log("No such document!");
      return null;
    }
  };

  return (
    <div className="p-10 md:px-20 lg:px-44 xl:px-56">
      {/*Info Section*/}
      <InfoSection trip={trip} />
      {/*Hotels*/}
      <Hotels hotels={trip?.tripData?.[0]?.travelPlan?.hotelOptions} />
      {/*Daily Itinerary*/}
      <PlacesToVisit itinerary={trip?.tripData?.[0]?.travelPlan?.itinerary} />
    </div>
  );
};

export default ViewTrip;
