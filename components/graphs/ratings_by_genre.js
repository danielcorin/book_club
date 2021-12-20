import React from "react"

import "chart.js/auto";
import { Radar } from "react-chartjs-2";
import 'chartjs-adapter-date-fns';

const colors =  [
  "#c2185b",
  "#512da8",
  "#1976d2",
  "#0097a7",
  "#388e3c",
  "#afb42b",
  "#ffa000",
  "#e64a19",
];

colors.sort((a, b) => 0.5 - Math.random());

function average(arr) {
  return arr.reduce((a,b) => a + b, 0) / arr.length
}

function RatingsByGenre({books}) {
  const genres = {};
  books.forEach(book => {
    if(!genres[book.genre]) {
      genres[book.genre] = [book.rating]
    } else {
      genres[book.genre].push(book.rating)
    }
  })
  const genreRatings = {}
  Object.keys(genres).forEach(genre => {
    genreRatings[genre] = average(genres[genre])
  })
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Ratings by genre",
      },
    },
  };
  const entries = Object.entries(genreRatings);
  let labels = entries.map(entry => entry[0])
  let data = entries.map(entry => entry[1])
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Genre average rating",
        data: data,
        backgroundColor: colors[3] + '70',
        pointBackgroundColor: colors[3] + '70',
        borderWidth: 1,
      },
    ],
  };

  return <Radar options={options} data={chartData} />;
}

export default RatingsByGenre
