import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { Button, Spinner } from "@material-tailwind/react";
import axios from "axios";
import BASE_URL from "../../../base/BaseUrl";

const options = {
  filterType: "textField",
  print: false,
  viewColumns: false,
  filter: false,
  searchOpen: true,
  download: false,
  sort: false,
  selectableRows: "none",
  responsive: "standard",
};

const AddtoOtherTeam = ({ populateDonorName, handleClose }) => {
  const [loader, setLoader] = useState(true);
  const [donorData, setDonorData] = useState([]);

  const addDonorToReceipt = (fts_id) => {
    populateDonorName(fts_id);
  };

  const getData = async () => {
    setLoader(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/fetch-ind-donors`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const response = res.data.individualCompanies || [];
      const tempRows = response.map((donor) => [
        donor["indicomp_full_name"],
        donor["indicomp_mobile_phone"],
        donor["indicomp_fts_id"],
      ]);
      setDonorData(tempRows);
    } catch (error) {
      console.error("Error fetching donor data:", error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
      label: "Donor Name",
      filter: false,
      sort: false,
    },
    {
      name: "Mobile",
      label: "Mobile",
      filter: false,
      sort: false,
    },
    {
      name: "Actions",
      label: "Actions",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => (
          <div className="flex space-x-2">
            <Button
              onClick={() => addDonorToReceipt(value)}
              className="bg-blue-500"
            >
              Select
            </Button>
          </div>
        ),
      },
    },
  ];

  return (
    <div className="data-table-wrapper">
      {loader ? (
        <div className="flex justify-center items-center h-screen">
          <Spinner color="purple" className="h-12 w-12" />
        </div>
      ) : (
        <div className="w-full">
          {donorData.length > 0 && (
            <MUIDataTable
              data={donorData}
              columns={columns}
              options={options}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default AddtoOtherTeam;
