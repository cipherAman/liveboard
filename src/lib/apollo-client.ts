import   { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client"

function makeClient (){
    return new   ApolloClient({
        link: new HttpLink({
            uri:"/api/graphql",
        }),
        cache: new InMemoryCache(),
    });
}


let client :ApolloClient | null = null;

export function getApolloClient(){
    if(!client) client= makeClient();
    return client;
}