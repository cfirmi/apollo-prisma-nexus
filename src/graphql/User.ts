import { intArg, objectType, stringArg } from '@nexus/schema'
import * as nexus from '@nexus/schema'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.email()
    t.model.profile({ type: 'Profile' })
    t.model.BusinessAccount({ type: 'Profile' })
    t.model.createdAt()
  },
})

export const BusinessAccount = objectType({
  name: 'BusinessAccount',
  definition(t) {
    t.model.id()
    t.model.VenueAdministration({ type: 'VenueAdministration' })
  },
})

export const Profile = objectType({
  name: 'Profile',
  definition(t) {
    t.model.id()
    t.model.bio()
    t.model.User({ type: 'User' })
    t.model.emojimoodId()
    t.model.Emojimood({ type: 'Emojimood' })
  },
})

export const UserMutation = nexus.extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneUser({ alias: 'createUser' })
    t.crud.updateOneUser()
    t.crud.updateOneProfile()
    t.crud.createOneVenue()
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
    })
    t.crud.users({ filtering: true, pagination: true })
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


