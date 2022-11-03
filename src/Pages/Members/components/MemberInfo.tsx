import { Grid, Stack } from "@mui/material";
import { GENDER_OPTIONS } from "../../../constants";
import GridItemTextField from "../../../Generic Components/Form/GridItemTextField";
import RadioInput from "../../../Generic Components/Form/RadioInput";
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
          <GridItemTextField label="Address" fieldName="address" />
          <GridItemTextField label="Note" fieldName="note" />
          <RadioInput
            label="Gender"
            fieldName="gender"
            defaultValue="male"
            options={GENDER_OPTIONS}
          />
        </Grid>
      </Stack>
    </Well>
  );
}
