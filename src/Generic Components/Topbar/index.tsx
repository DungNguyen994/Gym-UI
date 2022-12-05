import Stack from "@mui/material/Stack";
import "./index.scss";

export default function Topbar() {
  return (
    <Stack className="topbar">
      <div className="brand-name-container">
        <p className="brand-name">Gym Bot</p>
      </div>
    </Stack>
  );
}
