import {
  Grid,
  FormLabel,
  RadioGroup,
  Stack,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useFormContext } from "react-hook-form";
interface Props {
  label: string;
  defaultValue: string;
  fieldName: string;
}
export default function GridItemRadio({
  label,
  defaultValue,
  fieldName,
}: Props) {
  const { register } = useFormContext();
  return (
    <Grid item xs={9} md={6}>
      <FormLabel id="radio-buttons-group-label">{label}</FormLabel>
      <RadioGroup
        aria-labelledby="radio-buttons-group-label"
        defaultValue={defaultValue}
        {...register(fieldName)}
      >
        <Stack direction="row">
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="female" control={<Radio />} label="Female" />
        </Stack>
      </RadioGroup>
    </Grid>
  );
}
