import { prisma } from "@/lib/prisma"

export const questionResolver = {
    Query: {
        questions: (_: unknown, { sessionId, }: { sessionId: string }) =>
            prisma.question.findMany({
                where: { sessionId },
                orderBy: [{ isPinned: "desc" }, { upvotes: "desc" }, { createdAt: 'asc' }],
            }),
    },

    Mutation: {
        submitQuestion: (
            _: unknown,
            {
                sessionId,
                participantName,
                text,
            }: { sessionId: string; participantName: string; text: string }
        ) =>
            prisma.question.create({
                data: { sessionId, participantName, text },
            }),

        upvoteQuestion: (_: unknown, { questionId }: { questionId: string }) =>
            prisma.question.update({
                where: { id: questionId },
                data: { upvotes: { increment: 1 } },
            }),

        pinQuestion: (_: unknown, { questionId}:{questionId:string}) =>
            prisma.question.update({
                where:{id:questionId},
                data:{isPinned:true},
            }),

        markAnswered : (_:unknown, {questionId}:{questionId:string}) =>
            prisma.question.update({
                where:{id:questionId},
                data:{isAnswered:true},
            }),
    }

};