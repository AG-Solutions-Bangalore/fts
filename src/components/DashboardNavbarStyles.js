import { styled, alpha } from "@mui/material/styles";
import { IconButton, MenuItem, Menu } from "@mui/material";

const useStyles = () => {
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



  return {
    hoverIconButton: HoverIconButton,
    hoverIconButton1: HoverIconButton1,
    styledMenu: StyledMenu,
  };
};

export default useStyles;
