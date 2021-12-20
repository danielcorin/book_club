import Link from 'next/link'

import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Rating from '@material-ui/lab/Rating'

import { getMembers } from '../utils/book_club'

import BookCard from '../components/book_card'
import HomeArrow from '../components/home_arrow'
import Layout from '../components/layout'

function Streaks({ members }) {

  const useStyles = makeStyles({
    root: {
      minWidth: 275,
      minHeight: 60,
      maxHeight: 60,
      display: 'flex',
    },
    emoji_left: {
      display: 'flex',
      flexDirection: 'column',
      fontSize: 30,
    },
    content: {
      flex: '1 0 auto',
      padding: '0 0 0 15px',
    },
    title: {
      fontSize: 18,
    },
    detail: {
      fontSize: 14,
    },
    rating: {
      width: 200,
      display: 'flex',
      alignItems: 'center',
    },
  });
  const classes = useStyles()

  const title = 'Streaks'
  const activeMembers = members.filter(member => member.active)

  return (
    <Layout title={title}>
      <h1>{title}</h1>
      {
        activeMembers.map((member, index) => {
          let streakLength = 0;
          if (member.streak_since) {
            streakLength = weeksBetween(
              Date.parse(member.streak_since),
              Date.now(),
            )
          }
          return (
            <Card key={index} className={classes.root} style={{ border: "none", boxShadow: "none" }}>
              <div className={classes.emoji_left}>
                {member.emoji || `🤷‍♂️`}
              </div>
              <CardContent className={classes.content}>
                <div>{`${member.name} (${streakLength})`}</div>
                <Box className={classes.rating}>
                  <Rating
                    size='small'
                    value={streakLength}
                    max={streakLength}
                    readOnly
                  />
                </Box>
              </CardContent>
            </Card>
          )
        })
      }
      <HomeArrow />
    </Layout >
  )
}

function weeksBetween(d1, d2) {
  return Math.ceil((d2 - d1) / (7 * 24 * 60 * 60 * 1000));
}

export const getServerSideProps = async () => {
  const data = await getMembers()
  return {
    props: {
      members: data,
    }
  };
}

export default Streaks
