import { Delete, Edit, Login } from "@mui/icons-material";
import { Button, Tooltip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { GridRenderCellParams, GridRowParams } from "@mui/x-data-grid/models";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../routes";
import { Member } from "../../../types";

interface Props {
  loading: boolean;
  data: Member[];
  onDelete: (params: GridRowParams) => void;
}
export default function TableView({ loading, data, onDelete }: Props) {
  const navigate = useNavigate();
  if (data.length === 0) return <h3>No Members Found!</h3>;
  const columns = [
    { field: "name", headerName: "Name", width: 230 },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      width: 230,
      type: "number",
      headerClassName: "super-app-theme--header",
    },
    {
      field: "status",
      headerName: "Status",
      width: 230,
      renderCell: (params: GridRenderCellParams<string>) => (
        <Button
          variant="contained"
          color="success"
          size="small"
          className={
            params.value === "Active"
              ? "success-btn"
              : params.value === "Expired"
              ? "error-btn"
              : ""
          }
        >
          {params.value?.toUpperCase()}
        </Button>
      ),
    },
    {
      field: "membershipType",
      headerName: "Current Membership Type",
      width: 230,
    },
    {
      field: "remainingTime",
      headerName: "Remaining Time",
      width: 200,
    },
    {
      field: "note",
      headerName: "Note",
      width: 230,
    },
    {
      field: "action",
      headerName: "Actions",
      width: 200,
      type: "actions",
      getActions: (params: GridRowParams) => [
        <Tooltip title="Check In">
          <Login color="success" sx={{ cursor: "pointer" }} />
        </Tooltip>,
        <Tooltip title="Edit Member">
          <Edit
            onClick={() =>
              navigate(ROUTES.EDITMEMBER.replace(":id", params.id as string))
            }
            color="warning"
            sx={{ cursor: "pointer" }}
          />
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
    <div style={{ height: 600, width: "100%", background: "white" }}>
      <DataGrid
        rows={data}
        columns={columns}
        loading={loading}
        disableSelectionOnClick
        rowsPerPageOptions={[10, 25, 50, 100]}
        pageSize={10}
        sx={{
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: "700",
          },
        }}
      />
    </div>
  );
}
