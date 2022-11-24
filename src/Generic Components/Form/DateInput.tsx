import { Grid, TextField } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { Controller, useFormContext } from "react-hook-form";
import { CommonFieldProps } from "../../types";

export const DateInput = ({
  fieldName,
  label,
  readonly,
  prefix,
}: CommonFieldProps) => {
  const {
    formState: { errors },
  } = useFormContext();
  const errorMessage = errors[fieldName]?.message as string | undefined;
  return (
    <Grid item xs={9} md={6}>
      <Controller
        name={fieldName}
        render={({ field }) => {
          return (
            <DesktopDatePicker
              onChange={(date) => field.onChange(date)}
              value={field.value ? field.value : ""}
              label={label}
              InputProps={{ startAdornment: prefix }}
              inputFormat="DD/MM/YYYY"
              readOnly={readonly}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  fullWidth
                  error={Boolean(errors[fieldName])}
                  helperText={errorMessage}
                />
              )}
            />
          );
        }}
      />
    </Grid>
  );
};
