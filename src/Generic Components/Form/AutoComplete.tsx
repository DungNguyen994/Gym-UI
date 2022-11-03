import { Autocomplete, Grid, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

interface Props {
  label: string;
  fieldName: string;
  defaultValue?: string;
  options: string[];
}

export default function AutoComplete({
  defaultValue,
  options,
  label,
  fieldName,
}: Props) {
  const { register, control } = useFormContext();
  return (
    <Grid item xs={9} md={6}>
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
    </Grid>
  );
}
