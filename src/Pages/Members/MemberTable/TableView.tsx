import { Delete, Edit, Login } from "@mui/icons-material";
import { Button, Tooltip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { GridRenderCellParams, GridRowParams } from "@mui/x-data-grid/models";
import { Member } from "../../../types";

interface Props {
  loading: boolean;
  data: Member[];
  onDelete: (params: GridRowParams) => void;
}
export default function TableView({ loading, data, onDelete }: Props) {
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
      getActions: (params: GridRowParams) => [
        <Tooltip title="Check In">
          <Login color="success" sx={{ cursor: "pointer" }} />
        </Tooltip>,
        <Tooltip title="Edit Member">
          <Edit onClick={() => {}} color="warning" sx={{ cursor: "pointer" }} />
        </Tooltip>,
        <Tooltip title="Delete Member">
          <Delete
            color="error"
            sx={{ cursor: "pointer" }}
            onClick={() => {
              onDelete(params);
            }}
          />
        </Tooltip>,
      ],
    },
  ];
  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        loading={loading}
        disableSelectionOnClick
        rowsPerPageOptions={[10, 25, 50, 100]}
      />
    </div>
  );
}
