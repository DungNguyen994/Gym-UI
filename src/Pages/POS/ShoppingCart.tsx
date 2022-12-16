import { useMutation, useQuery } from "@apollo/client";
import { Add, Cancel, Print, Remove } from "@mui/icons-material";
import {
  Autocomplete,
  Button,
  Divider,
  Drawer,
  IconButton,
  Paper,
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
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import LoadingSpinner from "../../Generic Components/LoadingSpinner";
import { PAYMENT_METHODS } from "../../constants";
import { ADD_PAYMENT } from "../../graphql/mutations/addPayment";
import { GET_MEMBERS } from "../../graphql/queries/members";
import { Member, Product } from "../../types";

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
  const { register, setValue, watch, handleSubmit } = useForm<FormValue>({
    defaultValues: {
      paymentMethod: PAYMENT_METHODS[0],
    },
  });
  const { data, loading } = useQuery(GET_MEMBERS);
  const members = data?.members.data as Member[];
  const paymentMethod = watch("paymentMethod");
  const [addPayment, { loading: addPaymentLoading }] = useMutation(ADD_PAYMENT);
  const total =
    selectedProducts?.reduce((total, product) => {
      return (
        total +
        (product.buyQuantity ? product.buyQuantity * product.unitPrice : 0)
      );
    }, 0) || 0;
  const collected = watch("collected");
  const collectMore = Number(collected || 0) < Number(total);
  useEffect(() => {
    if (!collectMore)
      setValue("change", round(subtract(Number(collected), Number(total)), 2));
    else setValue("change", 0);
  }, [collected, collectMore, setValue, total]);
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

  return (
    <div>
      <Drawer anchor="right" open={open} onClose={onClose}>
        {(addPaymentLoading || loading) && <LoadingSpinner />}
        <Stack
          className="sale-summary"
          spacing={2}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
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
                        <IconButton onClick={() => addOneItem(product)}>
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
              onChange={(e, newValue) =>
                setValue("memberId", newValue?.id || "")
              }
              disablePortal
              id="combo-box"
              options={
                members?.map((m) => ({
                  label: `${m.firstName} ${m.lastName} (Phone: ${m.phoneNumber})`,
                  id: m.id,
                })) || []
              }
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
                  {...register("collected")}
                  InputProps={{ startAdornment: "$" }}
                  sx={{ marginTop: "20px" }}
                  type="number"
                  error={collectMore}
                  helperText="Please collect more money"
                  required
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
          <Button startIcon={<Print />}>Print Receipt</Button>
        </Stack>
      </Drawer>
    </div>
  );
}
