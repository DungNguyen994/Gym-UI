import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routes";

export default function BackToHome() {
  const navigate = useNavigate();
  return (
    <div>
      <Button
        variant="contained"
        onClick={() => {
          navigate(ROUTES.HOME, { replace: true });
        }}
      >
        Back To Home
      </Button>
    </div>
  );
}
