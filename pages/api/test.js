// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { test } from '../../utils/book_club'

export default async function handler(req, res) {
  const result = await test()
  console.log(result)
  res.status(200).json(result)
}
