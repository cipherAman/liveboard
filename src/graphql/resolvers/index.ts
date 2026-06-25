import { sessionResolvers } from "./session";
import { pollResolvers } from "./poll";
import { questionResolver } from "./question";

export const resolvers ={
    Query: {
        ...sessionResolvers.Query,
        ...pollResolvers.Query,
        ...questionResolver.Query,
    },

    Mutation :{
        ...sessionResolvers.Mutation,
        ...pollResolvers.Mutation,
        ...questionResolver.Mutation,
    },
    Poll: pollResolvers.Poll,
};