import { Box, Grid } from "@mui/material";
import MembershipTypes from "./MembershipTypes";

export default function Settings() {
  return (
    <Box sx={{ p: "15px 2% 10px" }}>
      <Grid container>
        <Grid item xs={12} lg={5}>
          <MembershipTypes />
        </Grid>
      </Grid>
    </Box>
  );
}
