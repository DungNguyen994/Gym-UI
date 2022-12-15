import { Login, ShoppingCart } from "@mui/icons-material";
import { Box, Button, Stack } from "@mui/material";
import Image from "mui-image";
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
    <Box className="member-left-panel">
      <Stack sx={{ alignItems: "center" }} spacing={2}>
        {!isAddNew && <h2>{fullName}</h2>}
        <Image
          src={_photo || "./blank-profile.png"}
          showLoading
          width={250}
          height={250}
        />
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
            component="span"
            sx={{ marginTop: "10px" }}
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
    </Box>
  );
}
