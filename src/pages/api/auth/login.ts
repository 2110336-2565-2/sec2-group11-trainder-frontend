import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    data: string
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const body = req.body
    res.status(200).json({ data: body })
}