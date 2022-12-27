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

import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import dayjs from "dayjs";
import { Line } from "react-chartjs-2";
import { useForm } from "react-hook-form";
import LoadingSpinner from "../../Generic Components/LoadingSpinner";
import { PAYMENTS } from "../../graphql/queries/payments";
import { PaymentRes } from "../../types";
import { calculateMoneyReceived } from "../../utils";

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: false,
    },
  },
};

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function RevenueChart() {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
  );
  const { data: paymentsRes, loading } = useQuery(PAYMENTS);
  const payments = paymentsRes?.payments?.data as PaymentRes[];
  const { register, watch, setValue } = useForm({
    defaultValues: {
      year: dayjs().get("year"),
    },
  });
  const calculatedData = calculateMoneyReceived(
    Number(watch("year")),
    payments
  );
  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: "Money Received",
        data: calculatedData,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  const title = (
    <Stack direction="row" justifyContent="space-between">
      <Typography variant="h5" sx={{ color: "#f54242", textAlign: "center" }}>
        Money Received
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
      <CardContent>
        <Line options={options} data={data} />
      </CardContent>
    </Card>
  );
}
