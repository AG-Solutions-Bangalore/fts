import React, { useContext, useEffect, useState } from "react";
import Layout from "../../../layout/Layout";
import { ContextPanel } from "../../../utils/ContextPanel";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../../base/BaseUrl";
import { MdConfirmationNumber, MdEdit } from "react-icons/md";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import MUIDataTable from "mui-datatables";
import moment from "moment";
import { Spinner } from "@material-tailwind/react";
import PageTitle from "../../../components/common/PageTitle";
import { FaArrowLeft } from "react-icons/fa6";

const SchoolToAllot = () => {
  const [schoolToAllot, setSchoolToAllot] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isPanelUp } = useContext(ContextPanel);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApprovedRData = async () => {
      if (!isPanelUp) {
        navigate("/maintenance");
        return;
      }

      setLoading(true);

      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/api/fetch-ots`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const res = response.data?.schoolots;
        if (Array.isArray(res)) {
          const tempRows = res.map((item, index) => [
            index + 1,
            item["individual_company"]["indicomp_full_name"],
            item["individual_company"]["indicomp_type"],
            item["individual_company"]["indicomp_mobile_phone"],
            item["individual_company"]["indicomp_email"],

            item["schoolalot_year"],
            item["receipt_no_of_ots"] + [[]],
            item["individual_company"]["indicomp_status"] +
              "#" +
              item["individual_company"]["id"] +
              "&" +
              item["schoolalot_year"] +
              "$" +
              item["receipt_financial_year"],

            // item["id"],
          ]);
          setSchoolToAllot(tempRows);
        }
      } catch (error) {
        console.error("Error fetching approved list request data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApprovedRData();
  }, [isPanelUp, navigate]);

  const columns = [
    {
      name: "#",
      label: "#",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "Donor Name",
      label: "Donor Name",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "Type",
      label: "Type",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "Mobile",
      label: "Mobile",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "Email",
      label: "Email",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "Allotment Year",
      label: "Allotment Year",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "OTS Received",
      label: "OTS Received",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: localStorage.getItem("id") == 1 ? "Allotment" : "",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => {
          const newValue = value.substring(
            value.indexOf("#") + 1,
            value.lastIndexOf("&")
          );
          const newYear = value.substring(
            value.indexOf("&") + 1,
            value.lastIndexOf("$")
          );
          const fYear = value.substring(value.indexOf("$") + 1);
          return (
            <div>
              {value.startsWith("1") && (
                <div className="flex items-center space-x-2">
                  <Link
                    to={
                      "/students-addschoolalot?id=" +
                      newValue +
                      "&year=" +
                      newYear +
                      "&fyear=" +
                      fYear
                    }
                    style={{
                      display: localStorage.getItem("id") == 1 ? "" : "none",
                    }}
                  >
                    <MdConfirmationNumber
                      title="Allotment"
                      className="h-5 w-5 cursor-pointer text-blue-500"
                    />
                  </Link>
                </div>
              )}

              {value.startsWith("0") && (
                <div className="flex items-center space-x-2">
                  <Link
                    style={{
                      display: localStorage.getItem("id") == 1 ? "" : "none",
                    }}
                  >
                    <MdConfirmationNumber
                      title="Current Year"
                      className="h-5 w-5 cursor-pointer text-blue-500"
                    />
                  </Link>
                </div>
              )}
            </div>
          );
        },
      },
    },
  ];

  const options = {
    selectableRows: "none",
    elevation: 0,

    responsive: "standard",
    viewColumns: true,
    download: false,
    print: false,
    setRowProps: (rowData) => {
      return {
        style: {
          borderBottom: "10px solid #f1f7f9",
        },
      };
    },
  };

  return (
    <Layout>
      <PageTitle title="School To Allot in" />
      <div className="mt-5">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Spinner className="h-12 w-12" color="purple" />
          </div>
        ) : (
          <MUIDataTable
            data={schoolToAllot ? schoolToAllot : []}
            columns={columns}
            options={options}
          />
        )}
      </div>
    </Layout>
  );
};

export default SchoolToAllot;
