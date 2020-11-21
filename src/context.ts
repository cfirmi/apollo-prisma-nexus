import { PrismaClient } from '@prisma/client'
import { PubSub } from 'apollo-server-express'

const prisma = new PrismaClient()
const pubsub = new PubSub()

// MiddleWare fucntions
// prisma.$use(async (params, next) => {
//   // Manipulate params here
//   const result = next(params);
//   console.log('result', result)
//   switch (params.model) {
//     case 'User': console.log('The User model has been querried')
//     case 'Venue': console.log('The Venue model has been querried')
//   }
//   return next(params);
// })

export interface Context {
  prisma: PrismaClient,
  pubsub: PubSub
}

export const createContext = (ctx: any): Context => {
  return {
    ...ctx,
    prisma,
    pubsub
  }
}
