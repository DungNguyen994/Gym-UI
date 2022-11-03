import { Autocomplete, Grid, TextField, Stack } from "@mui/material";
import { ReactNode } from "react";
import { Controller, useFormContext } from "react-hook-form";

interface Props {
  label: string;
  fieldName: string;
  defaultValue?: string;
  options: string[];
  readonly?: boolean;
  prefix?: ReactNode;
}

export default function AutoComplete({
  defaultValue,
  options,
  label,
  fieldName,
  readonly,
  prefix,
}: Props) {
  const { register, control } = useFormContext();
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
        <Controller
          control={control}
          name={fieldName}
          render={({ field }) => (
            <Autocomplete
              disablePortal
              onSelect={field.onChange}
              id="combo-box"
              options={options}
              fullWidth
              defaultValue={defaultValue}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={label}
                  defaultValue={defaultValue}
                  fullWidth
                  variant="standard"
                  {...register(fieldName)}
                />
              )}
            />
          )}
        />
      )}
    </Grid>
  );
}
