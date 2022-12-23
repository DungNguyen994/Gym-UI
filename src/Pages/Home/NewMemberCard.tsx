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
import { GET_MEMBERS } from "../../graphql/queries/members";
import { Member } from "../../types";
import { calculateTotalNewMemberByYear } from "../../utils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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

export function NewMemberChart() {
  const { data: memberRes, loading } = useQuery(GET_MEMBERS);
  const members = memberRes?.members?.data as Member[];
  const { register, watch, setValue } = useForm({
    defaultValues: {
      year: dayjs().get("year"),
    },
  });
  const calculatedData = calculateTotalNewMemberByYear(
    Number(watch("year")),
    members
  );
  const data = {
    labels,
    datasets: [
      {
        label: "Number of New Members",
        data: calculatedData,
        borderColor: "rgb(50, 64, 168)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  const title = (
    <Stack direction="row" justifyContent="space-between">
      <Typography variant="h5" sx={{ color: "#32a881", textAlign: "center" }}>
        Number of New Members
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
