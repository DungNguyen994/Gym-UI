import { useMutation, useQuery } from "@apollo/client";
import { Add, Cancel, Remove } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import produce from "immer";
import { round, subtract } from "lodash";
import { SubmitHandler, useForm } from "react-hook-form";
import LoadingSpinner from "../../Generic Components/LoadingSpinner";
import { PAYMENT_METHODS } from "../../constants";
import { ADD_PAYMENT } from "../../graphql/mutations/addPayment";
import { GET_INVENTORY } from "../../graphql/queries/inventory";
import { GET_MEMBERS } from "../../graphql/queries/members";
import { PAYMENTS } from "../../graphql/queries/payments";
import { Member, Product } from "../../types";
import { useLocation } from "react-router-dom";

interface Props {
  open: boolean;
  onClose: () => void;
  selectedProducts?: Product[];
  removeProduct: (id: string) => void;
  removeOneItem: (id: string) => void;
  addOneItem: (product: Product) => void;
  clearCart: () => void;
}
interface FormValue {
  collected: number;
  change: number;
  paymentMethod: string;
  memberId?: string;
}
export default function ShoppingCartDrawer({
  onClose,
  open,
  selectedProducts,
  removeProduct,
  removeOneItem,
  addOneItem,
  clearCart,
}: Props) {
  const { state } = useLocation();

  const { register, setValue, watch, handleSubmit } = useForm<FormValue>({
    defaultValues: {
      paymentMethod: PAYMENT_METHODS[0],
      memberId: state?.memberId || "",
    },
  });
  const { data, loading } = useQuery(GET_MEMBERS);
  const members = data?.members.data as Member[];
  const paymentMethod = watch("paymentMethod");
  const [addPayment, { loading: addPaymentLoading }] = useMutation(
    ADD_PAYMENT,
    { refetchQueries: [{ query: GET_INVENTORY }, { query: PAYMENTS }] }
  );
  const total =
    selectedProducts?.reduce((total, product) => {
      return (
        total +
        (product.buyQuantity ? product.buyQuantity * product.unitPrice : 0)
      );
    }, 0) || 0;
  const collected = watch("collected");
  const collectMore =
    collected !== undefined && Number(collected || 0) < Number(total);
  setValue(
    "change",
    collectMore ? round(subtract(Number(collected), Number(total)), 2) : 0
  );
  const onSubmit: SubmitHandler<FormValue> = (data) => {
    const products = produce(selectedProducts, (draft) => {
      draft?.forEach((p) => {
        p.inventoryId = p.id;
        delete p.id;
        delete p.photo;
        delete p.quantity;
      });
      return draft;
    });
    const payload = {
      ...data,
      collected: Number(data.collected),
      total,
      products,
    };
    addPayment({ variables: payload }).then(() => {
      onClose();
      clearCart();
    });
  };
  const memberOptions =
    members?.map((m) => ({
      label: `${m.firstName} ${m.lastName} (Phone: ${m.phoneNumber})`,
      id: m.id,
    })) || [];
  const content = (
    <Box>
      {(addPaymentLoading || loading) && <LoadingSpinner />}
      <Stack
        className="sale-summary"
        spacing={2}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-center">Sale Summary</h1>
        <hr className="divider" />
        <TableContainer>
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
                      <IconButton
                        onClick={() => {
                          const buyQuantity = product.buyQuantity || 0;
                          const stocks = product.quantity || 0;
                          if (stocks > buyQuantity) addOneItem(product);
                        }}
                      >
                        <Add color="info" />
                      </IconButton>
                      <p> {product.buyQuantity}</p>
                      <IconButton
                        onClick={() => removeOneItem(product.productId)}
                      >
                        <Remove color="info" />
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
                    <IconButton
                      onClick={() => removeProduct(product.productId)}
                    >
                      <Cancel color="error" />
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
            sx={{ mb: 2 }}
            defaultValue={memberOptions.find((m) => m.id === state?.memberId)}
            onChange={(e, newValue) => setValue("memberId", newValue?.id || "")}
            disablePortal
            id="combo-box"
            options={memberOptions}
            fullWidth
            getOptionLabel={(member) => member.label}
            renderInput={(params) => (
              <TextField {...params} label="Member" variant="standard" />
            )}
          />
          <Autocomplete
            onChange={(e, newValue) =>
              setValue("paymentMethod", newValue || "")
            }
            value={watch("paymentMethod")}
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
                InputProps={{ startAdornment: "$" }}
                sx={{ marginTop: "20px" }}
                error={collectMore}
                helperText={collectMore && "Please collect more money!"}
                required
                type="number"
                onChange={(e) => {
                  setValue("collected", Number(e.target.value));
                }}
              />
              <TextField
                label="Change"
                variant="standard"
                {...register("change")}
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
        <Button variant="contained" type="submit">
          Make Payment
        </Button>
      </Stack>
    </Box>
  );
  return (
    <div>
      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        variant="temporary"
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 300 },
        }}
      >
        {content}
      </Drawer>
      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box" },
        }}
      >
        {content}
      </Drawer>
    </div>
  );
}
