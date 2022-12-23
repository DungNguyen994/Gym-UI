import { useQuery } from "@apollo/client";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { GET_MEMBERS } from "../../graphql/queries/members";
import { Member } from "../../types";
import { MEMBERSHIP_STATUS } from "../../constants";
import LoadingSpinner from "../../Generic Components/LoadingSpinner";

export default function ActiveMemberCard() {
  const { loading, data } = useQuery(GET_MEMBERS);
  const members = data?.members?.data as Member[];
  const totalActiveMembers =
    members?.filter((member) => member.status === MEMBERSHIP_STATUS.ACTIVE)
      ?.length || 0;
  return (
    <Card>
      {loading && <LoadingSpinner />}
      <CardHeader
        title="Active Members"
        sx={{ color: "#34eb83", textAlign: "center" }}
      />
      <CardContent sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h1">{totalActiveMembers}</Typography>
      </CardContent>
    </Card>
  );
}
