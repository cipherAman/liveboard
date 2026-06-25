import { Question } from "@/generated/prisma"

export const typeDefs = `#graphql
    enum SessionState {
        waiting
            poll_active
            qa_active
            ended
    }

    type Session{
        id: ID!
        code: String
        state: SessionState!
        polls: [Poll!]!
        questions: [Question!]!
        createdAt: String!
    }

    type Poll{
        id: ID!
        sessionId: ID!
        question: String!
        options: [String!]!
        isActive: Boolean!
        votes: [Vote!]!
        results: [PollResult!]!
    }


    type PollResult {
        option: String!
        count: Int!
    }


    type Vote{
        id: ID!
        pollId: ID!
        participantName: String!
        option: String!
    }

    type Question {
        id: ID!
        sessionId: ID!
        participantName: String!
        text: String!
        upvotes: Int!
        isAnswered: Boolean!
        isPinned: Boolean!
        createdAt: String!
    }

    type Query {
        session(code: String!): Session
        polls(sessionId: ID!): [Poll!]!
        questions(sessionId: ID!): [Question!]!

    }


    type Mutation{
        createSession: Session!
        createPoll(sessionId: ID!, question: String!, options: [String!]!): Poll!
        castVote(pollId: ID!, participantName: String!, option: String!): Poll!
        setSessionState(sessionId: ID!, state: SessionState!): Session!
        submitQuestion(sessionId: ID!, participantName: String!, text: String!): Question!
        upvoteQuestion(questionId: ID!): Question!
        pinQuestion(questionId: ID!): Question!
        markAnswered(questionId: ID!): Question!
        endSession(sessionId: ID!): Session!
    }
    `;