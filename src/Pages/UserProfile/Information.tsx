import { AttachMoney, Badge, Email, Phone } from "@mui/icons-material";
import { Button, Grid, Stack } from "@mui/material";
import { useFormContext } from "react-hook-form";
import TextInput from "../../Generic Components/Form/TextInput";

export default function Information() {
  const {
    formState: { isDirty },
    reset,
  } = useFormContext();
  return (
    <div>
      <Stack className="member-info">
        <h1 className="header">User Details</h1>
        <Grid container spacing={4}>
          <TextInput
            label="First Name"
            prefix={<Badge />}
            fieldName="firstName"
            required
            lg={12}
            md={12}
          />
          <TextInput
            label="Last Name"
            prefix={<AttachMoney />}
            fieldName="lastName"
            required
            lg={12}
            md={12}
          />
          <TextInput
            label="Email"
            prefix={<Email />}
            fieldName="email"
            type="number"
            lg={12}
            md={12}
          />
          <TextInput
            label="Phone Number"
            prefix={<Phone />}
            fieldName="phoneNumber"
            lg={12}
            md={12}
          />
        </Grid>
        <Stack className="edit-btn" spacing={2} direction="row">
          <Button
            variant="contained"
            color="primary"
            onClick={() => reset()}
            disabled={!isDirty}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="warning"
            type="submit"
            disabled={!isDirty}
          >
            Save
          </Button>
        </Stack>
      </Stack>
    </div>
  );
}
