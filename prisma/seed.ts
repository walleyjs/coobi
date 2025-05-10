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
  {
    username: 'test_question_end',
    email: 'test_question_end@example.com',
    fullName: 'Test Question End',
    substancesHistory: [],
    timezone: 'UTC',
    preferredLanguage: 'en-US',
    notificationPreferences: { push: true, email: false, sms: false },
    wearableConnections: { fitbit: null, apple_health: null, google_fit: null, oura: null },
    therapistId: null,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    lastLoginAt: null
  },
  {
    username: 'confidence_user',
    email: 'confidence_user@example.com',
    fullName: 'Confidence User',
    substancesHistory: [],
    timezone: 'UTC',
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
            else: 3
          }
        },
        {
          stepOrder: 2,
          type: 'reflection',
          content: {
            en: { prompt: 'What triggered your self-doubt most recently?' },
            de: { prompt: 'Was hat Ihre Selbstzweifel zuletzt ausgelöst?' }
          }
        },
        {
          stepOrder: 3,
          type: 'info',
          content: {
            en: { prompt: 'Great! Keep focusing on your strengths.' },
            de: { prompt: 'Super! Konzentrieren Sie sich weiterhin auf Ihre Stärken.' }
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
            en: { prompt: "Let's try a breathing exercise for stress relief. Sit comfortably and take a deep breath in..." },
            de: { prompt: "Lass uns eine Atemübung zur Stressbewältigung machen. Setzen Sie sich bequem hin und atmen Sie tief ein..." }
          }
        },
        {
          stepOrder: 2,
          type: 'question',
          content: {
            en: {
              prompt: 'Do you feel more relaxed now?',
              options: [
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No, still tense' }
              ]
            },
            de: {
              prompt: 'Fühlen Sie sich jetzt entspannter?',
              options: [
                { value: 'yes', label: 'Ja' },
                { value: 'no', label: 'Nein, immer noch angespannt' }
              ]
            }
          },
          logic: {
            if_answer: 'no',
            next_step: 3,
            else: null
          }
        },
        {
          stepOrder: 3,
          type: 'info',
          content: {
            en: { prompt: "Try repeating the breathing exercise or take a short walk." },
            de: { prompt: "Wiederholen Sie die Atemübung oder machen Sie einen kurzen Spaziergang." }
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
            en: { prompt: 'Tips for better sleep: avoid screens before bed, keep a regular schedule.' },
            de: { prompt: 'Tipps für besseren Schlaf: Vermeiden Sie Bildschirme vor dem Schlafengehen, halten Sie einen regelmäßigen Zeitplan ein.' }
          }
        },
        {
          stepOrder: 2,
          type: 'reflection',
          content: {
            en: { prompt: 'What is one thing you can do tonight to improve your sleep?' },
            de: { prompt: 'Was können Sie heute Abend tun, um Ihren Schlaf zu verbessern?' }
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
        },
        {
          stepOrder: 2,
          type: 'question',
          content: {
            en: {
              prompt: 'Will you set a goal for today?',
              options: [
                { value: 'yes', label: 'Yes, I will set a goal' },
                { value: 'no', label: 'Not today' }
              ]
            },
            de: {
              prompt: 'Möchten Sie sich heute ein Ziel setzen?',
              options: [
                { value: 'yes', label: 'Ja, ich setze ein Ziel' },
                { value: 'no', label: 'Heute nicht' }
              ]
            }
          }
        }
      ]
    }
  },
  {
    slug: 'psychoeducation-motivation',
    category: 'psychoeducation',
    isActive: true,
    steps: {
      create: [
        {
          stepOrder: 1,
          type: 'info',
          content: {
            en: { prompt: "Did you know? Small daily actions can build lasting change. You're making progress!" },
            de: { prompt: "Wussten Sie schon? Kleine tägliche Handlungen können dauerhafte Veränderungen bewirken. Sie machen Fortschritte!" }
          }
        }
      ]
    }
  },
  {
    slug: 'end-on-question',
    category: 'test',
    isActive: true,
    steps: {
      create: [
        {
          stepOrder: 1,
          type: 'info',
          content: {
            en: { prompt: "Let's check in with a final question." },
            de: { prompt: "Lass uns mit einer letzten Frage abschließen." }
          }
        },
        {
          stepOrder: 2,
          type: 'question',
          content: {
            en: {
              prompt: "How confident do you feel about your progress today?",
              options: [
                { value: 'very', label: 'Very confident' },
                { value: 'somewhat', label: 'Somewhat confident' },
                { value: 'not', label: 'Not confident' }
              ]
            },
            de: {
              prompt: "Wie zuversichtlich fühlen Sie sich heute bezüglich Ihres Fortschritts?",
              options: [
                { value: 'very', label: 'Sehr zuversichtlich' },
                { value: 'somewhat', label: 'Etwas zuversichtlich' },
                { value: 'not', label: 'Nicht zuversichtlich' }
              ]
            }
          }
        }
      ]
    }
  },
  {
    slug: 'confidence-check',
    category: 'test',
    isActive: true,
    steps: {
      create: [
        {
          stepOrder: 1,
          type: 'info',
          content: {
            en: { prompt: "Let's check your confidence for today." },
            de: { prompt: "Lass uns heute dein Selbstvertrauen überprüfen." }
          }
        },
        {
          stepOrder: 2,
          type: 'question',
          content: {
            en: {
              prompt: "How confident do you feel about your progress today?",
              options: [
                { value: 'very', label: 'Very confident' },
                { value: 'somewhat', label: 'Somewhat confident' },
                { value: 'not', label: 'Not confident' }
              ]
            },
            de: {
              prompt: "Wie zuversichtlich fühlen Sie sich heute bezüglich Ihres Fortschritts?",
              options: [
                { value: 'very', label: 'Sehr zuversichtlich' },
                { value: 'somewhat', label: 'Etwas zuversichtlich' },
                { value: 'not', label: 'Nicht zuversichtlich' }
              ]
            }
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

  const confidenceUser = await prisma.user.findUnique({ where: { email: 'confidence_user@example.com' } });
  if (confidenceUser) {
    await prisma.activityMetric.create({
      data: {
        userId: confidenceUser.id,
        date: new Date(),
        steps: 1000,
        activeMinutesHigh: 5,
        source: 'test',
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
