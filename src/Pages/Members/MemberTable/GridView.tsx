import { Grid } from "@mui/material";
import { Member } from "../../../types";
import MemberCard from "./MemberCard";
interface Props {
  data: Member[];
}
export default function GridView({ data }: Props) {
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
