import { Autocomplete, Grid, Stack, SxProps, TextField } from "@mui/material";
import { get } from "lodash";
import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";
import { PAYMENT_METHODS, periodOptions } from "../../constants";

interface Props {
  label: string;
  fieldName: string;
  defaultValue?: string;
  options: string[];
  readonly?: boolean;
  prefix?: ReactNode;
  sx?: SxProps;
  xs?: number;
  md?: number;
  lg?: number;
  required?: boolean;
}

export default function AutoComplete({
  defaultValue,
  options,
  label,
  fieldName,
  readonly,
  prefix,
  sx,
  xs = 12,
  md = 6,
  lg = 6,
  required,
}: Props) {
  const {
    watch,
    setValue,
    formState: { errors },
    register,
    clearErrors,
  } = useFormContext();
  const value = watch(fieldName);

  let errorMessage = get(errors, fieldName);
  if (
    fieldName === "payment.paymentMethod" &&
    PAYMENT_METHODS.includes(value)
  ) {
    errorMessage = undefined;
  }
  if (fieldName === "newMembership.term" && periodOptions.includes(value)) {
    errorMessage = undefined;
  }
  return (
    <Grid item xs={xs} md={md} lg={lg}>
      {readonly ? (
        <Stack direction="row" spacing={3} alignItems="center">
          <Stack direction="row" alignItems="center" spacing={1}>
            {prefix}
            <p>{label}:</p>
          </Stack>
          <p>{defaultValue}</p>
        </Stack>
      ) : (
        <Autocomplete
          value={value}
          disablePortal
          onChange={(e, newValue) => {
            setValue(fieldName, newValue);
            clearErrors(fieldName);
          }}
          id="combo-box"
          options={options}
          sx={sx}
          fullWidth
          defaultValue={defaultValue}
          renderInput={(params) => (
            <TextField
              {...params}
              {...register(fieldName)}
              label={label}
              required={required}
              error={Boolean(errorMessage)}
              variant="standard"
              helperText={
                Boolean(errorMessage) && errorMessage?.message?.toString()
              }
            />
          )}
        />
      )}
    </Grid>
  );
}
