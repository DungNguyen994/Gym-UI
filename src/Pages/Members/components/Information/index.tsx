import {
  Badge,
  Cake,
  EventBusy,
  LocalPhone,
  LocationOn,
  Mail,
  Note,
  Start,
  Wc,
} from "@mui/icons-material";
import { Grid, Stack, Divider } from "@mui/material";
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
  periodOptions,
} from "../../../../constants";
import { Gender, Membership, MembershipType } from "../../../../types";
import MembershipTable from "../MembershipTable";
import { useQuery } from "@apollo/client";
import { GET_MEMBERSHIP_TYPES } from "../../../../graphql/queries/membershipTypes";
import LoadingSpinner from "../../../../Generic Components/LoadingSpinner";
import { getNumOfMonth } from "../../../../utils";

interface Props {
  isAddNew?: boolean;
  memberships?: Membership[];
}

export default function Information({ isAddNew, memberships }: Props) {
  const { watch, setValue } = useFormContext() || { watch: () => {} };
  const startDate = watch("newMembership.startDate") as Dayjs;
  const term = watch("newMembership.term");
  const endDate = startDate?.add(getNumOfMonth(term), "month");
  const gender = watch("gender");
  useEffect(() => {
    if (
      endDate?.format(DATE_FORMAT) !==
      watch("newMembership.endDate")?.format(DATE_FORMAT)
    )
      setValue("newMembership.endDate", endDate);
  }, [endDate, setValue, watch]);

  const { data, loading } = useQuery(GET_MEMBERSHIP_TYPES);

  const membershipTypes = data?.membershipTypes?.data as MembershipType[];
  const membershipTypeOptions = membershipTypes?.map((m) => m.name) || [];
  return (
    <div>
      {loading && <LoadingSpinner />}
      <Stack p={1}>
        <h1 className="header">{isAddNew ? "New Member" : "Edit Member"}</h1>
        <Divider sx={{ mb: 2 }} />
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
          <TextInput label="Note" prefix={<Note />} fieldName="note" />
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
            defaultValue={gender || Gender.Male}
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
                required
              />
              {membershipTypeOptions.length > 0 && (
                <AutoComplete
                  label="Membership Type"
                  fieldName="newMembership.membershipType"
                  options={membershipTypeOptions}
                  defaultValue={membershipTypeOptions[0]}
                  required
                />
              )}
              <DateInput
                label="Start Date"
                fieldName="newMembership.startDate"
                prefix={<Start />}
                required
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
