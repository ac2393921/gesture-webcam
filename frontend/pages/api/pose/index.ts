import Cors from 'cors'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (
    req,
    res) => {
    console.log('a');
    return res;
    if (req.method === "POST") {
        console.log(req);
        return res
        // const formData = new FormData()
        // formData.append('image', req)

        // const apiRes = await fetch("http://localhost:5000/pose/detect", {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'multipart/form-data',
        //     }
            // body: FormData,
        // })
    }
    // res.statusCode = 200;
    // res.setHeader('Content-Type', 'application/json');
    // res.end(JSON.stringify({ name: 'John Doe' }));
};
