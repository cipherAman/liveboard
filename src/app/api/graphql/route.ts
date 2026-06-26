import { ApolloServer } from "@apollo/server"
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { typeDefs } from "@/graphql/schema";
import { resolvers } from "@/graphql/resolvers";
import { NextRequest,NextResponse } from "next/server";



const server = new ApolloServer({ typeDefs,resolvers });

const handler = startServerAndCreateNextHandler<NextRequest>(server,{
    context:async (req)=>({req}),
});

export async function GET(req: NextRequest): Promise<NextResponse> {
  return handler(req) as Promise<NextResponse>;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  return handler(req) as Promise<NextResponse>;
}