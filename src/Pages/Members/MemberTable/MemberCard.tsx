import { Delete, Login, Phone } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  CardActionArea,
} from "@mui/material";
import Image from "mui-image";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../routes";
import { Member, MembershipStatus } from "../../../types";
import "./index.scss";
import {
  MEMBERSHIP_STATUS,
  MEMBERSHIP_STATUS_DESCRIPTION,
} from "../../../constants";
interface Props {
  member: Member;
  onDelete: (member: Member) => void;
}
export default function MemberCard({ member, onDelete }: Props) {
  const { photo, name, phoneNumber, status } = member;
  const navigate = useNavigate();
  return (
    <div>
      <Card className="card-container">
        <CardActionArea
          onClick={() =>
            member.id && navigate(ROUTES.EDITMEMBER.replace(":id", member.id))
          }
        >
          <Stack direction="row">
            <Image
              src={photo as string}
              width={100}
              height={130}
              showLoading
              fit="cover"
            />
            <Box sx={{ display: "flex", flexDirection: "column" }} width="80%">
              <CardContent
                sx={{
                  flex: "1 0 auto",
                  p: 1,
                  pl: 2,
                  "&:last-child": {
                    pb: 1,
                  },
                }}
              >
                <Stack justifyContent="space-between" height="100%">
                  <Stack>
                    <Typography component="div" variant="h5">
                      {name}
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Phone fontSize="small" />
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        component="div"
                      >
                        {phoneNumber}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{ width: "50%" }}
                    color={
                      status === MEMBERSHIP_STATUS.ACTIVE
                        ? "success"
                        : status === MEMBERSHIP_STATUS.EXPIRED
                        ? "error"
                        : "inherit"
                    }
                  >
                    {MEMBERSHIP_STATUS_DESCRIPTION[status as MembershipStatus]}
                  </Button>
                </Stack>
              </CardContent>
            </Box>
          </Stack>
        </CardActionArea>
        <IconButton className="delete-icon" onClick={() => onDelete(member)}>
          <Tooltip title="Delete Member">
            <Delete color="error" />
          </Tooltip>
        </IconButton>
        <IconButton className="checkin-icon">
          <Tooltip title="Check In">
            <Login color="success" />
          </Tooltip>
        </IconButton>
      </Card>
    </div>
  );
}
