import { makeStyles } from '@material-ui/core/styles'
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
          {book.author} {book.rating ? `• ${book.genre}` : ''}
        </Typography>
        <Typography className={classes.detail} color='textSecondary'>
          {book.completed_at || book.assigned}
        </Typography>
        <Typography className={classes.detail} color='textSecondary'>
          {book.rating ?
            <Rating
              size='small'
              value={book.rating}
              precision={0.5}
              readOnly
            />
            : book.genre
          }
        </Typography>
      </CardContent>
    </Card>
  )
}

export default BookCard

