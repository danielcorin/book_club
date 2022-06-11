import Head from 'next/head'
import Link from 'next/link'

import { getCurrentBook } from '../utils/book_club'

import BookCard from '../components/book_card'
import HomeArrow from '../components/home_arrow'
import Layout from '../components/layout'

function Current(props) {
  const title = 'Currently Reading'

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
    </Layout>
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
