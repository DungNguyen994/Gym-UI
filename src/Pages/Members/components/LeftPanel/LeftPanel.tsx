import { Login, ShoppingCart } from "@mui/icons-material";
import { Button, Card, CardMedia, Grid, Stack } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { Member } from "../../../../types";
import "./index.scss";

interface Props {
  member?: Member;
  isAddNew?: boolean;
}
export default function LeftPanel({ member, isAddNew }: Props) {
  const { photo, firstName, lastName } = (member as Member) || {};
  const { register, watch } = useFormContext();
  const photoValue = watch("photo");
  let photoUrl;
  if (photoValue && photoValue instanceof FileList && photoValue.length > 0) {
    photoUrl = URL.createObjectURL(photoValue[0]);
  }
  const _photo = photoUrl || (photo as string);
  const fullName = firstName + " " + lastName;
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
      <Stack sx={{ alignItems: "center" }} spacing={2}>
        {!isAddNew && <h2>{fullName}</h2>}{" "}
        <Card>
          <CardMedia
            component="img"
            sx={{ height: { md: 100, lg: 170, xl: 250 } }}
            image={_photo || "/blank-profile.png"}
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
        {!isAddNew && (
          <>
            <hr className="divider" />
            <Button variant="contained" startIcon={<Login />} color="success">
              Check In
            </Button>
            <Button
              variant="contained"
              startIcon={<ShoppingCart />}
              color="warning"
            >
              Purchase
            </Button>
          </>
        )}
      </Stack>
    </Grid>
  );
}
