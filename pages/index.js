import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Layout from '../components/layout'
import styles from '../styles/Home.module.css'

export default function Home() {
  const title = 'Home'

  return (
    <Layout title={title}>
      <h1>{title}</h1>
      <div>👋 Welcome to our book club website</div>
      <span>
        👀 What we&apos;re&nbsp;
        <Link href='/reading' passHref>
          currently reading
        </Link>
      </span>
    </Layout >
  )
}
