import { Grid } from "@mui/material";
import { Member } from "../../../types";
import MemberCard from "./MemberCard";
interface Props {
  data: Member[];
  onDelete: (member: Member) => void;
}
export default function GridView({ data, onDelete }: Props) {
  if (data.length === 0)
    return <h3 style={{ marginLeft: "15px" }}>No members found!</h3>;
  return (
    <Grid container spacing={{ xs: 0, md: 1, xl: 2 }} marginLeft={{ md: 1 }}>
      {data.map((member) => (
        <Grid
          item
          xs={12}
          md={5}
          xl={3}
          key={member.id}
          marginBottom={{ xs: 1, xl: 0 }}
        >
          <MemberCard member={member} onDelete={onDelete} />
        </Grid>
      ))}
    </Grid>
  );
}
