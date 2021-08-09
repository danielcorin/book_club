import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Our book club</title>
        <meta name="description" content="Our book club website" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📚</text></svg>" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to our book club website!
        </h1>

        <div className={styles.grid}>
          <Link href="/current">
            <a className={styles.card}>
              <h2>📖 Currently reading &rarr;</h2>
              <p>Reading for the upcoming meeting</p>
            </a>
          </Link>

          <Link href="/history">
            <a className={styles.card}>
              <h2>📚 History &rarr;</h2>
              <p>See the books we&apos;ve read</p>
            </a>
          </Link>

          <Link href="/suggestions">
            <a className={styles.card}>
              <h2>📓 Suggest books &rarr;</h2>
              <p>Help find the next great read</p>
            </a>
          </Link>

          <Link href="/suggestions">
            <a className={styles.card}>
              <h2>🗳 Vote on suggestions &rarr;</h2>
              <p>Help pick what we read next</p>
            </a>
          </Link>
        </div>
      </main>
    </div >
  )
}
