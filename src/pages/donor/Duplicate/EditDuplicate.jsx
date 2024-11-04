import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";
import axios from "axios";
import Layout from "../../../layout/Layout";
import Fields from "../../../common/TextField/TextField";
import { toast } from "react-toastify";
import BASE_URL from "../../../base/BaseUrl";
import {
  Button,
  Card,
  CardBody,
  Dialog,
  DialogHeader,
  DialogBody,
  Input,
} from "@material-tailwind/react";
import MUIDataTable from "mui-datatables";

const EditDuplicate = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [donorName, setDonorName] = useState("");
  const [donor, setDonor] = useState({
    donor_fts_id: "",
    indicomp_full_name: "",
    indicomp_type: "",
    indicomp_com_contact_name: "",
    indicomp_spouse_name: "",
    indicomp_mobile_phone: "",
    indicomp_email: "",
    indicomp_donor_type: "",
    indicomp_related_id: "",
  });
  console.log(id, "Params");
  // States to control the dialog
  const [showDialog, setShowDialog] = useState(false);
  const [donorData, setDonorData] = useState([]);

  const columns = [
    { name: "PDS Id", options: { filter: false, sort: false } },
    { name: "Donor Name", options: { filter: false, sort: false } },
    { name: "Mobile", options: { filter: false, sort: false } },
    {
      name: "Actions",
      options: {
        filter: false,
        sort: false,

        customBodyRender: (value) => (
          <Button onClick={() => addDonorToReceipt(value)}>Select</Button>
        ),
      },
    },
  ];

  const onInputChange = (e) => {
    setDonor({
      ...donor,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "donor_fts_id") {
      setDonorName(e.target.value);
    }
  };

  const addDonorToReceipt = (fts_id) => {
    setDonorName(fts_id);
    setShowDialog(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let data = {
      indicomp_fts_id: donor.indicomp_fts_id,
      new_indicomp_fts_id: donorName,
      indicomp_status: "0",
    };

    axios
      .put(`${BASE_URL}/api/update-donors-duplicate/${id}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        toast.success("Donor Updated Successfully");
        navigate("/donor/duplicate-list");
      })
      .catch(() => {
        toast.error("Error Occurred");
      });
  };

  const handleBackButton = () => {
    navigate("/donor/duplicate-list");
  };

  const fetchDonorData = () => {
    axios
      .get(`${BASE_URL}/api/fetch-donors`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        const tempRows = res.data.individualCompanies.map((donor) => [
          donor.indicomp_fts_id,
          donor.indicomp_full_name,
          donor.indicomp_mobile_phone,
          donor.indicomp_fts_id,
        ]);
        setDonorData(tempRows);
      })
      .catch(() => toast.error("Error fetching donor data"));
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/fetch-donors-duplicate-by-id/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setDonor(res.data.individualCompanies));

    fetchDonorData();
  }, [id]);

  return (
    <Layout>
      <div>
        <div className="flex flex-col md:flex-row items-center justify-between mb-4 mt-6">
          <div className="flex items-center">
            <MdKeyboardBackspace
              onClick={handleBackButton}
              className="text-white bg-[#464D69] p-1 w-10 h-8 cursor-pointer rounded-2xl"
            />
            <h1 className="text-2xl text-[#464D69] font-semibold ml-2 mb-2 md:mb-0">
              Duplicate Donors
            </h1>
          </div>
        </div>

        <Card className="p-6 mt-5 bg-white shadow-md rounded-lg">
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
              <div className="text-gray-700">
                <strong>FTS Id :</strong>
                {donor.indicomp_fts_id}
              </div>
              <div className="text-gray-700">
                <strong>Donor Name:</strong>
                {donor.indicomp_full_name}
              </div>
              <div className="text-gray-700">
                <strong>Type :</strong>
                {donor.indicomp_type}
              </div>
              <div className="text-gray-700">
                <strong>Donor Type :</strong>
                {donor.indicomp_donor_type}
              </div>
              <div className="text-gray-700">
                <strong>Contact Name:</strong>
                {donor.indicomp_com_contact_name}
              </div>
              <div className="text-gray-700">
                <strong>Mobile:</strong>
                {donor.indicomp_mobile_phone}
              </div>
              <div className="text-gray-700">
                <strong>Email:</strong>
                {donor.indicomp_email}
              </div>
            </div>
          </CardBody>
        </Card>

        <div className="p-6 mt-5 bg-white shadow-md rounded-lg">
          <form id="addIndiv" onSubmit={onSubmit}>
            <div>
              <Fields
                required
                title="Donor Name"
                type="textField"
                name="donor_fts_id"
                value={donorName}
                onClick={() => setShowDialog(true)}
              />
            </div>

            <div className="flex justify-center mt-4 space-x-4">
              <Button type="submit" className="bg-blue-400">
                Submit
              </Button>
              <Button className="bg-red-400" onClick={handleBackButton}>
                Back
              </Button>
            </div>
          </form>
        </div>

        {/* Dialog for selecting a donor */}
        <Dialog
          open={showDialog}
          handler={() => setShowDialog(false)}
          size="lg"
        >
          <DialogHeader>Select a Donor</DialogHeader>
          <DialogBody>
            <MUIDataTable
              title={"Donor List"}
              data={donorData}
              columns={columns}
              options={{
                filterType: "textField",
                print: false,
                viewColumns: false,
                filter: false,
                searchOpen: true,
                download: false,
                selectableRows: false,
                responsive: "standard",
                search: false,
              }}
            />
          </DialogBody>
        </Dialog>
      </div>
    </Layout>
  );
};

export default EditDuplicate;
