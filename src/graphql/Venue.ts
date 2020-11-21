import { objectType } from '@nexus/schema'
import * as nexus from '@nexus/schema'

export const Venue = objectType({
  name: 'Venue',
  definition(t) {
    t.model.id()
    t.model.venueDetailsId()
    t.model.VenueDetails({ type: 'VenueDetails' })
    t.model.VenueAdministration({ type: "VenueAdministration" })
    t.model.businessAccount()
  },
})

export const VenueDetails = objectType({
  name: 'VenueDetails',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.description()
    t.model.Venue({ type: "Venue" })
  },
})

export const VenueAdministration = objectType({
  name: 'VenueAdministration',
  definition(t) {
    t.model.id()
    t.model.Venue()
    t.model.AdminsBusinessAccount()
    t.model.knalb()
  },
})


export const VenueMutation = nexus.extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneVenue()
    t.crud.updateOneVenue()
  },
})

export const VenueQuery = nexus.extendType({
  type: 'Query',
  definition(t) {
    t.crud.venues()
  },
})
