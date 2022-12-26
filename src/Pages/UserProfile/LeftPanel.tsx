import { Box, Button, Card, CardMedia, Stack } from "@mui/material";
import { useFormContext } from "react-hook-form";

interface Props {
  photo?: string;
}
export default function LeftPanel({ photo }: Props) {
  const { register, watch } = useFormContext();
  const photoValue = watch("photo");
  let photoUrl;
  if (photoValue && photoValue instanceof FileList && photoValue.length > 0) {
    photoUrl = URL.createObjectURL(photoValue[0]);
  }
  const _photo = photoUrl || photo;
  return (
    <Box className="left-panel">
      <Stack sx={{ alignItems: "center" }} spacing={2}>
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
            component="span"
            sx={{ marginTop: "10px" }}
            size="small"
          >
            {!photo ? "Choose Photo" : "Change Photo"}
          </Button>
        </label>
      </Stack>
    </Box>
  );
}
