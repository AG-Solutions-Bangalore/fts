import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import BASE_URL from "../../base/BaseUrl";
import axios from "axios";
import { HiMiniMinus } from "react-icons/hi2";
import { TfiReload } from "react-icons/tfi";
import { MdCancel } from "react-icons/md";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import CountUp from "react-countup";

const Home = () => {
  const dateyear = ["2023-24"];

  const [referral, setReferral] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [products, setProducts] = useState(null);
  const [showTable, setShowTable] = useState(true);
  const [fullClose, setFullClose] = useState(true);
  const [loadingRecentOrders, setLoadingRecentOrders] = useState(false); // Loading state for orders
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  return (
    <Layout>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-5">
          <div>
            <div className="bg-[#5e7081] text-white p-4 shadow-[0_4px_10px_rgba(0,0,0,0.25)] rounded-md text-center min-h-[150px] flex flex-col items-center justify-center">
              <h3 className="text-xl font-bold">Direct Referral</h3>
              <p className="text-5xl font-bold">
                <CountUp start={0} end={55} />
              </p>
            </div>
          </div>
          <div>
            <div className="bg-blue-500 text-white p-4 shadow-[0_4px_10px_rgba(0,0,0,0.25)] rounded-md text-center min-h-[150px] flex flex-col items-center justify-center">
              <h3 className="text-xl font-bold">Second Referral</h3>
              <p className="text-5xl font-bold">
                <CountUp start={0} end={44} />
              </p>
            </div>
          </div>
          <div>
            <div className="bg-green-500 text-white p-4 shadow-[0_4px_10px_rgba(0,0,0,0.25)] rounded-md text-center min-h-[150px] flex flex-col items-center justify-center">
              <h3 className="text-xl font-bold">Total Wallet</h3>
              <p className="text-5xl font-bold">
                <CountUp start={0} end={33} />
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
