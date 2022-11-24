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
}

export default function AutoComplete({
  defaultValue,
  options,
  label,
  fieldName,
  readonly,
  prefix,
  sx,
}: Props) {
  const { watch, setValue } = useFormContext();
  const value = watch(fieldName);

  return (
    <Grid item xs={12} md={6}>
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
          fullWidth
          sx={sx}
          defaultValue={defaultValue}
          renderInput={(params) => (
            <TextField {...params} label={label} fullWidth variant="standard" />
          )}
        />
      )}
    </Grid>
  );
}
