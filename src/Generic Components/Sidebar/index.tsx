import { useLazyQuery } from "@apollo/client";
import {
  Add,
  Category,
  Diversity2,
  Home,
  Logout,
  Payment,
  People,
} from "@mui/icons-material";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import { client } from "../../config/publicClient";
import { LOG_OUT } from "../../graphql/queries/logout";
import { setUser } from "../../Redux-toolkit/features/Auth/authSlice";
import {
  getSelectedMenuItem,
  setSelectedMenuItem,
} from "../../Redux-toolkit/features/Sidebar/sidebarSlice";
import { useAppDispatch, useAppSelector } from "../../Redux-toolkit/hooks";
import LoadingSpinner from "../LoadingSpinner";
import "./index.scss";
import { MenuItem } from "./MenuItem";

export default function Sidebar() {
  const navigate = useNavigate();
  const [logout, { data, loading }] = useLazyQuery(LOG_OUT, { client });
  const dispatch = useAppDispatch();
  const selectedMenuItem = useAppSelector(getSelectedMenuItem);
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
          height: "90%",
        }}
      >
        <List sx={{ paddingTop: 0 }}>
          <MenuItem
            Icon={Home}
            text="Home"
            onClick={() => {
              navigate("/");
              dispatch(setSelectedMenuItem(0));
            }}
            selected={selectedMenuItem === 0}
          />
          <MenuItem
            Icon={Add}
            text="Add Member"
            onClick={() => {
              navigate("/add-member");
              dispatch(setSelectedMenuItem(1));
            }}
            selected={selectedMenuItem === 1}
          />
          <MenuItem
            Icon={People}
            text="Members"
            onClick={() => {
              navigate("/members");
              dispatch(setSelectedMenuItem(2));
            }}
            selected={selectedMenuItem === 2}
          />
          <MenuItem
            Icon={Diversity2}
            text="Groups"
            onClick={() => {
              navigate("/groups");
              dispatch(setSelectedMenuItem(3));
            }}
            selected={selectedMenuItem === 3}
          />
          <MenuItem
            onClick={() => {
              navigate("/groups");
              dispatch(setSelectedMenuItem(4));
            }}
            selected={selectedMenuItem === 4}
            Icon={Category}
            text="Membership Types"
          />
          <MenuItem
            Icon={Payment}
            text="Payments"
            onClick={() => {
              navigate("/groups");
              dispatch(setSelectedMenuItem(5));
            }}
            selected={selectedMenuItem === 5}
          />
        </List>
        <ListItem className="menu-item-container logout">
          <ListItemButton
            onClick={() => logout()}
            style={{ background: "transparent" }}
          >
            <ListItemIcon>
              <Logout className="icon" />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </Stack>
    </div>
  );
}
