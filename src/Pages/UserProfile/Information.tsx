import { Badge, Email, Phone } from "@mui/icons-material";
import { Button, Grid, Stack } from "@mui/material";
import { useFormContext } from "react-hook-form";
import TextInput from "../../Generic Components/Form/TextInput";

export default function Information() {
  const {
    formState: { isDirty },
    reset,
  } = useFormContext();
  return (
    <Stack p={1}>
      <h1 style={{ marginBottom: "10px" }}>User Details</h1>
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
          prefix={<Badge />}
          fieldName="lastName"
          required
          lg={12}
          md={12}
        />
        <TextInput
          label="Email"
          prefix={<Email />}
          fieldName="email"
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
      <Stack className="edit-btn" spacing={2} direction="row-reverse" mt={2}>
        <Button
          variant="contained"
          color="warning"
          type="submit"
          disabled={!isDirty}
        >
          Save
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => reset()}
          disabled={!isDirty}
        >
          Cancel
        </Button>
      </Stack>
    </Stack>
  );
}
