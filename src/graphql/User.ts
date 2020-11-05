import { extendType, intArg, objectType, stringArg } from '@nexus/schema'
import * as nexus from '@nexus/schema'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.email()
    t.model.profile({ type: 'Profile' })
    t.model.venues({ type: "Venue" })
    t.model.VenueAdministration({ type: "Profile" })
  },
})


export const Profile = objectType({
  name: 'Profile',
  definition(t) {
    t.model.id()
    t.model.bio()
    t.model.User()
    t.model.emojimood()
  },
})



export const UserMutation = nexus.extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneUser({ alias: 'createUser' })
    t.crud.deleteOneProfile()

    // When I add this crud to my mutations i get the error
    // [ERROR] 14:06:01 Error: Input Object type VenueAdministrationUpdateManyDataInput must define one or more fields.
    // i'm thinking that i need to add something to the above objectType to resovle
    t.crud.updateOneUser({ alias: 'updateUser' })
  },
})

export const UserQuery = nexus.extendType({
  type: 'Query',
  definition(t) {
    t.crud.users({
      alias: "SearchUsers",
      resolve: async (parent, args, ctx) => {
        const users = await ctx.prisma.user.findMany()
        console.log('ctx ===>', users)
        return users
      }
    }),

      t.crud.users({ filtering: true, pagination: true }),

      t.field("findUser", {
        type: User,
        nullable: true,
        args: {
          id: intArg(),
          name: stringArg(),
        },
        description: "Find a single user by their id",
        resolve: (parent, { id }, ctx) => {
          return ctx.prisma.user.findOne({ where: { id: Number(id) } })
        }
      })
  },
})


