import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

const Header = () => {
  const [openDialogue, setOpenDialogue] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log(codeResponse);
      GetUserProfile(codeResponse);
    },
    onError: (error) => {
      console.error("Login Failed:", error);
    },
  });

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
        localStorage.setItem("user", JSON.stringify(response.data));
        setOpenDialogue(false);
        window.location.reload();
      });
  };

  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5">
      <img src="/logo.svg"></img>
      <div>
        {user ? (
          <div className="flex items-center gap-3">
            <a href="/create-trip"></a>
            <Button variant="outline" className="rounded-full">
              + Create Trips
            </Button>
            <a href="/my-trips">
              <Button variant="outline" className="rounded-full">
                My Trips
              </Button>
            </a>

            <Popover>
              <PopoverTrigger>
                <img
                  src={user?.picture}
                  className="h-[35px] w-[35px] rounded-full"
                ></img>
              </PopoverTrigger>
              <PopoverContent>
                <h2
                  className="cursor-pointer"
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                  }}
                >
                  Logout
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={() => setOpenDialogue(true)}>Sign In</Button>
        )}
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

export default Header;
