import { ApolloServer } from "apollo-server-express";
import { WebApp } from "meteor/webapp";
import { getUser } from "meteor/apollo";
import { Accounts } from "meteor/accounts-base";

import  typeDefs  from "../imports/api/schema";
import  resolvers  from "../imports/api/resolvers";

import "../imports/api/eits.js";

// When you console.log(user.user._id) it shows it on the console but when you return it does not work
// let adminId = Accounts.onLogin(function (user) {
//     return user.user._id
// })

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => ({
        user: await getUser(req.headers.authorization)
    })
})

server.applyMiddleware({
    app: WebApp.connectHandlers,
    path: '/graphql'
})

WebApp.connectHandlers.use('/graphql', (req, res) => {
    if (req.method === 'GET') {
        res.end()
    }
})
