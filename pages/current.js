import Head from 'next/head'
import Link from 'next/link'

import { getCurrentBook } from '../utils/books'

import HomeArrow from '../components/home_arrow'
import Layout from '../components/layout'

function Current(props) {
  const title = 'Currently reading'
  return (
    <Layout title={title}>
      <h1>{title}</h1>
      {
        props.books.map((book, index) => {
          return (
            <p key={index}>{book.title}: {book.assigned}</p>
          )
        })
      }
      <HomeArrow />
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
