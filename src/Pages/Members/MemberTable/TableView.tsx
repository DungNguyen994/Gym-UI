import { useMutation } from "@apollo/client";
import { Delete, Edit, Login } from "@mui/icons-material";
import { Alert, Box, Button, Snackbar, Tooltip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { GridRenderCellParams, GridRowParams } from "@mui/x-data-grid/models";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MEMBERSHIP_STATUS,
  MEMBERSHIP_STATUS_DESCRIPTION,
} from "../../../constants";
import { CHECK_IN } from "../../../graphql/mutations/checkIn";
import { VISIT_HISTORY } from "../../../graphql/queries/visitHistory";
import { ROUTES } from "../../../routes";
import { Member, MembershipStatus } from "../../../types";
import { getButtonStatusColor, getFullName } from "../../../utils";

interface Props {
  loading: boolean;
  data: Member[];
  onDelete: (member: Member) => void;
}
export default function TableView({ loading, data, onDelete }: Props) {
  const navigate = useNavigate();

  const [checkIn, { data: checkInData, loading: checkInLoading }] =
    useMutation(CHECK_IN);
  const [open, setOpen] = useState(false);
  const onCheckIn = (id: string) => {
    checkIn({
      variables: { memberId: id },
      refetchQueries: [{ query: VISIT_HISTORY }],
    }).then(() => {
      setOpen(true);
    });
  };
  const onClose = () => setOpen(false);

  if (data.length === 0)
    return <h3 style={{ marginLeft: "15px" }}>No Members Found!</h3>;
  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 230,
      renderCell: (params: GridRenderCellParams<string>) =>
        getFullName(params.row?.firstName, params.row?.lastName),
    },
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
          color={getButtonStatusColor(params.value)}
          size="small"
        >
          {MEMBERSHIP_STATUS_DESCRIPTION[params.value as MembershipStatus]}
        </Button>
      ),
    },
    {
      field: "currentMembershipType",
      headerName: "Current Membership Type",
      width: 230,
    },
    {
      field: "remainingTime",
      headerName: "Expire Time",
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
          <Login
            color={
              params.row.status === MEMBERSHIP_STATUS.ACTIVE
                ? "success"
                : "inherit"
            }
            sx={{ cursor: "pointer" }}
            onClick={() => {
              if (params.row.status === MEMBERSHIP_STATUS.ACTIVE)
                onCheckIn(params.id as string);
            }}
          />
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
              onDelete(params.row);
            }}
          />
        </Tooltip>,
      ],
    },
  ];
  return (
    <Box
      sx={{
        height: 650,
        width: "100%",
        background: "white",
      }}
    >
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={onClose}
        message={checkInData?.checkIn?.data || ""}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }} onClose={onClose}>
          {checkInData?.checkIn?.data || ""}
        </Alert>
      </Snackbar>
      <DataGrid
        rows={data}
        columns={columns}
        loading={loading || checkInLoading}
        disableSelectionOnClick
        rowsPerPageOptions={[10, 25, 50, 100]}
        pageSize={10}
        pagination
        sx={{
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: "700",
          },
          ml: { xl: 2 },
        }}
      />
    </Box>
  );
}
