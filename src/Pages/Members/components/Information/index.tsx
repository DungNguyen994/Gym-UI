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
import { Dayjs } from "dayjs";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import {
  DATE_FORMAT,
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

export default function Information({ editing, setEditing }: Props) {
  const { reset, watch, setValue } = useFormContext();
  const startDate = watch("membership.startDate") as Dayjs;
  const endDate = startDate?.add(1, "month");
  useEffect(() => {
    if (
      endDate.format(DATE_FORMAT) !==
      watch("membership.endDate")?.format(DATE_FORMAT)
    )
      setValue("membership.endDate", endDate);
  }, [endDate, setValue, watch]);
  return (
    <div>
      <Stack className="member-info">
        <h1 className="header">Information</h1>
        <Grid container spacing={4}>
          <TextInput
            label="First Name"
            prefix={<Badge />}
            fieldName="firstName"
            required
          />
          <TextInput
            label="Last Name"
            prefix={<Badge />}
            fieldName="lastName"
            required
          />
          <TextInput
            label="Phone Number"
            prefix={<LocalPhone />}
            fieldName="phoneNumber"
            required
          />
          <TextInput
            label="Address"
            prefix={<LocationOn />}
            fieldName="address"
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
            fieldName="membership.term"
            options={periodOptions}
            defaultValue={periodOptions[0]}
          />
          <AutoComplete
            label="Membership Type"
            fieldName="membership.membershipType"
            options={membershipTypes}
            defaultValue={membershipTypes[0]}
          />
          <DateInput
            label="Start Date"
            fieldName="membership.startDate"
            prefix={<Start />}
          />
          <DateInput
            label="End Date"
            fieldName="membership.endDate"
            prefix={<EventBusy />}
          />
        </Grid>
        <Stack className="edit-btn" spacing={2} direction="row">
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
          <Button variant="contained" color="warning" type="submit">
            Save
          </Button>
        </Stack>
      </Stack>
    </div>
  );
}
