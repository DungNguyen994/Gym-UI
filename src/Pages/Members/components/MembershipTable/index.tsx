import { useMutation } from "@apollo/client";
import { Add, AlarmOn, CancelScheduleSend, Delete } from "@mui/icons-material";
import { Box, Button, Stack } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import {
  DataGrid,
  GridRenderCellParams,
  GridRowParams,
  GridValueFormatterParams,
} from "@mui/x-data-grid";
import dayjs from "dayjs";
import { useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {
  DATE_FORMAT,
  membershipTypes,
  MEMBERSHIP_STATUS,
  PAYMENT_METHODS,
  periodOptions,
} from "../../../../constants";
import DialogModal from "../../../../Generic Components/Dialog";
import AutoComplete from "../../../../Generic Components/Form/AutoComplete";
import { DateInput } from "../../../../Generic Components/Form/DateInput";
import LoadingSpinner from "../../../../Generic Components/LoadingSpinner";
import { ACTIVATE_MEMBERSHIP } from "../../../../graphql/mutations/activateMembership";
import { HOLD_MEMBERSHIP } from "../../../../graphql/mutations/holdMembership";
import { Membership } from "../../../../types";
import { getMaxDate } from "../../../../utils";
import { GET_MEMBER } from "../../../../graphql/queries/member";
import { GET_MEMBERS } from "../../../../graphql/queries/members";

interface Props {
  memberships: Membership[];
}
export default function MembershipTable({ memberships }: Props) {
  const { id } = useParams();
  const maxEndDate = getMaxDate(memberships.map((m) => m.endDate as string));
  const [openHoldMembershipDialog, setOpenHoldMembershipDialog] =
    useState(false);
  const [openActivateMembershipDialog, setOpenActivateHoldMembershipDialog] =
    useState(false);
  const { setValue, watch } = useFormContext();
  const onDeleteNewMembership = () => {
    setValue("newMembership", null);
    setValue("payment", null);
  };

  const [selectedRow, setSelectedRow] = useState<Membership>();
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
      renderCell: (params: GridRenderCellParams<string>) => {
        const { value } = params;
        if (value === MEMBERSHIP_STATUS.EXPIRED) {
          return (
            <Button
              color="error"
              variant="contained"
              size="small"
              sx={{ cursor: "default" }}
            >
              Expired
            </Button>
          );
        } else if (value === MEMBERSHIP_STATUS.ACTIVE) {
          return (
            <Button
              color="success"
              variant="contained"
              sx={{ cursor: "default" }}
              size="small"
            >
              Active
            </Button>
          );
        }
        return (
          <Button
            color="inherit"
            sx={{ cursor: "default" }}
            variant="contained"
            size="small"
          >
            On Hold
          </Button>
        );
      },
    },
    {
      field: "action",
      headerName: "Actions",
      width: 110,
      type: "actions",
      getActions: (params: GridRowParams) => {
        const { status } = params.row;
        const isActive = status === MEMBERSHIP_STATUS.ACTIVE;
        const isExpired = status === MEMBERSHIP_STATUS.EXPIRED;
        if (isExpired) return [];
        return [
          <Tooltip
            title={
              params.row.isNew
                ? "Delete New Membership"
                : isActive
                ? "Hold Membership"
                : "Activate Membership"
            }
          >
            {params.row?.isNew ? (
              <div onClick={() => onDeleteNewMembership()}>
                <Delete color="error" sx={{ cursor: "pointer" }} />
              </div>
            ) : isActive ? (
              <CancelScheduleSend
                color="action"
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  setOpenHoldMembershipDialog(true);
                  setSelectedRow(params.row);
                }}
              />
            ) : (
              <AlarmOn
                color="success"
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  setOpenActivateHoldMembershipDialog(true);
                  setSelectedRow(params.row);
                }}
              />
            )}
          </Tooltip>,
        ];
      },
    },
  ];
  const newMembership = watch("newMembership");
  const onNewMembership = () => {
    const hasOneActiveMembership = memberships.some(
      (membership) => membership.status === MEMBERSHIP_STATUS.ACTIVE
    );
    setValue("newMembership", {
      membershipType: "Standard",
      term: "1 Month",
      startDate: hasOneActiveMembership ? dayjs(maxEndDate) : dayjs(),
      endDate: hasOneActiveMembership
        ? dayjs(maxEndDate).add(1, "month")
        : dayjs().add(1, "month"),
      status: hasOneActiveMembership ? "H" : "A",
      isNew: true,
      id: uuidv4(),
    });
    setValue("payment", {
      paymentMethod: PAYMENT_METHODS[0],
    });
  };
  const _rows = useMemo(() => {
    return newMembership ? [newMembership, ...memberships] : memberships;
  }, [newMembership, memberships]);
  const [holdMembership, { loading: holdMembershipLoading }] =
    useMutation(HOLD_MEMBERSHIP);
  const [activateMembership, { loading: activateMembershipLoading }] =
    useMutation(ACTIVATE_MEMBERSHIP);
  const onHoldMembership = () => {
    if (selectedRow && selectedRow.id && id) {
      holdMembership({
        variables: { id: selectedRow.id },
        refetchQueries: [
          { query: GET_MEMBER, variables: { memberId: id } },
          { query: GET_MEMBERS },
        ],
      }).then(() => {
        setOpenHoldMembershipDialog(false);
      });
    }
  };
  const onActivateMembership = () => {
    if (selectedRow && selectedRow.id && id) {
      activateMembership({
        variables: { id: selectedRow.id, memberId: id },
        refetchQueries: [
          { query: GET_MEMBER, variables: { memberId: id } },
          { query: GET_MEMBERS },
        ],
      }).then(() => {
        setOpenActivateHoldMembershipDialog(false);
      });
    }
  };
  return (
    <Box width="100%" sx={{ pl: "32px" }}>
      {(holdMembershipLoading || activateMembershipLoading) && (
        <LoadingSpinner />
      )}
      <Stack direction="row" justifyContent="space-between" sx={{ mt: 1 }}>
        <h2 style={{ marginBottom: "5px", marginTop: "5px" }}>Memberships</h2>
        {!newMembership && (
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
          rows={_rows}
          columns={columns}
          disableSelectionOnClick
          autoPageSize
          sx={{
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: "700",
            },
          }}
          initialState={{
            sorting: {
              sortModel: [{ field: "startDate", sort: "desc" }],
            },
          }}
        />
      </div>
      <DialogModal
        content="By holding the membership, the member can not check in and membership End Date will be extended based on the holding period. Do you want to continue?"
        title="Hold Membership"
        handleClose={() => {
          setOpenHoldMembershipDialog(false);
        }}
        handleContinue={() => {
          onHoldMembership();
        }}
        open={openHoldMembershipDialog}
      />
      <DialogModal
        content="Because only 1 membership can be active for this member.
        By activate the membership, this set the membership to be active and hold other memberships. 
        Do you want to continue?"
        title="Activate Membership"
        handleClose={() => {
          setOpenActivateHoldMembershipDialog(false);
        }}
        handleContinue={() => {
          onActivateMembership();
        }}
        open={openActivateMembershipDialog}
      />
    </Box>
  );
}
