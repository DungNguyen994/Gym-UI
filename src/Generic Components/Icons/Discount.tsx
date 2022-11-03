import DiscountIcon from "@mui/icons-material/Discount";
import { Stack } from "@mui/material";
import "./index.scss";
interface Props {
  percent: number;
}

export default function Discount({ percent }: Props) {
  return (
    <div className="discount-icon">
      <Stack direction="row" spacing={1}>
        <div>{percent}% discount</div>
        <DiscountIcon />
      </Stack>
    </div>
  );
}
