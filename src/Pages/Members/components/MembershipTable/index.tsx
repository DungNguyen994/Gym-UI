import { Add, CancelScheduleSend, Delete } from "@mui/icons-material";
import { Box, Button, Stack } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import {
  DataGrid,
  GridRenderCellParams,
  GridRowParams,
  GridValueFormatterParams,
} from "@mui/x-data-grid";
import dayjs from "dayjs";
import { useFormContext } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import {
  DATE_FORMAT,
  membershipTypes,
  PAYMENT_METHODS,
  periodOptions,
} from "../../../../constants";
import AutoComplete from "../../../../Generic Components/Form/AutoComplete";
import { DateInput } from "../../../../Generic Components/Form/DateInput";
import { Membership } from "../../../../types";
import { getEarliestDate } from "../../../../utils";

interface Props {
  memberships: Membership[];
  showAddMembershipButton: boolean;
  setShowAddMembershipButton: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function MembershipTable({
  memberships,
  showAddMembershipButton,
  setShowAddMembershipButton,
}: Props) {
  const earliestDate = getEarliestDate(
    memberships.map((m) => m.endDate as string)
  );

  const isActive = dayjs(earliestDate).isAfter(dayjs());
  const { setValue, watch } = useFormContext();
  const onDeleteNewMembership = () => {
    setValue("newMembership", null);
    setValue("payment", null);
    setShowAddMembershipButton(true);
  };
  const columns = [
    {
      field: "membershipType",
      headerName: "Membership Type",
      width: 170,
      renderCell: (params: GridRenderCellParams<string>) =>
        params.row.isNew ? (
          <AutoComplete
            fieldName="newMembership.membershipType"
            label=""
            options={membershipTypes}
            defaultValue={membershipTypes[0]}
            md={12}
            lg={12}
          />
        ) : (
          params.value
        ),
    },
    {
      field: "term",
      headerName: "Term",
      width: 150,
      renderCell: (params: GridRenderCellParams<string>) =>
        params.row.isNew ? (
          <AutoComplete
            fieldName="newMembership.term"
            label=""
            options={periodOptions}
            defaultValue={periodOptions[0]}
            md={12}
            lg={12}
          />
        ) : (
          params.value
        ),
    },
    {
      field: "startDate",
      headerName: "Start Date",
      type: "date",
      width: 210,
      renderCell: (params: GridRenderCellParams<string>) =>
        params.row.isNew ? (
          <DateInput
            fieldName="newMembership.startDate"
            label=""
            xs={12}
            md={12}
            lg={12}
          />
        ) : (
          dayjs(params.value).format(DATE_FORMAT)
        ),
    },
    {
      field: "endDate",
      headerName: "End Date",
      width: 150,
      valueFormatter: (params: GridValueFormatterParams) =>
        dayjs(params.value).format(DATE_FORMAT),
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      renderCell: (params: GridRenderCellParams<string>) => (
        <Button
          color={isActive ? "success" : "error"}
          variant="contained"
          size="small"
        >
          {isActive ? "Active" : "Expired"}
        </Button>
      ),
    },
    {
      field: "action",
      headerName: "Actions",
      width: 90,
      type: "actions",
      getActions: (params: GridRowParams) => [
        <Tooltip
          title={
            !params.row.isNew ? "Hold Membership" : "Delete New Membership"
          }
        >
          {params.row?.isNew ? (
            <div onClick={() => onDeleteNewMembership()}>
              <Delete color="error" sx={{ cursor: "pointer" }} />
            </div>
          ) : (
            <CancelScheduleSend color="action" sx={{ cursor: "pointer" }} />
          )}
        </Tooltip>,
      ],
    },
  ];
  const newMembership = watch("newMembership");
  const onNewMembership = () => {
    setValue("newMembership", {
      membershipType: "Standard",
      term: "1 Month",
      startDate: dayjs(),
      endDate: dayjs().add(1, "month"),
      isNew: true,
    });
    setShowAddMembershipButton(false);
    setValue("payment", {
      paymentMethod: PAYMENT_METHODS[0],
    });
  };
  return (
    <Box width="100%" sx={{ pl: "32px" }}>
      <Stack direction="row" justifyContent="space-between" sx={{ mt: 1 }}>
        <h2 style={{ marginBottom: "5px", marginTop: "5px" }}>Memberships</h2>
        {showAddMembershipButton && (
          <Button
            variant="contained"
            startIcon={<Add />}
            color="info"
            size="small"
            sx={{ mb: 1 }}
            onClick={onNewMembership}
          >
            Add Membership
          </Button>
        )}
      </Stack>
      <div style={{ height: 350, width: "100%", background: "white" }}>
        <DataGrid
          rows={newMembership ? [...memberships, newMembership] : memberships}
          columns={columns}
          disableSelectionOnClick
          getRowId={() => uuidv4()}
          autoPageSize
          sx={{
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: "700",
            },
          }}
        />
      </div>
    </Box>
  );
}
