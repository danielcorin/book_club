import Head from 'next/head'
import Link from 'next/link'

import { getBooks } from '../utils/books'

import HomeArrow from '../components/home_arrow'
import Layout from '../components/layout'

function History(props) {
  const title = "History"
  return (
    <Layout title={title}>
      <h1>{title}</h1>
      {
        props.books.map((book, index) => {
          return (
            <p key={index}>{book.title}: {book.completed_at}</p>
          )
        })
      }
      <HomeArrow />
    </Layout>
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
