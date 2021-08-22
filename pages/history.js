import Head from 'next/head'
import Link from 'next/link'

import { getBooks } from '../utils/books'

import BookCard from '../components/book_card'
import HomeArrow from '../components/home_arrow'
import Layout from '../components/layout'

function History(props) {
  const title = 'History'

  return (
    <Layout title={title}>
      <h1>{title}</h1>
      {
        props.books.map((book, index) => {
          return (
            <BookCard key={index} book={book} />
          )
        })
      }
      <HomeArrow />
    </Layout >
  )
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
