import Head from 'next/head'
import Link from 'next/link'

import { getBooks } from '../utils/books'

import BookCard from '../components/book_card'
import HomeArrow from '../components/home_arrow'
import Layout from '../components/layout'
import StatsCard from '../components/stats_card'

function History({ books }) {
  const title = 'History'
  console.log(books)
  return (
    <Layout title={title}>
      <h1>{title}</h1>
      <StatsCard stats={stats(books)} />
      {
        books.map((book, index) => {
          return (
            <BookCard key={index} book={book} />
          )
        })
      }
      <HomeArrow />
    </Layout >
  )
}

function stats(books) {
  const pageArray = books.map(book => book.pages)
  const numberOfBooks = pageArray.length
  const ratingArray = books.map(book => book.rating)
  const totalPages = pageArray.reduce((acc, pages) => acc + pages)
  return {
    numberOfBooks,
    totalPages,
    median: median(pageArray),
    medianRating: median(ratingArray),
    daysPerBook: daysPerBook(books),
  }
}

function daysPerBook(books) {
  const firstDate = books[books.length - 1].completed_at
  const lastDate = books[0].completed_at
  const totalDays = (new Date(lastDate) - new Date(firstDate)) / 86400000
  console.log(totalDays)
  // ignore first book because first date is the date we finished that
  return (totalDays / (books.length - 1)).toFixed(0)
}

function median(values) {
  if (values.length === 0) return 0;

  values.sort(function (a, b) {
    return a - b;
  });

  var half = Math.floor(values.length / 2);

  if (values.length % 2)
    return values[half];

  return (values[half - 1] + values[half]) / 2.0;
}

export const getServerSideProps = async () => {
  const data = await getBooks()

  return {
    props: {
      books: data,
    }
  };
}

export default History
