import { Route, Routes } from "react-router-dom";
import Home from "./pages/dashboard/Home";
import SignIn from "./pages/auth/SignIn";
import SIgnUp from "./pages/auth/SIgnUp";
import Maintenance from "./pages/maintenance/Maintenance";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgetPassword from "./pages/auth/ForgetPassword";
import Form from "./pages/dashboard/Form";
import Profile from "./pages/profile/Profile";
import ChangePassword from "./pages/profile/ChangePassword";
import DirectReferral from "./pages/referral/DirectReferral";
import SecondaryReferral from "./pages/referral/SecondReferral";
import Wallet from "./pages/wallet/wallet";
// import Download from "./pages/download/download";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ChaptersList from "./pages/master/chapters/ChaptersList";
import AddChapter from "./pages/master/chapters/AddChapter";
import EditChapter from "./pages/master/chapters/EditChapter";
import ViewChapter from "./pages/master/chapters/ViewChapter";
import ViewSchool from "./pages/master/chapters/AddSchool";
import Addchool from "./pages/master/chapters/AddSchool";
import EditDataSource from "./pages/master/chapters/EditDataSource";
import AddSchool from "./pages/master/chapters/AddSchool";
import StatesList from "./pages/master/states/StatesList";
import DesignationList from "./pages/master/designation/DesignationList";
import ExpensiveTypeList from "./pages/master/expensivetype/ExpensiveTypeList";
import FAQList from "./pages/master/FAQ/FAQList";
import ReceiptsList from "./pages/receipts/ReceiptsList";
import ViewReceipt from "./pages/receipts/ViewReceipt2";
import CreateReceipt from "./pages/receipts/CreateReceipt";
import EditReceipt from "./pages/receipts/EditReceipt";
import ViewReceipt2 from "./pages/receipts/ViewReceipt2";
import DonorSummary from "./pages/Reports/DonorSummary/DonorSummary";
import PromterSummary from "./pages/Reports/PromoterSummary/PromoterSummary";
import SuspenseSummary from "./pages/Reports/SuspenseSummary/SuspenseSummary";
import PaymentView from "./pages/Reports/PayementSummary/PaymentView";
import PromoterSummaryView from "./pages/Reports/PromoterSummary/PromoterSummaryView";
import RecepitSummary from "./pages/Reports/RecepitSummary/RecepitSummary";
import RecepitSummaryView from "./pages/Reports/RecepitSummary/RecepitSummaryView";
import ReceiptAllView from "./pages/Reports/10DBDocument/10BDView/RecepitAllView";
import NopanView from "./pages/Reports/10DBDocument/10BDView/NopanView";
import GroupView from "./pages/Reports/10DBDocument/10BDView/GroupView";
import DonorSummaryView from "./pages/Reports/DonorSummary/DonorView";
import DonorGroupView from "./pages/Reports/DonorSummary/DonorGroupView";
import SchoolSummary from "./pages/Reports/SchoolSummary.jsx/SchoolSummary";
import RecepitDocument from "./pages/Reports/10DBDocument/RecepitDocument";
import PaymentSummary from "./pages/Reports/PayementSummary/PaymentSummary";
import DonationSummary from "./pages/Reports/DonationSummary.jsx/DonationSummary";
import Donor from "./pages/Dowloads/Donor/Donor";
import DowloadRecpit from "./pages/Dowloads/Receipt/DowloadReceipt";
import DownloadSchool from "./pages/Dowloads/School/DownloadSchool";
import Downloadots from "./pages/Dowloads/OTS/Downloadots";
import Team from "./pages/Dowloads/Team/Team";
import AllRecepits from "./pages/Dowloads/AllRecepits/AllRecepits";
import DonorList from "./pages/donor/DonorList";
import AddIndivisual from "./pages/donor/AddIndivisual";
import AddCompany from "./pages/donor/AddCompany";
import MemberList from "./pages/member/MemberList";
import DonorView from "./pages/donor/DonorView";
import ReceiptDetails from "./pages/donor/ReceiptDetails";
import ReciptList from "./pages/donor/ReciptList";
import DonorEdit from "./pages/donor/DonorEdit";
import ReceiptView from "./pages/donor/ReceiptView";
import DonationSummarys from "./pages/Reports/DonationSummary.jsx/DonationSummaryView";
import Faq from "./pages/Others/faq";
import OthersTeam from "./pages/Others/OtherTeam/OthersTeam";
import Addimage from "./pages/Others/Addimage";
import Notification from "./pages/Others/Notification/Notification";
//NEW CODE HER AFTER BY MOORTHY

const App = () => {
  return (
    <>
      <ToastContainer />

      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/register" element={<SIgnUp />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/maintenance" element={<Maintenance />} />
        {/*  Chapters  */}
        <Route
          path="/chapters"
          element={<ProtectedRoute element={<ChaptersList />} />}
        />
        <Route
          path="/add-chapter"
          element={<ProtectedRoute element={<AddChapter />} />}
        />
        <Route
          path="/edit-chapter/:id"
          element={<ProtectedRoute element={<EditChapter />} />}
        />
        <Route
          path="/view-chapter/:id"
          element={<ProtectedRoute element={<ViewChapter />} />}
        />
        <Route
          path="/view-school/:id"
          element={<ProtectedRoute element={<AddSchool />} />}
        />
        <Route
          path="/edit-datasource/:id"
          element={<ProtectedRoute element={<EditDataSource />} />}
        />
        {/* States  */}
        <Route
          path="/states"
          element={<ProtectedRoute element={<StatesList />} />}
        />
        {/* Designation  */}
        <Route
          path="/designation"
          element={<ProtectedRoute element={<DesignationList />} />}
        />
        {/* Expensive Type  */}
        <Route
          path="/expensive-type"
          element={<ProtectedRoute element={<ExpensiveTypeList />} />}
        />
        {/* FAQ  */}
        <Route
          path="/faqList"
          element={<ProtectedRoute element={<FAQList />} />}
        />
        {/* FAQ  */}
        <Route
          path="/receipts"
          element={<ProtectedRoute element={<ReceiptsList />} />}
        />
        <Route
          path="/view-receipts/:id"
          element={<ProtectedRoute element={<ViewReceipt2 />} />}
        />
        <Route
          path="/create-receipts/:id"
          element={<ProtectedRoute element={<CreateReceipt />} />}
        />
        <Route
          path="/edit-receipts/:id"
          element={<ProtectedRoute element={<EditReceipt />} />}
        />
        {/* Reports  */}
        <Route path="/report/donorsummary" element={<DonorSummary />} />
        <Route path="/report/promoter" element={<PromterSummary />} />
        <Route path="/report/suspense" element={<SuspenseSummary />} />
        <Route path="/report/payment-view" element={<PaymentView />} />
        <Route path="/d-summary-view" element={<PromoterSummaryView />} />
        <Route path="/report/recepit" element={<RecepitSummary />} />
        <Route path="/recepit-summary-view" element={<RecepitSummaryView />} />
        <Route path="/recepit-otg-view" element={<ReceiptAllView />} />
        <Route path="/recepit-nopan-view" element={<NopanView />} />
        <Route path="/recepit-group-view" element={<GroupView />} />
        <Route path="/recepit-donation-view" element={<DonationSummarys />} />
        <Route path="/report/donor-view" element={<DonorSummaryView />} />
        <Route path="/report/donorgroup-view" element={<DonorGroupView />} />
        <Route path="/report/donation" element={<DonationSummary />} />
        <Route path="/report/school" element={<SchoolSummary />} />
        <Route path="/report/otg" element={<RecepitDocument />} />
        <Route path="/report/payment" element={<PaymentSummary />} />
        {/* //DOWNOLd// */}
        {/* Download  START */}
        <Route
          path="/download/donor"
          element={<ProtectedRoute element={<Donor />} />}
        />
        <Route
          path="/download/receipts"
          element={<ProtectedRoute element={<DowloadRecpit />} />}
        />
        <Route
          path="/download/school"
          element={<ProtectedRoute element={<DownloadSchool />} />}
        />
        <Route
          path="/download/ots"
          element={<ProtectedRoute element={<Downloadots />} />}
        />
        <Route
          path="/download/team"
          element={<ProtectedRoute element={<Team />} />}
        />
        <Route
          path="/download/allreceipts"
          element={<ProtectedRoute element={<AllRecepits />} />}
        />
        {/* Donor  */}
        <Route path="/donor-list" element={<DonorList />} />
        <Route path="/add-indivisual/:id" element={<AddIndivisual />} />
        <Route path="/add-indivisual" element={<AddIndivisual />} />
        <Route path="/add-company" element={<AddCompany />} />
        <Route path="/add-company/:id" element={<AddCompany />} />
        <Route path="/member-list" element={<MemberList />} />
        <Route path="/donor-view/:id" element={<DonorView />} />
        <Route path="/receipt-details/:id" element={<ReceiptDetails />} />
        <Route path="/receipt-list/:id" element={<ReciptList />} />
        <Route path="/donor-edit/:id" element={<DonorEdit />} />
        <Route path="/receipt-view/:id" element={<ReceiptView />} />
        {/* //others */}
        <Route path="/others-faq" element={<Faq />} />
        <Route path="/others-team" element={<OthersTeam />} />
        
        <Route path="/others-team-add" element={<Addimage />} />
        <Route path="/others-notification" element={<Notification />} />

        
        <Route path="/form" element={<ProtectedRoute element={<Form />} />} />
        <Route
          path="/profile"
          element={<ProtectedRoute element={<Profile />} />}
        />
        <Route
          path="/change-password"
          element={<ProtectedRoute element={<ChangePassword />} />}
        />
      </Routes>
    </>
  );
};

export default App;
