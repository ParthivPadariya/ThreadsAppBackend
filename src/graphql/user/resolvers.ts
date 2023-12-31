// Inside resolver queries and mutaion

import UserService, {CreteUserPayload} from '../../services/user'

const queries = {
    getUserToken: async (_ : any, payload: {email:string, password:string}) => {
        // console.log(_);
        const token = UserService.getUserToken({email: payload.email, password:payload.password});
        return token;
    },

    getCurrentLoggedInUser: async (_:any, parameter: any, context: any) => {
        console.log(context);
        if (context && context.user) {
            const id = context.user.id;
            const user = await UserService.getUserById(id);
            return user;
        }
        throw new Error("User Not LoggedIn");
    }
}

const mutations = {
    createUser: async (_:any, payload:CreteUserPayload) => {
        const res = await UserService.createUser(payload);
        return res.id
    }
}

export const resolver = {queries,mutations}