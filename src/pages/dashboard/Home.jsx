import React, { useEffect, useRef, useState } from "react";
import Layout from "../../layout/Layout";
import BASE_URL from "../../base/BaseUrl";
import axios from "axios";
import { HiMiniMinus } from "react-icons/hi2";
import { TfiReload } from "react-icons/tfi";
import { MdCancel } from "react-icons/md";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import CountUp from "react-countup";
import { Chip, IconButton, List, ListItem, Stack } from "@mui/material";
import { NumericFormat } from "react-number-format";
import moment from "moment";
import { Badge } from "@material-tailwind/react";
import AddNotice from "./AddNotice";
import { Bar, Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, registerables } from "chart.js";

const Home = () => {
  Chart.register(ArcElement, ...registerables);
  const [result, setResult] = useState([]);
  console.log(result, "result");
  const [loadingRecentOrders, setLoadingRecentOrders] = useState([]);
  const [fullCloseCategory, setFullCloseCategory] = useState(true);
  const [closeCategory, setCloseCategory] = useState(true);
  const [fullCloseDonation, setFullCloseDonation] = useState(true);
  const [closeDonation, setCloseDonation] = useState(true);
  const [fullCloseDonation1, setFullCloseDonation1] = useState(true);
  const [closeDonation1, setCloseDonation1] = useState(true);
  const [fullCloseReceipts, setFullCloseReceipts] = useState(true);
  const [closeReceipts, setCloseReceipts] = useState(true);
  const [fullCloseReceipts1, setFullCloseReceipts1] = useState(true);
  const [closeReceipts1, setCloseReceipts1] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [datanotification, setNotification] = useState([]);
  const [graphData, setGraphData] = useState(null);
  const [graph1, setGraph1] = useState([]);
  const [graph2, setGraph2] = useState([]);
  const [currentYear, setCurrentYear] = useState("");

  const [showmodalNotice, setShowmodalNotice] = useState(false);
  const closegroupNoticeModal = () => {
    setShowmodalNotice(false);
  };

  const openmodalNotice = () => {
    setShowmodalNotice(true);
  };

  const navigate = useNavigate();



  useEffect(() => {
    const fetchYearData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/fetch-year`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setCurrentYear(response.data?.year?.current_year);
        console.log(response.data?.year.current_year);
      } catch (error) {
        console.error("Error fetching year data:", error);
      }
    };

    fetchYearData();
  }, []);

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

  const populateNotice = (hi) => {
    setShowmodalNotice(false);
    axios({
      url: BASE_URL + "/api/user-fetch-notices",
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      if (res) {
        setNotification(res.data.notices);
      } else {
        toast.error("Duplicate Entry");
      }
    });
  };

  const fetchResult = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/fetch-dashboard-data-by/${currentYear}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        setResult(response.data);

        const barLabels = response.data?.graph1.map(
          (item) =>  item.receipt_donation_type
        );
        const barValue = response.data?.graph1.map(
          (item) =>  item.total_count
        );
        console.log(barLabels , "barLabels")
        setGraph1(barLabels);
        setGraph2(barValue);
      }
    } catch (error) {
      console.error("Error fetching booking data:", error);
    }
  };


  useEffect(()=>{
    fetchResult();
  },[currentYear])

  const handleReload = () => {
    fetchResult(); 
  };

  useEffect(() => {
    if (graph1.length > 0 ) {
      setGraphData({
        labels: graph1,
        datasets: [
          {
            data: graph2,
            backgroundColor: [
              "#1C64F2",
              "#16BDCA",
              "#FDBA8C",
              "#E74694",
              "#F59E0B",
              "#10B981",
              "#6366F1",
            ],
            hoverBackgroundColor: [
              "#1654C0",
              "#13A5B0",
              "#FC9D7C",
              "#D93B84",
              "#E78F0A",
              "#0F9872",
              "#5458E0",
            ],
          },
        ],
      });
    }
  }, [graph1,graph2]);

 
  useEffect(() => {
    fetchResult();
  }, [currentYear]);

  return (
    <Layout>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-5">
          {/* <div className="bg-[#5e7081] text-white flex items-center justify-center flex-col text-center md:h-24 py-4 rounded-lg transition-transform duration-400">
            <p className="text-md font-bold">Direct Referral</p>
            <p className="text-xl font-bold">
              <CountUp start={0} end={referral.inquiry_count} />
            </p>
          </div> */}

          <div>
            <div className="bg-[#5e7081] text-white p-4 shadow-[0_4px_10px_rgba(0,0,0,0.25)] rounded-md text-center min-h-[150px] flex flex-col items-center justify-center">
              <h3 className="text-xl font-bold">Individual Donors</h3>
              <p className="text-5xl font-bold">
                <CountUp start={0} end={result.individual_company_count} />
              </p>
            </div>
          </div>
          <div>
            <div className="bg-blue-500 text-white p-4 shadow-[0_4px_10px_rgba(0,0,0,0.25)] rounded-md text-center min-h-[150px] flex flex-col items-center justify-center">
              <h3 className="text-xl font-bold">Companies/Trusts</h3>
              <p className="text-5xl font-bold">
                <CountUp start={0} end={result.other_companies_count} />
              </p>
            </div>
          </div>
          <div>
            <div className="bg-green-500 text-white p-4 shadow-[0_4px_10px_rgba(0,0,0,0.25)] rounded-md text-center min-h-[150px] flex flex-col items-center justify-center">
              <h3 className="text-xl font-bold">Total Donation</h3>
              <p className="text-5xl font-bold">
                <CountUp start={0} end={result.total_donation} />
              </p>
            </div>
          </div>
        </div>

        {/* <div className="mt-10">
          {fullClose && (
            <div className="container mx-auto col-span-2">
              <div className="flex justify-between bg-white p-4 rounded-sm">
                <div className="content-center">
                  <h1>Direct Referral</h1>
                </div>
                <div className="flex gap-3">
                  <div>
                    <HiMiniMinus
                      className="text-2xl cursor-pointer"
                      onClick={() => setShowTable(!showTable)}
                    />
                  </div>
                  <div>
                    <TfiReload
                      className="text-xl cursor-pointer"
                      onClick={handleReload}
                    />
                  </div>
                  <div>
                    <MdCancel
                      className="text-2xl cursor-pointer"
                      onClick={() => setFullClose(false)}
                    />
                  </div>
                </div>
              </div>
              {loadingRecentOrders ? (
                <Loader />
              ) : (
                showTable && (
                  <div className="flex flex-col">
                    <div className="overflow-x-auto">
                      <div className="inline-block min-w-full">
                        <div className="overflow-hidden">
                          <table className="min-w-full text-center text-sm font-light text-surface dark:text-white">
                            {localStorage.getItem("user_type_id") == 2 && (
                              <thead className="bg-gray-400 font-medium text-white dark:border-white/10">
                                <tr>
                                  <th scope="col" className="px-6 py-4">
                                    ID
                                  </th>
                                  <th scope="col" className="px-6 py-4">
                                    Full Name
                                  </th>
                                  <th scope="col" className="px-6 py-4">
                                    Mobile
                                  </th>
                                  <th scope="col" className="px-6 py-4">
                                    Area
                                  </th>
                                  <th scope="col" className="px-6 py-4">
                                    Service
                                  </th>
                                  <th scope="col" className="px-6 py-4">
                                    Status
                                  </th>
                                </tr>
                              </thead>
                            )}
                            {localStorage.getItem("user_type_id") == 1 && (
                              <thead className="bg-[#5e7081] font-medium text-white dark:border-white/10">
                                <tr>
                                  <th scope="col" className="px-6 py-4">
                                    ID
                                  </th>
                                  <th scope="col" className="px-6 py-4">
                                    Full Name
                                  </th>
                                  <th scope="col" className="px-6 py-4">
                                    Mobile
                                  </th>
                                  <th scope="col" className="px-6 py-4">
                                    Email
                                  </th>
                                  <th scope="col" className="px-6 py-4 ">
                                    Referral Id
                                  </th>
                                  <th scope="col" className="px-6 py-4">
                                    No of Referral
                                  </th>
                                </tr>
                              </thead>
                            )}
                            {localStorage.getItem("user_type_id") == 1 && (
                              <tbody>
                                {referral?.inquiry_latest?.length > 0 ? (
                                  referral.inquiry_latest.map((order, key) => (
                                    <tr
                                      key={key}
                                      className="border-b border-neutral-200 bg-white"
                                    >
                                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                                        {order.id}
                                      </td>
                                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                                        {order.full_name}
                                      </td>
                                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                                        {order.mobile}
                                      </td>
                                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                                        {order.email}
                                      </td>
                                      <td className="whitespace-nowrap px-6 py-4">
                                        {order.name}
                                      </td>
                                      <td className="whitespace-nowrap px-6 py-4">
                                        {order.purch}
                                      </td>
                                    </tr>
                                  ))
                                ) : (
                                  <tr>
                                    <td
                                      colSpan={6}
                                      className="px-6 py-4 text-center text-2xl font-bold text-blue-grey-600"
                                    >
                                      No data available
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            )}
                            {localStorage.getItem("user_type_id") == 2 && (
                              <tbody>
                                {referral?.inquiry_latest?.length > 0 ? (
                                  referral.inquiry_latest.map((order, key) => (
                                    <tr
                                      key={key}
                                      className="border-b border-neutral-200 bg-white"
                                    >
                                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                                        {order.id}
                                      </td>
                                      <td className="whitespace-nowrap px-6 py-4">
                                        {order.area}
                                      </td>
                                      <td className="whitespace-nowrap px-6 py-4">
                                        {order.full_name}
                                      </td>
                                      <td className="whitespace-nowrap px-6 py-4">
                                        {order.mobile}
                                      </td>
                                      <td className="whitespace-nowrap px-6 py-4">
                                        {order.service}
                                      </td>
                                      <td className="whitespace-nowrap px-6 py-4">
                                        {order.status}
                                      </td>
                                    </tr>
                                  ))
                                ) : (
                                  <tr>
                                    <td
                                      colSpan={6}
                                      className="px-6 py-4 text-center text-2xl font-bold text-blue-grey-600"
                                    >
                                      No data available
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            )}
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </div> */}
      </div>
    </Layout>
  );
};

export default Home;
