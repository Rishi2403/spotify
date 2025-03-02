import { prismaClient } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest,NextResponse } from "next/server";

import { z } from "zod";

const UpvoteSchema = z.object({
    streamId:z.string(),
})

export async function post(request: NextRequest) {
    const session = await getServerSession();

    const user =await prismaClient.user.findFirst(
        {
            where:{
                email:session?.user?.email ?? ""
            }
        });

    if(!user){
        return {
            status: 401,
            json: {
                error: "Unauthorized"
            }
        }
    }
    try{
        const data=UpvoteSchema.parse(await request.json());
        await prismaClient.upvote.create({
            data:{

                    userId:user.id,
                    streamId:data.streamId
                
            }
    });
 }catch(e){
    return NextResponse.json({
        message:"Error while upvoting",
    },{
        status:403
    })

 }
}
