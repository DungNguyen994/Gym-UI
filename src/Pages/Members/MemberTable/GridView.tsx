import { Grid } from "@mui/material";
import { Member } from "../../../types";
import MemberCard from "./MemberCard";
interface Props {
  data: Member[];
}
export default function GridView({ data }: Props) {
  if (data.length === 0)
    return <h3 style={{ marginLeft: "15px" }}>No members found!</h3>;
  return (
    <Grid container spacing={2}>
      {data.map((member) => (
        <Grid item xs={6} md={3} key={member.id}>
          <MemberCard member={member} />
        </Grid>
      ))}
    </Grid>
  );
}
