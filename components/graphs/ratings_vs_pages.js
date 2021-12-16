import React from "react"

import "chart.js/auto";
import { Scatter } from "react-chartjs-2";
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

function randomFromArray(arr) {
  return arr[Math.floor(Math.random()*arr.length)]
}

function datasetForGenre(books, genre, i) {
  const pages = books.map(book => book.pages)
  const ratings = books.map(book => book.rating)
  const data = Array.from({ length: pages.length }, (_, i) => ({
    x: pages[i],
    y: ratings[i],
  }));

  return {
    label: genre,
    data: data,
    backgroundColor: colors[i],
    pointRadius: 5,
  }
}

function RatingsVsPages({books}) {
  const genres = {};
  books.forEach(book => {
    if(!genres[book.genre]) {
      genres[book.genre] = [book]
    } else {
      genres[book.genre].push(book)
    }
  })
  const options = {
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Ratings vs. pages",
      },
      tooltip: {
        callbacks: {
          title: (data) => {
            const booksNeedingTip = data.map(d => genres[d.dataset.label][d.dataIndex])
            var outStr = booksNeedingTip.map(book => `${book.title}: ${book.author}`).join(', ');
            return outStr;
          },
          label: (data) => {
            return `${data.parsed.x} pages, ⭐️${data.parsed.y}`
          }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  var i = 0;
  const chartData = {
    datasets: Object.keys(genres).map(genre => {
      return datasetForGenre(genres[genre], genre, i++)
    }),
  };

  return <Scatter options={options} data={chartData} />;
}

export default RatingsVsPages
