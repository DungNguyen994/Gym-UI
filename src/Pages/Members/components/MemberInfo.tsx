import { Grid, Stack } from "@mui/material";
import { GridDatePicker } from "../../../Generic Components/Form/GridDatePicker";
import GridItemRadio from "../../../Generic Components/Form/GridItemRadio";
import GridItemTextField from "../../../Generic Components/Form/GridItemTextField";
import Well from "../../../Generic Components/Well";
import MemberPhoto from "../AddNew/MemberPhoto";

export default function MemberInfo() {
  return (
    <Well headerText="Personal Details">
      <Stack spacing={2} className="personal-details">
        <MemberPhoto />
        <Grid container spacing={3}>
          <GridItemTextField
            label="First Name"
            fieldName="firstName"
            required
          />
          <GridItemTextField label="Last Name" fieldName="lastName" required />
          <GridItemTextField
            label="Phone Number"
            fieldName="phoneNumber"
            required
          />
          <GridItemTextField label="Email" fieldName="email" />
          <GridDatePicker label="Birth Date" fieldName="birthDate" />
          <GridItemTextField label="Address" fieldName="address" />
          <GridItemTextField label="Note" fieldName="note" />
          <GridItemRadio
            label="Gender"
            fieldName="gender"
            defaultValue="male"
          />
        </Grid>
      </Stack>
    </Well>
  );
}
