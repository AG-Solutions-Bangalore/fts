import { Button } from "@material-tailwind/react";
import { Card } from "@material-tailwind/react";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import BASE_URL from "../../base/BaseUrl";
import PageTitle from "../../components/common/PageTitle";
import Layout from "../../layout/Layout";
import { Input } from "@material-tailwind/react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Addimage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  const id = localStorage.getItem("Image_id");

  const onSubmit = (e) => {
    e.preventDefault(); // Call this once at the beginning

    // Check if a file is selected
    if (!selectedFile) {
      toast.error("Please select an image before submitting.");
      return;
    }

    // Create FormData object
    const data = new FormData();
    data.append("indicomp_fts_id", id);
    data.append("indicomp_image_logo", selectedFile);

    // Validate form
    const isValid = document.getElementById("dowRecp").checkValidity();
    if (!isValid) {
      toast.error("Form is not valid.");
      return;
    }

    console.log("Data being submitted:", data);

    // Submit the form
    axios({
      url: `${BASE_URL}/api/create-committee-image`,
      method: "POST",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        toast.success("Image Inserted Successfully");
        navigate("/others-team");
      })
      .catch((err) => {
        console.error("Submission error:", err); // Log the error for debugging
        toast.error("Image was not inserted. Please try again.");
      });
  };

  return (
    <Layout>
      <div className="mt-4 mb-6">
        <PageTitle
          title={"Add Donor Pic"}
          backLink="/others-team"
          icon={FaArrowLeft}
        />
      </div>
      <Card className="p-4">
        <form id="dowRecp" autoComplete="off">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="w-full">
              <Input
                label="Donor Image"
                type="file"
                name="indicomp_image_logo"
                onChange={(e) => setSelectedFile(e.target.files[0])}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-4">
            <div className="w-30">
              <Button color="blue" fullWidth onClick={onSubmit}>
                Submit
              </Button>
            </div>
            <div className="w-30">
              <Button
                color="green"
                fullWidth
                onClick={() => {
                  navigate("/others-team");
                }}
              >
                Back
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </Layout>
  );
}

export default Addimage;
