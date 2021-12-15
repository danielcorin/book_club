import React from "react"

import "chart.js/auto";
import { Bar } from "react-chartjs-2";

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "none",
    },
    title: {
      display: true,
      text: "Ratings distribution",
    },
  },
};

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

const ratingsDistributionData = (ratings) => {
  return {
    labels: ["⭐️0", "⭐️0.5", "⭐️1", "⭐️1.5", "⭐️2", "⭐️2.5", "⭐️3", "⭐️3.5", "⭐️4", "⭐️4.5", "⭐️5"],
    datasets: [{
      borderColor: "gray",
      backgroundColor: colors[0],
      lineTension: 0,
      fill: false,
      borderJoinStyle: "round",
      barThickness: "flex",
      data: [
        ratings["0"],
        ratings["0.5"],
        ratings["1"],
        ratings["1.5"],
        ratings["2"],
        ratings["2.5"],
        ratings["3"],
        ratings["3.5"],
        ratings["4"],
        ratings["4.5"],
        ratings["5"],
      ]
    }]
  }
}

function RatingsDistribution({books}) {
  const ratingArray = books.map(book => book.rating)
  const ratingCounts = {
    0: 0,
    0.5: 0,
    1: 0,
    1.5: 0,
    2: 0,
    2.5: 0,
    3: 0,
    3.5: 0,
    4: 0,
    4.5: 0,
    5: 0
  }

  ratingArray.forEach(rating => ratingCounts[rating] += 1)

  return <Bar options={options} data={ratingsDistributionData(ratingCounts)} />;
}

export default RatingsDistribution
