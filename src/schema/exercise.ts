import { builder } from '../builder'
import { prisma } from '../db'
import { Prisma } from '@prisma/client'
import { startOfDay, endOfDay } from 'date-fns'

builder.prismaObject('Exercise', {
  fields: (t: any) => ({
    id: t.exposeString('id'),
    slug: t.exposeString('slug'),
    category: t.exposeString('category', { nullable: true }),
    isActive: t.exposeBoolean('isActive'),
    steps: t.relation('steps'),
  }),
})

builder.prismaObject('ExerciseStep', {
  fields: (t: any) => ({
    id: t.exposeString('id'),
    stepOrder: t.exposeInt('stepOrder'),
    type: t.exposeString('type'),
    content: t.expose('content', { type: 'Json' }),
    logic: t.expose('logic', { type: 'Json', nullable: true }),
  }),
})

builder.prismaObject('ExerciseStepResponse', {
  fields: (t: any) => ({
    id: t.exposeString('id'),
    userId: t.exposeString('userId'),
    stepId: t.exposeString('stepId'),
    response: t.expose('response', { type: 'Json' }),
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
  }),
})

builder.queryField('nextIntervention', (t) =>
  t.prismaField({
    type: 'Exercise',
    args: {
      userId: t.arg.string({ required: true }),
    },
    resolve: async (query, parent, args) => {
      const userId = args.userId as string;
      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user) return null;

      const [latestStress] = await prisma.stressMetric.findMany({
        where: { userId },
        orderBy: { timestamp: 'desc' },
        take: 1,
      });
      const [latestSleep] = await prisma.sleepMetric.findMany({
        where: { userId },
        orderBy: { date: 'desc' },
        take: 1,
      });
      const [latestActivity] = await prisma.activityMetric.findMany({
        where: { userId },
        orderBy: { date: 'desc' },
        take: 1,
      });

      const priorities: string[] = [];
      if (latestStress && latestStress.score > 2) priorities.push('stress-intervention');
      if (latestSleep && latestSleep.totalMinutes < 360) priorities.push('sleep-intervention');
      if (
        latestActivity &&
        (latestActivity.steps < 3000 || (latestActivity.activeMinutesHigh ?? 0) < 10)
      ) priorities.push('activity-intervention');
      priorities.push('self-doubt-reflection');

      const todayStart = startOfDay(new Date());
      const todayEnd = endOfDay(new Date());

      for (const slug of priorities) {
        const exercise = await prisma.exercise.findFirst({
          where: { slug, isActive: true },
          include: { steps: true },
        });
        if (!exercise) continue;

        const stepIds = exercise.steps.map((s) => s.id);
        if (stepIds.length === 0) continue;

        const responses = await prisma.exerciseStepResponse.findMany({
          where: {
            userId,
            stepId: { in: stepIds },
            createdAt: { gte: todayStart, lte: todayEnd },
          },
        });

        if (responses.length < stepIds.length) {
          return exercise;
        }
      }

      return null;
    },
  })
);

builder.mutationFields((t) => ({
  submitExerciseStepResponse: t.prismaField({
    type: 'ExerciseStepResponse',
    args: {
      userId: t.arg.string({ required: true }),
      stepId: t.arg.string({ required: true }),
      response: t.arg({ type: 'Json', required: true }),
    },
    resolve: async (query, parent, args) => {
      return prisma.exerciseStepResponse.create({
        ...query,
        data: {
          userId: args.userId as string,
          stepId: args.stepId as string,
          response: args.response as Prisma.InputJsonValue,
        },
      })
    },
  }),
}))
