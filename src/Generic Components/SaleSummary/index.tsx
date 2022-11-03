import { List } from "@mui/material";
import "./index.scss";
export default function SaleSummary() {
  return (
    <div className="sale-summary">
      <h1 className="text-center">Sale Summary</h1>
      <hr className="divider" />
      <List className="list-item" component="div"></List>
    </div>
  );
}
