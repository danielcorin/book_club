import Head from 'next/head'
import Link from 'next/link'

import { getCurrentBook } from '../utils/books'

function Current(props) {
  return (
    <>
      <h1 >Currently reading</h1>
      {
        props.books.map((book, index) => {
          return (
            <p key={index}>{book.title}: {book.assigned}</p>
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
  const data = await getCurrentBook()
  return {
    props: {
      books: data,
    }
  };
}

export default Current
