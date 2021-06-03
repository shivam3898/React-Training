const { PrismaClient } = require("@prisma/client")
const { ApolloServer } = require('apollo-server');
const { PubSub } = require('apollo-server');
const fs = require('fs');
const path = require('path');

const { getUserId } = require('./utils');
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const User = require('./resolvers/User')
const Link = require('./resolvers/Link')
const Subscription = require('./resolvers/Subscription')
const Vote = require('./resolvers/Vote')

const prisma = new PrismaClient();

const pubsub = new PubSub()

const typeDefs = fs.readFileSync(
    path.join(__dirname, 'schema.graphql'), 'utf-8'
)

const resolvers = {
    Query,
    Mutation,
    Subscription,
    User,
    Link,
    Vote
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        return {
            ...req,
            prisma,
            pubsub,
            userId: req && req.headers.authorization ?
                getUserId(req) : null
        };
    }
})

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));