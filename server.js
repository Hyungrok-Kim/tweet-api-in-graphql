import { ApolloServer, gql } from "apollo-server";

/**
 * Alias type Query -> Root
 * type Root 안의 모든 것들은 Rest API에서 URL을 만드는 것과 같다.
 * 
 * REST에서 POST를 담당하는 스페셜 type. -> Mutation 
 */
const typeDefs = gql`
    schema {
        query: Root
    }

    type User {
        id: ID
        username: String
    }

    type Tweet {
        id: ID
        text: String
        Author: User
    }

    type Root {
        allTweets: [Tweet]
        tweet(id: ID): Tweet
    }

    type Mutation {
        postTweet(text: String, userId: ID): Tweet
    }
`; // SDL(Schema Definition Language)를 미리 정의를 해줘야 ApolloServer Error가 안남 

const server = new ApolloServer({ typeDefs });

server.listen().then(({ url }) => {
    console.log(`Running on ${url}`);
})