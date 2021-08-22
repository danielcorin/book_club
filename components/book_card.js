import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import {
  Link as MaterialLink,
} from '@material-ui/core'
import Typography from '@material-ui/core/Typography'

function BookCard(props) {
  const useStyles = makeStyles({
    root: {
      maxWidth: 460,
      minxWidth: 275,
      maxHeight: 125,
      marginBottom: 14,
      display: 'flex',
    },
    cover_float: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
    },
    title: {
      fontSize: 20,
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
    <Card className={classes.root} variant="outlined">
      <div className={classes.cover_float}>
        <CardMedia
          className={classes.cover}
          image={book.cover_link}
          title={`${book.title} cover image`}
          component="img"
        />
      </div>
      <CardContent className={classes.content}>
        <Typography className={classes.title} component="h5">
          <MaterialLink href={book.link} rel='noopener noreferrer' target='_blank'>
            {book.title}
          </MaterialLink>
        </Typography>
        <Typography className={classes.detail} color="textSecondary">
          {book.author}
        </Typography>
        <Typography className={classes.detail} color="textSecondary">
          {book.genre}
        </Typography>
        <Typography className={classes.detail} color="textSecondary">
          {book.completed_at || book.assigned}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default BookCard

