import { Add } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import Image from "mui-image";
import { Product } from "../../types";

interface Props {
  product: Product;
  addToCart: (product: Product) => void;
}

export default function ProductCard({ product, addToCart }: Props) {
  const { photo, productName, quantity, supplier, unitPrice } = product;
  return (
    <Grid item xs={6} md={3}>
      <Card sx={{ p: 1, height: 250 }}>
        <Stack direction="row" spacing={2}>
          <Image
            src={photo as string}
            width={150}
            height={130}
            showLoading
            fit="cover"
          />
          <Stack sx={{ p: 1, minHeight: 160 }}>
            <Typography sx={{ fontWeight: 700, height: 50 }}>
              {productName}
            </Typography>
            <br />
            <Typography>Brand: {supplier}</Typography>
            <Typography>Available Stock: {quantity}</Typography>
            <Typography color="orangered">Price: ${unitPrice}</Typography>
          </Stack>
        </Stack>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Button
            startIcon={<Add />}
            variant="contained"
            onClick={() => addToCart(product)}
          >
            Add to cart
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
}
