import { NextApiRequest, NextApiResponse } from "next";


type Data = {
    name: string
    timeStamp: Date
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
){
    const timeStamp = new Date()
    res.status(200).json({name: "Felipe", timeStamp})
}