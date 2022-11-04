import { styled, tooltipClasses, TooltipProps, Tooltip } from "@mui/material";
export const BootstrapTooltip = styled(
  ({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  )
)(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.white,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "whitesmoke",
    height: "25px",
    color: "black",
    fontSize: "20px",
    width: "fit-content",
    textAlign: "center",
    margin: "auto",
  },
}));
export const DarkTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "black",
    height: "25px",
    color: "white",
    fontSize: "20px",
    width: "fit-content",
    textAlign: "center",
    margin: "auto",
  },
}));
