import { Divider } from "@material-ui/core";
import {
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
import { round, subtract } from "lodash";
import { useFormContext } from "react-hook-form";
import { PAYMENT_TYPES } from "../../constants";
import { calculateAmount, formatCurrency } from "../../utils";
import AutoComplete from "../Form/AutoComplete";
import "./index.scss";

export default function SaleSummary() {
  const { register, watch, setValue } = useFormContext();
  const term = watch("payment.term");
  const membershipType = watch("payment.productName");
  const paymentMethod = watch("payment.paymentMethod");
  const { amount, discountPercent } = calculateAmount(term, membershipType);
  const total = formatCurrency(amount);
  const collected = watch("payment.collected");
  const hasCollectedError = collected
    ? Number(collected) < Number(amount)
    : false;
  const change =
    !hasCollectedError && collected
      ? round(subtract(Number(collected), Number(amount)), 2)
      : undefined;
  setValue("payment.change", change);
  return (
    <div className="sale-summary">
      <h1 className="text-center">Sale Summary</h1>
      <hr className="divider" />
      <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow className="table-header">
              <TableCell>Membership Type</TableCell>
              <TableCell align="center">Term</TableCell>
              <TableCell align="center">Discount</TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              key="membership"
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell scope="row">{membershipType}</TableCell>
              <TableCell align="center">{term}</TableCell>
              <TableCell align="center">{discountPercent}%</TableCell>
              <TableCell align="center">{formatCurrency(amount)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Divider />
      {/* <h2>Other Products</h2>
      <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow className="table-header">
              <TableCell>Name</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Total</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              key="membership"
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell scope="row">{membershipType} Membership</TableCell>
              <TableCell align="center">{term}</TableCell>
              <TableCell align="center">{formatCurrency(amount)}</TableCell>
              <TableCell align="center">{formatCurrency(amount)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Divider /> */}
      <AutoComplete
        fieldName="payment.paymentMethod"
        label="Payment Method"
        options={PAYMENT_TYPES}
        defaultValue={PAYMENT_TYPES[0]}
        sx={{ marginTop: "20px" }}
      />
      {paymentMethod === PAYMENT_TYPES[0] && (
        <>
          <TextField
            label="Collected"
            variant="standard"
            {...register("payment.collected")}
            InputProps={{ startAdornment: "$" }}
            sx={{ marginTop: "20px" }}
            error={hasCollectedError}
            type="number"
            helperText={hasCollectedError && "Please collect more money"}
          />
          <TextField
            label="Change"
            variant="standard"
            {...register("payment.change")}
            InputProps={{ startAdornment: "$", readOnly: true }}
            sx={{ marginTop: "20px", marginBottom: "40px" }}
          />
        </>
      )}
      <Divider />
      <Stack
        direction="row"
        justifyContent="space-between"
        marginTop={3}
        padding={1}
      >
        <p className="bold size-l">Total</p>
        <p className="bold size-l">{total}</p>
      </Stack>
    </div>
  );
}
