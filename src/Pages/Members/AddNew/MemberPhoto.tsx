import { Button, Stack } from "@mui/material";
import Image from "mui-image";
import { useFormContext } from "react-hook-form";

export default function MemberPhoto() {
  const { register, watch } = useFormContext();
  const photoFile = watch("photo")?.item(0);
  const photoUrl = photoFile ? URL.createObjectURL(photoFile) : "";
  return (
    <Stack sx={{ alignItems: "center", justifyContent: "flex-end" }}>
      <Image
        src={photoUrl || "./blank-profile.png"}
        showLoading
        wrapperClassName="member-photo"
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
          variant="outlined"
          component="span"
          sx={{ marginTop: "10px" }}
        >
          Choose Photo
        </Button>
      </label>
    </Stack>
  );
}
