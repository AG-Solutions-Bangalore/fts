import React, { useContext, useEffect, useState } from "react";
import Layout from "../../../layout/Layout";
import { ContextPanel } from "../../../utils/ContextPanel";
import { useNavigate } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import BASE_URL from "../../../base/BaseUrl";
import { Spinner } from "@material-tailwind/react";
import { MdDelete, MdEdit } from "react-icons/md";
import { toast } from "react-toastify";

const DuplicateDonorList = () => {
  const [duplicate, setDuplicate] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isPanelUp } = useContext(ContextPanel);
  const navigate = useNavigate();
  const [data, setData] = useState("");

  const fetchPendingRData = async () => {
    try {
      if (!isPanelUp) {
        navigate("/maintenance");
        return;
      }
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/api/fetch-donors-duplicate`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const res = response.data?.individualCompanies || [];

      const tempRows = res.map((item, index) => {
        if (item["indicomp_type"] == "Individual") {
          return [
            index + 1,
            item["indicomp_fts_id"],
            item["indicomp_full_name"],
            item["indicomp_type"],
            item["indicomp_spouse_name"],
            item["indicomp_mobile_phone"],
            item["indicomp_email"],
            item["receipt_count"],
            item["receipt_count"] + "#" + item["id"],
          ];
        } else {
          return [
            index + 1,
            item["indicomp_fts_id"],
            item["indicomp_full_name"],
            item["indicomp_type"],
            item["indicomp_com_contact_name"],
            item["indicomp_mobile_phone"],
            item["indicomp_email"],
            item["receipt_count"],
            item["receipt_count"] + "#" + item["id"],
          ];
        }
      });

      setDuplicate(tempRows);
    } catch (error) {
      console.error("Error fetching pending list request data", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPendingRData();
  }, [isPanelUp, navigate]);

  const updateData = (value) => {
    axios({
      url: BASE_URL + "/api/update-donors-duplicate-by-id/" + value,
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      console.log("receipt", res.data);
      setData(res.data.c_receipt_count);
      toast.success("Data Updated Successfully");
      fetchPendingRData();
    });
  };

  const columns = [
    {
      name: "#",
      label: "#",
      options: { filter: false, print: true, download: true, sort: false },
    },
    {
      name: "PDS Id",
      label: "PDS Id",
      options: { filter: false, sort: false },
    },
    { name: "Name", label: "Name", options: { filter: false, sort: false } },
    { name: "Type", label: "Type", options: { filter: false, sort: false } },
    {
      name: "Spouse/Contact",
      label: "Spouse/Contact",
      options: { filter: false, sort: false },
    },
    {
      name: "Mobile",
      label: "Mobile",
      options: { filter: false, sort: false },
    },
    { name: "Email", label: "Email", options: { filter: false, sort: false } },
    {
      name: "Receipt Count",
      label: "Receipt Count",
      options: { filter: false, sort: false },
    },
    {
      name: "Actions",
      options: {
        filter: true,
        customBodyRender: (value) => {
          return (
            <div style={{ minWidth: "150px" }}>
              {!value.startsWith(0) ? (
                <div
                  style={{
                    display:
                      localStorage.getItem("user_type_id") == 2 ||
                      localStorage.getItem("user_type_id") == 3 ||
                      localStorage.getItem("user_type_id") == 4
                        ? "none"
                        : "",
                  }}
                >
                  <MdEdit
                    className="text-blue-500 text-lg cursor-pointer"
                    onClick={() => {
                      navigate(
                        `/donor/duplicate-list/edit/${value.substr(
                          value.indexOf("#") + 1,
                          value.length - 1
                        )}`
                      );
                    }}
                  />
                </div>
              ) : (
                <MdDelete
                  className="text-blue-500 text-lg cursor-pointer"
                  onClick={() => {
                    updateData(value.substr(value.indexOf("#") + 1));
                  }}
                />
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
    setRowProps: (rowData) => ({
      style: {
        borderBottom: "10px solid #f1f7f9",
      },
    }),
  };

  return (
    <Layout>
      <div className="flex flex-col md:flex-row justify-between items-center bg-white mt-5 p-2 rounded-lg space-y-4 md:space-y-0">
        <h3 className="text-center md:text-left text-lg md:text-xl font-bold">
          Duplicate List
        </h3>
      </div>
      <div
        className="flex justify-between items-center  p-4"
        style={{ backgroundColor: "#b8f2ed" }}
      >
        <p className="text-black">
          Duplicate Criteria: If Mobile Number is Same or Donor Name is Same.
          <br />
          (Note: All the below data is not 100% duplicate. It is all recommended
          data that may be duplicated. Please make the changes very carefully.
          We advise you to make a note before removing.)
        </p>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner className="h-12 w-12" color="purple" />
        </div>
      ) : (
        <div className="mt-5">
          <MUIDataTable data={duplicate} columns={columns} options={options} />
        </div>
      )}
    </Layout>
  );
};

export default DuplicateDonorList;
