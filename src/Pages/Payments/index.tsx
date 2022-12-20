import { useQuery } from "@apollo/client";
import { Visibility } from "@mui/icons-material";
import { Box, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import {
  DataGrid,
  GridRenderCellParams,
  GridValueFormatterParams,
} from "@mui/x-data-grid";
import dayjs from "dayjs";
import { add, round } from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";
import DialogModal from "../../Generic Components/Dialog";
import LoadingSpinner from "../../Generic Components/LoadingSpinner";
import SearchBar from "../../Generic Components/SearchBar";
import { DATE_FORMAT } from "../../constants";
import { PAYMENTS } from "../../graphql/queries/payments";
import { PaymentRes, Product } from "../../types";
import { formatCurrency, searchData } from "../../utils";

export default function Payments() {
  const { data, loading } = useQuery(PAYMENTS);
  const rows = useMemo(
    () => (data?.payments?.data as PaymentRes[]) || [],
    [data]
  );
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogProducts, setDialogProducts] = useState<Product[] | undefined>();
  const columns = [
    {
      field: "createdAt",
      headerName: "Created Date",
      width: 200,
      valueFormatter: (params: GridValueFormatterParams<string>) =>
        dayjs(params.value).format(DATE_FORMAT),
    },
    {
      field: "total",
      headerName: "Total Price",
      width: 200,
      valueFormatter: (params: GridValueFormatterParams<string>) =>
        formatCurrency(params.value),
    },
    {
      field: "collected",
      headerName: "Collected Amount",
      width: 200,
      valueFormatter: (params: GridValueFormatterParams<string>) =>
        formatCurrency(params.value),
    },
    {
      field: "change",
      headerName: "Change Amount",
      width: 200,
      valueFormatter: (params: GridValueFormatterParams<string>) =>
        formatCurrency(params.value),
    },
    {
      field: "paymentMethod",
      headerName: "Payment Method",
      width: 200,
    },
    {
      field: "membershipType",
      headerName: "Membership Type",
      width: 200,
    },
    {
      field: "term",
      headerName: "Term",
      width: 100,
    },
    {
      field: "memberName",
      headerName: "Paid By",
      width: 200,
    },
    {
      field: "productList",
      headerName: "Products",
      width: 150,
      renderCell: (params: GridRenderCellParams<PaymentRes>) => {
        if (params.row.products) {
          return (
            <Tooltip title="View Purchased Products">
              <IconButton
                color="info"
                onClick={() => {
                  setOpenDialog(true);
                  setDialogProducts(params.row.products);
                }}
              >
                <Visibility />
              </IconButton>
            </Tooltip>
          );
        }
      },
    },
  ];
  const productColumns = [
    {
      field: "productName",
      headerName: "Product Name",
      width: 400,
    },
    {
      field: "productType",
      headerName: "Product Type",
      width: 200,
    },
    {
      field: "supplier",
      headerName: "Supplier",
      width: 200,
    },
    {
      field: "unitPrice",
      headerName: "Unit Price",
      width: 200,
      valueFormatter: (params: GridValueFormatterParams<string>) =>
        formatCurrency(params.value),
    },
    {
      field: "buyQuantity",
      headerName: "Purchased Quantity",
      width: 200,
    },
    {
      field: "discountPercent",
      headerName: "Discount Percent",
      width: 200,
      valueFormatter: (params: GridValueFormatterParams<string>) =>
        `${params.value}%`,
    },
  ];

  const dialogContent = (
    <div style={{ height: 320, width: "100%", background: "white" }}>
      <DataGrid
        rows={dialogProducts || []}
        columns={productColumns}
        disableSelectionOnClick
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        pageSize={5}
        loading={loading}
        pagination
        getRowId={(row) => row.productId}
        sx={{
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: "700",
          },
        }}
      />
    </div>
  );
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
  const totalAmount = searchedRows.reduce(
    (total, r) => round(add(total, Number(r.total)), 2),
    0
  );

  return (
    <Box sx={{ p: "15px 2% 10px" }}>
      {loading && <LoadingSpinner />}
      <Stack spacing={2}>
        <SearchBar placeholder="Search..." onSearch={onSearch} />
        <Typography color="red">
          Note: Search date format is: YYYY/MM/DD, eg: 2022/12/20
        </Typography>
        <Typography
          color="teal"
          fontWeight={700}
        >{`Total Amount of all payments: ${formatCurrency(
          totalAmount.toString()
        )}`}</Typography>
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
      <DialogModal
        open={openDialog}
        title="Purchased Products Details"
        content={dialogContent}
        handleClose={() => {
          setOpenDialog(false);
          setDialogProducts(undefined);
        }}
        noLabel="Close"
        disableYes
        fullWidth
      />
    </Box>
  );
}
