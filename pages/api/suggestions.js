// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {
  createSuggestion,
  deleteSuggestion,
  updateSuggestionRead,
  updateSuggestionVotes,
} from '../../utils/books'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await createSuggestion(req.body.suggestion, req.body.url)
    return res.status(200).json({ success: true })
  } else if (req.method == 'PATCH') {
    if (req.body.votes) {
      await updateSuggestionVotes(req.body.id, req.body.votes)
    } else {
      await updateSuggestionRead(req.body.id, req.body.read)
    }
    return res.status(200).json({ success: true })
  } else if (req.method == 'DELETE') {
    await deleteSuggestion(req.body.id)
    return res.status(200).json({ success: true })
  }

  res.status(400).json({ success: false })
}
