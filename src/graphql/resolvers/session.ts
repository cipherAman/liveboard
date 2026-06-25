import { prisma } from "@/lib/prisma"
import { nanoid } from "nanoid"
import { SessionState } from "@/generated/prisma"

export const sessionResolvers = {
    Query: {
        session: (_: unknown, { code }: { code: string }) =>
            prisma.session.findUnique({
                where: { code },
                include: { polls: true, questions: true },
            }),
    },


    Mutation: {
        createSession: () =>
            prisma.session.create({
                data: {
                    code: nanoid(6).toUpperCase(),
                    hostId: "host"
                },
                include: { polls: true, questions: true },
            }),

        setSessionState: (
            _: unknown,
            { sessionId, state }: { sessionId: string; state: SessionState }
        ) =>
            prisma.session.update({
                where: { id: sessionId },
                data: { state },
                include: { polls: true, questions: true },
            }),

        endSession: (_: unknown, { sessionId }: { sessionId: string }) =>
            prisma.session.update({
                where: { id: sessionId },
                data: { state: SessionState.ended },
                include: { polls: true, questions: true },
            }),
    },
};