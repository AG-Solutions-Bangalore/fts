import React, { useContext, useEffect, useState } from "react";
import Layout from "../../../layout/Layout";
import { ContextPanel } from "../../../utils/ContextPanel";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../../base/BaseUrl";
import MUIDataTable from "mui-datatables";
import { Spinner } from "@material-tailwind/react";
import PageTitle from "../../../components/common/PageTitle";
import { IoMdEye } from "react-icons/io";

const FullList = () => {
  const [schoolAllot, setSchoolAllot] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isPanelUp } = useContext(ContextPanel);
  const navigate = useNavigate();
  const [currentYear, setCurrentYear] = useState("");
  const [chapter, setChapter] = useState([]);

  console.log("curr", currentYear);
  //FRTCH YEAR
  useEffect(() => {
    const fetchYearData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/fetch-year`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setCurrentYear(response.data.year.current_year);
        console.log(response.data.year.current_year);
      } catch (error) {
        console.error("Error fetching year data:", error);
      }
    };

    fetchYearData();
  }, []);
  useEffect(() => {
    const fetchApprovedRData = async () => {
      setLoading(true);
      if (currentYear) {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get(
            `${BASE_URL}/api/fetch-school-alloted-list/${currentYear}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          const res = response.data?.schools;
          if (Array.isArray(res)) {
            const tempRows = res.map((item, index) => [
              index + 1,
              item["school_state"],
              item["district"],
              item["achal"],
              item["cluster"],
              item["sub_cluster"],
              item["village"],
              item["school_code"],
              item["status_label"],
              item["id"],
            ]);
            setSchoolAllot(tempRows);
          }
        } catch (error) {
          console.error("Error fetching approved list request data", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchApprovedRData();
  }, [isPanelUp, navigate, currentYear]);

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
      name: "State",
      label: "State",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "District",
      label: "District",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "Achal",
      label: "Achal",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "Cluster",
      label: "Cluster",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "Sub Cluster",
      label: "Sub Cluster",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "Village",
      label: "Village",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "School Code",
      label: "School Code",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "Status",
      label: "Status",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "Actions",
      options: {
        filter: false,
        print: false,
        download: false,

        customBodyRender: (id) => {
          return (
            <div className="flex items-center space-x-2">
              <Link to={`/students-full-list-view/${id}`}>
                <IoMdEye
                  title="Allotment"
                  className="h-5 w-5 cursor-pointer text-blue-500"
                />
              </Link>
            </div>
          );
        },
      },
    },
  ];

  const options = {
    selectableRows: "none",
    elevation: 0,
    filterType: "textField",
    selectableRows: false,
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

  //FRTCH chapterwise
  useEffect(() => {
    const fetchChapterData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/fetch-school-count-chapterwise`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setChapter(response.data.schoolcount);
        console.log(response.data.schoolcount);
      } catch (error) {
        console.error("Error fetching year data:", error);
      }
    };

    fetchChapterData();
  }, []);

  return (
    <Layout>
      <PageTitle title="Schools List" />
      {chapter.map((item, index) => (
        <div key={index}>
          <h1 className="font-bold text-black text-2xl">
            {item.chapter_name}-{item.school_count}
          </h1>
        </div>
      ))}

      <div className="mt-5">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Spinner className="h-12 w-12" color="purple" />
          </div>
        ) : (
          <MUIDataTable
            data={schoolAllot ? schoolAllot : []}
            columns={columns}
            options={options}
          />
        )}
      </div>
    </Layout>
  );
};

export default FullList;
