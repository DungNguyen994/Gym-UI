import { Divider, List } from "@mui/material";
import Container from "@mui/material/Container";
import { getMembers } from "../../../Redux-toolkit/features/Members/memberSlice";
import { useAppSelector } from "../../../Redux-toolkit/hooks";
import Header from "./Header";
import "./index.scss";
import MemberItem from "./MemberItem";

export default function MemberList() {
  const members = useAppSelector(getMembers);
  return (
    <Container className="member-list">
      <Header />
      <List className="list-item" component="div">
        {members?.map((member, key) => {
          return (
            <div key={key}>
              <MemberItem memberInfo={member} />
              <Divider variant="inset" component="li" />
            </div>
          );
        })}
      </List>
    </Container>
  );
}
