import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";
import { Input } from "@material-tailwind/react";
import moment from "moment";
import BASE_URL from "../../base/BaseUrl";
import Layout from "../../layout/Layout";
// import ReactToPrint from "react-to-print";

const ViewReceipt2 = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [viewerId, setID] = useState(0);
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  console.log(contact, email);
  const [viewerChapterIds, setViewerChapterIds] = useState([]);
  const [schoolIds, setSchoolIds] = useState("");
  const [chapters, setChapters] = useState([]);
  const [currentViewerChapterIds, setCurrentViewerChapterIds] = useState([]);

  const [states, setStates] = useState([]);

  const [receipts, setReceipts] = useState({});
  const [chapter, setChapter] = useState({});
  const [authsign, setSign] = useState({});

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("id");
    if (!isLoggedIn) {
      navigate("/");
      return;
    }
  }, []);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/fetch-receipt-by-id/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setReceipts(res.data.receipt);
        setSign(res.data.auth_sign);
        setChapter(res.data.chapter);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/fetch-states`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setStates(res.data?.states);
      });
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setIsButtonDisabled(true);
    const formData = {
      id: viewerId,
      chapter_ids_comma_separated: schoolIds,
    };
    try {
      const response = await axios.post(
        `${BASE_URL}/api/update-school`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.code == 200) {
        toast.success("Data Updated Sucessfully");
        navigate("/chapters");
      } else {
        if (response.data.code == 401) {
          toast.error("Data Duplicate Entry");
        } else if (response.data.code == 402) {
          toast.error("Data Duplicate Entry");
        } else {
          toast.error("An unknown error occurred");
        }
      }
    } catch (error) {
      console.error("Error updating Data:", error);
      toast.error("Error  updating Data");
    } finally {
      setIsButtonDisabled(false);
    }
  };

  return (
    <Layout>
      <div>
        {/* Title */}
        <div className="flex mb-4 mt-6">
          <Link to="/chapters">
            <MdKeyboardBackspace className=" text-white bg-[#464D69] p-1 w-10 h-8 cursor-pointer rounded-2xl" />
          </Link>
          <h1 className="text-2xl text-[#464D69] font-semibold ml-2 content-center">
            Receipt
          </h1>
        </div>
        <div className=" flex justify-center">
          <div className="p-6 mt-5 bg-white shadow-md rounded-lg w-[70%]">
            {/* <div 
                style={{
                  display:
                    localStorage.getItem("user_type_id") == 4
                    ? "none" : "",
                }}
                className="invoice-head text-right">
                <ul className="list-inline">
                  <li>
                    <ReactToPrint
                      trigger={() => (
                        <a>
                          <i className="mr-10 ti-printer"></i> Print Letter
                        </a>
                      )}
                      content={() => componentRef.current}
                    />
                  </li>
                </ul>
              </div>  */}
            <div
              className="p-10"
              // ref={componentRef}
              style={{ margin: "5px" }}
            >
              <div
                className="flex justify-between"
                style={{
                  marginTop: "3.5cm",
                  // marginLeft: "2cm",
                  // marginRight: "2cm",
                  fontSize: "21px",
                }}
              >
                <div className="text-[#464D69]">
                  <label className="!my-4">
                    Date: {moment(receipts.receipt_date).format("DD-MM-YYYY")}
                  </label>

                  {Object.keys(receipts).length !== 0 && (
                    <div className="mt-2 ">
                      {receipts.receipt_donation_type !== "Membership" &&
                        receipts.individual_company.indicomp_type !==
                          "Individual" && (
                          <p className="mb-0 text-xl">
                            {receipts.individual_company.title}{" "}
                            {
                              receipts.individual_company
                                .indicomp_com_contact_name
                            }
                          </p>
                        )}

                      {receipts.individual_company.indicomp_type !==
                        "Individual" && (
                        <p className="mb-0 text-xl">
                          M/s {receipts.individual_company.indicomp_full_name}
                        </p>
                      )}

                      {receipts.individual_company.indicomp_type ===
                        "Individual" && (
                        <p className="mb-0 text-xl">
                          {receipts.individual_company.title}{" "}
                          {receipts.individual_company.indicomp_full_name}
                        </p>
                      )}

                      {receipts.individual_company
                        .indicomp_off_branch_address && (
                        <div>
                          <p className="mb-0 text-xl">
                            {
                              receipts.individual_company
                                .indicomp_off_branch_address
                            }
                          </p>
                          <p className="mb-0 text-xl">
                            {
                              receipts.individual_company
                                .indicomp_off_branch_area
                            }
                          </p>
                          <p className="mb-0 text-xl">
                            {
                              receipts.individual_company
                                .indicomp_off_branch_ladmark
                            }
                          </p>
                          <p className="mb-0 text-xl">
                            {
                              receipts.individual_company
                                .indicomp_off_branch_city
                            }{" "}
                            -{" "}
                            {
                              receipts.individual_company
                                .indicomp_off_branch_pin_code
                            }
                            ,
                            {
                              receipts.individual_company
                                .indicomp_off_branch_state
                            }
                          </p>
                        </div>
                      )}

                      {receipts.individual_company.indicomp_res_reg_address && (
                        <div>
                          <p className="mb-0 text-xl">
                            {
                              receipts.individual_company
                                .indicomp_res_reg_address
                            }
                          </p>
                          <p className="mb-0 text-xl">
                            {receipts.individual_company.indicomp_res_reg_area}
                          </p>
                          <p className="mb-0 text-xl">
                            {
                              receipts.individual_company
                                .indicomp_res_reg_ladmark
                            }
                          </p>
                          <p className="mb-0 text-xl">
                            {receipts.individual_company.indicomp_res_reg_city}{" "}
                            -{" "}
                            {
                              receipts.individual_company
                                .indicomp_res_reg_pin_code
                            }
                            ,
                            {receipts.individual_company.indicomp_res_reg_state}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  <label className="block mt-2">
                    {receipts.individual_company?.indicomp_gender ===
                      "Female" && "Respected Madam,"}
                    {receipts.individual_company?.indicomp_gender === "Male" &&
                      "Respected Sir,"}
                    {receipts.individual_company?.indicomp_gender === null &&
                      "Respected Sir,"}
                  </label>

                  {receipts.receipt_donation_type === "One Teacher School" && (
                    <div className="mt-3">
                      <label className="block my-2 text-center">
                        Sub: Adoption of One Teacher School
                      </label>
                      <label className="block my-2 text-justify leading-snug">
                        We acknowledge with thanks the receipt of Rs.
                        {receipts.receipt_total_amount}/- Rupees {amountInWords}{" "}
                        Only via{" "}
                        {receipts.receipt_tran_pay_mode === "Cash"
                          ? "Cash"
                          : receipts.receipt_tran_pay_details}
                        for your contribution and adoption of{" "}
                        {receipts.receipt_no_of_ots} OTS.
                      </label>
                    </div>
                  )}

                  {receipts.receipt_donation_type === "General" && (
                    <div className="mt-2">
                      <label className="block my-2 text-justify leading-snug">
                        We thankfully acknowledge the receipt of Rs.
                        {receipts.receipt_total_amount}/- via your{" "}
                        {receipts.receipt_tran_pay_mode === "Cash"
                          ? "Cash"
                          : receipts.receipt_tran_pay_details}{" "}
                        being Donation for Education.
                      </label>
                    </div>
                  )}

                  {receipts.receipt_donation_type === "Membership" && (
                    <div>
                      <label className="block my-2 text-justify leading-snug">
                        We acknowledge with thanks receipt of your membership
                        subscription for the Year. Our receipt for the same is
                        enclosed herewith.
                      </label>
                    </div>
                  )}

                  {receipts.receipt_donation_type !== "Membership" && (
                    <div>
                      <label className="block">Thanking you once again</label>
                      <label className="block">Yours faithfully,</label>
                      <label className="block">
                        For Friends of Tribal Society
                      </label>
                      <br />
                      <label className="block">
                        {authsign.length > 0 &&
                          authsign.map((sig, key) => (
                            <span key={key}>{sig.indicomp_full_name}</span>
                          ))}
                      </label>
                      <label className="block">{chapter.auth_sign}</label>
                      <label className="block mb-5">
                        Encl: As stated above
                      </label>
                    </div>
                  )}

                  {receipts.receipt_donation_type === "Membership" && (
                    <div>
                      <label className="block">With Best regards</label>
                      <label className="block">Yours sincerely</label>
                      <br />
                      <label className="block">
                        {authsign.length > 0 &&
                          authsign.map((sig, key) => (
                            <span key={key}>{sig.indicomp_full_name}</span>
                          ))}
                      </label>
                      <label className="block">{chapter.auth_sign}</label>
                      <label className="block mb-5">
                        Encl: As stated above
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ViewReceipt2;
