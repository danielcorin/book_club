import { useState } from 'react'

import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import {
  Button,
  Checkbox,
  Grid,
  Input,
  Link as MaterialLink,
} from '@material-ui/core'

import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'

import { getSuggestions } from '../utils/books'

import HomeArrow from '../components/home_arrow'
import Layout from '../components/layout'

import Cookies from 'universal-cookie'

function Suggestions(props) {
  const router = useRouter()

  const refreshData = () => {
    router.replace(router.asPath)
  }

  const [suggestion, setSuggestion] = useState('')
  const [url, setUrl] = useState('')

  const handleSuggestionChange = event => {
    setSuggestion(event.target.value)
  }
  const handleUrlChange = event => {
    setUrl(event.target.value)
  }

  const submitSuggestion = async (event) => {
    event.preventDefault()
    const res = await fetch(
      '/api/suggestions',
      {
        body: JSON.stringify({
          suggestion: suggestion,
          url: url,
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      }
    )

    const result = await res.json()
    setSuggestion('')
    setUrl('')
    refreshData()
  }

  const addVote = (id) => {
    const cookies = new Cookies()
    const votes = getVotes()
    votes.push(id)
    cookies.set('votes', votes, { path: '/' });
  }

  const getVotes = () => {
    return props.votes
  }

  const hasVote = (id) => {
    return getVotes().includes(id)
  }

  const doUpvote = async (sug) => {
    const [id, votes] = [sug.id, sug.votes]
    if (hasVote(id)) {
      return
    }
    addVote(id)
    const res = await fetch(
      '/api/suggestions',
      {
        body: JSON.stringify({
          id,
          votes: votes + 1,
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'PATCH'
      }
    )

    const result = await res.json()
    refreshData()
  }

  const doDelete = async (sug) => {
    const id = sug.id
    const res = await fetch(
      '/api/suggestions',
      {
        body: JSON.stringify({
          id
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'DELETE'
      }
    )

    const result = await res.json()
    refreshData()
  }

  const toggleRead = async (sug) => {
    const [id, read] = [sug.id, sug.read]
    const res = await fetch(
      '/api/suggestions',
      {
        body: JSON.stringify({
          id,
          read: !read,
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'PATCH'
      }
    )

    const result = await res.json()
    refreshData()
  }

  const title = 'Suggestions'
  return (

    <Layout title={title}>
      <h1>{title}</h1>
      <form autoComplete='off' onSubmit={submitSuggestion}>
        <Input required placeholder='Book title' value={suggestion} onChange={handleSuggestionChange} />
        <Input type='url' placeholder='Book url' value={url} onChange={handleUrlChange} />
        <Button
          type='submit'
          variant='contained'
          color='inherit'
        >
          Submit
        </Button>
      </form>

      <h1>Vote</h1>
      {
        props.suggestions.map((sug, index) => {
          const titleStyle = {
            textDecoration: sug.read ? 'line-through' : 'none'
          }
          const thumbColor = hasVote(sug.id) ? 'primary' : 'action'
          return (
            <div key={sug.id}>
              <Grid container direction='row' alignItems='center'>
                <Grid item>
                  <Checkbox
                    color='primary'
                    checked={sug.read}
                    onChange={() => toggleRead(sug)}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                  />
                </Grid>
                <Grid item style={{ cursor: 'pointer' }}>
                  <ThumbUpAltIcon
                    color={thumbColor}
                    onClick={() => doUpvote(sug)}
                  />
                </Grid>
                <Grid item style={{ cursor: 'pointer' }}>
                  {
                    sug.url ?
                      <MaterialLink href={sug.url} rel='noopener noreferrer' target='_blank'>
                      </MaterialLink>
                      : null
                  }
                </Grid>
                <Grid item>
                  <span style={titleStyle}>
                    <MaterialLink href={sug.url} rel='noopener noreferrer' target='_blank'>
                      {sug.title}
                    </MaterialLink>
                    : {sug.votes}
                  </span>
                </Grid>
              </Grid>
            </div>
          )
        })
      }
      <HomeArrow />
    </Layout>
  )
}

export const getServerSideProps = async ({ req }) => {
  const data = await getSuggestions()
  const cookies = new Cookies(req.headers.cookie)
  const votes = cookies.get('votes') || []
  return {
    props: {
      suggestions: data,
      votes: votes,
    }
  };
}


export default Suggestions
