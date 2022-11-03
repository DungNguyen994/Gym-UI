import { Home, People } from "@mui/icons-material";
import { Breadcrumbs, Typography } from "@mui/material";
import "./index.scss";

interface Props {
  headerText: string;
}

export default function Header({ headerText }: Props) {
  return (
    <div className="header-container">
      <div className="breadcrumb">
        <Breadcrumbs aria-label="breadcrumb">
          <a href="/">
            <Home sx={{ mr: 0.5 }} fontSize="inherit" />
            Home
          </a>
          <Typography sx={{ display: "flex", alignItems: "center" }}>
            <People sx={{ mr: 0.5 }} fontSize="inherit" />
            Members
          </Typography>
        </Breadcrumbs>
      </div>
      <div className="page-header">
        <h1>{headerText}</h1>
      </div>
    </div>
  );
}
