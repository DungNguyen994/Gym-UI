import { Grid, Stack, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { CommonFieldProps } from "../../types";

export default function TextInput({
  label,
  fieldName,
  required,
  disabled,
  readonly,
  prefix,
  defaultValue,
}: CommonFieldProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const errorMessage = errors[fieldName]?.message as string | undefined;
  return (
    <Grid item xs={12}>
      <Stack direction="row" spacing={3} alignItems="flex-end">
        {readonly ? (
          <Stack direction="row" spacing={3} alignItems="center">
            <Stack direction="row" alignItems="center" spacing={1}>
              {prefix}
              <p>{label}:</p>
            </Stack>
            <p>{defaultValue}</p>
          </Stack>
        ) : (
          <TextField
            label={label}
            variant="standard"
            {...register(fieldName)}
            required={required}
            error={Boolean(errors[fieldName])}
            defaultValue={defaultValue}
            helperText={errorMessage}
            disabled={disabled}
            fullWidth
            inputProps={{ readOnly: readonly }}
            InputProps={{ startAdornment: prefix }}
          />
        )}
      </Stack>
    </Grid>
  );
}
