import { Box } from "@mui/material";
import MemberTable from "../MemberTable";
import "./index.scss";

export default function FindMember() {
  return (
    <Box sx={{ padding: { xs: 1 }, height: "100%" }}>
      <MemberTable />
    </Box>
  );
}
