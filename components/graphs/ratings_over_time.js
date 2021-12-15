import React from "react"

import "chart.js/auto";
import { Line } from "react-chartjs-2";
import 'chartjs-adapter-date-fns';

const colors =  [
  "#d32f2f",
  "#c2185b",
  "#7b1fa2",
  "#512da8",
  "#303f9f",
  "#1976d2",
  "#0288d1",
  "#0097a7",
  "#00796b",
  "#388e3c",
  "#689f38",
  "#afb42b",
  "#fbc02d",
  "#ffa000",
  "#f57c00",
  "#e64a19",
];
colors.sort((a, b) => 0.5 - Math.random());

function RatingsOverTime({books}) {
  // oldest first
  books.reverse()

  const options = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: "Ratings over time",
      },
      legend: {
        position: "none",
      },
      tooltip: {
        callbacks: {
          title: (data) => {
            const book = books[data[0].dataIndex]
            return `${book.title}: ${book.author}`;
          }
        }
      },
    },
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
      },
      x: {
        type: "time",
        ticks: {
          autoSkip: true,
        },
        time: {
          unit: "month",
          displayFormats: {
            quarter: "MMM YYYY",
          },
        },
      },
    },
  };

  const labels = books.map(book => Date.parse(book.completed_at))
  const data = books.map(book => book.rating)

  const chartData = {
    labels,
    datasets: [
      {
        label: "Rating",
        data: data,
        borderColor: colors[1],
        backgroundColor: colors[1],
      },
    ],
  };

  return <Line options={options} data={chartData} />;
}

export default RatingsOverTime
