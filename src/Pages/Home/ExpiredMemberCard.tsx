import { useQuery } from "@apollo/client";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { GET_MEMBERS } from "../../graphql/queries/members";
import { Member } from "../../types";
import { MEMBERSHIP_STATUS } from "../../constants";
import LoadingSpinner from "../../Generic Components/LoadingSpinner";

export default function ExpiredMemberCard() {
  const { loading, data } = useQuery(GET_MEMBERS);
  const members = data?.members?.data as Member[];
  const totalExpiredMembers =
    members?.filter((member) => member.status === MEMBERSHIP_STATUS.EXPIRED)
      ?.length || 0;
  return (
    <Card>
      {loading && <LoadingSpinner />}
      <CardHeader
        title="Exprired Members"
        sx={{ color: "#eb3434", textAlign: "center" }}
      />
      <CardContent sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h1">{totalExpiredMembers}</Typography>
      </CardContent>
    </Card>
  );
}
