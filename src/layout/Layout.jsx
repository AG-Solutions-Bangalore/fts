// import { useState } from "react";
// import Footer from "../components/Footer";
// import DashboardNavbar from "../components/DashboardNavbar";
// import SideNav from "../components/SideNav";

// const Layout = ({ children }) => {
//   const [openSideNav, setOpenSideNav] = useState(false);
//   return (
//     <div className="min-h-screen bg-blue-gray-50/50">
//       <SideNav openSideNav={openSideNav} setOpenSideNav={setOpenSideNav} />
//       <div className="p-4 xl:ml-80">
//         <DashboardNavbar
//           openSideNav={openSideNav}
//           setOpenSideNav={setOpenSideNav}
//         />
//         {children}
//         <div className="text-blue-gray-600">
//           <Footer />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Layout;

import React, { useState } from "react";
import { Box, CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import SideNav from "../components/SideNav";
import DashboardNavbar from "../components/DashboardNavbar";


const Layout = ({children}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleLeftDrawerToggle = () => {
    setIsCollapsed((prev) => !prev);
    setOpenDrawer((prev) => !prev);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflowX: "hidden",
        overflowY: "auto",
      }}
    >
      <CssBaseline />
   <DashboardNavbar handleLeftDrawerToggle={handleLeftDrawerToggle}/>
      <Box
        sx={{
          display: "flex",
          flex: 1,
        }}
      >
        <SideNav
          isCollapsed={isCollapsed}
          handleDrawerToggle={handleLeftDrawerToggle}
          openDrawer={openDrawer}
        />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 2,
            transition: "margin-left 0.3s ease",
            width: `calc(100% - ${isCollapsed ? "60px" : "260px"})`,
          }}
           className="mt-20 bg-[#f8f9fa]"
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;

