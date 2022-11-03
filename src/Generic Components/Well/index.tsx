import "./index.scss";
import { Box } from "@mui/material";
import { ReactNode } from "react";

interface Props {
  headerText?: string;
  children: ReactNode;
}

export default function Well({ headerText, children }: Props) {
  return (
    <Box className="well-container">
      <div className="well-header">
        <h2>{headerText}</h2>
      </div>
      <div className="well">{children}</div>
    </Box>
  );
}
