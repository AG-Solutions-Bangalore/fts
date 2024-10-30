import { CardBody, Card, Input } from "@material-tailwind/react";
import { CardContent, Dialog, Tooltip, Typography } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import { MdHighlightOff, MdKeyboardBackspace } from "react-icons/md";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Layout from "../../../layout/Layout";
import Fields from "../../../common/TextField/TextField";
import BASE_URL from "../../../base/BaseUrl";

const StatesList = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [student, setStudent] = useState({});

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({
    state_name: "",
    state_country: "",
    state_zone: "",
  });

  const [selected_user_id, setSelectedUserId] = useState("");

  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);

  const handleClickOpen = (e) => {
    e.preventDefault()
    setOpen(true);
  };

  const handleClose = (e) => {
    e.preventDefault()
    setOpen(false);
  };

  const handleClickOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = (e) => {
    e.preventDefault()
    setOpen1(false);
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/fetch-states`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setUsers(res.data.states);
      });
  }, []);

  const validateOnlyDigits = (inputtxt) => /^\d*$/.test(inputtxt);
  const onUserInputChange = (e) => {
    if (e.target.name == "phone") {
      if (validateOnlyDigits(e.target.value)) {
        setUser({
          ...chapter,
          [e.target.name]: e.target.value,
        });
      }
    } else {
      setUser({
        ...user,
        [e.target.name]: e.target.value,
      });
    }
  };

  const createUser = async (e) => {
    e.preventDefault();
    const form = e.target;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setIsButtonDisabled(true);
    const formData = {
      state_name: user.state_name,
      state_country: user.state_country,
      state_zone: user.state_zone,
    };
    try {
      const response = await axios.post(
        `${BASE_URL}/api/create-states`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.code == "200") {
        toast.success("Data Source is Created Successfully");
      } else {
        if (response.data.code == "401") {
          toast.error("Data Source Duplicate Entry");
        } else if (response.data.code == "402") {
          toast.error("Data Source Duplicate Entry");
        } else {
          toast.error("Data Source Duplicate Entry");
        }
      }
    } catch (error) {
      console.error("Error updating Data Source:", error);
      toast.error("Error updating Data Source");
    } finally {
      setIsButtonDisabled(false);
    }
  };

  const updateUser = async (e) => {
    e.preventDefault();
    const form = e.target;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setIsButtonDisabled(true);
    const formData = {
      state_name: user.state_name,
      state_country: user.state_country,
      state_zone: user.state_zone,
    };
    try {
      const response = await axios.put(
        `${BASE_URL}/api/update-states/${selected_user_id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.code == "200") {
        setUsers(res.data.states);
        toast.success("Data Source is Updated Successfully");
      } else {
        if (response.data.code == "401") {
          toast.error("Data Source Duplicate Entry");
        } else if (response.data.code == "402") {
          toast.error("Data Source Duplicate Entry");
        } else {
          toast.error("Data Source Duplicate Entry");
        }
      }
    } catch (error) {
      console.error("Error updating Data Source:", error);
      toast.error("Error updating Data Source");
    } finally {
      setIsButtonDisabled(false);
    }
  };

  return (
    <Layout>
      <div>
        <div className="">
          <div className="flex  mb-4 mt-6">
            <button
              onClick={handleClickOpen}
              className="btn btn-primary text-center md:text-right text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg shadow-md"
            >
              Create A New States
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div className="min-w-full p-2 bg-white border border-gray-200 shadow-md rounded-lg">
            <div className="mt-3 p-2  mb-2">
              <div className="flex justify-between mb-2">
                <h1 className="text-xl font-bold"> States</h1>
              </div>
              <table className=" bg-white border border-gray-200 w-full shadow-md rounded-lg overflow-auto">
                <thead>
                  <tr class="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                    <th class="py-3 text-center">Sl No</th>
                    <th class="py-3 text-center">State</th>
                    <th class="py-3 text-center">State Zone</th>
                    <th class="py-3 text-center">Country</th>
                    <th class="py-3 text-center">Edit</th>
                  </tr>
                </thead>
                {users?.map((dataSumm, key) => (
                  <tbody class="text-gray-600 text-sm font-light">
                    <tr class="border-b border-gray-500 hover:bg-gray-100">
                      <td class="py-3 px-12 text-center">
                        <span> {key + 1}</span>
                      </td>
                      <td class="py-3 px-12 text-center">
                        <span> {dataSumm.state_name}</span>
                      </td>
                      <td class="py-3 px-12 text-center">
                        <span> {dataSumm.state_zone}</span>
                      </td>
                      <td class="py-3 px-12 text-center">
                        <span> {dataSumm.state_country}</span>
                      </td>
                      {dataSumm.chapter_id != 0 && (
                        <td class="py-3 px-12 text-center">
                          <button
                            onClick={() => {
                                setUser({
                                  ...user,
                                  state_name: dataSumm.state_name,
                                  state_country:dataSumm.state_country,
                                  state_zone:dataSumm.state_zone,
                                });
                                setSelectedUserId(dataSumm.id);
                                handleClickOpen1();
                              }}
                            // onClick={handleClickOpen1}
                            className="btn btn-primary text-center md:text-right text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg shadow-md"
                          >
                            Edit
                          </button>
                        </td>
                      )}
                      {dataSumm.chapter_id == 0 && (
                        <td class="py-3 px-12 text-center">
                          <button
                            disabled
                            className="btn btn-primary text-center md:text-right text-white bg-green-200 px-4 py-2 rounded-lg shadow-md"
                          >
                            Edit
                          </button>
                        </td>
                      )}
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          </div>
          <Dialog
            open={open}
            keepMounted
            aria-describedby="alert-dialog-slide-description"
          >
            <form onSubmit={createUser} autoComplete="off">
              <Card className="p-6 space-y-1 w-[500px]">
                <CardContent>
                  <div className="flex justify-between items-center mb-2">
                    <h1 className="text-slate-800 text-xl font-semibold">
                    Create States
                    </h1>
                    <div className="flex">
                      <Tooltip title="Close">
                        <button
                          className="ml-3 pl-2 hover:bg-gray-200 rounded-full"
                          onClick={handleClose}
                        >
                          <MdHighlightOff />
                        </button>
                      </Tooltip>
                    </div>
                  </div>

                  <div className="mt-2">
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-2">
                      <div className="form-group ">
                        <Fields
                          required={true}
                          types="text"
                          title="Enter State"
                          type="textField"
                          autoComplete="Name"
                          name="state_name"
                          value={user.state_name}
                          onChange={(e) => onUserInputChange(e)}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-2">
                      <div className="form-group ">
                        <Fields
                          types="text"
                          title="Enter State Zone"
                          type="textField"
                          autoComplete="Name"
                          name="state_zone"
                          value={user.state_zone}
                          onChange={(e) => onUserInputChange(e)}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-2">
                      <div className="form-group ">
                        <Fields
                          required={true}
                          types="text"
                          title="Enter Country"
                          type="textField"
                          autoComplete="Name"
                          name="state_country"
                          value={user.state_country}
                          onChange={(e) => onUserInputChange(e)}
                        />
                      </div>
                    </div>
                    <div className="mt-5 flex justify-center">
                      <button
                        disabled={isButtonDisabled}
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                      >
                        {isButtonDisabled ? "Submiting..." : "Submit"}
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </form>
          </Dialog>

          <Dialog
            open={open1}
            keepMounted
            aria-describedby="alert-dialog-slide-description"
            // className="m-3  rounded-lg shadow-xl"
          >
            <form onSubmit={updateUser} autoComplete="off">
              <Card className="p-6 space-y-1 w-[500px]">
                <CardContent>
                  <div className="flex justify-between items-center mb-2">
                    <h1 className="text-slate-800 text-xl font-semibold">
                      Edit Data Source
                    </h1>
                    <div className="flex">
                      <Tooltip title="Close">
                        <button
                          className="ml-3 pl-2 hover:bg-gray-200 rounded-full"
                          onClick={handleClose1}
                        >
                          <MdHighlightOff />
                        </button>
                      </Tooltip>
                    </div>
                  </div>

                  <div className="mt-2">
                  <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-2">
                      <div className="form-group ">
                        <Fields
                          required={true}
                          types="text"
                          title="Enter State"
                          type="textField"
                          autoComplete="Name"
                          name="state_name"
                          value={user.state_name}
                          onChange={(e) => onUserInputChange(e)}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-2">
                      <div className="form-group ">
                        <Fields
                          types="text"
                          title="Enter State Zone"
                          type="textField"
                          autoComplete="Name"
                          name="state_zone"
                          value={user.state_zone}
                          onChange={(e) => onUserInputChange(e)}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-2">
                      <div className="form-group ">
                        <Fields
                          required={true}
                          types="text"
                          title="Enter Country"
                          type="textField"
                          autoComplete="Name"
                          name="state_country"
                          value={user.state_country}
                          onChange={(e) => onUserInputChange(e)}
                        />
                      </div>
                    </div>
                    <div className="mt-5 flex justify-center">
                      <button
                        disabled={isButtonDisabled}
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                      >
                        {isButtonDisabled ? "Updating..." : "Update"}
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </form>
          </Dialog>
        </div>
      </div>
    </Layout>
  );
};

export default StatesList;
