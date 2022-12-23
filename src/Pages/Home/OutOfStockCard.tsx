import { useQuery } from "@apollo/client";
import {
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";
import LoadingSpinner from "../../Generic Components/LoadingSpinner";
import { GET_INVENTORY } from "../../graphql/queries/inventory";
import { Product } from "../../types";

export default function OutOfStockCard() {
  const { loading, data } = useQuery(GET_INVENTORY);
  const inventory = data?.inventory?.data as Product[];
  const outOfStockProducts = inventory?.filter(
    (p) => !p.quantity || p.quantity < 0
  );
  return (
    <Card sx={{ minHeight: { xs: "248px", md: "216px" } }}>
      {loading && <LoadingSpinner />}
      <CardHeader
        title="Out of Stock Products"
        sx={{ color: "#fc4503", textAlign: "center" }}
      />
      <CardContent sx={{ display: "flex", justifyContent: "center" }}>
        {outOfStockProducts?.map((p) => (
          <Stack direction="row">
            <Typography color="Highlight">{p.productName}</Typography>
          </Stack>
        ))}
      </CardContent>
    </Card>
  );
}
