import { ElementType } from "react";
import { Grid, Stack, TextField } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import dayjs, { isDayjs } from "dayjs";
import { DATE_FORMAT } from "../../../../constants";

interface Props {
  label: string;
  value?: string;
  Icon: ElementType;
  editing?: boolean;
  fieldName: string;
}
export const InfoItem = ({ label, value, Icon, editing, fieldName }: Props) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();
  const errorMessage = errors[fieldName]?.message as string;
  let Field = fieldName.includes("Date") ? (
    <Controller
      control={control}
      name={fieldName}
      render={({ field }) => {
        return (
          <DesktopDatePicker
            onChange={(date) => field.onChange(date)}
            value={field.value ? dayjs(field.value, DATE_FORMAT) : ""}
            inputFormat="DD/MM/YYYY"
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                error={Boolean(errors[fieldName])}
                helperText={errorMessage}
              />
            )}
          />
        );
      }}
    />
  ) : (
    <TextField variant="standard" {...register(fieldName)} />
  );
  return (
    <Grid item md={12} xs={12}>
      <Stack direction="row" spacing={3}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Icon />
          <p>{label}:</p>
        </Stack>
        {!editing ? (
          <p>{isDayjs(value) ? value.format(DATE_FORMAT) : value}</p>
        ) : (
          Field
        )}
      </Stack>
    </Grid>
  );
};
