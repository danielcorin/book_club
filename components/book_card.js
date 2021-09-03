import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Rating from '@material-ui/lab/Rating'
import {
  Link as MaterialLink,
} from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles';

function BookCard(props) {
  const useStyles = makeStyles({
    root: {
      maxWidth: 460,
      minxWidth: 275,
      maxHeight: 125,
      marginBottom: 14,
      display: 'flex',
    },
    cover_left: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
    },
    title: {
      fontSize: 18
    },
    detail: {
      fontSize: 14,
    },
    cover: {
      height: 125,
      width: 83,
    },
    rating: {
      width: 200,
      display: 'flex',
      alignItems: 'center',
    },
  });

  const classes = useStyles()
  const book = props.book

  return (
    <Card className={classes.root} variant='outlined'>
      <div className={classes.cover_left}>
        <CardMedia
          className={classes.cover}
          image={book.cover_link}
          title={`${book.title} cover image`}
          component='img'
        />
      </div>
      <CardContent className={classes.content}>
        <Typography className={classes.title} component='h5'>
          <MaterialLink href={book.link} rel='noopener noreferrer' target='_blank'>
            {book.title}
          </MaterialLink>
        </Typography>
        <Typography className={classes.detail} color='textSecondary'>
          {`${book.author} • ${book.genre} • ${book.pages} pages`}
        </Typography>
        <Typography className={classes.detail} color='textSecondary'>
          {book.completed_at || book.assigned}
        </Typography>
        {book.rating ?
          <Typography className={classes.detail} color='textSecondary'>
            <Box className={classes.rating}>
              <Rating
                size='small'
                value={book.rating}
                precision={0.5}
                readOnly
              />
            </Box>
          </Typography>
          : null
        }
      </CardContent>
    </Card>
  )
}

export default BookCard

