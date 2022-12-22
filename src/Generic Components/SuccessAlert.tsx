import { Alert, Snackbar } from "@mui/material";
interface Props {
  open: boolean;
  onClose: () => void;
  children?: JSX.Element;
}
export default function SuccessAlert({ open, onClose, children }: Props) {
  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={onClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }} onClose={onClose}>
          {children}
        </Alert>
      </Snackbar>
    </div>
  );
}
