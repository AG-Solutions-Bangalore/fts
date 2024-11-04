import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, CircularProgress, IconButton, Tooltip } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { MdEdit } from "react-icons/md";
import moment from "moment";
import Layout from "../../layout/Layout";
import BASE_URL from "../../base/BaseUrl";
import { MdRemoveRedEye } from "react-icons/md";

const ReceiptsList = () => {
  const [receiptList, setReceiptList] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const userType = localStorage.getItem("user_type_id");
  useEffect(() => {
    const fetchOrderList = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/api/fetch-receipts`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setReceiptList(response.data.receipts);
      } catch (error) {
        console.error("error while fetching select chapters ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrderList();
    setLoading(false);
  }, []);

  const columns = useMemo(() => {
    const baseColumns = [
      {
        name: "receipt_no",
        label: "Receipt No",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "individual_company",
        label: "Name",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (value) => value.indicomp_full_name,
        },
      },
      {
        name: "receipt_date",
        label: "Date",
        options: {
          filter: true,
          sort: false,
          customBodyRender: (value) => moment(value).format("DD-MM-YYYY"),
        },
      },
      {
        name: "receipt_exemption_type",
        label: "Exemption Type",
        options: {
          filter: true,
          sort: false,
        },
      },
      {
        name: "receipt_donation_type",
        label: "Donation Type",
        options: {
          filter: true,
          sort: false,
        },
      },
      {
        name: "receipt_total_amount",
        label: "Amount",
        options: {
          filter: true,
          sort: false,
        },
      },
      {
        name: "individual_company",
        label: "Promotor",
        options: {
          filter: false,
          display: "excluded",
          sort: false,
          customBodyRender: (value) => value.indicomp_promoter,
        },
      },
      {
        name: "id",
        label: "Action",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (id) => (
            <div className="flex items-center space-x-2">
              <Tooltip title="View" placement="top">
                <IconButton
                  aria-label="View"
                  className="transition duration-300 ease-in-out transform hover:scale-110 hover:bg-purple-50"
                  sx={{
                    width: "35px",
                    height: "35px",
                    borderRadius: "8px",
                    color: "#4CAF50",
                    "&:hover": {
                      color: "#388E3C",
                      backgroundColor: "#f3e8ff",
                    },
                  }}
                >
                  <Link to={`/view-receipts/${id}`}>
                    <MdRemoveRedEye />
                  </Link>
                </IconButton>
              </Tooltip>
              {userType === "2" && (
                <Tooltip title="Edit" placement="top">
                  <IconButton
                    aria-label="Edit"
                    className="transition duration-300 ease-in-out transform hover:scale-110 hover:bg-purple-50"
                    sx={{
                      width: "35px",
                      height: "35px",
                      borderRadius: "8px",
                      color: "#4CAF50",
                      "&:hover": {
                        color: "#388E3C",
                        backgroundColor: "#f3e8ff",
                      },
                    }}
                  >
                    <Link to={`/edit-receipts/${id}`}>
                      <MdEdit />
                    </Link>
                  </IconButton>
                </Tooltip>
              )}
            </div>
          ),
        },
      },
    ];

    // Conditionally add the "Chapter" column if userType is "4"
    if (userType === "4") {
      baseColumns.splice(2, 0, {
        name: "individual_company",
        label: "Chapter",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (value) => value.chapter_id,
        },
      });
    }

    return baseColumns;
  }, [userType, receiptList]);

  const options = {
    filterType: "textField",
    selectableRows: false,
    selectableRows: "none",
    elevation: 0,
    responsive: "standard",
    viewColumns: false,
    download: false,
    print: false,
  };

  const data = useMemo(() => (receiptList ? receiptList : []), [receiptList]);

  return (
    <Layout>
      {loading && (
        <CircularProgress
          disableShrink
          style={{
            marginLeft: "600px",
            marginTop: "300px",
            marginBottom: "300px",
          }}
          color="secondary"
        />
      )}
      <div className="flex flex-col md:flex-row justify-between items-center bg-white mt-5 p-2 rounded-lg space-y-4 md:space-y-0">
        <h3 className="text-center md:text-left text-lg md:text-xl font-bold">
          Receipts List
        </h3>
      </div>
      <div className="mt-5">
        <div className="bg-white mt-4 p-4 md:p-6 rounded-lg shadow-lg">
          <MUIDataTable
            title={"Receipts List"}
            data={data}
            columns={columns}
            options={options}
          />
        </div>
      </div>
    </Layout>
  );
};

export default ReceiptsList;
