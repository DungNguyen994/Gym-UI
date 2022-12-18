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
import { Grid, Stack } from "@mui/material";
import { Dayjs } from "dayjs";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import AutoComplete from "../../../../Generic Components/Form/AutoComplete";
import { DateInput } from "../../../../Generic Components/Form/DateInput";
import RadioInput from "../../../../Generic Components/Form/RadioInput";
import TextInput from "../../../../Generic Components/Form/TextInput";
import {
  DATE_FORMAT,
  GENDER_OPTIONS,
  membershipTypes,
  periodOptions,
} from "../../../../constants";
import { Gender, Member, Membership } from "../../../../types";
import MembershipTable from "../MembershipTable";
import "./index.scss";

interface Props {
  isAddNew?: boolean;
  memberships?: Membership[];
  member?: Member;
}

export default function Information({ isAddNew, memberships, member }: Props) {
  const { watch, setValue } = useFormContext();
  const startDate = watch("newMembership.startDate") as Dayjs;
  const endDate = startDate?.add(1, "month");

  useEffect(() => {
    if (
      endDate?.format(DATE_FORMAT) !==
      watch("newMembership.endDate")?.format(DATE_FORMAT)
    )
      setValue("newMembership.endDate", endDate);
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
          {isAddNew && (
            <>
              <h2
                style={{
                  width: "100%",
                  marginLeft: "32px",
                  marginBottom: 0,
                  borderBottom: "1px solid #e3e3e3",
                }}
              >
                Membership
              </h2>
              <AutoComplete
                label="Term"
                fieldName="newMembership.term"
                options={periodOptions}
                defaultValue={periodOptions[0]}
              />
              <AutoComplete
                label="Membership Type"
                fieldName="newMembership.membershipType"
                options={membershipTypes}
                defaultValue={membershipTypes[0]}
              />
              <DateInput
                label="Start Date"
                fieldName="newMembership.startDate"
                prefix={<Start />}
              />
              <DateInput
                label="End Date"
                fieldName="newMembership.endDate"
                prefix={<EventBusy />}
              />
            </>
          )}
          {memberships && !isAddNew && (
            <MembershipTable memberships={memberships} />
          )}
        </Grid>
      </Stack>
    </div>
  );
}
