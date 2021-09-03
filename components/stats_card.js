import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import FunctionsIcon from '@material-ui/icons/Functions'
import Rating from '@material-ui/lab/Rating'
import { withStyles } from '@material-ui/core/styles'

function StatsCard(props) {
  const useStyles = makeStyles({
    root: {
      maxWidth: 460,
      minxWidth: 275,
      marginBottom: 14,
      display: 'flex',
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
  const stats = props.stats

  return (
    <Card className={classes.root} variant='outlined'>
      <CardContent className={classes.content}>
        <Typography className={classes.title} component='h5'>
          Statistics
        </Typography>
        <Typography className={classes.detail} color='textSecondary'>
          {`Books read: ${stats.numberOfBooks}`}
        </Typography>
        <Typography className={classes.detail} color='textSecondary'>
          {`Total pages read: ${stats.totalPages}`}
        </Typography>
        <Typography className={classes.detail} color='textSecondary'>
          {`Median book length: ${stats.median}`}
        </Typography>
        <Typography className={classes.detail} color='textSecondary'>
          {`Days per book: ${stats.daysPerBook}`}
        </Typography>
        <Typography className={classes.detail} color='textSecondary'>
          <Box className={classes.rating} >
            Median rating:
            <Rating
              size='small'
              value={stats.medianRating}
              precision={0.5}
              readOnly
            />
          </Box>
        </Typography>
      </CardContent>
    </Card>
  )
}

export default StatsCard

