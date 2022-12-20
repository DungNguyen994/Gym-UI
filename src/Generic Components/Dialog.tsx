import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
interface Props {
  open: boolean;
  handleClose: () => void;
  handleContinue?: () => void;
  title: string;
  content: string | React.ReactNode;
  noLabel?: string;
  yesLabel?: string;
  disableYes?: boolean;
  fullWidth?: boolean;
}
export default function DialogModal({
  open,
  title,
  content,
  handleClose,
  handleContinue,
  noLabel = "No",
  yesLabel = "Yes",
  disableYes,
  fullWidth,
}: Props) {
  return (
    <Dialog
      open={open}
      keepMounted
      onClose={handleClose}
      aria-describedby="confirm-member-delete-dialog"
      maxWidth={fullWidth ? "xl" : "md"}
      fullWidth={fullWidth}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained">
          {noLabel}
        </Button>
        {!disableYes && (
          <Button onClick={handleContinue} variant="contained" color="warning">
            {yesLabel}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
