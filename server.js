import { ApolloServer, gql } from "apollo-server";

const tweets = [
    {
        id: "1",
        text: "hello",
    },
    {
        id: "2",
        text: "world",
    },
    {
        id: "3",
        text: "Third Unit",
    },
    {
        id: "4",
        text: "4th Unit",
    },
    {
        id: "5",
        text: "5th Unit",
    },
    {
        id: "6",
        text: "6th Unit",
    },
    {
        id: "7",
        text: "7th Unit",
    }

]

const resolvers = {
    Root: {
        allTweets() {
            return tweets;
        },
        tweet(_, { id }) {
            console.log(`root : ${JSON.stringify(root)}`);
            console.log(`args : ${id}`);
            return tweets.find((tweet) => tweet.id === id);
        }
    },
};

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
        id: ID!
        username: String!
        firstName: String!
        lastName: String!
    }

    type Tweet {
        id: ID!
        text: String!
        Author: User
    }

    type Root {
        allTweets: [Tweet!]!
        tweet(id: ID!): Tweet
    }

    type Mutation {
        postTweet(text: String!, userId: ID!): Tweet!
        deleteTweet(id: ID!): Boolean!
    }
`; // SDL(Schema Definition Language)를 미리 정의를 해줘야 ApolloServer Error가 안남 

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`Running on ${url}`);
})