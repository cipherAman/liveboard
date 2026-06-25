import { prisma } from "@/lib/prisma"

export const pollResolvers= {
    Query: {
        polls: ( _:unknown, {sessionId}: {sessionId:string})=>
            prisma.poll.findMany({
                where: {sessionId},
                include : {votes:true},
                orderBy: {createdAt :"asc"}
            }),
    },

    Poll: {
        results: (poll : { options:string[];votes:{option: string } []}) =>{
            return poll.options.map((option)=>({
                option,
                count:poll.votes.filter((v)=> v.option === option).length,
            }));
        },
    },

    Mutation : {
        createPoll : (
            _:unknown,
            {
                sessionId,
                question,
                options,
            }: { sessionId:string; question:string; options:string[]}
        ) => 
            prisma.poll.create ({ 
                data:{sessionId, question,options},
                include: {votes:true },
            }),

            castVote : async (
                _:unknown,
                {
                    pollId,
                    participantName,
                    option,
                }: { pollId:string; participantName:string; option :string }
            )=> {
                await prisma.vote.create ({
                    data : {pollId, participantName, option },
                });

                return prisma.poll.findUniqueOrThrow    ({
                    where: {id:pollId},
                    include : {votes:true},
                });
            },
    },
};