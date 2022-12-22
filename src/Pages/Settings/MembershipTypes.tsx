import { useMutation, useQuery } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Add, Delete, Edit, Save } from "@mui/icons-material";
import { Box, Button, Stack, TextField } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import {
  DataGrid,
  GridRenderCellParams,
  GridRowParams,
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import DialogModal from "../../Generic Components/Dialog";
import LoadingSpinner from "../../Generic Components/LoadingSpinner";
import SuccessAlert from "../../Generic Components/SuccessAlert";
import { ADD_MEMBERSHIP_TYPE } from "../../graphql/mutations/addMembershipType";
import { DELELE_MEMBERSHIP_TYPE } from "../../graphql/mutations/deleteMembershipType";
import { UPDATE_MEMBERSHIP_TYPE } from "../../graphql/mutations/updateMembershipType";
import { GET_MEMBERSHIP_TYPES } from "../../graphql/queries/membershipTypes";
import { MembershipType } from "../../types";
import { formatCurrency } from "../../utils";
import { validationSchema } from "./membershipTypeValidationSchema";

export default function MembershipTypes() {
  const { data, loading } = useQuery(GET_MEMBERSHIP_TYPES);
  const membershipTypes = data?.membershipTypes?.data as MembershipType[];

  const [rows, setRows] = useState<MembershipType[]>(membershipTypes);
  useEffect(() => {
    setRows(membershipTypes);
  }, [membershipTypes]);
  const [isEditing, setIsEditing] = useState(false);
  const [isAddNew, setIsAddNew] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openAddNewAlert, setOpenAddNewAlert] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [openEditAlert, setOpenEditAert] = useState(false);
  const [selectedRow, setSelectedRow] = useState<MembershipType>();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const methods = useForm<MembershipType>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: "",
      discountPercent: 0,
    },
  });

  const {
    handleSubmit,
    register,
    watch,
    reset,
    formState: { errors },
  } = methods;
  useEffect(() => {
    if (isEditing) reset(selectedRow);
  }, [selectedRow, isEditing, reset]);

  const [add, { data: addNewMessage, loading: addNewLoading }] =
    useMutation(ADD_MEMBERSHIP_TYPE);
  const [
    deleteMembershipType,
    { data: deleteMessage, loading: deleteLoading },
  ] = useMutation(DELELE_MEMBERSHIP_TYPE);
  const [update, { data: updateMessage, loading: updateLoading }] = useMutation(
    UPDATE_MEMBERSHIP_TYPE
  );

  const onSubmit: SubmitHandler<MembershipType> = (data) => {
    if (!isEditing) {
      add({
        variables: data,
        refetchQueries: [{ query: GET_MEMBERSHIP_TYPES }],
      }).then(() => {
        setIsAddNew(false);
        setOpenAddNewAlert(true);
        reset();
      });
    } else {
      update({
        variables: data,
        refetchQueries: [{ query: GET_MEMBERSHIP_TYPES }],
      }).then(() => {
        setIsEditing(false);
        setOpenEditAert(true);
        setSelectedRow(undefined);
      });
    }
  };
  const onAddNew = () => {
    const newMembershipType = {
      id: uuidv4(),
      name: "",
      pricePerMonth: 0,
      discountPercent: 0,
      isNew: true,
    };
    setRows((pre) =>
      pre && pre.length > 0 ? [newMembershipType, ...pre] : [newMembershipType]
    );
    setIsAddNew(true);
  };
  const onDeleteNewRow = () => {
    setRows((pre) => pre.filter((i) => !i.isNew));
    setIsAddNew(false);
  };
  const name = watch("name");
  const membershipTypeNames =
    membershipTypes
      ?.map((m) => m.name.toLocaleLowerCase())
      .filter((n) => n !== selectedRow?.name?.toLocaleLowerCase()) || [];

  const hasNameError = membershipTypeNames.includes(name.toLocaleLowerCase());

  const onDeleteRow = () => {
    if (selectedRow) {
      const { id } = selectedRow;
      deleteMembershipType({
        variables: { id },
        refetchQueries: [{ query: GET_MEMBERSHIP_TYPES }],
      }).then(() => {
        setOpenDeleteDialog(false);
        setOpenDeleteAlert(true);
        setSelectedRow(undefined);
      });
    }
  };
  const columns = [
    {
      field: "name",
      headerName: "Membership Type Name",
      width: 200,
      renderCell: (params: GridRenderCellParams<string>) =>
        params.row.isNew || params.id === selectedRow?.id ? (
          <TextField
            required
            {...register("name")}
            variant="standard"
            error={hasNameError || Boolean(errors.name)}
            helperText={
              (hasNameError || Boolean(errors.name)) &&
              (errors.name?.message || `${name} is duplicated!`)
            }
          />
        ) : (
          params.value
        ),
    },
    {
      field: "pricePerMonth",
      headerName: "Monthly Fee",
      width: 150,
      renderCell: (params: GridRenderCellParams<string>) =>
        params.row.isNew || params.id === selectedRow?.id ? (
          <TextField
            required
            {...register("pricePerMonth")}
            variant="standard"
            InputProps={{ startAdornment: "$" }}
            error={Boolean(errors.pricePerMonth)}
            helperText={
              Boolean(errors.pricePerMonth) && errors.pricePerMonth?.message
            }
          />
        ) : (
          formatCurrency(params.value)
        ),
    },
    {
      field: "discountPercent",
      headerName: "Discount Percent",
      width: 150,
      type: "number",
      renderCell: (params: GridRenderCellParams<string>) =>
        params.row.isNew || params.id === selectedRow?.id ? (
          <TextField
            required
            {...register("discountPercent")}
            variant="standard"
            InputProps={{ endAdornment: "%" }}
            inputProps={{ style: { textAlign: "right" } }}
            error={Boolean(errors.discountPercent)}
            helperText={
              Boolean(errors.discountPercent) && errors.discountPercent?.message
            }
          />
        ) : (
          `${params.value}%`
        ),
    },
    {
      field: "action",
      headerName: "Actions",
      width: 170,
      type: "actions",
      getActions: (params: GridRowParams) =>
        params.row.isNew
          ? [
              <Tooltip title="Delete MembershipType">
                <Delete
                  color="error"
                  sx={{ cursor: "pointer" }}
                  onClick={() => onDeleteNewRow()}
                />
              </Tooltip>,
            ]
          : [
              <Tooltip title="Edit Membership Type">
                <Edit
                  onClick={() => {
                    if (isAddNew) {
                      setOpenDialog(true);
                    } else {
                      setSelectedRow(params.row as MembershipType);
                      setIsEditing(true);
                    }
                  }}
                  color="warning"
                  sx={{ cursor: "pointer" }}
                />
              </Tooltip>,
              <Tooltip title="Delete MembershipType">
                <Delete
                  color="error"
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    setSelectedRow(params.row as MembershipType);
                    setOpenDeleteDialog(true);
                  }}
                />
              </Tooltip>,
            ],
    },
  ];
  return (
    <Box>
      <h3>Membership Types</h3>
      {(addNewLoading || deleteLoading || updateLoading) && <LoadingSpinner />}
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction="row-reverse" mb={1}>
            {!isAddNew && !isEditing && (
              <Button
                variant="contained"
                size="small"
                startIcon={<Add />}
                onClick={() => {
                  onAddNew();
                }}
              >
                Add New
              </Button>
            )}
            {(isEditing || isAddNew) && (
              <Button
                variant="contained"
                size="small"
                color="warning"
                startIcon={<Save />}
                type="submit"
              >
                Save
              </Button>
            )}
          </Stack>
          <div style={{ height: 350, width: "100%", background: "white" }}>
            <DataGrid
              rows={rows || []}
              columns={columns}
              disableSelectionOnClick
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
              pageSize={5}
              loading={loading}
              pagination
              sx={{
                "& .MuiDataGrid-columnHeaderTitle": {
                  fontWeight: "700",
                },
              }}
            />
          </div>
        </form>
      </FormProvider>
      <DialogModal
        content="You are adding new membership type. Please complete this process first to edit another!"
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
        disableYes
        noLabel="Close"
        title="Info"
      />
      <DialogModal
        content="Do you want to delete the membership type?"
        open={openDeleteDialog}
        handleClose={() => setOpenDeleteDialog(false)}
        title="Confirm Delete"
        handleContinue={() => onDeleteRow()}
      />
      <SuccessAlert
        open={openAddNewAlert}
        onClose={() => setOpenAddNewAlert(false)}
      >
        {addNewMessage?.addMembershipType?.data}
      </SuccessAlert>
      <SuccessAlert
        open={openDeleteAlert}
        onClose={() => setOpenDeleteAlert(false)}
      >
        {deleteMessage?.deleteMembershipType?.data}
      </SuccessAlert>
      <SuccessAlert open={openEditAlert} onClose={() => setOpenEditAert(false)}>
        {updateMessage?.updateMembershipType?.data}
      </SuccessAlert>
    </Box>
  );
}
