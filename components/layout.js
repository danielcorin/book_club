import Link from 'next/link'
import Head from 'next/head'

import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton'
import HomeIcon from '@material-ui/icons/Home'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'
import { spacing } from '@material-ui/system'

export default function Layout({
  children,
  title = 'Our book club',
}) {
  return (
    <>
      <Head>
        <title>{title}</title>
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
                <HomeIcon />
              </Link>
            </IconButton>
            <Link href="/history" passHref>
              <Button variant="text" color="inherit">History</Button>
            </Link>
            <Link href="/reading" passHref>
              <Button variant="text" color="inherit">Reading</Button>
            </Link>
            <Link href="/suggestions" passHref>
              <Button variant="text" color="inherit">Suggestions</Button>
            </Link>
          </Toolbar>
        </AppBar>
      </header>
      <Container>
        {children}
      </Container>
    </>
  )
}
