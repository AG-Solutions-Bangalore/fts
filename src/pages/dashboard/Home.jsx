import React, { useEffect,useState } from "react";
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
  console.log(datanotification , "datanotification")
  const [graphData, setGraphData] = useState(null);
  const [graph1, setGraph1] = useState([]);
  const [graph2, setGraph2] = useState([]);
  const [currentYear, setCurrentYear] = useState("");
  const userTypeId = localStorage.getItem("user_type_id");

  const [showmodalNotice, setShowmodalNotice] = useState(false);
  const closegroupNoticeModal = () => {
    setShowmodalNotice(false);
  };

  const openmodalNotice = () => {
    setShowmodalNotice(true);
  };

 


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
    // setLoading(true);
    try {
      const url =
        userTypeId == "3"
          ? `${BASE_URL}/api/superadmin-fetch-notices`
          : `${BASE_URL}/api/user-fetch-notices`;

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response , "response")
      setNotification(response.data.notices || []);
    } catch (error) {
      console.error("Error fetching notices:", error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(()=>{
  // },[])

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
    console.log("jshdbeforw")
    fetchResult();
    console.log("jshd")
    fetchNotices()

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
          <div>
            <div className="bg-[pink] text-white p-4 shadow-[0_4px_10px_rgba(0,0,0,0.25)] rounded-md text-center min-h-[150px] flex flex-col items-center justify-center">
              <h3 className="text-xl font-bold">Total Donors</h3>
              <p className="text-5xl font-bold">
                <CountUp start={0} end={result.total_companies_count} />
              </p>
            </div>
          </div>
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
        <div className="md:grid md:grid-cols-3 grid-cols-1 mt-5 gap-3">
          {fullCloseCategory && (
            <div className="col-span-2 h-[200px]">
              <div className=" bg-white p-4 rounded-sm border-b-2">
                <div className="flex justify-between">
                  <div className="content-center">
                    <h1>Notices</h1>
                  </div>
                  <div className="flex gap-3">
                    <div>
                      <HiMiniMinus
                        className="text-2xl cursor-pointer"
                        onClick={() => setCloseCategory(!closeCategory)}
                      />
                    </div>
                    <div>
                      <MdCancel
                        className="text-2xl cursor-pointer"
                        onClick={() => setFullCloseCategory(false)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                {loadingProducts ? (
                  <Loader />
                ) : (
                  closeCategory && (
                    <div className="relative w-full overflow-auto bg-white ">
                      <div className="flex transition-transform duration-500">
                        <div className="min-w-full h-[350px] p-4">
                          {/* <div className="flex flex-col items-center">
                            <h3 className="text-center">Data </h3>
                          </div> */}
                          {datanotification.length > 0 ? (
                            datanotification.map((notice) => (
                              <div key={notice.id} className="mb-2">
                                <h2
                                  className="text-lg font-semibold mb-1"
                                  style={{ color: "#464D69" }}
                                >
                                  {notice.notice_name}
                                </h2>
                                <p className="text-sm text-gray-500">
                                  {notice.notice_detail}
                                </p>
                                <h3 className="my-3 text-sm text-gray-500">
                                  Notice Posted On{" "}
                                  {moment(notice.created_at).format("DD-MM-YY")}
                                </h3>
                                <hr />
                              </div>
                            ))
                          ) : (
                            <p className="p-4">No notices available.</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
              {closeCategory && (
                <div className="flex justify-between bg-white p-4 rounded-sm border-t-2">
                  <div className="content-center">
                    <button
                      onClick={openmodalNotice}
                      className="btn btn-primary text-center md:text-right text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg shadow-md"
                    >
                      Add A New Notice
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
          <div>
            {fullCloseDonation && (
              <div className="w-full">
                <div className=" bg-white p-2 rounded-sm border-b-2">
                  <div className="flex justify-between border-b-2 p-3">
                    <div className="content-center">
                      <h1>Total Donation Details</h1>
                    </div>
                    <div className="flex gap-3">
                      <div>
                        <HiMiniMinus
                          className="text-2xl cursor-pointer"
                          onClick={() => setCloseDonation(!closeDonation)}
                        />
                      </div>
                      <div>
                        <MdCancel
                          className="text-2xl cursor-pointer"
                          onClick={() => setFullCloseDonation(false)}
                        />
                      </div>
                    </div>
                  </div>
                  {loadingProducts ? (
                    <Loader />
                  ) : (
                    closeDonation && (
                      <div className="!p-0 w-full">
                        <List className="list-none p-0">
                          <ListItem className="!px-0 !py-0 !flex !justify-between items-center">
                            <p className="mb-0 content-title w-[20px] mr-6">
                              OTS
                            </p>
                            <Stack alignItems="center">
                              <Chip
                                label={
                                  <NumericFormat
                                    thousandSeparator={true}
                                    thousandsGroupStyle="lakh"
                                    displayType="text"
                                    prefix="₹ "
                                    value={result.total_ots_donation}
                                  />
                                }
                                style={{ fontSize: "16px" }}
                                color="primary"
                              />
                            </Stack>
                            <IconButton color="default">
                              <p>{result.ots_receipts_count}</p>
                            </IconButton>
                          </ListItem>

                          <ListItem className="!px-0 !py-0 !flex !justify-between items-center">
                            <p className="mb-0 content-title w-[20px] mr-6">
                              Membership
                            </p>
                            <Stack alignItems="center">
                              <Chip
                                label={
                                  <NumericFormat
                                    thousandSeparator={true}
                                    thousandsGroupStyle="lakh"
                                    displayType="text"
                                    prefix="₹ "
                                    value={result.total_membership_donation}
                                  />
                                }
                                style={{
                                  fontSize: "16px",
                                  background: "#FFB70F",
                                  color: "white",
                                }}
                                color="primary"
                                className="px-4"
                              />
                            </Stack>
                            <IconButton color="default">
                              <p>{result.mem_receipts_count}</p>
                            </IconButton>
                          </ListItem>

                          <ListItem className="!px-0 !py-0 !flex !justify-between items-center">
                            <p className="mb-0 content-title w-[20px] mr-6">
                              General
                            </p>
                            <Stack alignItems="center">
                              <Chip
                                label={
                                  <NumericFormat
                                    thousandSeparator={true}
                                    thousandsGroupStyle="lakh"
                                    displayType="text"
                                    prefix="₹ "
                                    value={result.total_general_donation}
                                  />
                                }
                                style={{
                                  fontSize: "16px",
                                  background: "#4d7d79",
                                  color: "white",
                                }}
                                className="px-4"
                              />
                            </Stack>
                            <IconButton color="default">
                              <p>{result.gen_receipts_count}</p>
                            </IconButton>
                          </ListItem>
                        </List>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
            {fullCloseDonation1 && (
              <div className="w-full mt-2">
                <div className=" bg-white p-2 rounded-sm border-b-2">
                  <div className="flex justify-between border-b-2 p-3">
                    <div className="content-center">
                      <h1>Last 30 Days Donation Details</h1>
                    </div>
                    <div className="flex gap-3">
                      <div>
                        <HiMiniMinus
                          className="text-2xl cursor-pointer"
                          onClick={() => setCloseDonation1(!closeDonation1)}
                        />
                      </div>
                      <div>
                        <MdCancel
                          className="text-2xl cursor-pointer"
                          onClick={() => setFullCloseDonation1(false)}
                        />
                      </div>
                    </div>
                  </div>
                  {loadingProducts ? (
                    <Loader />
                  ) : (
                    closeDonation1 && (
                      <div className="!p-0 w-full">
                        <List className="list-none p-0">
                          <ListItem className="!px-0 !py-1 !flex !justify-between items-center">
                            <p className="mb-0 content-title w-[20px] mr-6">
                              OTS
                            </p>
                            <Stack alignItems="center">
                              <Chip
                                label={
                                  <NumericFormat
                                    thousandSeparator={true}
                                    thousandsGroupStyle="lakh"
                                    displayType="text"
                                    prefix="₹ "
                                    value={result.thirty_ots}
                                  />
                                }
                                style={{ fontSize: "16px" }}
                                color="primary"
                              />
                            </Stack>
                          </ListItem>

                          <ListItem className="!px-0 !py-1 !flex !justify-between items-center">
                            <p className="mb-0 content-title w-[20px] mr-6">
                              Membership
                            </p>
                            <Stack alignItems="center">
                              <Chip
                                label={
                                  <NumericFormat
                                    thousandSeparator={true}
                                    thousandsGroupStyle="lakh"
                                    displayType="text"
                                    prefix="₹ "
                                    value={result.thirty_mem}
                                  />
                                }
                                style={{
                                  fontSize: "16px",
                                  background: "#FFB70F",
                                  color: "white",
                                }}
                                color="primary"
                                className="px-4"
                              />
                            </Stack>
                          </ListItem>

                          <ListItem className="!px-0 !py-1 !flex !justify-between items-center">
                            <p className="mb-0 content-title w-[20px] mr-6">
                              General
                            </p>
                            <Stack alignItems="center">
                              <Chip
                                label={
                                  <NumericFormat
                                    thousandSeparator={true}
                                    thousandsGroupStyle="lakh"
                                    displayType="text"
                                    prefix="₹ "
                                    value={result.thirty_gen}
                                  />
                                }
                                style={{
                                  fontSize: "16px",
                                  background: "#4d7d79",
                                  color: "white",
                                }}
                                className="px-4 bg-[#4d7d79] text-white"
                              />
                            </Stack>
                          </ListItem>
                        </List>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
          <div className="md:grid md:grid-cols-3 grid-cols-1 mt-5 gap-3 w-full ">
          {fullCloseReceipts && (
            <div className="col-span-2 h-[200px] mt-8">
              <div className=" bg-white p-4 rounded-sm border-b-2">
                <div className="flex justify-between">
                  <div className="content-center">
                    <h1>Receipts</h1>
                  </div>
                  <div className="flex gap-3">
                    <div>
                      <HiMiniMinus
                        className="text-2xl cursor-pointer"
                        onClick={() => setCloseReceipts(!closeReceipts)}
                      />
                    </div>
                    {/* <div>
                    <TfiReload
                      className="text-xl cursor-pointer"
                      onClick={handleReload}
                    />
                  </div> */}
                    <div>
                      <MdCancel
                        className="text-2xl cursor-pointer"
                        onClick={() => setFullCloseReceipts(false)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                {loadingProducts ? (
                  <Loader />
                ) : (
                  closeReceipts && (
                    <div className="relative w-full overflow-auto bg-white ">
                      <div className="flex transition-transform duration-500">
                        <div className="min-w-full  p-4">
                          {graphData && <Bar data={graphData} />}
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
          {fullCloseReceipts1 && (
            <div className="h-[200px] mt-8">
              <div className=" bg-white p-4 rounded-sm border-b-2">
                <div className="flex justify-between">
                  <div className="content-center">
                    <h1>Receipts Total Count</h1>
                  </div>
                  <div className="flex gap-3">
                    <div>
                      <HiMiniMinus
                        className="text-2xl cursor-pointer"
                        onClick={() => setCloseReceipts1(!closeReceipts1)}
                      />
                    </div>
                    {/* <div>
                    <TfiReload
                      className="text-xl cursor-pointer"
                      // onClick={handleReload}
                    />
                  </div> */}
                    <div>
                      <MdCancel
                        className="text-2xl cursor-pointer"
                        onClick={() => setFullCloseReceipts1(false)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                {loadingProducts ? (
                  <Loader />
                ) : (
                  closeReceipts1 && (
                    <div className="relative w-full overflow-hidden bg-white ">
                      <div className="flex transition-transform duration-500">
                        <div className="min-w-full h-[350px] p-4">
                          {graphData && <Doughnut data={graphData} />}
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
          </div>
        <AddNotice
          open={showmodalNotice}
          onClick={closegroupNoticeModal}
          populateNotice={populateNotice}
        />
      </div>
    </Layout>
  );
};

export default Home;
