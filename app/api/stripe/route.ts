import { auth, currentUser } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import {prisma} from "@/prisma/client"
import { stripe } from "@/lib/stripe"

import { absoluteURL } from "@/lib/utils"

const settingsUrl = absoluteURL("/settings")


export async function GET(){
    try {
        const {userId} = auth()
        const user = await currentUser()

        if(!userId || !user){
            return new NextResponse("Unauthorized", {status: 401})
        }

        const userSubscription = await prisma.userSubscription.findUnique({
            where: {
                userid : userId
            }
        })

        if(userSubscription && userSubscription.stripeCustomerId){
            const stripeSession = await stripe.billingPortal.sessions.create({
                customer: userSubscription.stripeCustomerId,
                return_url: settingsUrl,
            })

            return new NextResponse(JSON.stringify({ url : stripeSession.url }))
        }

        const stripeSession = await stripe.checkout.sessions.create({
            success_url: settingsUrl,
            cancel_url: settingsUrl,
            payment_method_types: ["card"],
            mode: "subscription",
            billing_address_collection: "auto",
            customer_email: user.emailAddresses[0].emailAddress,
            line_items: [
                {
                    price_data: {
                        currency: "USD",
                        product_data: {
                            name: "InGenius Premium",
                            description: "Unlimited AI generations"
                        },
                        unit_amount: 500,
                        recurring: {
                            interval: "month"
                        }
                    },
                    quantity: 1,
                }
            ],
            metadata: {
                userId,
            }
        })

        return new NextResponse(JSON.stringify({url : stripeSession.url}));
    } catch (error) {
        console.log("[STRIPE_ERROR]", error)
        return new NextResponse("Internal error", {status: 500})
    }
}