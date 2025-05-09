import { builder } from '../builder'
import { prisma } from '../db'

builder.prismaObject('User', {
  fields: (t) => ({
    id: t.exposeString('id'),
    email: t.exposeString('email'),
    username: t.string(),
    fullName: t.string(),
    substancesHistory: t.string(),
    timezone: t.string(),
    preferredLanguage: t.string(),
    notificationPreferences: t.string(),
    wearableConnections: t.string(),
    therapistId: t.string(),
    isActive: t.boolean(),
  }),
})

export const UserUniqueInput = builder.inputType('UserUniqueInput', {
  fields: (t) => ({
    id: t.string(),
    email: t.string(),
  }),
})

const UserCreateInput = builder.inputType('UserCreateInput', {
  fields: (t) => ({
    email: t.string({ required: true }),
    name: t.string(),

  }),
})

builder.queryFields((t) => ({
  allUsers: t.prismaField({
    type: ['User'],
    resolve: (query) => prisma.user.findMany({ ...query }),
  }),
}))

builder.mutationFields((t) => ({
  signupUser: t.prismaField({
    type: 'User',
    args: {
      data: t.arg({
        type: UserCreateInput,
        required: true,
      }),
    },
    resolve: (query, parent, args) => {
      return prisma.user.create({
        ...query,
        data: {
          email: args.data.email,
          username: args.data.username,
          fullName: args.data.fullName,
          substancesHistory: args.data.substancesHistory,
          timezone: args.data.timezone,
          preferredLanguage: args.data.preferredLanguage,
          notificationPreferences: args.data.notificationPreferences,
          wearableConnections: args.data.wearableConnections,
        },
      })
    },
  }),
}))
