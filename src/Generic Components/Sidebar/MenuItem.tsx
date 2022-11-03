import { Box, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BootstrapTooltip } from "./Tooltip";

interface Props {
  Icon: React.ElementType;
  tooltipText: string;
  to: string;
}

export const MenuItem: React.FC<Props> = ({ Icon, tooltipText, to }) => {
  const navigate = useNavigate();
  return (
    <Box className="menu-item-container">
      <Stack className="menu-item" direction="row" onClick={() => navigate(to)}>
        <BootstrapTooltip title={tooltipText} placement="right-start">
          <Icon className="icon" fontSize="large"></Icon>
        </BootstrapTooltip>
      </Stack>
    </Box>
  );
};
