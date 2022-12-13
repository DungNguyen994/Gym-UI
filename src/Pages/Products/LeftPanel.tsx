import { ArrowBack } from "@mui/icons-material";
import { Box, Button, Stack } from "@mui/material";
import Image from "mui-image";
import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes";
import "./index.scss";

interface Props {
  isAddNew?: boolean;
  photo?: string;
}
export default function LeftPanel({ isAddNew = true, photo }: Props) {
  const { register, watch } = useFormContext();
  const photoValue = watch("photo");
  let photoUrl;
  if (photoValue && photoValue instanceof FileList && photoValue.length > 0) {
    photoUrl = URL.createObjectURL(photoValue[0]);
  }
  const _photo = photoUrl || photo;
  const navigate = useNavigate();
  return (
    <Box className="left-panel">
      <Stack sx={{ alignItems: "center" }} spacing={2}>
        <Image
          src={_photo || "/blank-product.png"}
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
        <hr className="divider" />
        <Button
          variant="contained"
          startIcon={<ArrowBack />}
          color="secondary"
          onClick={() => navigate(ROUTES.PRODUCTS)}
        >
          Back
        </Button>
      </Stack>
    </Box>
  );
}
