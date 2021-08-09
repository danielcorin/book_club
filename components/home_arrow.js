import Head from 'next/head'
import Link from 'next/link'


function HomeArrow(props) {
  return (
    <Link href="/">
      <a>&larr; Home</a>
    </Link>
  )
}

export default HomeArrow
