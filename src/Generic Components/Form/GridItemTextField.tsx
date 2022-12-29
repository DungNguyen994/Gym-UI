import { Grid, InputAdornment, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { CommonFieldProps } from "../../types";

export default function GridItemTextField({
  label,
  fieldName,
  required,
  disabled,
  readonly,
  prefix,
  suffix,
}: CommonFieldProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext() || { register: () => {}, formState: {} };
  const errorMessage = errors[fieldName]?.message as string | undefined;
  return (
    <Grid item xs={9} md={6}>
      <TextField
        label={label}
        variant="standard"
        fullWidth
        {...register(fieldName)}
        required={required}
        error={Boolean(errors[fieldName])}
        helperText={errorMessage}
        disabled={disabled}
        inputProps={{ readOnly: readonly }}
        InputProps={{
          startAdornment: prefix ? (
            <InputAdornment position="start">{prefix}</InputAdornment>
          ) : null,
          endAdornment: suffix ? (
            <InputAdornment position="start" sx={{ p: { color: "red" } }}>
              {suffix}
            </InputAdornment>
          ) : null,
        }}
      />
    </Grid>
  );
}
