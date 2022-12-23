import { Box } from "@mui/material";
import MemberTable from "../MemberTable";
import "./index.scss";

export default function FindMember() {
  return (
    <Box sx={{ padding: { xs: 1, xl: "15px 2% 10px" }, height: "100%" }}>
      <MemberTable />
    </Box>
  );
}
