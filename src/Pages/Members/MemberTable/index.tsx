import { useQuery } from "@apollo/client";
import { Delete, Edit, Login } from "@mui/icons-material";
import { Stack } from "@mui/joy";
import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Tooltip,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { GridRenderCellParams } from "@mui/x-data-grid/models";
import SearchBar from "material-ui-search-bar";
import { useEffect, useMemo, useState } from "react";
import { GET_MEMBERS } from "../../../graphql/queries/members";
import { Member } from "../../../types";
import { formatMemberTableData, searchData } from "../../../utils";

export default function MemberTable() {
  const { loading, data } = useQuery(GET_MEMBERS);
  const rows = useMemo(
    () => formatMemberTableData(data?.members?.data as Member[]),
    [data]
  );
  const [searchedRows, setSearchedRows] = useState(rows);
  const [initSearchedRows, setInitSearchedRows] = useState(() => searchedRows);
  const columns = [
    { field: "name", headerName: "Name", width: 230 },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      width: 230,
      type: "number",
    },
    { field: "membershipType", headerName: "Membership Type", width: 230 },
    {
      field: "status",
      headerName: "Status",
      width: 230,
      renderCell: (params: GridRenderCellParams<string>) =>
        params.value === "active" ? (
          <Button
            variant="contained"
            color="success"
            size="small"
            sx={{ cursor: "default" }}
          >
            Active
          </Button>
        ) : (
          <Button
            variant="contained"
            color="error"
            size="small"
            sx={{ cursor: "default" }}
          >
            Expired
          </Button>
        ),
    },
    {
      field: "expiredDate",
      headerName: "Expired Date",
      width: 230,
      type: "date",
    },
    {
      field: "note",
      headerName: "Note",
      width: 230,
    },
    {
      field: "action",
      headerName: "Actions",
      width: 250,
      type: "actions",
      getActions: () => [
        <Tooltip title="Check In">
          <Login color="success" sx={{ cursor: "pointer" }} />
        </Tooltip>,
        <Tooltip title="Edit Member">
          <Edit onClick={() => {}} color="warning" sx={{ cursor: "pointer" }} />
        </Tooltip>,
        <Tooltip title="Delete Member">
          <Delete color="error" sx={{ cursor: "pointer" }} />
        </Tooltip>,
      ],
    },
  ];
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
      <SearchBar
        placeholder="Search Member..."
        style={{ width: "50%" }}
        onChange={onSearch}
        onCancelSearch={() => {
          setSearchedRows(rows);
        }}
      />
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
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={searchedRows}
          columns={columns}
          loading={loading}
          disableSelectionOnClick
        />
      </div>
    </Stack>
  );
}
