import notion from './notion'

const bookDatabaseID = process.env.NOTION_BOOK_DATABASE_ID
const suggestionDatabaseID = process.env.NOTION_SUGGESTION_DATABASE_ID

async function getBooks() {
  const response = await notion.databases.query({
    database_id: bookDatabaseID,
    filter: {
      property: 'Date finished',
      date: {
        is_not_empty: true
      },
    },
  })
  const bookList = response.results.map(item => {
    const props = item.properties
    return {
      title: props.Name.title[0].plain_text,
      completed_at: props['Date finished'].date.start,
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
  })
  const bookList = response.results.map(item => {
    const props = item.properties
    return {
      title: props.Name.title[0].plain_text,
      assigned: props.Assigned.rich_text[0].plain_text,
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
  console.log(properties)
  try {
    const result = await notion.request({
      path: "pages",
      method: "POST",
      body: {
        parent: { database_id: suggestionDatabaseID },
        properties: properties
      },
    })
    console.log(result)
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
  getSuggestions,
  updateSuggestionRead,
  updateSuggestionVotes,

  test,
}
