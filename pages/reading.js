import Head from 'next/head'
import Link from 'next/link'

import { getCurrentBook } from '../utils/books'

import HomeArrow from '../components/home_arrow'
import Layout from '../components/layout'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import {
  Link as MaterialLink,
} from '@material-ui/core'
import Typography from '@material-ui/core/Typography'

function Current(props) {
  const title = 'Currently Reading'

  const useStyles = makeStyles({
    root: {
      maxWidth: 400,
      minxWidth: 275,
      marginBottom: 12,
    },
    title: {
      fontSize: 20,
    },
    detail: {
      fontSize: 14,
    },
  });

  const classes = useStyles();


  return (
    <Layout title={title}>
      <h1>{title}</h1>
      {
        props.books.map((book, index) => {
          const bookUrl = `https://www.goodreads.com/search?q=${encodeURIComponent(book.title)}`
          return (
            <Card key={index} className={classes.root} variant="outlined">
              <CardContent>
                <Typography className={classes.title} component="h5">
                  <MaterialLink href={bookUrl} rel='noopener noreferrer' target='_blank'>
                    {book.title}
                  </MaterialLink>
                </Typography>
                <Typography className={classes.detail} color="textSecondary">
                  {book.genre}
                </Typography>
                <Typography className={classes.detail} color="textSecondary">
                  {book.assigned}
                </Typography>
              </CardContent>
            </Card>
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
