import React, { useContext, useEffect, useState } from "react";
import Layout from "../../../layout/Layout";
import { ContextPanel } from "../../../utils/ContextPanel";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../../base/BaseUrl";
import { MdConfirmationNumber, MdEdit } from "react-icons/md";
import MUIDataTable from "mui-datatables";
import schoolalotcurrentfromdate from "./Date/FromDate";
import schoolalotcurrenttodate from "./Date/ToDate";
import { Card, Input, Spinner, Button } from "@material-tailwind/react";
import PageTitle from "../../../components/common/PageTitle";
import toast from "react-hot-toast";
import { IoMdArrowBack } from "react-icons/io";

const DonorDetails = () => {
  const [schoolToAllot, setSchoolToAllot] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSchoolIds, setSelectedSchoolIds] = useState([]);
  const { isPanelUp } = useContext(ContextPanel);
  const [schoolAllot, setSchoolAllot] = useState([]);
  const navigate = useNavigate();
  const id = new URL(window.location.href).searchParams.get("id");

  const year = new URL(window.location.href).searchParams.get("year");
  const fyear = new URL(window.location.href).searchParams.get("fyear");
  console.log(year);
  // Get the first and last date
  const fromdate = schoolalotcurrentfromdate.toString();
  const todate = schoolalotcurrenttodate.toString();

  const [schoolalot, setSchoolalot] = useState({
    indicomp_fts_id: "",
    schoolalot_financial_year: year,
    schoolalot_to_date: todate,
    schoolalot_from_date: fromdate,
    schoolalot_school_id: "",
    rept_fin_year: fyear,
  });

  //get
  const [userdata, setUserdata] = useState("");

  useEffect(() => {
    axios({
      url: BASE_URL + "/api/fetch-schoolsallotdonor-by-id/" + id,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      console.log("editdon", res.data);
      setUserdata(res.data.SchoolAlotDonor);
    });
  }, []);
  useEffect(() => {
    const fetchApprovedRData = async () => {
      if (schoolalot.schoolalot_financial_year) {
        setLoading(true);

        try {
          const response = await axios.get(
            `${BASE_URL}/api/fetch-school-alloted-list/${year}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );

          const res = response.data?.schools;
          setSchoolAllot(res);

          if (Array.isArray(res)) {
            const tempRows = res.map((item, index) => [
              item["school_state"],
              item["district"],
              item["achal"],
              item["cluster"],
              item["sub_cluster"],
              item["village"],
              item["school_code"],
              item["status_label"],
            ]);
            setSchoolToAllot(tempRows);
          }
        } catch (error) {
          console.error("Error fetching approved list request data", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchApprovedRData();
  }, [isPanelUp, navigate, schoolalot.schoolalot_financial_year]);

  const onSubmit = async (e) => {
    e.preventDefault();
    var schoolIdsSelected = localStorage.getItem("selectedSchoolIds");

    let data = {
      indicomp_fts_id: userdata.indicomp_fts_id,
      schoolalot_financial_year: year,
      schoolalot_to_date: schoolalot.schoolalot_to_date,
      schoolalot_from_date: schoolalot.schoolalot_from_date,
      schoolalot_school_id: schoolIdsSelected,
      rept_fin_year: fyear,
    };

    try {
      await axios.post(`${BASE_URL}/api/create-school-alot`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      toast.success("Data Inserted Successfully");
      navigate("/students-schoolallot");
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const columns = [
    {
      name: "State",
      label: "State",
    },
    { name: "District", label: "District" },
    { name: "Achal", label: "Achal" },
    { name: "Cluster", label: "Cluster" },
    { name: "Sub Cluster", label: "Sub Cluster" },
    { name: "Village", label: "Village" },
    { name: "School Code", label: "School Code" },
    { name: "Status", label: "Status" },
  ];

  const options = {
    filterType: "textField",
    selectableRows: false,
    filter: true,
    search: true,
    print: false,
    viewColumns: false,
    download: false,
    selectableRows: "multiple",
    selectToolbarPlacement: "above",
    responsive: "standard",
    isRowSelectable: (dataIndex) => {
      return schoolAllot[dataIndex]?.status_label !== "Allotted";
    },
    selectableRowsOnClick: true,
    onRowsSelect: (currentRowSelected, allRowsSelected) => {
      const selectedIds = allRowsSelected
        .map((row) => schoolAllot[row.dataIndex]?.school_code)
        .join(",");

      setSelectedSchoolIds(selectedIds);
      localStorage.setItem("selectedSchoolIds", selectedIds);

      console.log("Selected School IDs (string):", selectedIds);
    },
    customToolbarSelect: () => null,
  };

  return (
    <Layout>
      <PageTitle
        title="Donor Details"
        icon={IoMdArrowBack}
        backLink={"/students-to-allot"}
      />
      <Card>
        <div className="grid grid-cols md:grid-cols-3 gap-4 p-2">
          <Input
            label="School Allot Year"
            name="schoolalot_financial_year"
            value={schoolalot.schoolalot_financial_year}
            disabled
            labelProps={{
              className: "!text-gray-500",
            }}
          />
          <Input
            label="From Date"
            name="schoolalot_from_date"
            type="date"
            disabled
            value={schoolalot.schoolalot_from_date}
            labelProps={{
              className: "!text-gray-500",
            }}
          />
          <Input
            label="To Date"
            name="schoolalot_to_date"
            type="date"
            disabled
            value={schoolalot.schoolalot_to_date}
            labelProps={{
              className: "!text-gray-500",
            }}
          />
        </div>
        <div className="mt-5">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Spinner className="h-12 w-12" color="purple" />
            </div>
          ) : (
            <MUIDataTable
              data={schoolToAllot}
              columns={columns}
              options={options}
            />
          )}
        </div>
        <div className="mt-5 flex justify-end p-4">
          <Button onClick={onSubmit} color="purple">
            Submit
          </Button>
        </div>
      </Card>
    </Layout>
  );
};

export default DonorDetails;
