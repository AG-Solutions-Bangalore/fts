import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Input, Button, Select, Option } from "@material-tailwind/react";
import { IoPersonAdd } from "react-icons/io5";

import axios from "axios";
import { MenuItem, TextField } from "@mui/material";
import BASE_URL from "../../../base/BaseUrl";
import Layout from "../../../layout/Layout";

const AddViewer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [viewerChapterIds, setViewerChapterIds] = useState([]);
  const [chapterIds, setChapterIds] = useState("");
  const [chapter_id, setchapter_id] = useState("");
  const [user_position, setuser_position] = useState([]);

  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(false);

  // Sample chapters data

  useEffect(() => {
    const fetchChapterData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/api/fetch-chapters`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setChapters(response.data?.chapters);
      } catch (error) {
        console.error("Error fetching Factory data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchChapterData();
    setLoading(false);
  }, []);

  const handleClick = (e) => {
    var targetName = e.target.name;
    if (e.target.checked == true) {
      var temparray = viewerChapterIds;
      temparray.push(e.target.name);
      setViewerChapterIds(temparray);
    } else {
      var temparray = viewerChapterIds;
      temparray.splice(temparray.indexOf(targetName), 1);
      setViewerChapterIds(temparray);
    }

    var theChapterIds = "";
    for (var i = 0; i < viewerChapterIds.length; i++) {
      theChapterIds = theChapterIds + "," + viewerChapterIds[i];
    }
    setChapterIds(theChapterIds);
  };

  const onFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const onLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const onUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const validateOnlyDigits = (inputtxt) => {
    var phoneno = /^\d+$/;
    if (inputtxt.match(phoneno) || inputtxt.length == 0) {
      return true;
    } else {
      return false;
    }
  };

  const onContactChange = (e) => {
    if (e.target.name == "mobile_number") {
      if (validateOnlyDigits(e.target.value)) {
        setContact(e.target.value);
      }
    } else {
      setContact(e.target.value);
    }
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const onEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const onuser_positionChange = (e) => {
    setuser_position(e.target.value);
  };

  const onuser_chapteridChange = (e) => {
    setchapter_id(e.target.value);
  };

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  // Handle form submission
  const handleSubmit =async (e) => {
    e.preventDefault();
    const form = document.getElementById("addIndiv");
    if(!form.checkValidity()){
      toast.error("Fill all required")
      return
    }
    const data = {
      first_name:firstName,  
      last_name: lastName,  
      chapter_id:chapter_id,
      username: userName,
      mobile_number: contact,
      email: email,
      viewer_start_date: startDate,
      viewer_end_date: endDate,
      chapter_ids_comma_separated:chapterIds,
      user_position:user_position
      };
    
      setIsButtonDisabled(true);
      const token =  localStorage.getItem("token");

      const res = await axios.post(`${BASE_URL}/api/superadmin-add-a-viewer`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("success viewer")
      navigate('/viewer-list')
    
    setIsButtonDisabled(false);
  };
  return (
    <Layout>
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex items-center gap-4 mb-8">
          <IoPersonAdd className="text-2xl text-blue-500" />
          <h1 className="text-2xl font-bold text-gray-800">Add Viewer</h1>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <form id="addIndiv" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Input
                label="Full Name"
                name="firstName"
                value={firstName}
                onChange={(e) => onFirstNameChange(e)}
                required
                size="lg"
              />

              <Input
                label="User Name (Login Name)"
                name="username"
                required
                value={userName}
                onChange={(e) => onUserNameChange(e)}
                size="lg"
              />

              <Input
                label="Mobile"
                name="mobile_number"
                value={contact}
                onChange={(e) => onContactChange(e)}
                required
                maxLength={10}
                size="lg"
              />

              <Input
                label="Email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => onEmailChange(e)}
                required
                size="lg"
              />

              {/* <Select
              label="Select Chapter"
              value={formData.chapterId}
              onChange={(value) => 
                setFormData((prev) => ({ ...prev, chapterId: value }))
              }
              size="lg"
            >
              {chapters.map((chapter) => (
                <Option key={chapter.id} value={chapter.id}>
                  {chapter.chapter_name}
                </Option>
              ))}
            </Select> */}
              <TextField
                id="select-corrpreffer"
                required
                select
                label="Chapter"
                SelectProps={{
                  MenuProps: {},
                }}
                InputProps={{ style: { border: "2px",height:"40px", } }}
                helperText="Please select your Chapter"
                name="chapter_id"
                value={chapter_id}
                onChange={(e) => onuser_chapteridChange(e)}
                fullWidth
              >
                {chapters.map((chapter, key) => (
                  <MenuItem key={chapter.id} value={chapter.id}>
                    {chapter.chapter_name}
                  </MenuItem>
                ))}
              </TextField>

              <Input
                label="Designation"
                name="user_position"
                value={user_position}
                                    onChange={(e) => onuser_positionChange(e)}
                required
                size="lg"
              />

              <Input
                label="Start Date"
                name="startDate"
                type="date"
                value={startDate}
                onChange={(e) => onStartDateChange(e)}
                required
                size="lg"
              />

              <Input
                label="End Date"
                name="endDate"
                type="date"
                value={endDate}
                onChange={(e) => onEndDateChange(e)}
                required
                size="lg"
              />
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">
                Chapters Associated
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {chapters.map((chapter) => (
                  <div key={chapter.id} className="flex items-center gap-2">
                    <input
                      type="checkbox" onChange={handleClick} name={chapter.id} id={chapter.id}
                      className="w-4 h-4 text-blue-500 rounded focus:ring-blue-500"
                    />
                    <label
                      htmlFor={`chapter-${chapter.id}`}
                      className="text-sm"
                    >
                      {chapter.chapter_name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <Button
                type="submit"
                disabled={isButtonDisabled}
                className="flex-1 bg-blue-500"
              >
                {isButtonDisabled ? "Submitting..." : "Submit"}
              </Button>

              <Link to="/viewer-list">
                <Button color="red" className="px-6">
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AddViewer;
