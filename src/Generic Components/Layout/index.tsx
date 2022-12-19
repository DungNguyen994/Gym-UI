import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";
import Topbar from "../Topbar";
import { Box } from "@mui/material";

export default function Layout() {
  return (
    <Box className="page-container">
      <Sidebar />
      <Topbar />
      <Box
        className="page-content"
        marginLeft={{ md: "20%", xl: "10%" }}
        marginTop={{ xs: "56px", md: "64px" }}
        sx={{ background: "white" }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
