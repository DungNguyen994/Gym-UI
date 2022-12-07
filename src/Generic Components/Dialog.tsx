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
  handleContinue: () => void;
  title: string;
  content: string;
}
export default function DialogModal({
  open,
  title,
  content,
  handleClose,
  handleContinue,
}: Props) {
  return (
    <Dialog
      open={open}
      keepMounted
      onClose={handleClose}
      aria-describedby="confirm-member-delete-dialog"
      maxWidth="md"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained">
          No
        </Button>
        <Button onClick={handleContinue} variant="contained" color="warning">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
