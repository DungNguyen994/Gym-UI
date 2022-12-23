import { useQuery } from "@apollo/client";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import dayjs from "dayjs";
import { multiply, round } from "lodash";
import { Pie } from "react-chartjs-2";
import { useForm } from "react-hook-form";
import LoadingSpinner from "../../Generic Components/LoadingSpinner";
import { PRODUCT_TYPES } from "../../constants";
import { PAYMENTS } from "../../graphql/queries/payments";
import { PaymentRes, Product } from "../../types";

ChartJS.register(ArcElement, Tooltip, Legend);

export function ProductSaleChart() {
  const { data: paymentsRes, loading } = useQuery(PAYMENTS);
  const payments = paymentsRes?.payments?.data as PaymentRes[];
  const { register, watch, setValue } = useForm({
    defaultValues: {
      year: dayjs().get("year"),
    },
  });
  const year = watch("year");
  const saleProducts =
    payments?.reduce((list: Product[] | [], payment) => {
      if (
        payment.products &&
        payment.products.length > 0 &&
        dayjs(payment.createdAt).get("year") === year
      ) {
        payment.products?.forEach((p) => {
          list = [...list, p];
        });
      }
      return list;
    }, []) || [];
  let result: number[] = [0, 0, 0, 0, 0];
  saleProducts.forEach((p) => {
    Object.keys(PRODUCT_TYPES).forEach((k) => {
      if (p.productType === PRODUCT_TYPES[Number(k)] && p.buyQuantity) {
        result[Number(k)] =
          result[Number(k)] + round(multiply(p.unitPrice, p.buyQuantity), 2);
      }
    });
  });
  const data = {
    labels: ["Drinks", "Food", "Clothes", "Supplements", "Others"],
    datasets: [
      {
        label: "Total Sale by dollars",
        data: result,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const title = (
    <Stack direction="row" justifyContent="space-between">
      <Typography variant="h5" sx={{ color: "#e803fc", textAlign: "center" }}>
        Products Sale
      </Typography>
      <Stack direction="row" spacing={1}>
        <IconButton onClick={() => setValue("year", watch("year") - 1)}>
          <ArrowBackIos />
        </IconButton>
        <TextField
          {...register("year")}
          type="number"
          variant="standard"
          inputProps={{ style: { textAlign: "center", width: 100 } }}
        />
        <IconButton onClick={() => setValue("year", watch("year") + 1)}>
          <ArrowForwardIos />
        </IconButton>
      </Stack>
    </Stack>
  );
  return (
    <Card>
      {loading && <LoadingSpinner />}
      <CardHeader title={title} />
      <CardContent
        sx={{ maxHeight: "500px", display: "flex", justifyContent: "center" }}
      >
        <Pie data={data} />
      </CardContent>
    </Card>
  );
}
