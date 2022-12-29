import {
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";
interface RadioOption {
  value: any;
  label: any;
}
interface Props {
  label: string;
  defaultValue: string;
  fieldName: string;
  options: RadioOption[];
  prefix?: ReactNode;
  readonly?: boolean;
}
export default function RadioInput({
  label,
  defaultValue,
  fieldName,
  options,
  prefix,
  readonly,
}: Props) {
  const { setValue } = useFormContext() || {};
  return (
    <Grid item xs={12} md={6}>
      <Stack direction="row" spacing={3} alignItems="center">
        <Stack direction="row" spacing={2} alignItems="center">
          {prefix}
          <p>{label}:</p>
        </Stack>
        {readonly ? (
          <p>{defaultValue}</p>
        ) : (
          <RadioGroup
            aria-labelledby="radio-buttons-group-label"
            defaultValue={defaultValue}
            onChange={(e) => setValue(fieldName, e.target.value)}
          >
            <Stack direction="row">
              <FormControlLabel
                value={options[0].value}
                control={<Radio />}
                label={options[0].label}
              />
              <FormControlLabel
                value={options[1].value}
                control={<Radio />}
                label={options[1].label}
              />
            </Stack>
          </RadioGroup>
        )}
      </Stack>
    </Grid>
  );
}
