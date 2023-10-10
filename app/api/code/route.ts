import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { ChatCompletionMessage } from 'openai/resources/chat/index.mjs';

import { checkApiLimit, increseApiLimit } from '@/lib/api-limit';
import { checkSubscription } from '@/lib/subscription';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
}); 


const instructionMessage: ChatCompletionMessage = {
    role: "system",
    content: "You are a code generator. You must answer only in markdown code snippets. Use code comments for explanations"
}

export async function POST(req:Request){
    try {
        const { userId } = auth()

        const body = await req.json()
        const {messages} = body
        if(!userId){
            return new NextResponse("Unauthorized", {status: 401})
        }

        if (!openai.apiKey){
            return new NextResponse("API KEY not configured", {status: 500})
        }

        if(!messages){
            return new NextResponse("messages are requried", {status: 401})
        }

        const freetrial = await checkApiLimit();
        const isPro = await checkSubscription()

        if(!freetrial && !isPro){
            return new NextResponse("free trial has expired", {status: 403})
        }

        const Response = await openai.chat.completions.create({
            messages: [instructionMessage, ...messages],
            model: "gpt-3.5-turbo",
        })

        if(!isPro){
            await increseApiLimit()
        }

        return NextResponse.json(Response.choices[0].message)
    } catch (error) {
        console.log("CODE ERROR!!", error)
        return new NextResponse("Internal error", {status: 500})
    }
}