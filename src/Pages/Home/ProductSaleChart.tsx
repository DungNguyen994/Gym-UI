import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Card, CardContent, CardHeader } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
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

const labels = ["January", "February", "March"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [20, 100, 200],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: [100, 10, 202],
      backgroundColor: "rgba(230, 245, 66, 0.5)",
    },
    {
      label: "Dataset 3",
      data: [100, 10, 202],
      backgroundColor: "rgba(72, 245, 66, 0.5)",
    },
    {
      label: "Dataset 3",
      data: [100, 10, 202],
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
    {
      label: "Dataset 3",
      data: [100, 10, 202],
      backgroundColor: "rgba(245, 66, 188, 0.5)",
    },
  ],
};

export function ProductSaleChart() {
  return (
    <Card>
      <CardHeader
        title="Products Sale Summary"
        sx={{ color: "#4284f5", textAlign: "center" }}
      />
      <CardContent>
        <Bar options={options} data={data} />
      </CardContent>
    </Card>
  );
}
