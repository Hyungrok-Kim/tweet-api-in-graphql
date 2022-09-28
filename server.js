import { ApolloServer, gql } from "apollo-server";

let tweets = [
    {
        id: "1",
        text: "hello",
        userId: "2",
    },
    {
        id: "2",
        text: "world",
        userId: "1",
    },
];

let users = [
    {
        id: "1",
        firstName: "Hyungrok",
        lastName: "Kim",
    },
    {
        id: "2",
        firstName: "Gildong",
        lastName: "Hong",
    },
];

/**
 * Alias type Query -> Root
 * type Root 안의 모든 것들은 Rest API에서 URL을 만드는 것과 같다.
 * 
 * REST에서 POST를 담당하는 스페셜 type. -> Mutation
 * 
 * REST API를 GraphQL으로 감싸는 방법 또한 존재. 
 * 나중에 해보자.
 */
const typeDefs = gql`
    schema {
        query: Root
    }

    type User {
        id: ID!
        """
        fullName은 firstName + lastName
        """
        fullName: String!
        firstName: String!
        lastName: String!
    }

    """
    -- Document
    Tweet Object represents a resource for a Tweet 
    """

    type Tweet {
        id: ID!
        text: String!
        author: User
    }

    type Root {
        allUsers: [User!]!
        allTweets: [Tweet!]!
        tweet(id: ID!): Tweet
    }

    type Mutation {
        postTweet(text: String!, userId: ID!): Tweet!
        """
        Deletes a Tweet if found, else return false
        """
        deleteTweet(id: ID!): Boolean!
    }
`; // SDL(Schema Definition Language)를 미리 정의를 해줘야 ApolloServer Error가 안남.

const resolvers = {
    Root: {
        allTweets() {
            return tweets;
        },
        tweet(_, { id }) {
            console.log(`root : ${JSON.stringify(root)}`);
            console.log(`args : ${id}`);
            return tweets.find((tweet) => tweet.id === id);
        },
        allUsers() {
            return users;
        },
    },
    Mutation: {
        postTweet(_, { text, userId }) {
            const newTweet = {
                id: tweets.length + 1,
                text,
                userId,
            };
            tweets.push(newTweet);
            return newTweet;
        },
        deleteTweet(_, { id }) {
            const tweet = tweets.find(tweet => tweet.id === id);
            if (!tweet) return false;
            tweets = tweets.filter(tweet => tweet.id !== id)
            return true;
        }
    },
    User: {
        fullName({ firstName, lastName }) {
            return `${firstName} ${lastName}`;
        },
    },
    Tweet: {
        author({userId}) {
            return users.find(user => user.id === userId);
        },
    },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`Running on ${url}`);
})