import Head from 'next/head'
import Link from 'next/link'

import { getBooks } from '../utils/books'

function History(props) {
  return (
    <>
      <h1>History</h1>
      {
        props.books.map((book, index) => {
          return (
            <p key={index}>{book.title}: {book.completed_at}</p>
          )
        })
      }
      <Link href="/">
        <a>&larr; Home</a>
      </Link>
    </>
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
