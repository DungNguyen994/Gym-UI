import {
  Divider,
  Drawer,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Autocomplete,
  IconButton,
} from "@mui/material";
import { PAYMENT_METHODS } from "../../constants";
import { useForm } from "react-hook-form";
import { Product } from "../../types";
import { Add, Cancel, Remove } from "@mui/icons-material";

interface Props {
  open: boolean;
  onClose: () => void;
  selectedProducts?: Product[];
}

export default function ShoppingCartDrawer({
  onClose,
  open,
  selectedProducts,
}: Props) {
  const paymentMethod = PAYMENT_METHODS[0];
  const { register } = useForm();
  const total =
    selectedProducts?.reduce((total, product) => {
      return (
        total +
        (product.buyQuantity ? product.buyQuantity * product.unitPrice : 0)
      );
    }, 0) || 0;
  return (
    <div>
      <Drawer anchor="right" open={open} onClose={onClose}>
        <div className="sale-summary">
          <h1 className="text-center">Sale Summary</h1>
          <hr className="divider" />
          <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow className="table-header">
                  <TableCell>Product</TableCell>
                  <TableCell align="center">Quantity</TableCell>
                  <TableCell align="center">Price</TableCell>
                  <TableCell align="right">Total</TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedProducts?.map((product) => (
                  <TableRow
                    key={product.productId}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell scope="row">{product.productName}</TableCell>
                    <TableCell align="center">
                      <Stack direction="row" spacing={2} alignItems="center">
                        <IconButton>
                          <Add />
                        </IconButton>
                        <p> {product.buyQuantity}</p>
                        <IconButton>
                          <Remove />
                        </IconButton>
                      </Stack>
                    </TableCell>
                    <TableCell align="center">${product.unitPrice}</TableCell>
                    <TableCell align="center">
                      $
                      {product.buyQuantity
                        ? product.buyQuantity * product.unitPrice
                        : 0}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton>
                        <Cancel />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Divider />
          <Stack sx={{ padding: "20px" }}>
            <Autocomplete
              disablePortal
              id="combo-box"
              options={PAYMENT_METHODS}
              fullWidth
              defaultValue={PAYMENT_METHODS[0]}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Payment Method"
                  variant="standard"
                />
              )}
            />
            {paymentMethod === PAYMENT_METHODS[0] && (
              <Stack>
                <TextField
                  label="Collected"
                  variant="standard"
                  {...register("payment.collected")}
                  InputProps={{ startAdornment: "$" }}
                  sx={{ marginTop: "20px" }}
                  type="number"
                  required
                />
                <TextField
                  label="Change"
                  variant="standard"
                  {...register("payment.change")}
                  InputProps={{ startAdornment: "$", readOnly: true }}
                  sx={{ marginTop: "20px", marginBottom: "40px" }}
                />
              </Stack>
            )}
          </Stack>
          <Divider />
          <Stack
            direction="row"
            justifyContent="space-between"
            marginTop={3}
            padding={1}
          >
            <p className="bold size-l">Total</p>
            <p className="bold size-l">${total}</p>
          </Stack>
        </div>
      </Drawer>
    </div>
  );
}
