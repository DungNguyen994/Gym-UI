import { useLazyQuery } from "@apollo/client";
import {
  Add,
  Category,
  Home,
  Inventory,
  Logout,
  Search,
  ShoppingCart,
} from "@mui/icons-material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { client } from "../../config/publicClient";
import { LOG_OUT } from "../../graphql/queries/logout";
import { setUser } from "../../Redux-toolkit/features/Auth/authSlice";
import { useAppDispatch } from "../../Redux-toolkit/hooks";
import { ROUTES } from "../../routes";
import LoadingSpinner from "../LoadingSpinner";
import "./index.scss";
import { MenuItem } from "./MenuItem";

export default function Sidebar() {
  const navigate = useNavigate();
  const [logout, { data, loading }] = useLazyQuery(LOG_OUT, { client });
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [selected, setSelected] = useState(location.pathname);

  if (data?.logout?.data) {
    dispatch(setUser(undefined));
    navigate("/login", { replace: true });
  }

  const onMenuClick = (path: string) => {
    navigate(path);
    setSelected(path);
  };

  return (
    <div className="sidebar">
      {loading && <LoadingSpinner />}
      <Stack
        sx={{
          justifyContent: "space-between",
          height: "90%",
        }}
      >
        <List style={{ paddingTop: 0 }}>
          <MenuItem
            Icon={Home}
            text="Home"
            onClick={() => onMenuClick(ROUTES.HOME)}
            selected={selected === ROUTES.HOME}
          />
          <MenuItem
            Icon={Add}
            text="Add Member"
            onClick={() => onMenuClick(ROUTES.ADDMEMBER)}
            selected={selected === ROUTES.ADDMEMBER}
          />
          <MenuItem
            Icon={Search}
            text="Find Member"
            onClick={() => onMenuClick(ROUTES.FINDMEMBER)}
            selected={selected === ROUTES.FINDMEMBER}
          />
          <MenuItem
            Icon={Inventory}
            text="Inventory"
            onClick={() => onMenuClick(ROUTES.INVENTORY)}
            selected={selected === ROUTES.INVENTORY}
          />
          <MenuItem
            Icon={Category}
            text="Products"
            onClick={() => onMenuClick(ROUTES.PRODUCTS)}
            selected={
              selected === ROUTES.PRODUCTS ||
              selected === ROUTES.NEWPRODUCT ||
              selected === ROUTES.EDITPRODUCT
            }
          />
          <MenuItem
            Icon={ShoppingCart}
            text="POS"
            onClick={() => onMenuClick(ROUTES.POS)}
            selected={selected === ROUTES.POS}
          />
          {/* <MenuItem
            onClick={() => {
              navigate("/groups");
              setSelected(4);
            }}
            selected={selected === 4}
            Icon={Category}
            text="Membership Types"
          /> */}
          {/* <MenuItem
            Icon={Payment}
            text="Payments"
            onClick={() => {
              navigate("/groups");
              setSelected(5);
            }}
            selected={selected === 5}
          /> */}
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
