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
import RatingsByGenre from '../components/graphs/ratings_by_genre';
import RatingsByMember from '../components/graphs/ratings_by_member';
import RatingsGoodReadsDelta from '../components/graphs/ratings_goodreads_delta';

const title = "Graphs"

function Graphs({books, members}) {
  return (
    <Layout title={title}>
      <h1>{title}</h1>
      <Grid container spacing={2} >
        <Grid container item md={6} direction="column" >
          <RatingsDistribution books={books} />
          <RatingsOverTime books={books} />
          <RatingsGoodReadsDelta books={books} />
          <RatingsVsPages books={books} />
          <RatingsByMember books={books} members={members} />
        </Grid>
        <Grid container item md={6} direction="column" >
          <GenreDonut books={books} />
          <RatingsByGenre books={books} />
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
