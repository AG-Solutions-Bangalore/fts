import { Input, Button, Typography } from "@material-tailwind/react";
import toast, { Toaster } from "react-hot-toast";
import BASE_URL from "../../base/BaseUrl";
import { useState } from "react";
import Logo2 from "../../assets/receipt/sigin.jpg";
import Logo1 from "../../assets/receipt/fts_logo.png";
import {
  FaFacebookF,
  FaInstagram,
  FaPinterest,
  FaTwitter,
} from "react-icons/fa";
import { TiSocialLinkedin, TiSocialYoutubeCircular } from "react-icons/ti";
import { CgFacebook } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const onResetPassword = (e) => {
    e.preventDefault();

    // if (email !== "" && username !== "") {
    fetch(`${BASE_URL}/api/send-password?username=${username}&email=${email}`, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((response) => {
        toast.success("New Password Sent to your Email");
      })
      .catch((error) => {
        toast.error("Email Not sent.");
        console.log("sdsds");
      });
    // }
  };
  const handleForgetPasswordClick = () => {
    navigate("/");
  };
  return (
    <div className="p-6   bg-blue-400 flex items-center justify-center max-h-screen">
      <Toaster
        toastOptions={{
          success: {
            style: {
              background: "green",
            },
          },
          error: {
            style: {
              background: "red",
            },
          },
        }}
        position="top-right"
        reverseOrder={false}
      />
      <div className="max-w-7xl w-full bg-white shadow-lg rounded-2xl overflow-hidden">
        <div className="flex flex-col lg:flex-row max-h-[682px]">
          {/* Left Side - Image */}
          <div className="lg:w-1/2 hidden lg:block">
            <img
              src={Logo2}
              alt="Login"
              className="object-cover h-full w-full"
            />
          </div>

          {/* Right Side - Form */}
          <div className="flex-1 p-4  sm:px-0 md:px-16 flex flex-col mt-8 max-h-[682px]">
            <div className="flex items-center justify-center mb-8">
              <img src={Logo1} alt="Company Logo" className="w-32 h-32" />
            </div>
            <Typography
              variant="h4"
              className="text-center font-bold mb-6 text-blue-gray-800"
            >
              Enter your email to reset your password.
            </Typography>
            <form onSubmit={onResetPassword} className="space-y-6">
              <Input
                id="username"
                name="username"
                label="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                id="email"
                name="email"
                label="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                type="submit"
                className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white"
              >
                Reset Password
              </Button>
              <Button
                onClick={handleForgetPasswordClick}
                className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white"
              >
                Sign In
              </Button>
            </form>

            <div className="mt-1">
              <h6 className="flex justify-center text-gray-600">
                Follow with us{" "}
              </h6>
              <div className="grid grid-cols-6  text-black">
                <CgFacebook className="text-black hover:bg-blue-700 cursor-pointer hover:text-white transition-colors duration-300 p-4 rounded-full w-14 h-14 flex items-center justify-center" />
                <TiSocialYoutubeCircular className="text-black hover:bg-red-500 hover:text-white  cursor-pointer transition-colors duration-300 p-4 rounded-full w-14 h-14 flex items-center justify-center" />
                <FaTwitter className="text-black hover:bg-blue-500 hover:text-white cursor-pointer transition-colors duration-300 p-4 rounded-full w-14 h-14 flex items-center justify-center" />
                <TiSocialLinkedin className="text-black hover:bg-blue-500 hover:text-white cursor-pointer transition-colors duration-300 p-4 rounded-full w-14 h-14 flex items-center justify-center" />
                <FaInstagram className="text-black hover:bg-yellow-800  hover:text-white cursor-pointer transition-colors duration-300 p-4 rounded-full w-14 h-14 flex items-center justify-center" />
                <FaPinterest className="text-black hover:bg-red-500  hover:text-white cursor-pointer transition-colors duration-300 p-4 rounded-full w-14 h-14 flex items-center justify-center" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
