import Cors from 'cors'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (
    req: NextApiRequest,
    res: NextApiResponse) => {
    if (req.method === "POST") {
        const image = req.body.image;

        const apiRes = await fetch("http://backend:5000/pose/detect", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({image: image}),
        });

        const data = await apiRes.json();
        res.status(201).json(data);
        return res;
    }
};
