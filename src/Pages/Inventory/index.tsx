import { yupResolver } from "@hookform/resolvers/yup";
import { Add, Delete, Edit, Login } from "@mui/icons-material";
import { Box, Button, Stack, Tooltip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { GridRowParams } from "@mui/x-data-grid/models";
import SearchBar from "material-ui-search-bar";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { InventoryType } from "../../types";
import StockInForm from "./StockInForm";
import { validationSchema } from "./validationSchema";

export default function Inventory() {
  const navigate = useNavigate();
  const [isStockIn, setIsStockIn] = useState(false);
  const columns = [
    { field: "productName", headerName: "Product Name", width: 230 },
    {
      field: "stocks",
      headerName: "Stocks",
      width: 230,
      type: "number",
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
          <Edit onClick={() => {}} color="warning" sx={{ cursor: "pointer" }} />
        </Tooltip>,
        <Tooltip title="Delete Member">
          <Delete color="error" sx={{ cursor: "pointer" }} onClick={() => {}} />
        </Tooltip>,
      ],
    },
  ];
  const rows = [
    { id: 1, productName: "Water Bottle", stocks: 10 },
    { id: 2, productName: "Water Bottle", stocks: 10 },
    { id: 3, productName: "Water Bottle", stocks: 10 },
  ];
  const methods = useForm<InventoryType>({
    resolver: yupResolver(validationSchema),
  });
  const { handleSubmit, reset } = methods;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const onSubmit: SubmitHandler<InventoryType> = (data) => {
    console.log(data);
  };
  const onSearch = (value: string) => {};
  return (
    <Box sx={{ p: "15px 2% 10px" }}>
      <Stack spacing={2}>
        <SearchBar
          placeholder="Search product..."
          style={{ width: "50%" }}
          onChange={onSearch}
          onCancelSearch={() => {}}
        />
        <Stack direction="row-reverse">
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setIsStockIn(true)}
          >
            Stock In
          </Button>
        </Stack>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <StockInForm />
          </form>
        </FormProvider>
        <div style={{ height: 600, width: "100%", background: "white" }}>
          <DataGrid
            rows={rows}
            columns={columns}
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
      </Stack>
    </Box>
  );
}
