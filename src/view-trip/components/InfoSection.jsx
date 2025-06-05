const InfoSection = ({ trip }) => {
  console.log(trip);
  return (
    <div>
      <img
        src="/placeholder.jpg"
        className="h-[340px] w-full object-cover rounded-xl"
      ></img>

      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">
            {trip?.userSelection?.destination?.label}
          </h2>
          <div className="flex gap-5">
            <h2 className="p-2 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              📅 {trip.userSelection?.noOfDays} Day
            </h2>
            <h2 className="p-2 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              💰 {trip.userSelection?.budget} Budget
            </h2>
            <h2 className="p-2 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              🧑‍🤝‍🧑No. Of Traveler: {trip.userSelection?.members}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
