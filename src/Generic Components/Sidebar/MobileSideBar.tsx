import React from "react";
import { Collapse } from "@mui/material";
import Sidebar from ".";

interface Props {
  open: boolean;
  closeSidebar: () => void;
}

export default function MobileSideBar({ open, closeSidebar }: Props) {
  return (
    <Collapse in={open} timeout="auto" unmountOnExit>
      <Sidebar isMobile={true} closeSidebar={closeSidebar} />
    </Collapse>
  );
}
