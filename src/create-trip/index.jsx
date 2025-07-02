import { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Input } from "../components/ui/input";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectMembersList,
} from "../constants/options";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
import { chatSession } from "../service/AIModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../service/firebaseConfig"; // Adjust the import path as necessary
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const CreateTrip = () => {
  const [place, setPlace] = useState();

  const [formData, setFormData] = useState([]);

  const [openDialogue, setOpenDialogue] = useState(false);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log(codeResponse);
      GetUserProfile(codeResponse);
    },
    onError: (error) => {
      console.error("Login Failed:", error);
    },
  });

  useEffect(() => {
    console.log("Form Data Updated:", formData);
  }, [formData]);

  const SaveAiTrip = async (trip) => {
    setLoading(true);

    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();

    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(trip),
      userEmail: user?.email,
      id: docId,
    });

    setLoading(false);

    navigate(`/view-trip/${docId}`);
  };

  const GetUserProfile = async (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenInfo.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        console.log("User Profile:", response.data);
        setOpenDialogue(false);
        localStorage.setItem("user", JSON.stringify(response.data));
      });
  };

  const OnGenerateTrip = async () => {
    setLoading(true);

    const user = localStorage.getItem("user");

    if (!user) {
      setOpenDialogue(true);
      return;
    }

    if (
      !formData.destination ||
      !formData.noOfDays ||
      !formData.budget ||
      !formData.members
    ) {
      toast("Please fill in all fields before generating the trip.");
      return;
    }

    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.destination?.label
    )
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.members)
      .replace("{budget}", formData?.budget)
      .replace("{totalDays}", formData?.noOfDays);

    console.log("Final Prompt:", FINAL_PROMPT);

    const result = await chatSession(FINAL_PROMPT);

    console.log(result);

    setLoading(false);

    SaveAiTrip(result);
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
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
        <Button disabled={loading} onClick={() => OnGenerateTrip()}>
          {loading ? (
            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin"></AiOutlineLoading3Quarters>
          ) : (
            "Generate Trip"
          )}
        </Button>
      </div>

      <Dialog open={openDialogue}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <img src="/logo.svg"></img>
            </DialogTitle>
            <DialogDescription>
              <h2 className="font-bold text-lg mt-7">Sign in with Google</h2>
              <p>Sign into the App with Google Authentication securely.</p>

              <Button
                onClick={() => login()}
                className="w-full mt-5 flex gap-4 items-center"
              >
                {loading ? (
                  "test"
                ) : (
                  <>
                    <FcGoogle className="h-7 w-7" />
                    Sign in with Google
                  </>
                )}
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateTrip;
