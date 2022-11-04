import {
  Badge,
  Cake,
  EventBusy,
  LocalPhone,
  LocationOn,
  Mail,
  Start,
  Wc,
} from "@mui/icons-material";
import { Button, Grid, Stack } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import { useFormContext } from "react-hook-form";
import {
  GENDER_OPTIONS,
  membershipTypes,
  periodOptions,
} from "../../../../constants";
import AutoComplete from "../../../../Generic Components/Form/AutoComplete";
import { DateInput } from "../../../../Generic Components/Form/DateInput";
import RadioInput from "../../../../Generic Components/Form/RadioInput";
import TextInput from "../../../../Generic Components/Form/TextInput";
import { Gender, Member } from "../../../../types";
import "./index.scss";

interface Props {
  editing: boolean;
  member?: Member;
  isAddNew?: boolean;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Information({ editing, member, setEditing }: Props) {
  const { reset, watch, setValue } = useFormContext();
  const startDate = watch("startDate") as Dayjs;
  const endDate = startDate?.add(1, "month");
  setValue("endDate", endDate);
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack className="member-info" component="form">
          <h1 className="header">Information</h1>
          <Grid container spacing={4}>
            <TextInput
              label="First Name"
              prefix={<Badge />}
              defaultValue="Dung"
              fieldName="firstName"
            />
            <TextInput
              label="Last Name"
              prefix={<Badge />}
              fieldName="lastName"
            />
            <TextInput
              label="Phone Number"
              prefix={<LocalPhone />}
              fieldName="lastName"
            />
            <TextInput
              label="Address"
              prefix={<LocationOn />}
              fieldName="lastName"
            />
            <TextInput label="Email" prefix={<Mail />} fieldName="email" />
            <DateInput
              label="Date of Birth"
              fieldName="birthDate"
              prefix={<Cake />}
            />
            <RadioInput
              label="Gender"
              prefix={<Wc />}
              fieldName="gender"
              options={GENDER_OPTIONS}
              defaultValue={Gender.Male}
            />
            <AutoComplete
              label="Term"
              fieldName="term"
              options={periodOptions}
              defaultValue={periodOptions[0]}
            />
            <AutoComplete
              label="Membership Type"
              fieldName="membershipType"
              options={membershipTypes}
              defaultValue={membershipTypes[0]}
            />
            <DateInput
              label="Start Date"
              fieldName="startDate"
              prefix={<Start />}
            />
            <DateInput
              label="End Date"
              fieldName="endDate"
              prefix={<EventBusy />}
            />
          </Grid>
          {/* <Stack
            direction="row"
            spacing={3}
            sx={{
              marginTop: "40px",
              marginLeft: "auto",
              marginRight: "40px",
            }}
          > */}
          <Stack className="edit-btn" spacing={2} direction="row">
            {editing && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  reset();
                  setEditing(false);
                }}
              >
                Cancel
              </Button>
            )}
            <Button
              variant="contained"
              color={editing ? "warning" : "primary"}
              type="submit"
            >
              {editing ? "Save" : "Edit"}
            </Button>
          </Stack>
        </Stack>
        {/* </Stack> */}
      </LocalizationProvider>
    </div>
  );
}
