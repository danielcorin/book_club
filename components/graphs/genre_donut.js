import React from "react"

import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";

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

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
    title: {
      display: true,
      text: "Genre donut",
    },
  },
};

function GenreDonut({books}) {
  const genres = {};
  books.forEach(book => {
    if(!genres[book.genre]) {
      genres[book.genre] = 1
    } else {
      genres[book.genre] += 1
    }
  })
  const entries = Object.entries(genres);
  let labels = entries.map(entry => entry[0])
  let data = entries.map(entry => entry[1])

  const chartdata = {
    labels: labels,
    datasets: [
      {
        label: "Book genres",
        backgroundColor: colors,
        data: data,
      },
    ],
  };
  return (
    <Doughnut
      data={chartdata}
      options={{
        responsive: true,
        datalabels: {
          display: false,
          color: "white",
        },
        tooltips: {
          backgroundColor: "#5a6e7f",
        },
        plugins: {
          legend: {
            position: "bottom",
          },
          title: {
            display: true,
            text: "Genre donut",
          },
        },
      }}
    />
  );
}

export default GenreDonut
