import { Box } from "@mui/material";
import MemberTable from "../MemberTable";
import "./index.scss";

export default function FindMember() {
  return (
    <Box sx={{ padding: "15px 2% 10px" }}>
      <MemberTable />
    </Box>
  );
}
