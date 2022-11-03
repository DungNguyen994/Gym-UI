import { Grid } from "@mui/material";
import dayjs from "dayjs";
import { useFormContext } from "react-hook-form";
import {
  membershipTypes,
  PAYMENT_TYPES,
  periodOptions,
} from "../../../constants";
import AutoComplete from "../../../Generic Components/Form/AutoComplete";
import GridItemTextField from "../../../Generic Components/Form/GridItemTextField";
import Discount from "../../../Generic Components/Icons/Discount";
import Well from "../../../Generic Components/Well";
import { calculateAmount } from "./utils";

export default function FirstPayment() {
  const { watch, setValue } = useFormContext();
  const [term, membershipType, startDate] = watch([
    "term",
    "membershipType",
    "startDate",
  ]);
  const { amount, discountPercent } = calculateAmount(term, membershipType);
  setValue("amount", amount);
  setValue("endDate", dayjs(startDate).add(1, "month"));
  return (
    <Well headerText="First Payment">
      <Grid container spacing={3}>
        <AutoComplete
          fieldName="term"
          label="Term"
          defaultValue={periodOptions[0]}
          options={periodOptions}
        />
        <AutoComplete
          fieldName="membershipType"
          label="Membership Type"
          options={membershipTypes}
          defaultValue={membershipTypes[0]}
        />
        <GridItemTextField
          label="Amount"
          fieldName="amount"
          readonly
          prefix="$"
          suffix={
            discountPercent ? <Discount percent={discountPercent} /> : null
          }
        />
        <AutoComplete
          fieldName="paymentType"
          label="Payment Type"
          options={PAYMENT_TYPES}
          defaultValue={PAYMENT_TYPES[0]}
        />
      </Grid>
    </Well>
  );
}
