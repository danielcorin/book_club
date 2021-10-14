import Head from 'next/head'
import Link from 'next/link'


function HomeArrow(props) {
  return (
    <Link href="/reading">
      <a>&larr; Home</a>
    </Link>
  )
}

export default HomeArrow
