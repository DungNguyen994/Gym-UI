import { Cancel, Mail, Notifications } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes";
import MobileSideBar from "../Sidebar/MobileSideBar";
import "./index.scss";

export default function Topbar() {
  const location = useLocation();

  let workItem;
  switch (location.pathname) {
    case ROUTES.HOME:
      workItem = "Home";
      break;
    case ROUTES.ADDMEMBER:
      workItem = "New Member";
      break;
    case ROUTES.FINDMEMBER:
      workItem = "Find Member";
      break;
    case ROUTES.INVENTORY:
      workItem = "Manage Inventory";
      break;
    case ROUTES.PRODUCTS:
      workItem = "Manage Products";
      break;
    case ROUTES.NEWPRODUCT:
      workItem = "New Product";
      break;
    case ROUTES.POS:
      workItem = "Point of Sale";
      break;
    default:
      workItem = "Home";
  }
  if (location.pathname.includes("/edit-member")) {
    workItem = "Edit Member";
  }
  if (location.pathname.includes("/edit-product")) {
    workItem = "Edit Product";
  }
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuId = "primary-search-account-menu-mobile";

  const navigate = useNavigate();

  const closeSidebar = () => setIsMobileMenuOpen(false);
  return (
    <Box>
      <Stack direction="row">
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="fixed" style={{ background: "#11101d" }}>
            <Toolbar className="tool-bar">
              <Typography
                variant="h5"
                noWrap
                component="div"
                sx={{ cursor: "pointer" }}
                minWidth={{ md: "10%" }}
                onClick={() => navigate(ROUTES.HOME, { replace: true })}
              >
                Gym Bot
              </Typography>
              <Typography
                noWrap
                component="div"
                sx={{ display: { xs: "none", lg: "block" } }}
              >
                {workItem}
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <IconButton
                  size="large"
                  aria-label="show 4 new mails"
                  color="inherit"
                >
                  <Badge badgeContent={4} color="error">
                    <Mail />
                  </Badge>
                </IconButton>
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                >
                  <Badge badgeContent={17} color="error">
                    <Notifications />
                  </Badge>
                </IconButton>
              </Box>
              <Box sx={{ display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={() => setIsMobileMenuOpen((pre) => !pre)}
                  color="inherit"
                >
                  {!isMobileMenuOpen ? <MenuIcon /> : <Cancel />}
                </IconButton>
              </Box>
            </Toolbar>
            <MobileSideBar
              open={isMobileMenuOpen}
              closeSidebar={closeSidebar}
            />
          </AppBar>
        </Box>
      </Stack>
    </Box>
  );
}
