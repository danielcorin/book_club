import Link from 'next/link'
import Head from 'next/head'

import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton'
import BookIcon from '@material-ui/icons/Book'
import HomeIcon from '@material-ui/icons/Home'
import FavoriteIcon from '@material-ui/icons/Favorite'
import HistoryIcon from '@material-ui/icons/History'
import BarChartIcon from '@material-ui/icons/BarChart'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import StarIcon from '@material-ui/icons/Star'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'
import Tooltip from "@material-ui/core/Tooltip";
import { spacing } from '@material-ui/system'

export default function Layout({
  children,
  title = 'Our book club',
}) {
  return (
    <>
      <Head>
        <title>{title} | Our Book Club</title>
        <meta charSet='utf-8' />
        <meta name='descriptilon' content='Our book club website' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <link rel='icon' href='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📚</text></svg>' />
      </Head>
      <header>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <Link href='/' passHref>
                <Tooltip title="Home">
                  <HomeIcon />
                </Tooltip>
              </Link>
            </IconButton>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <Link href='/reading' passHref>
                <Tooltip title="Currently Reading">
                  <BookIcon />
                </Tooltip>
              </Link>
            </IconButton>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <Link href='/history' passHref>
                <Tooltip title="History">
                  <HistoryIcon />
                </Tooltip>
              </Link>
            </IconButton>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <Link href='/love' passHref>
                <Tooltip title="Books We Love">
                  <FavoriteIcon />
                </Tooltip>
              </Link>
            </IconButton>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <Link href='/graphs' passHref>
                <Tooltip title="Graphs">
                  <BarChartIcon />
                </Tooltip>
              </Link>
            </IconButton>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <Link href='https://marlow-ai.vercel.app/' passHref>
                <Tooltip title="Recommendations">
                  <AutoAwesomeIcon />
                </Tooltip>
              </Link>
            </IconButton>
          </Toolbar>
        </AppBar>
      </header>
      <Container>
        {children}
      </Container>
    </>
  )
}
