import type { TechfestEvent } from '../types/event'

const poster =
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80'

export const mockEvents: TechfestEvent[] = [
  {
    organizerId: 'org-1',
    title: 'ISPY',
    slug: 'ispy',
    tagline: 'Teasure hunting',
    description:
      ' ',
    posterURL: poster,
    dateTime: new Date('2026-04-11T08:00:00Z').toISOString(),
    venue: 'TBD',
    prizePool: [
      { position: 1, amount: 50000 },
      { position: 2, amount: 25000 },
      { position: 3, amount: 10000 },
    ],
    minTeamSize: 2,
    maxTeamSize: 3,
    maxCapacity: 50,
    registrationCount: 41,
    registrationStatus: 'Starting soon',
    isVisible: true,
    registrationFees: { standard: 0, ieeeMember: 0 },
    rules: [
      'Participants must use the provided SDK only. External binary injections are strictly monitored.',
      'Maximum power consumption for the solution must not exceed 450 Watts of simulated energy.',
      'Real-time telemetry data must be streamed to the judges\' dashboard throughout the event.',
      'Any use of pre-computed large language models is restricted to the "Augmentation" category only.',
    ],
    faqs: [
      {
        question: 'Who can participate?',
        answer: 'Open to undergraduate students.',
      },
      {
        question: 'How many members are required in a team?',
        answer: 'Each team must have exactly 3 members.',
      },
      {
        question: 'Are digital tools allowed?',
        answer: 'Only as specified in challenges; no external assistance.',
      },
      {
        question: 'How is the winner decided?',
        answer: 'Based on speed and accuracy in solving clues across all rounds.',
      },
    ],
    coordinators: [
      { name: 'Shivesh Tiwari', contactNumber: '9919403869' },
      { name: 'Ahad Ulla Baig', contactNumber: '9110654973' },
    ],
  },
  {
    organizerId: 'org-1',
    title: 'ROBO SOCCER',
    slug: 'robo-soccer',
    tagline: '// Play football with bots',
    description:
      '.',
    posterURL:
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=80',
    dateTime: new Date('2026-04-11T10:00:00Z').toISOString(),
    venue: 'TBD',
    prizePool: [{ position: 1, amount: 15000 }],
    minTeamSize: 1,
    maxTeamSize: 3,
    maxCapacity: 30,
    registrationCount: 30,
    registrationStatus: 'Starting soon',
    isVisible: true,
    rules: ['No external teleoperation during timed runs.'],
    faqs: [
      {
        question: 'Who can participate?',
        answer: 'Open to undergraduate students.',
      },
      {
        question: 'How many members are required in a team?',
        answer: 'Each team must have exactly 2 members.',
      },
      {
        question: 'Are digital tools allowed?',
        answer: 'Only as specified in challenges; no external assistance.',
      },
      {
        question: 'How is the winner decided?',
        answer: 'Based on speed and accuracy in solving clues across all rounds.',
      },
    ],
    coordinators: [
      { name: 'Adit Bissa', contactNumber: '75686 84717' },
      { name: 'Abhishek Reddy T', contactNumber: '74835 70657' },
    ],
  }
]

export function getEventBySlug(slug: string): TechfestEvent | undefined {
  return mockEvents.find((e) => e.slug === slug)
}

export function capacityPercent(e: TechfestEvent): number {
  const n = e.registrationCount ?? 0
  if (e.maxCapacity <= 0) return 0
  return Math.min(100, Math.round((n / e.maxCapacity) * 100))
}
