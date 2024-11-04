import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Menu,
  MenuItem,
  MenuList,
  IconButton,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { styled, alpha } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import Logo from "../assets/receipt/fts1.png";
import { IoPersonSharp } from "react-icons/io5";
import { UserCircleIcon, Bars3Icon } from "@heroicons/react/24/solid";
import { MdLogout } from "react-icons/md";

import { FaShareAlt, FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoMdCopy } from "react-icons/io";
import Logout from "./Logout";
import { FaCircleInfo } from "react-icons/fa6";
import { CiCircleInfo } from "react-icons/ci";

const HoverIconButton = styled(IconButton)({
  color: "white",
  backgroundColor: "rgb(94, 53, 177)",
  borderRadius: "6px",
  "&:hover": {
    color: "white",
    backgroundColor: "rgb(94, 53, 177)",
  },
});

const HoverIconButton1 = styled(IconButton)({
  color: "rgb(33, 150, 243)",
  backgroundColor: alpha("rgb(50, 165, 249)", 0.1),
  borderRadius: "40px",
  "&:hover": {
    color: "rgb(227, 242, 253)",
    backgroundColor: "rgb(33, 150, 243)",
  },
});

const StyledMenu = styled(Menu)({
  "& .MuiMenu-paper": {
    paddingLeft: "4px",
    paddingRight: "4px",
  },
});

const StyledMenuItem = styled((props) => <MenuItem {...props} />)(
  ({ theme, isSelected }) => ({
    width: "311px",
    height: "60px",
    display: "flex",
    alignItems: "center",
    backgroundColor: isSelected ? alpha("#6200ee", 0.1) : "white",
    borderRadius: "5px",
    "&:hover": {
      backgroundColor: alpha("#6200ee", 0.1),
    },
  })
);

const DashboardNavbar = ({ handleLeftDrawerToggle }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();

  const [shareMenuOpen, setShareMenuOpen] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const open1 = Boolean(anchorEl1);
  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };

  const [openModal, setOpenModal] = useState(false);
  const handleOpenLogout = () => setOpenModal(!openModal);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleMenuItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleWhatsAppShare = (e) => {
    e.preventDefault();
    const whatsappLink = `https://wa.me/?text=${encodeURIComponent(
      referralMessage
    )}`;
    window.open(whatsappLink, "_blank");
  };

  const referralMessage = `Hello, I'm a member of Chetana Aarogyam, and I'd like you to join as well. Please register yourself by clicking the link below. https://chetanaarogyam.com/index.html?id=${localStorage.getItem(
    "username"
  )}`;

  const handleEmailShare = (e) => {
    e.preventDefault();
    const subject = "Join Chetana Aarogyam";
    const mailtoLink = `mailto:?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(referralMessage)}`;
    window.location.href = mailtoLink;
  };

  const handleCopyLink = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(referralMessage).then(() => {
      // alert("Referral link copied to clipboard!");
      toast.info("Referral link copied to clipboard!");
    });
  };
  const handlemanual = () => {
    navigate("/manualguide/book");
  };
  return (
    <AppBar
      position="fixed"
      sx={{
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
        backgroundColor: "#95a5b4",
        color: "black",
        boxShadow: "none",
        padding: "6px",
      }}
    >
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexGrow: 0,
            justifyContent: "flex-start",
            display: isSmallScreen ? "none" : "flex",
          }}
        >
          <img src={Logo} alt="Logo" className="w-[200px] h-[60px]" />
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexGrow: 1,
            ml: isSmallScreen ? 0 : 15,
            justifyContent: isSmallScreen ? "flex-start" : "flex-end",
            gap: isSmallScreen ? "16px" : "0",
          }}
        >
          {isSmallScreen ? (
            <>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexGrow: 1,
                  gap: "16px",
                }}
              >
                <HoverIconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={handleLeftDrawerToggle}
                >
                  <MenuIcon />
                </HoverIconButton>
              </Box>
              <div
                className="border-2 border-gray-400 hover:border-blue-500 p-2 transition-colors rounded"
                onClick={handlemanual}
              >
                <CiCircleInfo className="text-gray-800 hover:text-blue-500" />
                <span className="hidden hover:block text-black">Help</span>
              </div>

              <Box className="flex justify-end">
                <Button
                  id="basic-button"
                  aria-controls={open1 ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open1 ? "true" : undefined}
                  onClick={handleClick1}
                  style={{ color: "white" }}
                >
                  <IoPersonSharp className="h-5 w-5  text-white" />
                </Button>

                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl1}
                  open={open1}
                  // onClose={handleClose1}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuList>
                    <MenuItem>
                      <Link to="/profile">Profile</Link>
                    </MenuItem>
                  </MenuList>
                </Menu>

                <IconButton
                  variant="text"
                  color="red"
                  onClick={handleOpenLogout}
                >
                  <MdLogout className="h-5 w-5 text-red" />
                </IconButton>

                <Logout open={openModal} handleOpen={handleOpenLogout} />
              </Box>
            </>
          ) : (
            <>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexGrow: 1,
                  gap: "16px",
                }}
              >
                <HoverIconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={handleLeftDrawerToggle}
                >
                  <MenuIcon />
                </HoverIconButton>
              </Box>
              <div
                className="border-2 border-gray-400 hover:border-blue-500 p-2 transition-colors rounded"
                onClick={handlemanual}
              >
                <CiCircleInfo className="text-gray-800 hover:text-blue-500" />
                <span className="hidden hover:block text-black">Help</span>
              </div>

              <Box className="flex justify-end">
                <Button
                  id="basic-button"
                  aria-controls={open1 ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open1 ? "true" : undefined}
                  onClick={handleClick1}
                >
                  <IoPersonSharp className="h-5 w-5 text-red" color="white" />
                </Button>

                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl1}
                  open={open1}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuList>
                    <MenuItem>
                      <Link to="/profile">Profile</Link>
                    </MenuItem>
                  </MenuList>
                </Menu>

                <IconButton
                  variant="text"
                  color="red"
                  onClick={handleOpenLogout}
                >
                  <MdLogout className="h-5 w-5 text-red" color="white" />
                </IconButton>

                <Logout open={openModal} handleOpen={handleOpenLogout} />
              </Box>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default DashboardNavbar;
