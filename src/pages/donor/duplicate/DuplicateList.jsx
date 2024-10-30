import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { CiEdit } from "react-icons/ci";
import MUIDataTable from "mui-datatables";
import { FaDeleteLeft } from "react-icons/fa6";
import { toast } from "react-toastify";
import BASE_URL from "../../../base/BaseUrl";
import Layout from "../../../layout/Layout";
// import { Delete } from "@mui/icons-material";

const DuplicateList = () => {
  const [duplicateData, setDuplicateData] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const userType = parseInt(localStorage.getItem("user_type_id"), 10);


  useEffect(() => {
    const fetchDuplicateData = async () => {
      try {
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

        setDuplicateData(response.data?.individualCompanies);
      } catch (error) {
        console.error("Error fetching duplicate data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDuplicateData();
    setLoading(false);
  }, []);

  const handleDuplicateDelete = async (e, id) => {
    e.preventDefault();
    axios({
        url: BASE_URL+"/api/update-donors-duplicate-by-id/"+id,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((res) => {
        console.log("receipt", res.data);
        toast.success("Data Updated Sucessfully");
        
        navigate('/donor-list')
        
      })
  };


  const columns = [
    {
      name: "slNo",
      label: "SL No",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta) => {
          return tableMeta.rowIndex + 1;
        },
      },
    },

    {
      name: "id",
      label: "Fts ID",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "indicomp_full_name",
      label: "Name",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "indicomp_type",
      label: "Type",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "indicomp_spouse_name",
      label: "Spouse",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "indicomp_com_contact_name",
      label: "Contact",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "indicomp_mobile_phone",
      label: "Mobile",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "indicomp_email",
      label: "Mobile",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "receipt_count",
      label: "Receipt Count",
      options: {
        filter: true,
        sort: false,
      },
    },

    {
      name: "id",
      label: "Action",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (id) => {
          return (
            <>
            <div
              onClick={(e) => handleDuplicateDelete(e, id)}
              className="flex items-center space-x-2"
            >
              <FaDeleteLeft title="Delete" className="h-5 w-5 cursor-pointer" />
            </div>
            <div
              onClick={(e) => handleDuplicateDelete(e, id)}
              className="flex items-center space-x-2"
            >
              <FaDeleteLeft title="Delete" className="h-5 w-5 cursor-pointer" />
            </div>
            </>
          );
        },
      },
    },
  ];
  const options = {
    selectableRows: "none",
    elevation: 0,
    responsive: "standard",
    viewColumns: false,
    download: false,
    print: false,
  };
  return (
    <Layout>
      <div className="p-2  rounded-lg bg-[#D0F6F2]">
        <p>
          Duplicate Criteria: If Mobile Number is Same or Donor Name is Same.
          <br />
          (Note: All the below data is not 100% duplicate. It is all recommended
          data that may be duplicated. Please make the changes very carefully.
          We advise you to make a note before removing.)
        </p>
      </div>
      <div className="mt-5">
        <MUIDataTable
          title="Duplicate List"
          data={duplicateData ? duplicateData : []}
          columns={columns}
          options={options}
        />
      </div>
    </Layout>
  );
};

export default DuplicateList;
