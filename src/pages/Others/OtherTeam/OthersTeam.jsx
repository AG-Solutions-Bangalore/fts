import React, { useEffect, useState } from "react";
import Layout from "../../../layout/Layout";
import {
  Input,
  Button,
  Card,
  Dialog,
  DialogBody,
  DialogHeader,
  Select,
  Option,
  Spinner,
} from "@material-tailwind/react";
import PageTitle from "../../../components/common/PageTitle";
import AddToGroup from "./AddtoOtherTeam";
import Dropdown from "../../../components/common/DropDown";
import defaultfromdate from "../deafultfromdate";
import defaulttodates from "../deafulttodate";
import BASE_URL from "../../../base/BaseUrl";
import { toast } from "react-toastify";
import axios from "axios";
import { BiEdit, BiImageAdd } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import DesginationDropDown from "../../../components/common/DesginationDropDown";

const OthersTeam = () => {
  const [committee, setCommittee] = useState({
    committee_type: "",
    designation: "",
    indicomp_fts_id: "",
    indicomp_full_name: "",
    receipt_from_date: defaultfromdate,
    receipt_to_date: defaulttodates,
  });

  console.log(committee);
  const [openDialog, setOpenDialog] = useState(false);
  const [designationOptions, setDesignationOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingCommittees, setLoadingCommittees] = useState(true);
  const navigate = useNavigate();
  const commiteeOptions = [
    { value: "Executive Committee", label: "Executive Committee" },
    { value: "Mahila Samiti", label: "Mahila Samiti" },
    { value: "Ekal Yuva", label: "Ekal Yuva" },
    { value: "Functional Committee", label: "Functional Committee" },
  ];

  const onInputChange = (name, value) => {
    console.log(value);
    setCommittee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOpenDialog = () => setOpenDialog((prev) => !prev);

  const populateDonorName = (fts_id) => {
    setCommittee((prev) => ({
      ...prev,
      indicomp_full_name: fts_id,
    }));
    setOpenDialog(false);
  };

  // Fetch designation data
  const fetchDesignations = async () => {
    const theLoginToken = localStorage.getItem("token");
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${theLoginToken}`,
      },
    };

    try {
      const response = await fetch(
        `${BASE_URL}/api/fetch-designation`,
        requestOptions
      );
      const data = await response.json();
      setDesignationOptions(data.designation);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching designations:", error);
      toast.error("Error fetching designations");
    }
  };

  useEffect(() => {
    fetchDesignations();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      committee_type: committee.committee_type,
      designation: committee.designation,
      start_date: committee.receipt_from_date,
      end_date: committee.receipt_to_date,
      indicomp_fts_id: committee.indicomp_full_name,
    };

    try {
      await axios.post(`${BASE_URL}/api/create-committee`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success("Committee is Created Successfully");
      setCommittee({
        committee_type: "",
        designation: "",
        indicomp_fts_id: "",
        indicomp_full_name: "",
        receipt_from_date: defaultfromdate,
        receipt_to_date: defaulttodates,
      });
      fetchCommittees();
    } catch (error) {
      toast.error("Error creating committee");
      console.error(error);
    }
  };

  // GET COMMITTEE
  const [committeeData, setCommitteelist] = useState([]);

  const fetchCommittees = async () => {
    setLoadingCommittees(true);
    try {
      const res = await axios({
        url: BASE_URL + "/api/fetch-commitee",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCommitteelist(res.data.committeeData);
    } catch (error) {
      console.error("Error fetching committees:", error);
    } finally {
      setLoadingCommittees(false);
    }
  };
  useEffect(() => {
    fetchCommittees();
  }, []);
  //DELETE

  const deleteData = (value) => {
    axios({
      url: `${BASE_URL}/api/delete-commitee/${value}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        console.log("Response:", res.data);
        toast.success("Data deleted successfully");
        fetchCommittees();
      })
      .catch((error) => {
        console.error("There was an error deleting the data!", error);
        toast.error("Failed to delete data. Please try again.");
      });
  };

  return (
    <Layout>
      <div className="mt-4 mb-6">
        <PageTitle title="Committee Summary " />
      </div>
      <Card className="p-4">
        <h3 className="text-red-500 mb-5">
          Please fill all fields to view report.
        </h3>
        <form id="dowRecp" autoComplete="off" onSubmit={onSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="w-full">
              <Dropdown
                label="Committee Type"
                value={committee.committee_type}
                options={commiteeOptions}
                name="committee_type"
                onChange={(value) => onInputChange("committee_type", value)}
              />
            </div>

            <div className="w-full">
              <DesginationDropDown
                label="Designation"
                value={committee.designation}
                options={designationOptions}
                name="designation"
                onChange={(value) => onInputChange("designation", value)}
              />
            </div>

            <div className="w-full">
              <Input
                type="text"
                label="Member's Name"
                className="required"
                required
                name="indicomp_full_name"
                value={committee.indicomp_full_name}
                onClick={handleOpenDialog}
                onChange={(e) => onInputChange(e.target.name, e.target.value)}
              />
            </div>
            <div className="w-full">
              <Input
                disabled
                type="date"
                label="From Date"
                className="required"
                required
                name="receipt_from_date"
                value={committee.receipt_from_date}
                onChange={(e) => onInputChange(e.target.name, e.target.value)}
              />
            </div>
            <div className="w-full">
              <Input
                disabled
                type="date"
                label="To Date"
                required
                className="required"
                name="receipt_to_date"
                value={committee.receipt_to_date}
                onChange={(e) => onInputChange(e.target.name, e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-4">
            <div className="w-full">
              <Button type="submit" color="blue" fullWidth>
                Submit
              </Button>
            </div>
          </div>
        </form>
      </Card>

      <Card className="grid grid-cols-1 mt-4">
        {" "}
        {loadingCommittees ? (
          <div className="text-center flex justify-center py-10">
            <Spinner />
          </div>
        ) : (
          <div>
            <h1 className="text-lg font-bold p-4">Committee List</h1>

            <div className=" p-4 overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-gray-200">
                    {[
                      "#",
                      "Committee Type",
                      "Designation",
                      "Donor",
                      "Mobile",
                      "Action",
                    ].map((header) => (
                      <th
                        key={header}
                        className="px-4 py-2 text-center text-sm md:text-base"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {committeeData.map((datalist, key) => (
                    <tr key={datalist.id} className="border-b border-black">
                      <td className="px-4 py-2 text-sm md:text-base text-center">
                        {" "}
                        {key + 1}
                      </td>
                      <td className="px-4 py-2 text-sm md:text-base text-center">
                        {" "}
                        {datalist.committee_type}
                      </td>
                      <td className="px-4 py-2 text-sm md:text-base text-center">
                        {" "}
                        {datalist.designation}
                      </td>
                      <td className="px-4 py-2 text-sm md:text-base flex items-center justify-center space-x-2">
                        {" "}
                        {datalist.individual_company.indicomp_image_logo ? (
                          <img
                            src={
                              "https://ftschamp.com/api/storage/app/public/donor/" +
                              datalist.individual_company.indicomp_image_logo
                            }
                            className="media-object rounded-full w-10 h-10 object-cover"
                          />
                        ) : (
                          <img
                            src="https://ftschamp.com/api/storage/app/public/donor/no_image.png"
                            className="media-object rounded-full w-10 h-10 object-cover"
                          />
                        )}
                        <span className="truncate">
                          {datalist.individual_company.indicomp_full_name}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-sm md:text-base text-center">
                        {" "}
                        {datalist.individual_company.indicomp_mobile_phone}
                      </td>
                      <td className="px-4 py-2 text-sm md:text-base flex justify-center">
                        {" "}
                        <BiImageAdd
                          className="text-blue-600 mr-2 cursor-pointer text-2xl"
                          style={{
                            display:
                              localStorage.getItem("user_type_id") == 2 ||
                              localStorage.getItem("user_type_id") == 3 ||
                              localStorage.getItem("user_type_id") == 4
                                ? "none"
                                : "",
                          }}
                          onClick={() => {
                            console.log(datalist.indicomp_fts_id);
                            navigate("/others-team-add");
                            localStorage.setItem(
                              "Image_id",
                              datalist.indicomp_fts_id
                            );
                          }}
                        />
                        <MdDelete
                          className="text-red-600 cursor-pointer text-2xl"
                          onClick={() => deleteData(datalist.id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </Card>

      <Dialog open={openDialog} handler={handleOpenDialog} className="max-w-md">
        <DialogHeader>Select a Member</DialogHeader>
        <DialogBody>
          <AddToGroup populateDonorName={populateDonorName} />
        </DialogBody>
      </Dialog>
    </Layout>
  );
};

export default OthersTeam;
