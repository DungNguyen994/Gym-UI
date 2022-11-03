import {
  AccessTime,
  Badge,
  Cake,
  EventBusy,
  LocalPhone,
  LocationOn,
  Loyalty,
  Mail,
  Start,
  Wc,
} from "@mui/icons-material";
import {
  Button,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useFormContext } from "react-hook-form";
import { Member } from "../../../../types";
import "./index.scss";
import { InfoItem } from "./InfoItem";

interface Props {
  editing: boolean;
  member: Member;
  isAddNew?: boolean;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Information({
  editing,
  member,
  isAddNew,
  setEditing,
}: Props) {
  const { register, reset } = useFormContext();
  const fullName = member.firstName
    ? `${member.firstName} ${member.lastName}`
    : "";
  const birthDate = member?.birthDate as string;
  const startDate = member?.startDate as string;
  const endDate = member?.endDate as string;
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack className="member-info" component="form">
          <h1 className="header">Information</h1>
          <h2>{fullName}</h2>
          <Grid container spacing={4}>
            <InfoItem
              label="First Name"
              value={member?.firstName}
              Icon={Badge}
              fieldName="firstName"
              editing={editing}
            />
            <InfoItem
              label="Last Name"
              value={member?.lastName}
              Icon={Badge}
              fieldName="lastName"
              editing={editing}
            />
            <InfoItem
              label="Phone Number"
              value={member?.phoneNumber}
              Icon={LocalPhone}
              fieldName="phoneNumber"
              editing={editing}
            />
            <InfoItem
              label="Address"
              fieldName="address"
              value={member?.address}
              Icon={LocationOn}
              editing={editing}
            />
            <InfoItem
              label="Email"
              fieldName="email"
              value={member?.email}
              Icon={Mail}
              editing={editing}
            />
            <Grid item md={12} xs={12}>
              <Stack direction="row" spacing={3}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Wc />
                  <p>Gender:</p>
                </Stack>
                <RadioGroup
                  aria-labelledby="radio-buttons-group-label"
                  defaultValue="Male"
                  {...register("gender")}
                >
                  <Stack direction="row">
                    <FormControlLabel
                      value="Male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="Female"
                      control={<Radio />}
                      label="Female"
                    />
                  </Stack>
                </RadioGroup>
              </Stack>
            </Grid>
            <InfoItem
              label="Date of Birth"
              fieldName="birthDate"
              value={birthDate}
              Icon={Cake}
              editing={editing}
            />
            {!isAddNew && (
              <>
                <InfoItem
                  label="Membership Type"
                  value={member?.membershipType}
                  Icon={Loyalty}
                  fieldName="membershipType"
                />
                <InfoItem
                  label="Term"
                  fieldName="term"
                  value={member?.term}
                  Icon={AccessTime}
                />
                <InfoItem
                  label="Start Date"
                  fieldName="startDate"
                  value={startDate}
                  Icon={Start}
                />
                <InfoItem
                  label="End Date"
                  fieldName="endDate"
                  value={endDate}
                  Icon={EventBusy}
                />
              </>
            )}
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
