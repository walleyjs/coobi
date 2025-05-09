import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const userData = [
  {
    username: 'jane_doe',
    email: 'jane@example.com',
    fullName: 'Jane Doe',
    substancesHistory: ['alcohol'],
    timezone: 'Europe/Berlin',
    preferredLanguage: 'de-DE',
    notificationPreferences: { push: true, email: false, sms: false },
    wearableConnections: { fitbit: null, apple_health: null, google_fit: null, oura: null },
    therapistId: null,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    lastLoginAt: null,
  },
  {
    username: 'john_smith',
    email: 'john@example.com',
    fullName: 'John Smith',
    substancesHistory: ['nicotine', 'cannabis'],
    timezone: 'America/New_York',
    preferredLanguage: 'en-US',
    notificationPreferences: { push: true, email: false, sms: false },
    wearableConnections: { fitbit: null, apple_health: null, google_fit: null, oura: null },
    therapistId: null,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    lastLoginAt: null
  },
]

const exerciseData = [
  {
    slug: 'self-doubt-reflection',
    category: 'reflection',
    isActive: true,
    steps: {
      create: [
        {
          stepOrder: 1,
          type: 'question',
          content: {
            en: {
              prompt: 'Have you ever experienced self-doubt due to past failures, negative feedback or comparing yourself to others?',
              options: [
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' }
              ]
            },
            de: {
              prompt: 'Haben Sie jemals Selbstzweifel erlebt ...',
              options: [
                { value: 'yes', label: 'Ja' },
                { value: 'no', label: 'Nein' }
              ]
            }
          },
          logic: {
            if_answer: 'yes',
            next_step: 2,
            else: null
          }
        },
        {
          stepOrder: 2,
          type: 'reflection',
          content: {
            en: {
              prompt: 'How can you avoid this kind of triggers in future?'
            },
            de: {
              prompt: 'Wie können Sie solche Auslöser in Zukunft vermeiden?'
            }
          }
        }
      ]
    }
  },
  {
    slug: 'stress-intervention',
    category: 'stress',
    isActive: true,
    steps: {
      create: [
        {
          stepOrder: 1,
          type: 'info',
          content: {
            en: { prompt: "Let's try a breathing exercise for stress relief." },
            de: { prompt: "Lass uns eine Atemübung zur Stressbewältigung machen." }
          }
        }
      ]
    }
  },
  {
    slug: 'sleep-intervention',
    category: 'sleep',
    isActive: true,
    steps: {
      create: [
        {
          stepOrder: 1,
          type: 'info',
          content: {
            en: { prompt: 'Tips for better sleep: avoid screens before bed.' },
            de: { prompt: 'Tipps für besseren Schlaf: Vermeiden Sie Bildschirme vor dem Schlafengehen.' }
          }
        }
      ]
    }
  },
  {
    slug: 'activity-intervention',
    category: 'activity',
    isActive: true,
    steps: {
      create: [
        {
          stepOrder: 1,
          type: 'info',
          content: {
            en: { prompt: "Let's get moving! Try a short walk or stretch." },
            de: { prompt: "Beweg dich! Mach einen kurzen Spaziergang oder dehne dich." }
          }
        }
      ]
    }
  }
]

async function main() {
  console.log(`Start seeding ...`)
  for (const u of userData) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: u,
    })
  }


  const jane = await prisma.user.findUnique({ where: { email: 'jane@example.com' } });
  const john = await prisma.user.findUnique({ where: { email: 'john@example.com' } });

  for (const e of exerciseData) {
    await prisma.exercise.upsert({
      where: { slug: e.slug },
      update: {},
      create: e,
    })
  }

  if (jane) {
    await prisma.sleepMetric.create({
      data: {
        userId: jane.id,
        date: new Date(Date.now() - 24 * 60 * 60 * 1000),
        startTime: new Date(Date.now() - 8 * 60 * 60 * 1000),
        endTime: new Date(),
        totalMinutes: 420,
        deepSleepMinutes: 90,
        remSleepMinutes: 70,
        lightSleepMinutes: 230,
        awakeMinutes: 30,
        hrv: 65.2,
        source: 'fitbit',
      },
    });
    await prisma.stressMetric.create({
      data: {
        userId: jane.id,
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
        score: 4,
        trigger: 'work',
        source: 'apple_health',
        rawData: {},
      },
    });
    await prisma.activityMetric.create({
      data: {
        userId: jane.id,
        date: new Date(),
        steps: 1200,
        caloriesBurned: 1800,
        activeMinutesLow: 30,
        activeMinutesModerate: 25,
        activeMinutesHigh: 12,
        heartRateMin: 58,
        heartRateMax: 134,
        heartRateAvg: 85,
        source: 'apple_health',
        rawData: {},
      },
    });
  }

  if (john) {
    await prisma.sleepMetric.create({
      data: {
        userId: john.id,
        date: new Date(Date.now() - 24 * 60 * 60 * 1000),
        startTime: new Date(Date.now() - 7.5 * 60 * 60 * 1000),
        endTime: new Date(),
        totalMinutes: 390,
        deepSleepMinutes: 80,
        remSleepMinutes: 60,
        lightSleepMinutes: 210,
        awakeMinutes: 40,
        hrv: 58.9,
        source: 'garmin',
      },
    });
    await prisma.stressMetric.create({
      data: {
        userId: john.id,
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        score: 5,
        trigger: 'a person',
        source: 'garmin',
        rawData: {},
      },
    });
    await prisma.activityMetric.create({
      data: {
        userId: john.id,
        date: new Date(),
        steps: 4500,
        caloriesBurned: 1600,
        activeMinutesLow: 20,
        activeMinutesModerate: 15,
        activeMinutesHigh: 5,
        heartRateMin: 60,
        heartRateMax: 140,
        heartRateAvg: 82,
        source: 'garmin',
        rawData: {},
      },
    });
  }

  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
