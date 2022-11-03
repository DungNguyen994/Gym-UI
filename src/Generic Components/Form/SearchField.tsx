import { Search } from "@mui/icons-material";
import { Stack } from "@mui/material";

export default function SearchField() {
  return (
    <div>
      <Stack direction="row">
        <Search className="icon" fontSize="large"></Search>
        <input placeholder="Search" />
      </Stack>
    </div>
  );
}
