import { useMutation, useQuery } from "@apollo/client";
import { Add, Delete, Edit } from "@mui/icons-material";
import { Box, Stack, Tooltip } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import { GridRowParams } from "@mui/x-data-grid/models";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import DialogModal from "../../Generic Components/Dialog";
import SearchBar from "../../Generic Components/SearchBar";
import { DELELE_PRODUCT } from "../../graphql/mutations/deleteProduct";
import { GET_PRODUCTS } from "../../graphql/queries/products";
import { ROUTES } from "../../routes";
import { Product } from "../../types";
import { searchData } from "../../utils";
import SuccessAlert from "../../Generic Components/SuccessAlert";

export default function Products() {
  const { data, loading } = useQuery(GET_PRODUCTS);
  const rows = useMemo(() => (data?.products?.data as Product[]) || [], [data]);
  const [openSuccessMessage, setOpenSuccessMessage] = useState(false);
  const [deleteProduct, { data: deleteRes, loading: deleteLoading }] =
    useMutation(DELELE_PRODUCT);
  const successMessage = deleteRes?.deleteProduct?.data;
  const [selectedProduct, setSelectedProduct] = useState<Product>();
  const [openDialog, setOpenDialog] = useState(false);
  const onDeleteProduct = () => {
    if (selectedProduct && selectedProduct.id)
      deleteProduct({
        variables: { deleteProductId: selectedProduct?.id },
        refetchQueries: [{ query: GET_PRODUCTS }],
      }).then(() => {
        setOpenSuccessMessage(true);
      });
    setOpenDialog(false);
  };
  const columns = [
    { field: "productType", headerName: "Product Type", width: 150 },
    { field: "productName", headerName: "Product Name", width: 300 },
    {
      field: "unitPrice",
      headerName: "Unit Price",
      width: 100,
      type: "number",
      renderCell: (params: GridRenderCellParams<string>) => `$${params.value}`,
    },
    {
      field: "photo",
      headerName: "Photo",
      width: 100,
      renderCell: (params: GridRenderCellParams<string>) => (
        <Avatar
          alt={`Product-${params.row?.productName}-photo`}
          src={params.value}
        />
      ),
    },
    { field: "supplier", headerName: "Supplier", width: 100 },
    {
      field: "discountPercent",
      headerName: "Discount",
      width: 100,
      type: "number",
      renderCell: (params: GridRenderCellParams<string>) => `${params.value} %`,
    },
    {
      field: "action",
      headerName: "Actions",
      width: 200,
      type: "actions",
      getActions: (params: GridRowParams) => [
        <Tooltip title="Edit Product">
          <Edit
            onClick={() =>
              navigate(ROUTES.EDITPRODUCT.replace(":id", params.id as string))
            }
            color="warning"
            sx={{ cursor: "pointer" }}
          />
        </Tooltip>,
        <Tooltip title="Delete Product">
          <Delete
            color="error"
            sx={{ cursor: "pointer" }}
            onClick={() => {
              setSelectedProduct(params.row);
              setOpenDialog(true);
            }}
          />
        </Tooltip>,
      ],
    },
  ];
  const [searchedRows, setSearchedRows] = useState(rows);
  useEffect(() => {
    setSearchedRows(rows);
  }, [rows]);

  const onSearch = useCallback(
    (value: string) => {
      const searchedData = searchData(rows, value, ["photo", "id"]);
      setSearchedRows(searchedData);
    },
    [rows]
  );
  const navigate = useNavigate();
  return (
    <Box sx={{ p: "15px 2% 10px" }}>
      <Stack spacing={2}>
        <SearchBar placeholder="Search Product..." onSearch={onSearch} />
        <Stack direction="row">
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => navigate(ROUTES.NEWPRODUCT)}
          >
            Add New
          </Button>
        </Stack>
        <div style={{ height: 650, width: "100%", background: "white" }}>
          <DataGrid
            rows={searchedRows}
            columns={columns}
            loading={loading || deleteLoading}
            disableSelectionOnClick
            rowsPerPageOptions={[10, 25, 50, 100]}
            pageSize={10}
            pagination
            sx={{
              "& .MuiDataGrid-columnHeaderTitle": {
                fontWeight: "700",
              },
              width: { xl: "70%" },
            }}
          />
        </div>
        <DialogModal
          open={openDialog}
          title="Delete"
          content={`Do you want to delete product: ${selectedProduct?.productName} ?`}
          handleClose={() => {
            setOpenDialog(false);
          }}
          handleContinue={onDeleteProduct}
        />
        <SuccessAlert
          open={openSuccessMessage}
          onClose={() => setOpenSuccessMessage(false)}
        >
          {successMessage}
        </SuccessAlert>
      </Stack>
    </Box>
  );
}
