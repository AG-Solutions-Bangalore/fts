import Layout from "../../layout/Layout";
import React, { useState, useEffect } from "react";
import { Button, Card, Spinner } from "@material-tailwind/react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BASE_URL from "../../base/BaseUrl";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

function Icon({ id, open }) {
  return (
    <div
      className={`h-5 w-5 transition-transform ${
        id === open ? "rotate-180" : ""
      }`}
    >
      {id === open ? <FaChevronUp /> : <FaChevronDown />}
    </div>
  );
}

const NewListChapter = () => {
  const [loader, setLoader] = useState(true);
  const [faqsData, setFaqsData] = useState([]);
  const [open, setOpen] = useState(0);

  const getData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/fetch-faqs`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setFaqsData(res.data.faqs);
      setLoader(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoader(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDownload = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/api/download-faq`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "faq_summary.csv");
      document.body.appendChild(link);
      link.click();
      toast.success("FAQ is Downloaded Successfully");
    } catch (error) {
      toast.error("FAQ is Not Downloaded");
      console.error("Download error:", error);
    }
  };

  const handleOpen = (value) => setOpen(open === value ? null : value);

  return (
    <Layout>
      <div className="faq-page-wrapper">
        <form id="dowRecp" autoComplete="off">
          <div className="flex justify-end mt-5 mr-5">
            <Button color="blue" onClick={handleDownload}>
              Download
            </Button>
          </div>
        </form>
        {loader ? (
          <div className="flex justify-center mt-5">
            <Spinner color="blue" />
          </div>
        ) : (
          faqsData.map((faq, key) => (
            <Card className="mt-4">
              <Accordion
                key={key}
                open={open === key}
                icon={<Icon id={key} open={open} />}
                className="mb-5 p-4"
              >
                <AccordionHeader
                  onClick={() => handleOpen(key)}
                  className="text-blue-500"
                >
                  {faq.header}
                </AccordionHeader>
                <AccordionBody>{faq.text}</AccordionBody>
              </Accordion>
            </Card>
          ))
        )}
      </div>
    </Layout>
  );
};

export default NewListChapter;
