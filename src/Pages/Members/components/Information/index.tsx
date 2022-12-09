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
import { isEqual, isNull, omitBy } from "lodash";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useWatch } from "react-hook-form";
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
import { Gender, Member, Membership } from "../../../../types";
import MembershipTable from "../MembershipTable";
import "./index.scss";

interface Props {
  isAddNew?: boolean;
  memberships?: Membership[];
  member?: Member;
}

export default function Information({ isAddNew, memberships, member }: Props) {
  const { reset, watch, setValue } = useFormContext();
  const startDate = watch("newMembership.startDate") as Dayjs;
  const endDate = startDate?.add(1, "month");
  const isDirty = !isEqual(omitBy(useWatch(), isNull), omitBy(member, isNull));
  const [showAddMembershipButton, setShowAddMembershipButton] = useState(true);

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
                  paddingLeft: "32px",
                  marginBottom: 0,
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
            <MembershipTable
              memberships={memberships}
              showAddMembershipButton={showAddMembershipButton}
              setShowAddMembershipButton={setShowAddMembershipButton}
            />
          )}
        </Grid>
        <Stack className="edit-btn" spacing={2} direction="row">
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              reset();
              setShowAddMembershipButton(true);
            }}
            disabled={!isAddNew && !isDirty}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="warning"
            type="submit"
            disabled={!isAddNew && !isDirty}
          >
            Save
          </Button>
        </Stack>
      </Stack>
    </div>
  );
}
