import { auth } from "@clerk/nextjs";

import { prisma } from "@/prisma/client"

import { MAX_FREE_COUNTS } from "@/constants";

export const increseApiLimit = async() => {
    const { userId } = auth();

    if(!userId){
        return;
    }

    const userApiLimit = await prisma.userApiLimit.findUnique({
        where: {
            userid : userId
        }
    })

    if(userApiLimit){
        await prisma.userApiLimit.update({
            where: { userid : userId},
            data: { count: userApiLimit.count + 1 }
        })
    }else{
        await prisma.userApiLimit.create({
            data: { userid : userId, count : 1 }
        })
    }
}


export const checkApiLimit = async () => {
    const { userId } = auth()

    if(!userId){
        return false; 
    }

    const userApiLimit = await prisma.userApiLimit.findUnique({
        where: {
            userid : userId
        }
    })

    if(!userApiLimit || userApiLimit.count < MAX_FREE_COUNTS){
        return true;
    }else{
        return false;
    }
}


export const getApiLimitCount = async () => {
    const { userId } = auth()

    if(!userId){
        return 0;
    }

    const apiLimitCount = await prisma.userApiLimit.findUnique({
        where: {
            userid: userId
        }
    })

    if(!apiLimitCount){
        return 0;
    }

    return apiLimitCount.count;
}