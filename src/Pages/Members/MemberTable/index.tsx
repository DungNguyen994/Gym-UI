import { useMutation, useQuery } from "@apollo/client";
import { List, Window } from "@mui/icons-material";
import { Stack } from "@mui/joy";
import {
  ButtonGroup,
  FormControl,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import DialogModal from "../../../Generic Components/Dialog";
import SearchBar from "../../../Generic Components/SearchBar";
import { DELETE_MEMBER } from "../../../graphql/mutations/deleteMember";
import { GET_MEMBERS } from "../../../graphql/queries/members";
import { Member } from "../../../types";
import { formatMemberTableData, getFullName, searchData } from "../../../utils";
import GridView from "./GridView";
import TableView from "./TableView";
import LoadingSpinner from "../../../Generic Components/LoadingSpinner";

export default function MemberTable() {
  const { loading, data } = useQuery(GET_MEMBERS);
  const [deleteMember, { loading: deleteLoading }] = useMutation(
    DELETE_MEMBER,
    {
      refetchQueries: [{ query: GET_MEMBERS }, "members"],
    }
  );
  const tableData = data?.members?.data as Member[];
  const rows = useMemo(() => formatMemberTableData(tableData), [tableData]);
  const [searchedRows, setSearchedRows] = useState(rows);
  const [openDialog, setOpenDialog] = useState(false);
  const [isGridView, setIsGridView] = useState(true);
  const [selectedRow, setSelectedRow] = useState<Member>();
  const [viewType, setViewType] = useState("everyone");
  const handleDeleteMember = () => {
    deleteMember({ variables: { deleteMemberId: selectedRow?.id } });
    setOpenDialog(false);
  };
  const onDelete = (member: Member) => {
    setOpenDialog(true);
    setSelectedRow(member);
  };
  useEffect(() => {
    setSearchedRows(rows);
  }, [rows]);

  const _onSearch = useCallback(
    (value: string) => {
      const searchedData = searchData(rows, value, ["photo", "id"]);
      setSearchedRows(searchedData);
    },
    [rows]
  );
  let viewMembers;
  switch (viewType) {
    case "everyone":
      viewMembers = searchedRows;
      break;
    case "E":
      viewMembers = searchedRows.filter((r) => r.status === "E");
      break;
    case "A":
      viewMembers = searchedRows.filter((r) => r.status === "A");
      break;
    default:
      viewMembers = searchedRows;
  }
  return (
    <Stack spacing={2}>
      {(loading || deleteLoading) && <LoadingSpinner />}
      <Stack
        direction="row"
        sx={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <SearchBar placeholder="Search Member" onSearch={_onSearch} />
        <ButtonGroup aria-label="view-selection">
          <IconButton
            aria-label="grid-view"
            color={isGridView ? "primary" : "default"}
            onClick={() => setIsGridView(true)}
          >
            <Window fontSize="large" />
          </IconButton>
          <IconButton
            aria-label="list-view"
            onClick={() => setIsGridView(false)}
            color={!isGridView ? "primary" : "default"}
          >
            <List fontSize="large" />
          </IconButton>
        </ButtonGroup>
      </Stack>
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="everyone"
          name="radio-buttons-group"
          row
          sx={{ ml: 2 }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setViewType(e.target.value);
          }}
        >
          <FormControlLabel
            value="everyone"
            control={<Radio />}
            label="Everyone"
          />
          <FormControlLabel
            value="A"
            control={<Radio />}
            label="Active Members"
          />
          <FormControlLabel
            value="E"
            control={<Radio />}
            label="Expired Members"
          />
        </RadioGroup>
      </FormControl>
      {isGridView ? (
        <GridView data={viewMembers} onDelete={onDelete} />
      ) : (
        <TableView
          loading={loading || deleteLoading}
          onDelete={onDelete}
          data={viewMembers}
        />
      )}
      <DialogModal
        open={openDialog}
        title="Delete"
        content={`Do you want to delete member: ${getFullName(
          selectedRow?.firstName,
          selectedRow?.lastName
        )} ?`}
        handleClose={() => {
          setOpenDialog(false);
        }}
        handleContinue={handleDeleteMember}
      />
    </Stack>
  );
}
