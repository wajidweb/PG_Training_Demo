import { PackageTier, AddOn } from '@/types'

export const PACKAGE_TIERS: PackageTier[] = [
  {
    id: 'essentials',
    name: 'Essentials',
    description: 'Core course experience — everything you need to learn and grow.',
    multiplier: 1.0,
    features: [
      'Core course content',
      'Digital certificate of completion',
      'Course slides (PDF)',
      'Post-course resource guide',
      'Community forum access',
    ],
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Enhanced learning with recorded sessions, workbook and priority support.',
    multiplier: 1.4,
    badge: 'Most Popular',
    features: [
      'Everything in Essentials',
      'Recorded session replay (90 days)',
      'Interactive workbook',
      'Priority email support',
      'Group live Q&A session',
    ],
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'Premium experience with 1:1 coaching and a custom institutional report.',
    multiplier: 1.8,
    features: [
      'Everything in Professional',
      '1:1 coaching session (60 min)',
      'Custom institutional report',
      'Dedicated account manager',
      'Unlimited replay access',
    ],
  },
]

export const ADD_ONS: AddOn[] = [
  {
    id: 'printed_kit',
    name: 'Printed Materials Kit',
    description: 'Professionally printed workbook and reference guides shipped to your institution.',
    category: 'materials',
  },
  {
    id: 'extended_access',
    name: 'Extended Replay Access',
    description: 'Extend recorded session access from 90 days to 12 months.',
    category: 'materials',
  },
  {
    id: 'extra_qa',
    name: 'Extra Live Q&A Session',
    description: 'Book an additional 2-hour live Q&A with the facilitator.',
    category: 'support',
  },
  {
    id: 'group_coaching',
    name: 'Group Coaching Call',
    description: '1-hour group coaching session post-course with your full team.',
    category: 'support',
  },
  {
    id: 'assessment',
    name: 'Post-Course Assessment',
    description: 'Formal assessment with an individualised performance report per participant.',
    category: 'assessment',
  },
  {
    id: 'custom_branding',
    name: 'Custom Certificate Branding',
    description: 'Certificates branded with your institution logo and colours.',
    category: 'extras',
  },
]
