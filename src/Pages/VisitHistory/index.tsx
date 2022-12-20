import { useQuery } from "@apollo/client";
import { Box, Stack, Typography } from "@mui/material";
import {
  DataGrid,
  GridRenderCellParams,
  GridValueFormatterParams,
} from "@mui/x-data-grid";
import dayjs from "dayjs";
import { useCallback, useEffect, useMemo, useState } from "react";
import LoadingSpinner from "../../Generic Components/LoadingSpinner";
import { DATE_FORMAT } from "../../constants";
import { VISIT_HISTORY } from "../../graphql/queries/visitHistory";
import { VisitHistory } from "../../types";
import { _isToday, getTimeToNow, searchData } from "../../utils";
import SearchBar from "../../Generic Components/SearchBar";

export default function VisitHistoryPage() {
  const { data, loading } = useQuery(VISIT_HISTORY);
  const rows = useMemo(
    () => (data?.visitHistory?.data as VisitHistory[]) || [],
    [data]
  );
  const columns = [
    { field: "memberName", headerName: "Member Name", width: 200 },
    {
      field: "time",
      headerName: "Visit Time",
      width: 200,
      renderCell: (params: GridRenderCellParams<Date>) =>
        getTimeToNow(params.row.date),
    },
    {
      field: "date",
      headerName: "Visit Date",
      width: 400,
      valueFormatter: (params: GridValueFormatterParams<string>) =>
        dayjs(params.value).format(DATE_FORMAT),
    },
  ];

  const [searchedRows, setSearchedRows] = useState(rows);
  useEffect(() => {
    setSearchedRows(rows);
  }, [rows]);

  const onSearch = useCallback(
    (value: string) => {
      const searchedData = searchData(rows, value, ["id"]);
      setSearchedRows(searchedData);
    },
    [rows]
  );
  const totalVisitorsToday = rows.filter((r) => _isToday(r.date)).length;
  return (
    <Box sx={{ p: "15px 2% 10px" }}>
      {loading && <LoadingSpinner />}
      <Stack spacing={2}>
        <SearchBar placeholder="Search..." onSearch={onSearch} />
        <Typography
          color="teal"
          fontWeight={700}
        >{`Total Number of Visitors Today: ${totalVisitorsToday}`}</Typography>
        <div style={{ height: 650, width: "100%", background: "white" }}>
          <DataGrid
            rows={searchedRows}
            columns={columns}
            disableSelectionOnClick
            rowsPerPageOptions={[10, 25, 50, 100]}
            pageSize={10}
            loading={loading}
            pagination
            sx={{
              "& .MuiDataGrid-columnHeaderTitle": {
                fontWeight: "700",
              },
            }}
          />
        </div>
      </Stack>
    </Box>
  );
}
