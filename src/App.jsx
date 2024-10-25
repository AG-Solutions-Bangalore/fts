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
import Download from "./pages/download/download";
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
          path="/create-receipts"
          element={<ProtectedRoute element={<CreateReceipt />} />}
        />
        <Route
          path="/edit-receipts/:id"
          element={<ProtectedRoute element={<EditReceipt />} />}
        />
        {/* //WALLET */}
        <Route
          path="/wallet"
          element={<ProtectedRoute element={<Wallet />} />}
        />
        {/* //DOENLOAD */}
        <Route
          path="/download"
          element={<ProtectedRoute element={<Download />} />}
        />

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
