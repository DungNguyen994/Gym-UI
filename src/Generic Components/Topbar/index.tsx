import { Cancel, Settings } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { User, getAuthUser } from "../../Redux-toolkit/features/Auth/authSlice";
import { ROUTES } from "../../routes";
import MobileSideBar from "../Sidebar/MobileSideBar";
import "./index.scss";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../graphql/queries/user";
import LoadingSpinner from "../LoadingSpinner";

export default function Topbar() {
  const location = useLocation();
  let workItem: string;
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
    case ROUTES.VISIT:
      workItem = "Visit History";
      break;
    case ROUTES.PAYMENTS:
      workItem = "Payments";
      break;
    case ROUTES.SETTINGS:
      workItem = "Settings";
      break;
    case ROUTES.USERPROFILE:
      workItem = "User Details";
      break;
    case ROUTES.UPDATEPASSW0RD:
      workItem = "Change Password";
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

  useEffect(() => {
    document.title = workItem + "-Gym Bot";
  }, [workItem]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuId = "primary-search-account-menu-mobile";

  const navigate = useNavigate();

  const closeSidebar = () => setIsMobileMenuOpen(false);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const authUser = useSelector(getAuthUser);
  const { data, loading } = useQuery(GET_USER, {
    variables: { username: authUser?.username },
  });
  const userInfo = data?.user?.data as User;
  const fullName =
    userInfo?.firstName && userInfo?.lastName
      ? `${userInfo.firstName} ${userInfo.lastName}`
      : userInfo?.username || "";
  return (
    <Box>
      <Stack direction="row">
        {loading && <LoadingSpinner />}
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="fixed" style={{ background: "#11101d" }}>
            <Toolbar className="tool-bar">
              <Typography
                variant="h5"
                noWrap
                component="div"
                sx={{ cursor: "pointer" }}
                minWidth={{ lg: "20%", xl: "10%" }}
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
                <Tooltip title="Settings">
                  <IconButton
                    size="large"
                    aria-label="settings"
                    color="inherit"
                    onClick={() => navigate(ROUTES.SETTINGS, { replace: true })}
                  >
                    <Settings />
                  </IconButton>
                </Tooltip>
              </Box>
              <Box ml={1}>
                <Tooltip title={fullName}>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="User Profile"
                      src={(userInfo?.photo as string) || "/profile-icon.png"}
                    />
                  </IconButton>
                </Tooltip>
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
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem
                onClick={() => navigate(ROUTES.USERPROFILE, { replace: true })}
              >
                <Typography textAlign="center">Edit Profile</Typography>
              </MenuItem>
              <MenuItem
                onClick={() =>
                  navigate(ROUTES.UPDATEPASSW0RD, { replace: true })
                }
              >
                <Typography textAlign="center">Change Password</Typography>
              </MenuItem>
            </Menu>
          </AppBar>
        </Box>
      </Stack>
    </Box>
  );
}
