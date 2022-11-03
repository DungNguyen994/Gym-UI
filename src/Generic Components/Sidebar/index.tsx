import { useLazyQuery } from "@apollo/client";
import {
  Category,
  Dashboard,
  Diversity2,
  Logout,
  Menu,
  Payment,
  People,
} from "@mui/icons-material";
import { Box } from "@mui/material";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import { client } from "../../config/publicClient";
import { LOG_OUT } from "../../graphql/queries/logout";
import { setUser } from "../../Redux-toolkit/features/Auth/authSlice";
import { useAppDispatch } from "../../Redux-toolkit/hooks";
import LoadingSpinner from "../LoadingSpinner";
import "./index.scss";
import { MenuItem } from "./MenuItem";
import { BootstrapTooltip } from "./Tooltip";

export default function Sidebar() {
  const navigate = useNavigate();
  const [logout, { data, loading }] = useLazyQuery(LOG_OUT, { client });
  const dispatch = useAppDispatch();
  if (data?.logout?.data) {
    dispatch(setUser(undefined));
    navigate("/login", { replace: true });
  }
  return (
    <div className="sidebar">
      {loading && <LoadingSpinner />}
      <Stack
        sx={{
          justifyContent: "space-between",
          display: "flex",
          height: "100%",
        }}
      >
        <Stack spacing={2} className="menu-list-container">
          <div className="menu-item-container">
            <Box className="menu-item">
              <Menu fontSize="large" className="icon" />
            </Box>
          </div>
          <MenuItem Icon={Dashboard} tooltipText="Dashboard" to="/" />
          <MenuItem Icon={People} tooltipText="Members" to="/members" />
          <MenuItem Icon={Diversity2} tooltipText="Groups" to="/groups" />
          <MenuItem
            Icon={Category}
            tooltipText="Membership Types"
            to="/membership-types"
          />
          <MenuItem Icon={Payment} tooltipText="Payments" to="/payments" />
        </Stack>
        <Box className="menu-item-container logout">
          <Stack className="menu-item" direction="row" onClick={() => logout()}>
            <BootstrapTooltip title="Logout" placement="right-start">
              <Logout className="icon" fontSize="large"></Logout>
            </BootstrapTooltip>
          </Stack>
        </Box>
      </Stack>
    </div>
  );
}
