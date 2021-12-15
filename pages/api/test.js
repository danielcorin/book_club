// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getBooks, getMembers } from '../../utils/book_club'

export default async function handler(req, res) {
  const result = await getBooks()
  res.status(200).json(result)
}
