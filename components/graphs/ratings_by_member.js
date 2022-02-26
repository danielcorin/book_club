import React from "react"

import "chart.js/auto";
import { Bar } from "react-chartjs-2";
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
const diff = 0.1

function RatingsByMember({books, members}) {
  const memberIDToName = {};
  members.forEach(member => memberIDToName[member.id] = member.name)
  const memberRatings = {};
  books.forEach(book => {
    if(!memberRatings[book.leader_member_id]) {
      memberRatings[book.leader_member_id] = [book.rating]
    } else {
      memberRatings[book.leader_member_id].push(book.rating)
    }
  })

  const entries = Object.entries(memberRatings);
  let labels = entries.map(entry => memberIDToName[entry[0]])
  let data = entries.map(entry => {
    let min = Math.min(...entry[1])
    let max = Math.max(...entry[1])
    if (min == max) {
      min -= diff
      min = Math.max(min, 0)
      max += diff
    }
    return [min, max]
  })

  const options = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Ratings by member",
      },
      tooltip: {
        callbacks: {
          label: (data) => {
            const ratings = entries[data.dataIndex][1]
            const min = Math.min(...ratings)
            const max = Math.max(...ratings)
            return `Min: ⭐️${min}, Max: ⭐️${max}, Count: ${ratings.length}`
          }
        }
      },
    },
    backgroundColor: colors[4] + '70',
  };

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Rating range",
        data: data,
      },
    ],
  };

  return <Bar options={options} data={chartData} />;
}

export default RatingsByMember
