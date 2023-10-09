import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
}); 

export async function POST(req:Request){
    try {
        const { userId } = auth()

        const body = await req.json()
        const {prompt, amount = 1, resolution = "256x256"} = body
        if(!userId){
            return new NextResponse("Unauthorized", {status: 401})
        }

        if (!openai.apiKey){
            return new NextResponse("API KEY not configured", {status: 500})
        }

        if(!prompt){
            return new NextResponse("messages are requried", {status: 401})
        }

        if(!amount){
            return new NextResponse("an amount value is requried", {status: 401})
        }

        if(!resolution){
            return new NextResponse("Aresolution value is requried", {status: 401})
        }

        const Response = await openai.images.generate({
            prompt,
            n: parseInt(amount, 10),
            size: resolution,
        })

        return NextResponse.json(Response.data)
    } catch (error) {
        console.log("IMAGE ERROR!!", error)
        return new NextResponse("Internal error", {status: 500})
    }
}