import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Input } from "../components/ui/input";
import { SelectBudgetOptions, SelectMembersList } from "../constants/options";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
import { main } from "../service/AIModal"; // Adjust the import path as necessary

const CreateTrip = () => {
  const [place, setPlace] = useState();

  const [formData, setFormData] = useState([]);

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    console.log("Form Data Updated:", formData);
  }, [formData]);

  const OnGenerateTrip = async () => {
    if (
      !formData.destination ||
      !formData.noOfDays ||
      !formData.budget ||
      !formData.members
    ) {
      toast("Please fill in all fields before generating the trip.");
      return;
    }

    const tripDetails = {
      destination: formData.destination,
      noOfDays: formData.noOfDays,
      budget: formData.budget,
      members: formData.members,
    };

    console.log("Trip Details:", tripDetails);
    // Here you can add the logic to send this data to your backend or API

    await main();
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <h2 className="font-bold text-3xl">Tell us your travel preferences🧳</h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary fitting your needs.
      </p>

      <div className="mt-20 flex flex-col gap-10">
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is your destination of choice?
            <GooglePlacesAutocomplete
              apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
              selectProps={{
                place,
                onChange: (v) => {
                  setPlace(v);
                  handleInputChange("destination", v);
                },
              }}
            />
          </h2>
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days are you planning on travelling?
            <Input
              type="number"
              placeholder={"Ex: 3"}
              min="0"
              onChange={(e) => handleInputChange("noOfDays", e.target.value)}
            ></Input>
          </h2>
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">
            What is your destination of choice?
          </h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectBudgetOptions.map((item, index) => (
              <div
                onClick={() => handleInputChange("budget", item.title)}
                key={index}
                className={`p-4 border rounded-lg hover:shadow-lg cursor pointer ${
                  formData.budget === item.title && "shadow-lg border-black"
                }`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">
            How many people are travelling with you?
          </h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectMembersList.map((item, index) => (
              <div
                key={index}
                className={`p-4 border rounded-lg hover:shadow-lg cursor pointer ${
                  formData.members === item.people && "shadow-lg border-black"
                }`}
                onClick={() => handleInputChange("members", item.people)}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="my-10 justify-end flex">
        <Button onClick={() => OnGenerateTrip()}>Generate Trip</Button>
      </div>
    </div>
  );
};

export default CreateTrip;
