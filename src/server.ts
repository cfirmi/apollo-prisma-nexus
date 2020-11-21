import _ApolloServer from './ApolloServer'
import * as bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import { createServer } from 'http'

const app = express()

const corsOptions = {
  credentials: true,
  origin: process.env.CORS_ORIGIN,
  methods: 'OPTIONS, GET, POST, PUT, PATCH, DELETE',
  allowedHeaders: 'Origin, Authorization, X-Requested-With, Content-Type, Accept',
  optionsSuccessStatus: 200,
};

app.use(
  cors(corsOptions),
);

app.use(bodyParser.json())

app.use('/graphql', async (req, res, next) => { next() })

_ApolloServer.applyMiddleware({ app, cors: corsOptions })

const httpServer = createServer(app)

_ApolloServer.installSubscriptionHandlers(httpServer)

httpServer.listen({
  port: `4000`
}, () => {
  console.log(`${process.env.NODE_ENV === `development`
    ?
    `👾 👾 👾 👾 👾  Server ready on http://localhost:4000/graphql`
    :
    ``}
  `)
});
