import { useQuery } from "@apollo/client";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useMemo } from "react";
import LoadingSpinner from "../../Generic Components/LoadingSpinner";
import { VISIT_HISTORY } from "../../graphql/queries/visitHistory";
import { VisitHistory } from "../../types";

export default function TodayVisitCard() {
  const { loading, data } = useQuery(VISIT_HISTORY);
  const visits = useMemo(
    () => (data?.visitHistory?.data as VisitHistory[]) || [],
    [data]
  );
  const totalVisitToday = visits.reduce((total, v) => {
    if (dayjs(v.date).isSame(dayjs(), "day")) {
      total++;
    }
    return total;
  }, 0);
  return (
    <Card>
      {loading && <LoadingSpinner />}
      <CardHeader
        title="Today Visits"
        sx={{ color: "#fc9d03", textAlign: "center" }}
      />
      <CardContent sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h1">{totalVisitToday}</Typography>
      </CardContent>
    </Card>
  );
}
