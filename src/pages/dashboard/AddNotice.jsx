import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";
import { Input } from "@material-tailwind/react";
import { Card, CardContent, Dialog, Tooltip } from "@mui/material";
import { MdCancel } from "react-icons/md";
import Fields from "../../common/TextField/TextField";
import BASE_URL from "../../base/BaseUrl";

const sento = [
    { value: "To All", label: "To All" },
    { value: "To Only Viewers", label: "To Only Viewers" },
    { value: "To Only Admins", label: "To Only Admins" },
    { value: "To Only Users", label: "To Only Users" },
  ];

const AddNotice = (props) => {
  const navigate = useNavigate();

  const [newNotice, setNewNotice] = useState("");
  const [noticeDetail, setNoticeDetail] = useState("");
  const [sendTo, setSendTo] = useState("");

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("id");
    if (!isLoggedIn) {
      navigate("/");
      return;
    }
  }, []);

  const onInputChange = (e) => {
    setBrand({
      ...brand,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setIsButtonDisabled(true);
    const formData = {
        notice_name: newNotice,
        notice_detail: noticeDetail,
        send_to: sendTo,
    };
    try {
      const response = await axios.post(
        `${BASE_URL}/api/superadmin-add-notice`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.code == 200) {
        toast.success("Notice Added Successfully");
        props.onClick();
        props.populateNotice("hi");
      } else {
        if (response.data.code == 401) {
          toast.error("Notice Duplicate Entry");
        } else if (response.data.code == 402) {
          toast.error("Notice Duplicate Entry");
        } else {
          toast.error("An unknown error occurred");
        }
      }
    } catch (error) {
      console.error("Error updating Notice:", error);
      toast.error("Error  updating Notice");
    } finally {
      setIsButtonDisabled(false);
    }
  };

  return (
    <div>
      <Dialog
        open={props.open}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
        // className="m-3  rounded-lg shadow-xl"
      >
        <form autoComplete="off" onSubmit={onSubmit}>
          <Card className="p-6 space-y-1 w-[400px]">
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-slate-800 text-xl font-semibold">
                Posting a New Notice
                </h1>
                <div className="flex">
                  <Tooltip title="Close">
                    <button
                      className="ml-3 pl-2 hover:bg-gray-200 rounded-full"
                      onClick={props.onClick}
                    >
                      <MdCancel />
                    </button>
                  </Tooltip>
                </div>
              </div>

              <div className="mt-2">
                <div>
                  <Fields
                    required={true}
                    title="Notice Title"
                    type="textField"
                    autoComplete="Name"
                    name="notice_name"
                    value={newNotice}
                    onChange={(e) => setNewNotice(e.target.value)}
                  />
                </div>
                <div className="mt-2">
                  <Fields
                    required={true}
                    title="Notice Detail"
                    type="textField"
                    autoComplete="Name"
                    name="notice_detail"
                    value={noticeDetail}
                    onChange={(e) => setNoticeDetail(e.target.value)}
                  />
                </div>
                <div className="mt-2">
                  <Fields
                    required={true}
                    title="Send To"
                    type="whatsappDropdown"
                    autoComplete="Name"
                    name="send_to"
                    options={sento}
                    onChange={(value) => setSendTo(value)}
                  />
                </div>
                <div className="mt-5 flex justify-center">
                  <button
                    disabled={isButtonDisabled}
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                  >
                    {isButtonDisabled ? "Submiting..." : "Submit Notice"}
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </form>
      </Dialog>
    </div>
  );
};

export default AddNotice;
