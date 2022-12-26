import { useMutation } from "@apollo/client";
import { Login, ShoppingCart } from "@mui/icons-material";
import {
  Button,
  Card,
  CardMedia,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import LoadingSpinner from "../../../../Generic Components/LoadingSpinner";
import SuccessAlert from "../../../../Generic Components/SuccessAlert";
import {
  MEMBERSHIP_STATUS,
  MEMBERSHIP_STATUS_DESCRIPTION,
} from "../../../../constants";
import { CHECK_IN } from "../../../../graphql/mutations/checkIn";
import { VISIT_HISTORY } from "../../../../graphql/queries/visitHistory";
import { Member, MembershipStatus } from "../../../../types";
import { getRemainingTime } from "../../../../utils";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../routes";

interface Props {
  member?: Member;
  isAddNew?: boolean;
}
export default function LeftPanel({ member, isAddNew }: Props) {
  const navigate = useNavigate();
  const { photo, firstName, lastName, status, remainingDays } =
    (member as Member) || {};
  const { register, watch } = useFormContext();
  const photoValue = watch("photo");
  let photoUrl;
  if (photoValue && photoValue instanceof FileList && photoValue.length > 0) {
    photoUrl = URL.createObjectURL(photoValue[0]);
  }
  const _photo = photoUrl || (photo as string);
  const fullName = firstName + " " + lastName;

  const [checkIn, { data, loading }] = useMutation(CHECK_IN);
  const [open, setOpen] = useState(false);
  const onCheckIn = () => {
    if (member?.id) {
      checkIn({
        variables: { memberId: member.id },
        refetchQueries: [{ query: VISIT_HISTORY }],
      }).then(() => {
        setOpen(true);
      });
    }
  };
  const onClose = () => setOpen(false);
  return (
    <Grid
      item
      xs={0}
      md={3}
      lg={2}
      sx={{ display: { xs: "none", md: "flex" }, justifyContent: "center" }}
      borderRight=" 1px solid #e3e3e3"
      p={1}
    >
      {loading && <LoadingSpinner />}
      <Stack sx={{ alignItems: "center" }} spacing={2}>
        {!isAddNew && <h2>{fullName}</h2>}{" "}
        <Card>
          <CardMedia
            component="img"
            sx={{ height: { md: 100, lg: 170, xl: 250 } }}
            image={_photo || "/profile-icon.png"}
            alt="profile"
          />
        </Card>
        <label htmlFor="btn-upload">
          <input
            id="btn-upload"
            style={{ display: "none" }}
            type="file"
            accept="image/*"
            {...register("photo")}
          />
          <Button
            className="btn-choose"
            variant="contained"
            sx={{
              marginTop: "10px",
            }}
            size="small"
            component="span"
          >
            {isAddNew ? "Choose Photo" : "Change Photo"}
          </Button>
        </label>
        <hr className="divider" />
        {!isAddNew && (
          <>
            <h4>Membership Status</h4>
            <Button
              variant="contained"
              color={
                status === MEMBERSHIP_STATUS.ACTIVE
                  ? "success"
                  : status === MEMBERSHIP_STATUS.EXPIRED
                  ? "error"
                  : "inherit"
              }
              sx={{ cursor: "default" }}
            >
              {MEMBERSHIP_STATUS_DESCRIPTION[status as MembershipStatus]}
            </Button>
            {status === MEMBERSHIP_STATUS.ACTIVE && (
              <Typography color="red">{`Expired 
             ${getRemainingTime(remainingDays)}`}</Typography>
            )}
            <hr className="divider" />
            <h4>Actions</h4>
            <Button
              variant="contained"
              startIcon={<Login />}
              color="success"
              onClick={() => onCheckIn()}
            >
              Check In
            </Button>
            <Button
              variant="contained"
              startIcon={<ShoppingCart />}
              color="warning"
              onClick={() =>
                navigate(ROUTES.POS, { state: { memberId: member?.id } })
              }
            >
              Purchase
            </Button>
          </>
        )}
      </Stack>
      <SuccessAlert open={open} onClose={onClose}>
        {data?.checkIn?.data}
      </SuccessAlert>
    </Grid>
  );
}
