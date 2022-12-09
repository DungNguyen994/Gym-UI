import { useLazyQuery } from "@apollo/client";
import { Grid } from "@mui/material";
import { useEffect } from "react";
import { GET_MEMBERS } from "../graphql/queries/members";
import { setMembers } from "../Redux-toolkit/features/Members/memberSlice";
import { useAppDispatch } from "../Redux-toolkit/hooks";
import { Member } from "../types";
import FindMember from "./Members/FindMember";
import MemberList from "./Members/MemberList/MemberList";

export default function Home() {
  const [getMembers] = useLazyQuery(GET_MEMBERS);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetch = async () => {
      const { data } = await getMembers();
      const members: Member[] = data?.members?.data;
      dispatch(setMembers(members));
    };
    fetch();
  }, [dispatch, getMembers]);
  return (
    <Grid container className="members">
      <Grid item xs={9}>
        <FindMember />
      </Grid>
      <Grid item xs={3}>
        <MemberList />
      </Grid>
    </Grid>
  );
}
