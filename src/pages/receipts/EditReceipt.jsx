import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";
import { Input } from "@material-tailwind/react";
import moment from "moment";
import BASE_URL from "../../base/BaseUrl";
import Layout from "../../layout/Layout";
import Fields from "../../common/TextField/TextField";

const pay_mode = [
  {
    value: "Cash",
    label: "Cash",
  },
  {
    value: "Cheque",
    label: "Cheque",
  },
  {
    value: "Transfer",
    label: "Transfer",
  },
  {
    value: "Others",
    label: "Others",
  },
];

const pay_mode_2 = [
  {
    value: "Cheque",
    label: "Cheque",
  },
  {
    value: "Transfer",
    label: "Transfer",
  },
  {
    value: "Others",
    label: "Others",
  },
];
const donation_type = [
  {
    value: "One Teacher School",
    label: "One Teacher School",
  },
  {
    value: "General",
    label: "General",
  },
  {
    value: "Membership",
    label: "Membership",
  },
];
const donation_type_2 = [
  {
    value: "One Teacher School",
    label: "One Teacher School",
  },
  {
    value: "General",
    label: "General",
  },
];

const member_date = [
  {
    value: "2022",
    label: "2022",
  },
  {
    value: "2023",
    label: "2023",
  },
  {
    value: "2024",
    label: "2024",
  },
  {
    value: "2025",
    label: "2025",
  },
  {
    value: "2026",
    label: "2026",
  },
];

const school_year = [
  {
    value: "2020-21",
    label: "2020-21",
  },
  {
    value: "2021-22",
    label: "2021-22",
  },
  {
    value: "2022-23",
    label: "2022-23",
  },
  {
    value: "2023-24",
    label: "2023-24",
  },
  {
    value: "2024-25",
    label: "2024-25",
  },
  {
    value: "2025-26",
    label: "2025-26",
  },
];

const EditReceipt = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [userdata, setUserdata] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [loader, setLoader] = useState(true);
  const [donor, setDonor] = useState({
    receipt_date: "",
    receipt_old_no: "",
    schoolalot_year: "",
    receipt_exemption_type: "",
    receipt_total_amount: "",
    receipt_realization_date: "",
    receipt_donation_type: "",
    receipt_tran_pay_mode: "",
    receipt_tran_pay_details: "",
    receipt_remarks: "",
    receipt_reason: "",
    receipt_email_count: "",
    receipt_created_at: "",
    receipt_created_by: "",
    receipt_update_at: "",
    receipt_update_by: "",
    donor_promoter: "",
    donor_source: "",
    individual_company: {
      indicomp_full_name: "",
      indicomp_pan_no: "",
      indicomp_fts_id: "",
      m_ship_vailidity: "",
      receipt_no_of_ots: "",
    },
  });

  const [states, setStates] = useState([]);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("id");
    if (!isLoggedIn) {
      navigate("/");
      return;
    }
  }, []);

  const validateOnlyDigits = (inputtxt) => /^\d*$/.test(inputtxt); // Simplified validation

  const onInputChange = (e) => {
    const { name, value } = e.target;
    const digitFields = ["receipt_no_of_ots", "receipt_total_amount"];

    if (digitFields.includes(name)) {
      if (validateOnlyDigits(value)) {
        setDonor((prevChapter) => ({
          ...prevChapter,
          [name]: value,
        }));
      }
    } else {
      setDonor((prevChapter) => ({
        ...prevChapter,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/fetch-donor-by-id/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setUserdata(res.data.individualCompany);
        setLoader(false);
      });
  }, []);
  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/fetch-receipt-by-id/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setDonor(res.data.receipt);
        setLoader(false);
      });
  }, []);

  const [datasource, setDatasource] = useState([]);
  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/fetch-datasource`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setDatasource(res.data.datasource);
      });
  }, []);

  const pan = userdata.indicomp_pan_no == "" ? "NA" : userdata.indicomp_pan_no;

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setIsButtonDisabled(true);
    const formData = {
      schoolalot_year: donor.schoolalot_year,
      receipt_total_amount: donor.receipt_total_amount,
      receipt_realization_date: donor.receipt_realization_date,
      receipt_donation_type: donor.receipt_donation_type,
      receipt_tran_pay_mode: donor.receipt_tran_pay_mode,
      receipt_tran_pay_details: donor.receipt_tran_pay_details,
      receipt_remarks: donor.receipt_remarks,
      receipt_reason: donor.receipt_reason,
      receipt_update_at: donor.receipt_update_at,
      m_ship_vailidity: donor.m_ship_vailidity,
      receipt_no_of_ots: donor.receipt_no_of_ots,
      donor_promoter: donor.donor_promoter,
      donor_source: donor.donor_source,
    };
    try {
      const response = await axios.put(
        `${BASE_URL}/api/update-receipt/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status == '200') {
        toast.success("Receipt Updated Successfully");
        navigate("/receipts");
      } else {
        if (response.status == '401') {
          toast.error("Receipt Duplicate Entry");
        } else if (response.status == '402') {
          toast.error("Receipt Duplicate Entry");
        } else {
          toast.error("An unknown error occurred");
        }
      }
    } catch (error) {
      console.error("Error updating Receipt:", error);
      toast.error("Error  updating Receipt");
    } finally {
      setIsButtonDisabled(false);
    }
  };

  return (
    <Layout>
      <div>
        {/* Title */}
        <div className="flex mb-4 mt-6">
          <h1 className="text-2xl text-[#464D69] font-semibold ml-2 content-center">
           Edit Receipt
          </h1>
        </div>
        <div className="p-6 mt-5 bg-white shadow-md rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-3">
            <div>
              <label className="block text-gray-700 ">Name</label>
              <span className="mt-1 text-black">
                {donor.individual_company.indicomp_full_name}
              </span>
            </div>
            <div>
              <label className="block text-gray-700 ">FTS Id</label>
              <span className="mt-1 text-black">
                {donor.individual_company.indicomp_fts_id}
              </span>
            </div>
            <div>
              <label className="block text-gray-700 ">Pan No</label>
              <span className="mt-1 text-black">{pan} </span>
            </div>
            <div>
              <label className="block text-gray-700 ">Receipt Date</label>
              <span className="mt-1 text-black">
                {moment(donor.receipt_date).format("DD-MM-YYYY")}{" "}
              </span>
            </div>
            <div>
              <label className="block text-gray-700 ">Year</label>
              <span className="mt-1 text-black">
                {donor.receipt_financial_year}{" "}
              </span>
            </div>
            <div>
              <label className="block text-gray-700 ">Receipt Ref </label>
              <span className="mt-1 text-black">{donor.receipt_ref_no} </span>
            </div>
            <div>
              <label className="block text-gray-700 ">Exemption Type</label>
              <span className="mt-1 text-black">
                {donor.receipt_exemption_type}{" "}
              </span>
            </div>
            <div>
              {donor.receipt_total_amount > 2000 &&
              donor.receipt_exemption_type == "80G" &&
              pan == "NA" ? (
                <span className="amounterror">
                  Max amount allowedwithout Pan card is 2000
                </span>
              ) : (
                ""
              )}
            </div>
          </div>
          <form onSubmit={onSubmit} autoComplete="off">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 mt-1">
              <div className="form-group ">
                <Input
                  required
                  type="text"
                  maxLength={8}
                  label="Total Amount"
                  autoComplete="Name"
                  name="receipt_total_amount"
                  value={donor.receipt_total_amount}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="form-group ">
                <Fields
                  required={true}
                  type="whatsappDropdown"
                  title="Transaction Type"
                  autoComplete="Name"
                  name="receipt_tran_pay_mode"
                  value={donor.receipt_tran_pay_mode}
                  onChange={(e) => onInputChange(e)}
                  options={
                    donor.receipt_exemption_type == "80G" &&
                    donor.receipt_total_amount > 2000
                      ? pay_mode_2
                      : pay_mode
                  }
                />
                <div>
                  <span className="text-gray-500 text-sm">
                    Please select your Transaction Type
                  </span>
                </div>
              </div>
              <div className="form-group ">
                <Fields
                  required={true}
                  type="whatsappDropdown"
                  title="Purpose"
                  autoComplete="Name"
                  name="receipt_donation_type"
                  value={donor.receipt_donation_type}
                  onChange={(e) => onInputChange(e)}
                  options={
                    donor.receipt_exemption_type == "80G"
                      ? donation_type_2
                      : donation_type
                  }
                />
                <div>
                  <span className="text-gray-500 text-sm">
                    Please select your Donation Type
                  </span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div className="form-group ">
                <Input
                  required
                  type="date"
                  label="Realization Date"
                  autoComplete="Name"
                  name="receipt_realization_date"
                  value={donor.receipt_realization_date}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              {donor.receipt_donation_type == "One Teacher School" ? (
                <div className="form-group ">
                  <Input
                    required
                    type="number"
                    maxLength={3}
                    label="No of Schools"
                    autoComplete="Name"
                    name="receipt_no_of_ots"
                    value={donor.receipt_no_of_ots}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              ) : (
                ""
              )}
              {donor.receipt_donation_type == "Membership" ? (
                <div className="form-group ">
                  <Fields
                    required={true}
                    type="whatsappDropdown"
                    title="Membership End Date"
                    autoComplete="Name"
                    name="m_ship_vailidity"
                    value={donor.m_ship_vailidity}
                    onChange={(e) => onInputChange(e)}
                    options={member_date}
                  />
                </div>
              ) : (
                ""
              )}
              {donor.receipt_donation_type == "General" ? (
                <div className="form-group ">
                  <Fields
                    required={true}
                    type="sourceDropdown"
                    title="Source"
                    autoComplete="Name"
                    name="donor_source"
                    value={donor.donor_source}
                    onChange={(e) => onInputChange(e)}
                    options={datasource}
                  />
                </div>
              ) : (
                ""
              )}
              <div className="form-group col-span-2">
                <Fields
                  required={true}
                  type="textField"
                  title="Transaction Pay Details"
                  autoComplete="Name"
                  name="receipt_tran_pay_details"
                  value={donor.receipt_tran_pay_details}
                  onChange={(e) => onInputChange(e)}
                />
                <div>
                  <span className="text-gray-500 text-sm">
                    Cheque No / Bank Name / UTR / Any Other Details
                  </span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              {donor.receipt_donation_type == "One Teacher School" ? (
                <div className="form-group ">
                  <Fields
                    required={true}
                    type="whatsappDropdown"
                    title="School Allottment Year"
                    autoComplete="Name"
                    name="schoolalot_year"
                    value={donor.schoolalot_year}
                    onChange={(e) => onInputChange(e)}
                    options={school_year}
                  />
                </div>
              ) : (
                ""
              )}
              <div className="form-group ">
                <Fields
                  required={true}
                  type="textField"
                  title="Remarks"
                  autoComplete="Name"
                  name="receipt_remarks"
                  value={donor.receipt_remarks}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="form-group col-span-2">
                <Fields
                  required={true}
                  type="textField"
                  title="Reason"
                  autoComplete="Name"
                  name="receipt_reason"
                  value={donor.receipt_reason}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="mt-4 ">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                disabled={isButtonDisabled}
              >
                {isButtonDisabled ? "Updating..." : "Update"}
              </button>
              <Link to="/receipts">
                <button className="bg-green-500 text-white px-4 py-2 rounded-md">
                  Back
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default EditReceipt;
