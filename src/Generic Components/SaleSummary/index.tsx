import { Divider } from "@material-ui/core";
import { Delete } from "@mui/icons-material";
import {
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import "./index.scss";
export default function SaleSummary() {
  return (
    <div className="sale-summary">
      <h1 className="text-center">Sale Summary</h1>
      <hr className="divider" />
      <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow className="table-header">
              <TableCell>Name</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Total</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              key="membership"
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell scope="row">Standard Membership</TableCell>
              <TableCell align="center">1 Month</TableCell>
              <TableCell align="center">$100</TableCell>
              <TableCell align="center">$100</TableCell>
              <TableCell align="right">
                <Delete />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Divider />
      <Stack
        direction="row"
        justifyContent="space-between"
        marginTop={3}
        padding={1}
      >
        <p>Total</p>
        <p>$100</p>
      </Stack>
      <Button variant="contained" fullWidth>
        Open Cash Box
      </Button>
    </div>
  );
}
