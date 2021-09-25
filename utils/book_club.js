import notion from './notion'

const bookDatabaseID = process.env.NOTION_BOOK_DATABASE_ID
const suggestionDatabaseID = process.env.NOTION_SUGGESTION_DATABASE_ID
const memberDatabaseID = process.env.NOTION_MEMBER_DATABASE_ID

async function getBooks() {
  const response = await notion.databases.query({
    database_id: bookDatabaseID,
    filter: {
      property: 'Date finished',
      date: {
        is_not_empty: true
      },
    },
    sorts: [
      {
        property: "Date finished",
        direction: "descending",
      }
    ]
  })
  const bookList = response.results.map(item => {
    const props = item.properties
    return {
      title: props.Name.title[0].plain_text,
      author: props.Author.rich_text[0].plain_text,
      completed_at: props['Date finished'].date.start,
      genre: props.Genre.select.name,
      link: props.Link.url,
      cover_link: props.Cover.files[0].name,
      rating: props.Rating?.number || 0,
      pages: props.Pages?.number || 0,
    }
  })
  return bookList
}


async function getCurrentBook() {
  const response = await notion.databases.query({
    database_id: bookDatabaseID,
    filter: {
      property: 'Date finished',
      date: {
        is_empty: true
      },
    },
    sorts: [
      {
        timestamp: "created_time",
        direction: "descending",
      }
    ]
  })
  const bookList = response.results.map(item => {
    const props = item.properties
    return {
      title: props.Name.title[0].plain_text,
      author: props.Author.rich_text[0].plain_text,
      link: props.Link.url,
      assigned: props.Assigned.rich_text[0].plain_text,
      genre: props.Genre.select.name,
      cover_link: props.Cover.files[0].name,
      pages: props.Pages?.number || 0,
    }
  })
  return bookList
}

async function createSuggestion(title, url) {
  let properties = {
    title: {
      title: [
        {
          "text": {
            "content": title
          }
        }
      ]
    },
    Votes: { number: 0 }
  }
  if (url) {
    properties.Url = { url: url }
  }
  try {
    const result = await notion.request({
      path: "pages",
      method: "POST",
      body: {
        parent: { database_id: suggestionDatabaseID },
        properties: properties
      },
    })
  } catch (error) {
    console.error(error.body)
  }
}

async function getSuggestions() {
  const response = await notion.databases.query({
    database_id: suggestionDatabaseID,
    sorts: [
      {
        timestamp: "created_time",
        direction: "descending",
      }
    ]
  })
  const suggestionList = response.results.map(item => {
    const props = item.properties
    return {
      title: props.Name.title[0].plain_text,
      votes: props.Votes?.number || 0,
      url: props.Url?.url || null,
      read: props.Read.checkbox,
      id: item.id,
      properties: props
    }
  })
  return suggestionList
}

async function deleteSuggestion(id) {
  const response = await notion.pages.update({
    page_id: id,
    archived: true,
  })
  return response
}


async function updateSuggestionVotes(id, votes) {
  const response = await notion.pages.update({
    page_id: id,
    properties: {
      Votes: {
        type: "number",
        number: votes
      }
    }
  })
  return response
}

async function updateSuggestionRead(id, read) {
  const response = await notion.pages.update({
    page_id: id,
    properties: {
      Read: {
        type: "checkbox",
        checkbox: read
      }
    }
  })
  return response
}

async function getMembers() {
  const response = await notion.databases.query({
    database_id: memberDatabaseID,

    filter: {
      and: [
        {
          property: "Current Member",
          checkbox: {
            equals: true
          },
        },
        {
          property: "Streak Since",
          date: {
            is_not_empty: true
          },
        }
      ]
    },
    sorts: [
      {
        property: "Streak Since",
        direction: "ascending",
      }
    ]
  })
  const outList = response.results.map(item => {
    const props = item.properties;
    return {
      name: props.Name.title[0].plain_text,
      streak_since: props['Streak Since'].date.start,
    }
  })
  return outList
}


async function test() {
  const response = await notion.databases.query({
    database_id: suggestionDatabaseID,
  })
  return response
}

export {
  createSuggestion,
  deleteSuggestion,
  getBooks,
  getCurrentBook,
  getMembers,
  getSuggestions,
  updateSuggestionRead,
  updateSuggestionVotes,

  test,
}
