import { useMutation, useQuery } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Add, Cancel, SaveAlt } from "@mui/icons-material";
import { Box, Button, Stack } from "@mui/material";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import LoadingSpinner from "../../Generic Components/LoadingSpinner";
import SearchBar from "../../Generic Components/SearchBar";
import { STOCK_IN } from "../../graphql/mutations/stockIn";
import { GET_INVENTORY } from "../../graphql/queries/inventory";
import { InventoryType, Product } from "../../types";
import { searchData } from "../../utils";
import StockInForm from "./StockInForm";
import { validationSchema } from "./validationSchema";

export default function Inventory() {
  const [isStockIn, setIsStockIn] = useState(false);
  const { data, loading } = useQuery(GET_INVENTORY);
  const rows = useMemo(
    () => (data?.inventory?.data as Product[]) || [],
    [data]
  );

  const columns = [
    { field: "productType", headerName: "Product Name", width: 300 },
    { field: "productName", headerName: "Product Name", width: 400 },
    { field: "supplier", headerName: "Supplier", width: 230 },
    {
      field: "quantity",
      headerName: "Stocks",
      width: 230,
      type: "number",
    },
    {
      field: "status",
      headerName: "Status",
      width: 400,
      type: "actions",
      renderCell: (params: GridRenderCellParams<string>) =>
        params.row.quantity > 0 ? (
          <Button
            variant="contained"
            color="success"
            sx={{ cursor: "default" }}
          >
            Available
          </Button>
        ) : (
          <Button variant="contained" color="error" sx={{ cursor: "default" }}>
            Out Of Stock
          </Button>
        ),
    },
  ];

  const methods = useForm<InventoryType>({
    resolver: yupResolver(validationSchema),
  });
  const { handleSubmit, reset } = methods;
  const [stockIn, { loading: stockInLoading }] = useMutation(STOCK_IN);

  const onSubmit: SubmitHandler<InventoryType> = (data) => {
    stockIn({
      variables: { productId: data.product.value, quantity: data.quantity },
      refetchQueries: [{ query: GET_INVENTORY }],
    }).then(() => {
      reset();
    });
  };

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

  return (
    <Box sx={{ p: "15px 2% 10px" }}>
      {stockInLoading && <LoadingSpinner />}
      <Stack spacing={2}>
        <SearchBar placeholder="Search Product..." onSearch={onSearch} />
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack direction="row-reverse" spacing={2}>
              {isStockIn && (
                <Button
                  variant="contained"
                  startIcon={<SaveAlt />}
                  color="warning"
                  type="submit"
                >
                  Save
                </Button>
              )}
              <Button
                variant="contained"
                startIcon={isStockIn ? <Cancel /> : <Add />}
                onClick={() => {
                  setIsStockIn((prev) => !prev);
                  if (isStockIn) reset();
                }}
              >
                {isStockIn ? "Cancel" : "Stock In"}
              </Button>
            </Stack>
            {isStockIn && <StockInForm />}
          </form>
        </FormProvider>
        <div style={{ height: 600, width: "100%", background: "white" }}>
          <DataGrid
            rows={searchedRows}
            columns={columns}
            disableSelectionOnClick
            rowsPerPageOptions={[10, 25, 50, 100]}
            pageSize={10}
            loading={loading}
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
