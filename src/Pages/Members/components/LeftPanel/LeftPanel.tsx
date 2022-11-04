import { PersonAdd, Star } from "@mui/icons-material";
import { Box, Button, Container, Stack } from "@mui/material";
import Image from "mui-image";
import { useLocation, useNavigate } from "react-router-dom";
import { getSelectedMember } from "../../../../Redux-toolkit/features/Members/memberSlice";
import { useAppSelector } from "../../../../Redux-toolkit/hooks";
import { useFormContext } from "react-hook-form";
import "./index.scss";

export default function LeftPanel() {
  const member = useAppSelector(getSelectedMember);
  const fullName = member?.firstName + " " + member?.lastName;
  const navigate = useNavigate();
  const location = useLocation();
  const isAddNew = location.pathname === "/members/new";
  const { register, watch } = useFormContext();
  const photoValue = watch("photo");
  let photoUrl;
  if (photoValue && photoValue instanceof FileList && photoValue.length > 0) {
    photoUrl = URL.createObjectURL(photoValue[0]);
  }
  const photo = isAddNew ? photoUrl : (member?.photo as string);
  return (
    <Box className="member-left-panel">
      <Stack sx={{ alignItems: "center" }} spacing={2}>
        <Image
          src={photo || "/blank-profile.png"}
          showLoading
          width={250}
          height={250}
        />
        {isAddNew && (
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
              Choose Photo
            </Button>
          </label>
        )}
        {!isAddNew && (
          <>
            <h2>{fullName}</h2>
            <Stack
              direction="row"
              sx={{
                padding: "5px 20px",
                background: "grey",
                borderRadius: "20px",
              }}
            >
              <Star className="star-icon" />
              <Star className="star-icon" />
              <Star className="star-icon" />
              <Star className="star-icon" />
            </Stack>
            <Button
              variant="contained"
              color="success"
              size="small"
              className="active-btn"
            >
              Active
            </Button>
            <Container>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-end"
              >
                <p className="field-label">Membership expires in:</p>
                <p className="bold">2 days</p>
              </Stack>
            </Container>
            <Container>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-end"
              >
                <p className="field-label">Balance:</p>
                <p className="bold">$0.00</p>
              </Stack>
            </Container>
            <Container>
              <p className="field-label">Note:</p>
              <p>Forgot his wallet on 20/10/2022</p>
            </Container>
            <hr className="divider" />
            <Stack>
              <Button
                variant="contained"
                startIcon={<PersonAdd />}
                fullWidth
                onClick={() => navigate("/members/new", { replace: true })}
              >
                Add New Member
              </Button>
            </Stack>
          </>
        )}
      </Stack>
    </Box>
  );
}
