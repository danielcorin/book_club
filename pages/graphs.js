import React from 'react'
import * as d3 from 'd3';

import Head from 'next/head'
import Link from 'next/link'

import { Grid } from '@material-ui/core'

import { getBooks, getMembers } from '../utils/book_club'

import BookCard from '../components/book_card'
import HomeArrow from '../components/home_arrow'
import Layout from '../components/layout'

import GenreDonut from '../components/graphs/genre_donut';
import RatingsDistribution from '../components/graphs/ratings_distribution';
import RatingsOverTime from '../components/graphs/ratings_over_time';
import RatingsVsPages from '../components/graphs/ratings_vs_pages';

const title = "Graphs"

function Graphs({books, members}) {
  return (
    <Layout title={title}>
      <h1>{title}</h1>
      <Grid container spacing={2} >
        <Grid container item md={6} direction="column" >
          <RatingsDistribution books={books} />
          <RatingsOverTime books={books} />
          <RatingsVsPages books={books} />
        </Grid>
        <Grid container item md={6} direction="column" >
          <GenreDonut books={books} />
        </Grid>
      </Grid>
    </Layout>
  );
}

export const getServerSideProps = async () => {
  const [books, members] = await Promise.all([
    getBooks(),
    getMembers(),
  ])
  return {
    props: {
      books: books,
      members: members,
    }
  };
}

export default Graphs
