import express from 'express'
const app = express()

// Appolo Server 
import { expressMiddleware } from '@apollo/server/express4';
import createApolloGraphqlServer from './graphql/index'
import UserService from './services/user';

const PORT = process.env.PORT || 8000

async function init() {
    app.use(express.json());

    // connect and define
    const gqlServer = await createApolloGraphqlServer();
    // first req go into context
    app.use('/graphql',expressMiddleware(gqlServer,{
        context: async ({ req }) => { 
            // @ts-ignore
            const token = req.headers["token"];

            try {
            const user = UserService.decodeJWTToken(token as string);
            return { user };
            } catch (error) {
            return {};
            }
        },
    }));

    
    app.get('/',(req,res) => {
        return res.json({message:"Server is Up and runnig"})
    })
    
    app.listen(PORT,() => {
        console.log(`Server Started at PORT ${PORT}`);
    })
}

init();

