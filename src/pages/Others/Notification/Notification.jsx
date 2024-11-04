import React, { useEffect, useState } from "react";
import Layout from "../../../layout/Layout";
import { HiMiniMinus } from "react-icons/hi2";
import { TfiReload } from "react-icons/tfi";
import { MdCancel } from "react-icons/md";
import axios from "axios";
import BASE_URL from "../../../base/BaseUrl";
import moment from "moment";
import {
  Button,
  Spinner,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
} from "@material-tailwind/react";
import PageTitle from "../../../components/common/PageTitle";
import Dropdown from "../../../components/common/DropDown";

const Notification = () => {
  const [datanotification, setNotification] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [newNotice, setNewNotice] = useState("");
  const [noticeDetail, setNoticeDetail] = useState("");
  const [sendTo, setSendTo] = useState("");

  const userTypeId = localStorage.getItem("id");
  const sento = [
    { value: "To All", label: "To All" },
    { value: "To Only Viewers", label: "To Only Viewers" },
    { value: "To Only Admins", label: "To Only Admins" },
    { value: "To Only Users", label: "To Only Users" },
  ];

  const fetchNotices = async () => {
    setLoading(true);
    try {
      const url =
        userTypeId === "3"
          ? `${BASE_URL}/api/superadmin-fetch-notices`
          : `${BASE_URL}/api/user-fetch-notices`;

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setNotification(response.data.notices || []);
    } catch (error) {
      console.error("Error fetching notices:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, [userTypeId]);

  const handleReload = () => {
    fetchNotices();
  };

  const handleMinimizeToggle = () => {
    setIsMinimized(!isMinimized);
  };

  const handleCancel = () => {
    setIsVisible(false);
  };

  const handleOpenDialog = () => {
    setOpenDialog(!openDialog);
  };

  const handleSubmitNotice = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/superadmin-add-notice`,
        {
          notice_name: newNotice,
          notice_detail: noticeDetail,
          send_to: sendTo,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        fetchNotices();
        setNewNotice("");
        setNoticeDetail("");
        setSendTo("");
        handleOpenDialog();
      }
    } catch (error) {
      console.error("Error adding notice:", error);
    }
  };

  const markNoticeAsRead = async (noticeId) => {
    try {
      await axios.post(
        `${BASE_URL}/api/user-mark-a-notice-as-read?notice_id`,
        { noticeId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchNotices();
    } catch (error) {
      console.error("Error marking notice as read:", error);
    }
  };

  return (
    <Layout>
      <div>
        <PageTitle title="Notification" />
        {isVisible && (
          <div className="grid grid-cols-1 mt-10 gap-4 bg-white">
            <div className="flex justify-between p-4 rounded-sm">
              <h1>Notices</h1>
              <div className="flex gap-3">
                <HiMiniMinus
                  onClick={handleMinimizeToggle}
                  className="text-2xl cursor-pointer"
                />
                <TfiReload
                  onClick={handleReload}
                  className="text-xl cursor-pointer"
                />
                <MdCancel
                  onClick={handleCancel}
                  className="text-2xl cursor-pointer"
                />
              </div>
            </div>
            <hr />
            {!isMinimized && (
              <>
                <div
                  className="w-full overflow-y-auto"
                  style={{ height: "340px" }}
                >
                  <div className="p-4">
                    {loading ? (
                      <div className="flex justify-center items-center">
                        <Spinner className="h-8 w-8" />
                      </div>
                    ) : datanotification.length > 0 ? (
                      datanotification.map((notice) => (
                        <div key={notice.id} className="mb-4">
                          <h2
                            className="text-lg font-semibold mb-4"
                            style={{ color: "#464D69" }}
                          >
                            {notice.notice_name}
                          </h2>
                          <p className="text-sm text-gray-500">
                            {notice.notice_detail}
                          </p>
                          <h3 className="my-4 text-sm text-gray-500">
                            Notice Posted On{" "}
                            {moment(notice.created_at).format("DD-MM-YY")}
                          </h3>
                          <div className="flex items-center text-xs font-light text-gray-500 mt-1">
                            {notice.is_read == 0 ? (
                              <Button
                                color="green"
                                size="sm"
                                onClick={() => {
                                  if (
                                    window.confirm(
                                      "Are you sure you have read and understood this notice?"
                                    )
                                  ) {
                                    markNoticeAsRead(notice.id);
                                  }
                                }}
                              >
                                Acknowledge that you have read this notice
                              </Button>
                            ) : (
                              <Button color="blue" size="sm" disabled>
                                Acknowledged
                              </Button>
                            )}
                          </div>
                          <hr />
                        </div>
                      ))
                    ) : (
                      <p>No notices available.</p>
                    )}
                  </div>
                </div>
              </>
            )}
            <hr />
            {userTypeId === "3" && (
              <div className="flex w-max p-4">
                <Button
                  onClick={handleOpenDialog}
                  variant="filled"
                  className="bg-green-500"
                >
                  Add a New Notice
                </Button>
              </div>
            )}
          </div>
        )}
        <Dialog
          open={openDialog}
          handler={handleOpenDialog}
          className="w-full md:w-1/2"
        >
          <DialogHeader>Posting a New Notice</DialogHeader>
          <DialogBody className="grid grid-cols-1 gap-4">
            <Input
              label="Notice Title"
              value={newNotice}
              onChange={(e) => setNewNotice(e.target.value)}
              name="notice_name"
            />
            <Textarea
              label="Notice Detail"
              value={noticeDetail}
              onChange={(e) => setNoticeDetail(e.target.value)}
              name="notice_detail"
            />
            <Dropdown
              label="Send To"
              options={sento}
              onChange={(value) => setSendTo(value)}
              name="send_to"
            />
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleOpenDialog}
              className="mr-2"
            >
              Cancel
            </Button>
            <Button variant="filled" color="green" onClick={handleSubmitNotice}>
              Submit Notice
            </Button>
          </DialogFooter>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Notification;
