import React from "react";
import { RevenueChart } from "./RevenueChart";
import { Grid, Box, Stack } from "@mui/material";
import { ProductSaleChart } from "./ProductSaleChart";
import ActiveMemberCard from "./ActiveMemberCard";
import ExpiredMemberCard from "./ExpiredMemberCard";

export default function Home() {
  return (
    <Box p={1}>
      <Grid container spacing={1}>
        <Grid item xs={12} lg={6}>
          <Stack spacing={2}>
            <RevenueChart />
            <ProductSaleChart />
          </Stack>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <ActiveMemberCard />
            </Grid>
            <Grid item xs={6}>
              <ExpiredMemberCard />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
