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
} from "@mui/material";
import Image from "mui-image";
import { Member } from "../../../types";
import "./index.scss";
interface Props {
  member: Member;
}
export default function MemberCard({ member }: Props) {
  const { photo, name, phoneNumber, status } = member;
  return (
    <div>
      <Card className="card-container">
        <Image
          src={photo as string}
          width={100}
          height={130}
          showLoading
          fit="cover"
        />
        <Box sx={{ display: "flex", flexDirection: "column" }} width="80%">
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5">
              {name}
            </Typography>
            <Box>
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
              <Button
                variant="contained"
                color="success"
                size="small"
                sx={{ mt: 1, cursor: "default" }}
              >
                {status?.toUpperCase()}
              </Button>
            </Box>
          </CardContent>
        </Box>
        <IconButton className="delete-icon">
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
