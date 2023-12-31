import {ApolloServer} from '@apollo/server'

import {User} from './user/index.js'

// Haar we Have Pass Schema,query,mutation

async function createApolloGraphqlServer() {
    const gqlServer = new ApolloServer({
        typeDefs:`
            ${User.typeDef}
            type Query {
                ${User.queries}
            }

            type Mutation {
                ${User.mutations}
            }
        `, // schema -
        resolvers:{
            Query: {
                ...User.resolver.queries
            },

            Mutation:{
                ...User.resolver.mutations
            }
        }
    })

    await gqlServer.start();

    return gqlServer;
}

export default createApolloGraphqlServer;