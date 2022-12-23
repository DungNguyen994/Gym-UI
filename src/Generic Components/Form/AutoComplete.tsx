import { Autocomplete, Grid, Stack, SxProps, TextField } from "@mui/material";
import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

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
}: Props) {
  const {
    watch,
    setValue,
    formState: { errors },
    register,
  } = useFormContext();
  const value = watch(fieldName);
  const errorMessage = errors[fieldName]?.message as string | undefined;
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
          onChange={(e, newValue) => setValue(fieldName, newValue)}
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
              error={Boolean(errors[fieldName]) && !value}
              variant="standard"
              helperText={!value && errorMessage}
            />
          )}
        />
      )}
    </Grid>
  );
}
