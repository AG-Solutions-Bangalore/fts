import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Collapse,
  useTheme,
} from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { MdDashboard, MdExpandLess, MdExpandMore } from "react-icons/md";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaWallet, FaDownload } from "react-icons/fa";
import Logo from "../assets/logo.png";

const CustomListItem = ({
  isSelected,
  onClick,
  to,
  component,
  children,
  primary,
  hasSubMenu,
  isOpen,
  toggleSubMenu,
}) => {
  return (
    <>
      <Box
        onClick={onClick}
        component={component}
        to={to}
        sx={{
          display: "flex",
          alignItems: "center",
          textDecoration: "none",
          padding: "10px 20px",
          backgroundColor: isSelected ? "#eceff1" : "transparent",
          color: isSelected ? "#5e35b1" : "inherit",
          "&:hover": {
            backgroundColor: "#f5f5f5",
          },
        }}
      >
        {children}
        <Typography
          sx={{
            ml: 3,
            fontWeight: isSelected ? "bold" : "normal",
            color: isSelected ? "#5e35b1" : "#000",
          }}
        >
          {primary}
        </Typography>
        {hasSubMenu && (
          <ListItemIcon
            sx={{ ml: "auto", minWidth: 0, color: "#5e35b1" }}
            onClick={toggleSubMenu}
          >
            {isOpen ? <MdExpandLess /> : <MdExpandMore />}
          </ListItemIcon>
        )}
      </Box>
    </>
  );
};

const SideNav = ({
  isCollapsed,
  handleDrawerToggle,
  openDrawer,
  setIsCollapsed,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [openSubMenu, setOpenSubMenu] = useState(false); // For handling sub-menu open/close state
  const [openSubMenu1, setOpenSubMenu1] = useState(false); // For handling sub-menu open/close state
  const [openSubMenu2, setOpenSubMenu2] = useState(false); // For handling sub-menu open/close state
  const [openSubMenu3, setOpenSubMenu3] = useState(false); // For handling sub-menu open/close state
  const theme = useTheme();
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const isMediumScreen = useMediaQuery(
    "(min-width:600px) and (max-width:960px)"
  );

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
    if (isSmallScreen) {
      handleDrawerToggle();
    }
    // if (!isSmallScreen && isMediumScreen) {
    //   setIsCollapsed(!isCollapsed);
    // }
  };

  const handleToggleSubMenu = () => {
    setOpenSubMenu((prev) => !prev); // Toggles sub-menu open state
  };
  const handleToggleSubMenu1 = () => {
    setOpenSubMenu1((prev) => !prev); // Toggles sub-menu open state
  };
  const handleToggleSubMenu2 = () => {
    setOpenSubMenu2((prev) => !prev); // Toggles sub-menu open state
  };
  const handleToggleSubMenu3 = () => {
    setOpenSubMenu3((prev) => !prev); // Toggles sub-menu open state
  };

  return (
    <Drawer
      variant={isSmallScreen ? "temporary" : "permanent"}
      open={isSmallScreen ? openDrawer : true}
      onClose={isSmallScreen ? handleDrawerToggle : undefined}
      sx={{
        width: isSmallScreen ? 260 : isCollapsed ? 75 : 260,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: isSmallScreen ? 260 : isCollapsed ? 75 : 260,
          boxSizing: "border-box",
          overflowX: "hidden",
          marginTop: isSmallScreen ? 0 : "92px",
          border: "none",
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
          backgroundColor: "#FFFFFF",
          transition: "width 0.3s ease",
        },
        display: { xs: "block", sm: "block" },
      }}
    >
      <List sx={{ padding: "10px" }}>
        <Link to="/">
          <Box
            sx={{
              display: isSmallScreen ? "flex" : "none",
              padding: "16px",
              mb: 3,
              cursor: "pointer",
            }}
          >
            <img src={Logo} alt="Logo" className="w-[200px] h-[80px]" />
          </Box>
        </Link>

        <CustomListItem
          isSelected={selectedIndex === 0}
          onClick={() => handleListItemClick(0)}
          component={NavLink}
          to="/home"
          isCollapsed={isCollapsed}
          primary="Dashboard"
        >
          <ListItemIcon
            sx={{ minWidth: 0, justifyContent: "center", display: "flex" }}
          >
            <MdDashboard style={{ fontSize: "20px" }} />
          </ListItemIcon>
        </CustomListItem>

        {/* Master with sub-menu */}
        <CustomListItem
          isCollapsed={isCollapsed}
          primary="Master"
          hasSubMenu={true}
          isOpen={openSubMenu}
          toggleSubMenu={handleToggleSubMenu}
        >
          <ListItemIcon
            sx={{ minWidth: 0, justifyContent: "center", display: "flex" }}
          >
            <FaWallet style={{ fontSize: "20px" }} />
          </ListItemIcon>
        </CustomListItem>

        {/* Sub-menu items */}
        <Collapse in={openSubMenu} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <CustomListItem
              isSelected={selectedIndex === 21}
              onClick={() => handleListItemClick(21)}
              component={NavLink}
              to="/chapters"
              isCollapsed={isCollapsed}
              primary="Chapters"
            ></CustomListItem>
            <CustomListItem
              isSelected={selectedIndex === 22}
              onClick={() => handleListItemClick(22)}
              component={NavLink}
              to="/states"
              isCollapsed={isCollapsed}
              primary="States"
            ></CustomListItem>
            <CustomListItem
              isSelected={selectedIndex === 22}
              onClick={() => handleListItemClick(22)}
              component={NavLink}
              to="/designation"
              isCollapsed={isCollapsed}
              primary="Designation"
            ></CustomListItem>
            <CustomListItem
              isSelected={selectedIndex === 22}
              onClick={() => handleListItemClick(22)}
              component={NavLink}
              to="/expensive-type"
              isCollapsed={isCollapsed}
              primary="OTS Expensive Type"
            ></CustomListItem>
            <CustomListItem
              isSelected={selectedIndex === 22}
              onClick={() => handleListItemClick(22)}
              component={NavLink}
              to="/faqList"
              isCollapsed={isCollapsed}
              primary="FAQ"
            ></CustomListItem>
          </List>
        </Collapse>

        {/* Donor with sub-menu */}
        <CustomListItem
          isCollapsed={isCollapsed}
          primary="Donor"
          hasSubMenu={true}
          isOpen={openSubMenu3}
          toggleSubMenu={handleToggleSubMenu3}
        >
          <ListItemIcon
            sx={{ minWidth: 0, justifyContent: "center", display: "flex" }}
          >
            <FaWallet style={{ fontSize: "20px" }} />
          </ListItemIcon>
        </CustomListItem>

        {/* Sub-menu items */}
        <Collapse in={openSubMenu3} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <CustomListItem
              isSelected={selectedIndex === 21}
              onClick={() => handleListItemClick(21)}
              component={NavLink}
              to="/donor-list"
              isCollapsed={isCollapsed}
              primary="Full List"
            ></CustomListItem>
            <CustomListItem
              isSelected={selectedIndex === 22}
              onClick={() => handleListItemClick(22)}
              component={NavLink}
              to="/member-list"
              isCollapsed={isCollapsed}
              primary="Members"
            ></CustomListItem>
            <CustomListItem
              isSelected={selectedIndex === 22}
              onClick={() => handleListItemClick(22)}
              component={NavLink}
              to="/donor-view"
              isCollapsed={isCollapsed}
              primary="Viewers"
            ></CustomListItem>
            <CustomListItem
              isSelected={selectedIndex === 22}
              onClick={() => handleListItemClick(22)}
              component={NavLink}
              to="/expensive-type"
              isCollapsed={isCollapsed}
              primary="Duplicate"
            ></CustomListItem>
          </List>
        </Collapse>

        <CustomListItem
          isSelected={selectedIndex === 3}
          onClick={() => handleListItemClick(3)}
          component={NavLink}
          to="/receipts"
          isCollapsed={isCollapsed}
          primary="Reciepts"
        >
          <ListItemIcon
            sx={{ minWidth: 0, justifyContent: "center", display: "flex" }}
          >
            <FaDownload style={{ fontSize: "20px" }} />
          </ListItemIcon>
        </CustomListItem>
        {/* /////REPORT START */}
        <CustomListItem
          isCollapsed={isCollapsed}
          primary="Report"
          hasSubMenu={true}
          isOpen={openSubMenu1}
          toggleSubMenu={handleToggleSubMenu1}
        >
          <ListItemIcon
            sx={{ minWidth: 0, justifyContent: "center", display: "flex" }}
          >
            <FaWallet style={{ fontSize: "20px" }} />
          </ListItemIcon>
        </CustomListItem>

        {/* Sub-menu items */}
        <Collapse in={openSubMenu1} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <CustomListItem
              isSelected={selectedIndex === 21}
              onClick={() => handleListItemClick(21)}
              component={NavLink}
              to="/report/donorsummary"
              isCollapsed={isCollapsed}
              primary="Donor Summary"
            ></CustomListItem>
            <CustomListItem
              isSelected={selectedIndex === 22}
              onClick={() => handleListItemClick(22)}
              component={NavLink}
              to="/report/promoter"
              isCollapsed={isCollapsed}
              primary="Promoter Summary"
            ></CustomListItem>
            <CustomListItem
              isSelected={selectedIndex === 22}
              onClick={() => handleListItemClick(22)}
              component={NavLink}
              to="/report/recepit"
              isCollapsed={isCollapsed}
              primary="Receipt  Summary "
            ></CustomListItem>
            <CustomListItem
              isSelected={selectedIndex === 22}
              onClick={() => handleListItemClick(22)}
              component={NavLink}
              to="/report/donation"
              isCollapsed={isCollapsed}
              primary="Donation  Summary "
            ></CustomListItem>
            {/* <CustomListItem
              isSelected={selectedIndex === 22}
              onClick={() => handleListItemClick(22)}
              component={NavLink}
              to="/report/school"
              isCollapsed={isCollapsed}
              primary="School  Summary "
            ></CustomListItem> */}
            <CustomListItem
              isSelected={selectedIndex === 22}
              onClick={() => handleListItemClick(22)}
              component={NavLink}
              to="/report/otg"
              isCollapsed={isCollapsed}
              primary="10BD  Summary "
            ></CustomListItem>
            <CustomListItem
              isSelected={selectedIndex === 22}
              onClick={() => handleListItemClick(22)}
              component={NavLink}
              to="/report/suspense"
              isCollapsed={isCollapsed}
              primary="Suspense  Summary "
            ></CustomListItem>
            <CustomListItem
              isSelected={selectedIndex === 22}
              onClick={() => handleListItemClick(22)}
              component={NavLink}
              to="/report/payment"
              isCollapsed={isCollapsed}
              primary="Payment  Summary "
            ></CustomListItem>
          </List>
        </Collapse>

        <CustomListItem
          isCollapsed={isCollapsed}
          primary="Download"
          hasSubMenu={true}
          isOpen={openSubMenu2}
          toggleSubMenu={handleToggleSubMenu2}
        >
          <ListItemIcon
            sx={{ minWidth: 0, justifyContent: "center", display: "flex" }}
          >
            <FaWallet style={{ fontSize: "20px" }} />
          </ListItemIcon>
        </CustomListItem>

        {/* Sub-menu items */}
        <Collapse in={openSubMenu2} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <CustomListItem
              isSelected={selectedIndex === 21}
              onClick={() => handleListItemClick(21)}
              component={NavLink}
              to="/download/donor"
              isCollapsed={isCollapsed}
              primary="Donor"
            ></CustomListItem>
            <CustomListItem
              isSelected={selectedIndex === 22}
              onClick={() => handleListItemClick(22)}
              component={NavLink}
              to="/download/receipts"
              isCollapsed={isCollapsed}
              primary="Receipts"
            ></CustomListItem>
            <CustomListItem
              isSelected={selectedIndex === 22}
              onClick={() => handleListItemClick(22)}
              component={NavLink}
              to="/download/ots"
              isCollapsed={isCollapsed}
              primary="OTS"
            ></CustomListItem>
            <CustomListItem
              isSelected={selectedIndex === 22}
              onClick={() => handleListItemClick(22)}
              component={NavLink}
              to="/download/team"
              isCollapsed={isCollapsed}
              primary="  Team "
            ></CustomListItem>

            <CustomListItem
              isSelected={selectedIndex === 22}
              onClick={() => handleListItemClick(22)}
              component={NavLink}
              to="/download/allreceipts"
              isCollapsed={isCollapsed}
              primary="All Recepits"
            ></CustomListItem>
          </List>
        </Collapse>
      </List>
    </Drawer>
  );
};

export default SideNav;
