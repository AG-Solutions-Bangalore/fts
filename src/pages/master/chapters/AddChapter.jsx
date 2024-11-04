import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";
import { Input } from "@material-tailwind/react";
import Layout from "../../../layout/Layout";
import BASE_URL from "../../../base/BaseUrl";
import Fields from "../../../common/TextField/TextField";

const AddChapter = () => {
  const navigate = useNavigate();

  const [chapter, setChapter] = useState({
    chapter_name: "",
    chapter_code: "",
    chapter_address: "",
    chapter_city: "",
    chapter_pin: "",
    chapter_state: "",
    chapter_phone: "",
    chapter_whatsapp: "",
    chapter_email: "",
    chapter_website: "",
    chapter_date_of_incorporation: "",
    chapter_region_code: "",
  });

  const [states, setStates] = useState([]);

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("id");
    if (!isLoggedIn) {
      navigate("/");
      return;
    }
  }, []);

  const validateOnlyDigits = (inputtxt) => /^\d*$/.test(inputtxt); // Simplified validation

  const onInputChange = (e) => {
    const { name, value } = e.target;
    const digitFields = ["chapter_pin", "chapter_phone", "chapter_whatsapp"];

    if (digitFields.includes(name)) {
      if (validateOnlyDigits(value)) {
        setChapter((prevChapter) => ({
          ...prevChapter,
          [name]: value,
        }));
      }
    } else {
      setChapter((prevChapter) => ({
        ...prevChapter,
        [name]: value,
      }));
    }
  };

  const handleSameNumberClick = () => {
    setChapter((prevChapter) => ({
      ...prevChapter,
      chapter_whatsapp: prevChapter.chapter_phone, // Copy phone to WhatsApp
    }));
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/fetch-states`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setStates(res.data?.states);
      });
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setIsButtonDisabled(true);
    const formData = {
      chapter_name: chapter.chapter_name,
      chapter_code: chapter.chapter_code,
      chapter_address: chapter.chapter_address,
      chapter_city: chapter.chapter_city,
      chapter_pin: chapter.chapter_pin,
      chapter_state: chapter.chapter_state,
      chapter_phone: chapter.chapter_phone,
      chapter_whatsapp: chapter.chapter_whatsapp,
      chapter_email: chapter.chapter_email,
      chapter_website: chapter.chapter_website,
      chapter_date_of_incorporation: chapter.chapter_date_of_incorporation,
      chapter_region_code: chapter.chapter_region_code,
    };
    try {
      const response = await axios.post(
        `${BASE_URL}/api/create-chapter`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.code == 200) {
        toast.success("Chapter is Created Successfully");
        navigate("/chapters");
      } else {
        if (response.data.code == 401) {
          toast.error("Chapter Duplicate Entry");
        } else if (response.data.code == 402) {
          toast.error("Chapter Duplicate Entry");
        } else {
          toast.error("An unknown error occurred");
        }
      }
    } catch (error) {
      console.error("Error updating Chapter:", error);
      toast.error("Error  updating Brand");
    } finally {
      setIsButtonDisabled(false);
    }
  };

  return (
    <Layout>
      <div>
        {/* Title */}
        <div className="flex mb-4 mt-6">
          <Link to="/chapters">
            <MdKeyboardBackspace className=" text-white bg-[#464D69] p-1 w-10 h-8 cursor-pointer rounded-2xl" />
          </Link>
          <h1 className="text-2xl text-[#464D69] font-semibold ml-2 content-center">
            Add Chapter
          </h1>
        </div>
        <div className="p-6 mt-5 bg-white shadow-md rounded-lg">
          <form onSubmit={onSubmit} autoComplete="off">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div className="form-group ">
                <Fields
                  required={true}
                  types="text"
                  title="Chapter Name"
                  type="textField"
                  autoComplete="Name"
                  name="chapter_name"
                  value={chapter.chapter_name}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="form-group col-span-2">
                <Fields
                  required={true}
                  types="text"
                  title="Address"
                  type="textField"
                  autoComplete="Name"
                  name="chapter_address"
                  value={chapter.chapter_address}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="form-group ">
                <Fields
                  required={true}
                  types="text"
                  title="City"
                  type="textField"
                  autoComplete="Name"
                  name="chapter_city"
                  value={chapter.chapter_city}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div className="form-group ">
                <Input
                  required
                  type="tel"
                  maxLength={6}
                  label="Pin"
                  autoComplete="Name"
                  name="chapter_pin"
                  value={chapter.chapter_pin}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="form-group ">
                <Fields
                  title="State"
                  type="stateDropdown"
                  autoComplete="Name"
                  name="chapter_state"
                  value={chapter.chapter_state}
                  onChange={(e) => onInputChange(e)}
                  options={states}
                />
              </div>
              <div className="form-group ">
                <Input
                  required
                  type="tel"
                  maxLength={10}
                  label="Phone"
                  autoComplete="Name"
                  name="chapter_phone"
                  value={chapter.chapter_phone}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="form-group ">
                <Input
                  type="tel"
                  maxLength={10}
                  label="Whatsapp"
                  autoComplete="Name"
                  name="chapter_whatsapp"
                  value={chapter.chapter_whatsapp}
                  onChange={(e) => onInputChange(e)}
                />
                <div>
                  <input
                    type="radio"
                    name="same_number"
                    onChange={handleSameNumberClick}
                  />{" "}
                  <span>Same Number for Whatsapp</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div className="form-group ">
                <Input
                  required
                  type="text"
                  label="Email"
                  autoComplete="Name"
                  name="chapter_email"
                  value={chapter.chapter_email}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="form-group ">
                <Fields
                  title="Website"
                  type="textField"
                  autoComplete="Name"
                  name="chapter_website"
                  value={chapter.chapter_website}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="form-group ">
                <Input
                  type="date"
                  autoComplete="Name"
                  name="chapter_date_of_incorporation"
                  value={chapter.chapter_date_of_incorporation}
                  onChange={(e) => onInputChange(e)}
                />
                <p className="mt-1 text-sm text-gray-500">
                  Please enter the date of incorporation.
                </p>
              </div>
            </div>
            <div className="mt-4 ">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                disabled={isButtonDisabled}
              >
                {isButtonDisabled ? "Submiting..." : "Submit"}
              </button>
              <Link to="/chapters">
                <button className="bg-green-500 text-white px-4 py-2 rounded-md">
                  Back
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AddChapter;
