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
import { GridRowParams } from "@mui/x-data-grid/models";
import SearchBar from "material-ui-search-bar";
import { useEffect, useMemo, useState } from "react";
import DialogModal from "../../../Generic Components/Dialog";
import { DELETE_MEMBER } from "../../../graphql/mutations/deleteMember";
import { GET_MEMBERS } from "../../../graphql/queries/members";
import { Member } from "../../../types";
import { formatMemberTableData, searchData } from "../../../utils";
import GridView from "./GridView";
import TableView from "./TableView";

interface SelectedRow {
  id?: string;
  name?: string;
}

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
  const [initSearchedRows, setInitSearchedRows] = useState(() => searchedRows);
  const [openDialog, setOpenDialog] = useState(false);
  const [isGridView, setIsGridView] = useState(true);
  const [selectedRow, setSelectedRow] = useState<SelectedRow>({});
  const handleDeleteMember = () => {
    deleteMember({ variables: { deleteMemberId: selectedRow.id } });
    setOpenDialog(false);
  };
  const onDelete = (params: GridRowParams) => {
    setOpenDialog(true);
    setSelectedRow(params.row);
  };
  useEffect(() => {
    setSearchedRows(rows);
  }, [rows]);

  const onSearch = (value: string) => {
    const searchedData = searchData(rows, value, ["photo", "id"]);
    setSearchedRows(searchedData);
    setInitSearchedRows(searchedData);
  };
  return (
    <Stack spacing={2}>
      <Stack
        direction="row"
        sx={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <SearchBar
          placeholder="Search Member..."
          style={{ width: "50%" }}
          onChange={onSearch}
          onCancelSearch={() => {
            setSearchedRows(rows);
          }}
        />
        <ButtonGroup aria-label="view-selection">
          <IconButton
            aria-label="grid-view"
            color={isGridView ? "info" : "default"}
            onClick={() => setIsGridView(true)}
          >
            <Window sx={{ fontSize: "40px" }} />
          </IconButton>
          <IconButton
            aria-label="list-view"
            size="large"
            onClick={() => setIsGridView(false)}
            color={!isGridView ? "info" : "default"}
          >
            <List sx={{ fontSize: "40px" }} />
          </IconButton>
        </ButtonGroup>
      </Stack>
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="everyone"
          name="radio-buttons-group"
          row
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.value !== "everyone") {
              console.log(searchedRows, initSearchedRows);
              setInitSearchedRows(searchedRows);
              setSearchedRows((prev) =>
                (prev.length > 0 ? prev : initSearchedRows).filter(
                  (i) => i.status === e.target.value
                )
              );
            } else {
              if (initSearchedRows.length > 0)
                setSearchedRows(initSearchedRows);
            }
          }}
        >
          <FormControlLabel
            value="everyone"
            control={<Radio />}
            label="Everyone"
          />
          <FormControlLabel
            value="active"
            control={<Radio />}
            label="Active Members"
          />
          <FormControlLabel
            value="expired"
            control={<Radio />}
            label="Expired Members"
          />
        </RadioGroup>
      </FormControl>
      {isGridView ? (
        <GridView data={searchedRows} />
      ) : (
        <TableView
          loading={loading || deleteLoading}
          onDelete={onDelete}
          data={searchedRows}
        />
      )}
      <DialogModal
        open={openDialog}
        title="Delete"
        content={`Do you want to delete member: ${selectedRow.name} ?`}
        handleClose={() => {
          setOpenDialog(false);
        }}
        handleContinue={handleDeleteMember}
      />
    </Stack>
  );
}