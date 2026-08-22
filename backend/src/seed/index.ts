import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { Course } from '../models/Course'
import { TrainingPath } from '../models/TrainingPath'
import { Testimonial } from '../models/Testimonial'
import { Article } from '../models/Article'
import { Resource } from '../models/Resource'

dotenv.config()

// Training Paths Data
const trainingPaths = [
  {
    id: 'academic',
    title: 'Academic Excellence',
    subtitle: 'Master the Art of Effective Teaching and Research',
    description: 'Enhance your academic career with comprehensive programmes covering teaching methodologies, research skills, language proficiency, and digital literacy.',
    color: '#1D4ED8', // blue-700
    bgColor: '#EFF6FF', // blue-50
    icon: '🎓',
    courseIds: ['cpd_aw', 'cpd_cm', 'cpd_cl', 'cpd_dig', 'cpd_paw', 'cpd_kemy', 'cpd_mnd', 'cpd_cre', 'ets_ge'],
    isActive: true,
  },
  {
    id: 'administrative',
    title: 'Administrative Excellence',
    subtitle: 'Navigate the Complexities of Higher Education Administration',
    description: 'Equip yourself with skills for managing diverse student populations, data protection, internationalization, and creating inclusive institutional environments.',
    color: '#047857', // emerald-700
    bgColor: '#ECFDF5', // emerald-50
    icon: '⚙️',
    courseIds: ['cpd_brnd', 'cpd_cult', 'ets_ea', 'cpd_sus', 'cpd_tbu', 'cpd_inc', 'cpd_ai', 'cpd_cyb'],
    isActive: true,
  },
  {
    id: 'leadership',
    title: 'Leadership & Strategic Management',
    subtitle: 'Transform Your Career into Leadership',
    description: 'Aspire to leadership roles in higher education? Develop the vision, strategic capabilities, and governance expertise to drive institutional success.',
    color: '#7E22CE', // purple-700
    bgColor: '#FAF5FF', // purple-50
    icon: '🏛️',
    courseIds: ['cpd_ldr', 'cpd_inn', 'cpd_dir', 'cpd_hrm', 'ets_avd'],
    isActive: true,
  },
]

// Course Data (22 Courses)
const courses = [
  {
    id: 'cpd_aw',
    slug: 'academic-writing-skills',
    code: 'CPD_AW',
    title: 'Academic Writing Skills for Advanced Researchers and Tutors',
    shortDescription: 'Master academic writing, from research papers to grant proposals, with expert feedback.',
    fullDescription: `This course is designed to equip graduate students, researchers, and faculty with the advanced writing skills essential for academic success. Develop the clarity, precision, and persuasiveness required to excel in your field. Through in-depth analysis of scholarly texts, intensive writing practice, and expert feedback, you will master the art of crafting compelling research papers, articles, and grant proposals.`,
    outcomes: ['Research Ethics and Plagiarism awareness', 'Advanced research and information synthesis', 'Mastery of academic writing genres', 'Effective use of language and style', 'Development of critical thinking'],
    targetAudience: ['Educators, Teachers and Tutors', 'Early-Career Academics', 'Research Professionals'],
    deliveryMethods: [{ type: 'online-instructor', label: 'Online Instructor-Led', multiplier: 1.0 }, { type: 'self-paced', label: 'Online Self-Paced', multiplier: 0.75 }, { type: 'onsite', label: 'Onsite', multiplier: 1.3 }],
    upcomingDates: ['21–25 Oct 2024', '25–29 Nov 2024', '27–31 Jan 2025'],
    pathId: 'academic',
    pricing: { basePrice: 497, minParticipants: 1, maxParticipants: 50, volumeDiscounts: [{ minQty: 1, discountPercent: 0 }, { minQty: 5, discountPercent: 10 }, { minQty: 10, discountPercent: 15 }, { minQty: 20, discountPercent: 20 }] },
    offers: {
      ets: [{ id: 'ets_aw_1', title: 'Individual Enrolment', description: 'Single participant, full course access', pricePerPerson: 497, features: ['Full course access', 'Certificate', 'Expert feedback'] }, { id: 'ets_aw_2', title: 'Team Package (5+)', description: 'Best value for small teams', pricePerPerson: 447, features: ['All Individual benefits', '10% group discount'] }],
      limited: [{ id: 'ltd_aw_1', title: 'Early Bird Special', description: 'Book now and save 15%', discountPercent: 15, expiresAt: new Date('2025-06-30') }],
      bundle: [{ id: 'bnd_aw_1', title: 'Department Bundle', minParticipants: 10, discountPercent: 20, description: 'Train your entire department' }],
    },
    isActive: true,
  },
  {
    id: 'cpd_cm',
    slug: 'classroom-management',
    code: 'CPD_CM',
    title: 'Creating a Positive Learning Environment and Classroom Management',
    shortDescription: 'Build supportive classrooms with proven management and engagement strategies.',
    fullDescription: `This course equips educators with the essential skills to foster a supportive and engaging classroom environment.`,
    outcomes: ['Effective classroom management', 'Building community', 'Safe learning space', 'Student engagement'],
    targetAudience: ['Educators', 'Teachers', 'Tutors'],
    deliveryMethods: [{ type: 'online-instructor', label: 'Online Instructor-Led', multiplier: 1.0 }, { type: 'self-paced', label: 'Online Self-Paced', multiplier: 0.75 }, { type: 'onsite', label: 'Onsite', multiplier: 1.3 }],
    upcomingDates: ['20–24 Jan 2025', '17–21 Mar 2025'],
    pathId: 'academic',
    pricing: { basePrice: 497, minParticipants: 1, maxParticipants: 50, volumeDiscounts: [{ minQty: 1, discountPercent: 0 }, { minQty: 10, discountPercent: 15 }] },
    offers: {
      ets: [{ id: 'ets_cm_1', title: 'Standard Enrolment', description: 'Full access', pricePerPerson: 497, features: ['All modules', 'Certificate'] }],
      combo: [{ id: 'cmb_cm_1', title: 'Classroom + Digital Resources', courses: ['cpd_cm', 'cpd_dig'], discountPercent: 10, description: 'Complete educator toolkit' }],
    },
    isActive: true,
  },
  {
    id: 'cpd_cl',
    slug: 'content-language-integrated-learning',
    code: 'CPD_CL',
    title: 'Content and Language Integrated Learning (CLIL)',
    shortDescription: 'Master teaching subject matter through a foreign language using CLIL methodology.',
    fullDescription: `This course provides a comprehensive overview of Content and Language Integrated Learning (CLIL).`,
    outcomes: ['Principles of CLIL', 'Language and content integration', 'Curriculum design'],
    targetAudience: ['Educators', 'Teachers'],
    deliveryMethods: [{ type: 'online-instructor', label: 'Online Instructor-Led', multiplier: 1.0 }, { type: 'onsite', label: 'Onsite', multiplier: 1.3 }],
    upcomingDates: ['16–20 Sept 2024', '5–9 May 2025'],
    pathId: 'academic',
    pricing: { basePrice: 497, minParticipants: 1, maxParticipants: 40, volumeDiscounts: [{ minQty: 1, discountPercent: 0 }, { minQty: 5, discountPercent: 10 }] },
    offers: { ets: [{ id: 'ets_cl_1', title: 'Full CLIL Programme', description: 'Complete methodology training', pricePerPerson: 497, features: ['Theory + Practice', 'Certificate'] }] },
    isActive: true,
  },
  {
    id: 'cpd_dig',
    slug: 'digital-resources-teaching',
    code: 'CPD_DIG',
    title: 'Digital Resources in Teaching',
    shortDescription: 'Embrace technology to enhance teaching. Microsoft 21st Century Certified.',
    fullDescription: `A Microsoft 21st Century Certified Course available online.`,
    outcomes: ['Microsoft 365 for education', 'Digital learning content', 'Collaboration platforms'],
    targetAudience: ['All Academic Staff'],
    deliveryMethods: [{ type: 'online-instructor', label: 'Online Instructor-Led', multiplier: 1.0 }, { type: 'self-paced', label: 'Online Self-Paced', multiplier: 0.75 }],
    upcomingDates: ['Every 2nd Monday'],
    pathId: 'academic',
    pricing: { basePrice: 397, minParticipants: 1, maxParticipants: 100, volumeDiscounts: [{ minQty: 1, discountPercent: 0 }, { minQty: 20, discountPercent: 20 }] },
    offers: { ets: [{ id: 'ets_dig_1', title: 'Online Access Pass', description: 'Monthly cohort access', pricePerPerson: 397, features: ['Microsoft certification', 'Tech support'] }] },
    isActive: true,
  },
  {
    id: 'cpd_paw',
    slug: 'eu-project-application-writing',
    code: 'CPD_PAW',
    title: 'EU Project Application Writing',
    shortDescription: 'Master the intricacies of the EU funding landscape.',
    fullDescription: `This course equips participants with the essential skills to develop compelling EU project proposals.`,
    outcomes: ['EU funding landscape', 'Proposal writing', 'Budget management'],
    targetAudience: ['Research Professionals', 'Project Managers'],
    deliveryMethods: [{ type: 'online-instructor', label: 'Online Instructor-Led', multiplier: 1.0 }, { type: 'onsite', label: 'Onsite', multiplier: 1.3 }],
    upcomingDates: ['23–27 Sept 2024', '7–11 Apr 2025'],
    pathId: 'academic',
    pricing: { basePrice: 597, minParticipants: 1, maxParticipants: 35, volumeDiscounts: [{ minQty: 1, discountPercent: 0 }] },
    offers: { ets: [{ id: 'ets_paw_1', title: 'Standard Enrolment', description: 'Full training', pricePerPerson: 597, features: ['Templates', 'Certificate'] }] },
    isActive: true,
  },
  {
    id: 'cpd_kemy',
    slug: 'holistic-child-development',
    code: 'CPD_KEMY',
    title: 'Holistic Child Development: Teaching Supplement',
    shortDescription: 'Fostering physical, cognitive, social growth in early childhood.',
    fullDescription: `Comprehensive framework for fostering holistic child development.`,
    outcomes: ['Physical literacy', 'Cultural diversity', 'STEM concepts'],
    targetAudience: ['Kindergarten Teachers', 'Early Educators'],
    deliveryMethods: [{ type: 'online-instructor', label: 'Online Instructor-Led', multiplier: 1.0 }, { type: 'onsite', label: 'Onsite', multiplier: 1.3 }],
    upcomingDates: ['2–6 Sept 2024'],
    pathId: 'academic',
    pricing: { basePrice: 447, minParticipants: 1, maxParticipants: 30, volumeDiscounts: [{ minQty: 1, discountPercent: 0 }] },
    offers: { ets: [{ id: 'ets_kemy_1', title: 'Early Years Specialist', description: 'Complete kit', pricePerPerson: 447, features: ['Activity plans', 'Certificate'] }] },
    isActive: true,
  },
  {
    id: 'cpd_mnd',
    slug: 'mindful-teaching',
    code: 'CPD_MND',
    title: 'Mindful Teaching: Cultivating Presence',
    shortDescription: 'Create compassionate learning environments.',
    fullDescription: `Explore the principles of mindfulness in education.`,
    outcomes: ['Personal practice', 'Classroom routines', 'Stress management'],
    targetAudience: ['All Educators'],
    deliveryMethods: [{ type: 'online-instructor', label: 'Online Instructor-Led', multiplier: 1.0 }, { type: 'self-paced', label: 'Online Self-Paced', multiplier: 0.75 }],
    upcomingDates: ['29 Sept – 4 Oct 2024'],
    pathId: 'academic',
    pricing: { basePrice: 397, minParticipants: 1, maxParticipants: 40, volumeDiscounts: [{ minQty: 1, discountPercent: 0 }] },
    offers: { ets: [{ id: 'ets_mnd_1', title: 'Mindfulness Practitioner', description: 'Well-being program', pricePerPerson: 397, features: ['Guided meditations', 'Certificate'] }] },
    isActive: true,
  },
  {
    id: 'cpd_cre',
    slug: 'creativity-idea-creation',
    code: 'CPD_CRE',
    title: 'Creativity and Idea Creation',
    shortDescription: 'Generate innovative research ideas.',
    fullDescription: `Equips aspiring academics with skills for innovation.`,
    outcomes: ['Research mindset', 'Grant proposals', 'Innovation culture'],
    targetAudience: ['Ph.D. Candidates', 'Researchers'],
    deliveryMethods: [{ type: 'online-instructor', label: 'Online Instructor-Led', multiplier: 1.0 }, { type: 'onsite', label: 'Onsite', multiplier: 1.3 }],
    upcomingDates: ['25–29 Nov 2024'],
    pathId: 'academic',
    pricing: { basePrice: 497, minParticipants: 1, maxParticipants: 35, volumeDiscounts: [{ minQty: 1, discountPercent: 0 }] },
    offers: { ets: [{ id: 'ets_cre_1', title: 'Innovation Accelerator', description: 'Creative toolkit', pricePerPerson: 497, features: ['Workshops', 'Certificate'] }] },
    isActive: true,
  },
  {
    id: 'ets_ge',
    slug: 'general-english-programme',
    code: 'ETS_GE',
    title: 'English Language Programme (General)',
    shortDescription: 'Ongoing professional English confidence.',
    fullDescription: `Continuous English program delivered every Monday.`,
    outcomes: ['Grammar and vocabulary', 'Professional communication', 'Confidence'],
    targetAudience: ['Non-Native Speakers'],
    deliveryMethods: [{ type: 'online-instructor', label: 'Online Instructor-Led', multiplier: 1.0 }, { type: 'self-paced', label: 'Online Self-Paced', multiplier: 0.75 }],
    upcomingDates: ['Every Monday'],
    pathId: 'academic',
    pricing: { basePrice: 197, minParticipants: 1, maxParticipants: 200, volumeDiscounts: [{ minQty: 20, discountPercent: 25 }] },
    offers: { ets: [{ id: 'ets_ge_1', title: 'Monthly Subscription', description: 'Per month', pricePerPerson: 197, features: ['Weekly sessions', 'Certificate'] }] },
    isActive: true,
  },

  // Administrative Path
  {
    id: 'cpd_brnd',
    slug: 'branding-promoting-university',
    code: 'CPD_BRND',
    title: 'Branding: Promoting the University',
    shortDescription: 'Strategic branding for HEIs.',
    fullDescription: `Focuses on university branding and promotion.`,
    outcomes: ['Brand identity', 'Reputation management', 'Stakeholder engagement'],
    targetAudience: ['Marketing Staff', 'PR Officers'],
    deliveryMethods: [{ type: 'online-instructor', label: 'Online Instructor-Led', multiplier: 1.0 }, { type: 'onsite', label: 'Onsite', multiplier: 1.3 }],
    upcomingDates: ['25–29 Nov 2024'],
    pathId: 'administrative',
    pricing: { basePrice: 547, minParticipants: 1, maxParticipants: 30, volumeDiscounts: [{ minQty: 1, discountPercent: 0 }] },
    offers: { ets: [{ id: 'ets_brnd_1', title: 'Brand Strategy Pack', description: 'Full toolkit', pricePerPerson: 547, features: ['Templates', 'Certificate'] }] },
    isActive: true,
  },
  {
    id: 'cpd_cult',
    slug: 'cultural-integration-diverse-environment',
    code: 'CPD_CULT',
    title: 'Cultural Integration in a Diverse Environment',
    shortDescription: 'Navigate diverse cultural landscapes.',
    fullDescription: `Tailored for HEI administrative staff managing diverse student bodies.`,
    outcomes: ['Cultural competence', 'Intercultural communication', 'Inclusive policies'],
    targetAudience: ['International Offices', 'Student Affairs'],
    deliveryMethods: [{ type: 'online-instructor', label: 'Online Instructor-Led', multiplier: 1.0 }, { type: 'onsite', label: 'Onsite', multiplier: 1.3 }],
    upcomingDates: ['11–15 Nov 2024'],
    pathId: 'administrative',
    pricing: { basePrice: 547, minParticipants: 1, maxParticipants: 40, volumeDiscounts: [{ minQty: 5, discountPercent: 10 }] },
    offers: { ets: [{ id: 'ets_cult_1', title: 'Individual Leader', description: 'For leaders', pricePerPerson: 547, features: ['Toolkit', 'Certificate'] }] },
    isActive: true,
  },
  {
    id: 'ets_ea',
    slug: 'english-for-administrators',
    code: 'ETS_EA',
    title: 'English and Communication for Administrators',
    shortDescription: 'English for professional settings.',
    fullDescription: `Designed to enhance language proficiency of administrative staff.`,
    outcomes: ['Professional emails', 'Meeting language', 'Confident interaction'],
    targetAudience: ['Administrative Staff'],
    deliveryMethods: [{ type: 'online-instructor', label: 'Online Instructor-Led', multiplier: 1.0 }, { type: 'self-paced', label: 'Online Self-Paced', multiplier: 0.75 }],
    upcomingDates: ['Every Monday'],
    pathId: 'administrative',
    pricing: { basePrice: 247, minParticipants: 1, maxParticipants: 50, volumeDiscounts: [{ minQty: 1, discountPercent: 0 }] },
    offers: { ets: [{ id: 'ets_ea_1', title: 'Monthly Pass', description: 'Ongoing support', pricePerPerson: 247, features: ['Weekly sessions', 'Certificate'] }] },
    isActive: true,
  },
  {
    id: 'cpd_sus',
    slug: 'sustainability-environmental-awareness',
    code: 'CPD_SUS',
    title: 'Sustainability Awareness in HEIs',
    shortDescription: 'Foster sustainability in education.',
    fullDescription: `Knowledge and tools to foster environmental stewardship.`,
    outcomes: ['Environmental challenges', 'Green practices', 'Community partners'],
    targetAudience: ['HEI Administrators', 'Educators'],
    deliveryMethods: [{ type: 'online-instructor', label: 'Online Instructor-Led', multiplier: 1.0 }, { type: 'onsite', label: 'Onsite', multiplier: 1.3 }],
    upcomingDates: ['14–19 Apr 2025'],
    pathId: 'administrative',
    pricing: { basePrice: 497, minParticipants: 1, maxParticipants: 35, volumeDiscounts: [{ minQty: 1, discountPercent: 0 }] },
    offers: { ets: [{ id: 'ets_sus_1', title: 'Sustainability Lead', description: 'Audit kit', pricePerPerson: 497, features: ['Audit kit', 'Certificate'] }] },
    isActive: true,
  },
  {
    id: 'cpd_tbu',
    slug: 'team-building',
    code: 'CPD_TBU',
    title: 'Team Building for HEI Staff',
    shortDescription: 'Build high-performing teams.',
    fullDescription: `Skills to create and foster trust and communication.`,
    outcomes: ['Team dynamics', 'Collaboration skills', 'Conflict resolution'],
    targetAudience: ['All HEI Staff'],
    deliveryMethods: [{ type: 'online-instructor', label: 'Online Instructor-Led', multiplier: 1.0 }, { type: 'onsite', label: 'Onsite', multiplier: 1.3 }],
    upcomingDates: ['18–22 Nov 2024'],
    pathId: 'administrative',
    pricing: { basePrice: 497, minParticipants: 1, maxParticipants: 50, volumeDiscounts: [{ minQty: 10, discountPercent: 20 }] },
    offers: { ets: [{ id: 'ets_tbu_1', title: 'Team Programme', description: 'Interactive workshops', pricePerPerson: 497, features: ['Workshops', 'Certificate'] }] },
    isActive: true,
  },
  {
    id: 'cpd_inc',
    slug: 'inclusion-higher-education',
    code: 'CPD_INC',
    title: 'Inclusion: Dealing with Disability',
    shortDescription: 'Create supportive learning environments.',
    fullDescription: `Equips professionals with skills for inclusive education.`,
    outcomes: ['Disability awareness', 'Support plan strategies', 'Accessible environments'],
    targetAudience: ['Student Affairs', 'Educators'],
    deliveryMethods: [{ type: 'online-instructor', label: 'Online Instructor-Led', multiplier: 1.0 }, { type: 'onsite', label: 'Onsite', multiplier: 1.3 }],
    upcomingDates: ['7–11 Oct 2024'],
    pathId: 'administrative',
    pricing: { basePrice: 547, minParticipants: 1, maxParticipants: 40, volumeDiscounts: [{ minQty: 1, discountPercent: 0 }] },
    offers: { ets: [{ id: 'ets_inc_1', title: 'Inclusion Specialist', description: 'Equity drive', pricePerPerson: 547, features: ['Support templates', 'Certificate'] }] },
    isActive: true,
  },
  {
    id: 'cpd_ai',
    slug: 'international-office-ai-innovation',
    code: 'CPD_AI',
    title: 'International Office Innovation: AI',
    shortDescription: 'Leveraging AI for global engagement.',
    fullDescription: `Explores how AI can transform International Offices.`,
    outcomes: ['AI recruitment pipelines', 'Student support AI', 'Governance'],
    targetAudience: ['International Directors', 'Innovation Managers'],
    deliveryMethods: [{ type: 'online-instructor', label: 'Online Instructor-Led', multiplier: 1.0 }, { type: 'self-paced', label: 'Online Self-Paced', multiplier: 0.75 }],
    upcomingDates: ['On Demand'],
    pathId: 'administrative',
    pricing: { basePrice: 647, minParticipants: 5, maxParticipants: 50, volumeDiscounts: [{ minQty: 1, discountPercent: 0 }] },
    offers: { ets: [{ id: 'ets_ai_1', title: 'AI Innovation Pack', description: 'Modernize operations', pricePerPerson: 647, features: ['Roadmap', 'Certificate'] }] },
    isActive: true,
  },
  {
    id: 'cpd_cyb',
    slug: 'cybersecurity-higher-education',
    code: 'CPD_CYB',
    title: 'Cybersecurity for HEIs',
    shortDescription: 'Protect institutional data.',
    fullDescription: `Practical security frameworks for higher education professionals.`,
    outcomes: ['Threat landscape', 'Risk management', 'Security policies'],
    targetAudience: ['IT Staff', 'Senior Admin'],
    deliveryMethods: [{ type: 'online-instructor', label: 'Online Instructor-Led', multiplier: 1.0 }, { type: 'onsite', label: 'Onsite', multiplier: 1.3 }],
    upcomingDates: ['23–27 Sept 2024'],
    pathId: 'administrative',
    pricing: { basePrice: 597, minParticipants: 1, maxParticipants: 30, volumeDiscounts: [{ minQty: 8, discountPercent: 20 }] },
    offers: { ets: [{ id: 'ets_cyb_1', title: 'Security Essentials', description: 'Staff training', pricePerPerson: 597, features: ['Playbooks', 'Certificate'] }] },
    isActive: true,
  },

  // Leadership Path
  {
    id: 'cpd_ldr',
    slug: 'leadership-management',
    code: 'CPD_LEA',
    title: 'Leadership in Higher Education',
    shortDescription: 'Strategic capabilities for HEI leaders.',
    fullDescription: `Designed to equip individuals for leadership roles.`,
    outcomes: ['Institutional development', 'Financial resources', 'Strategic planning'],
    targetAudience: ['Rectors', 'Deans', 'Aspiring Leaders'],
    deliveryMethods: [{ type: 'online-instructor', label: 'Online Instructor-Led', multiplier: 1.0 }, { type: 'onsite', label: 'Onsite', multiplier: 1.3 }],
    upcomingDates: ['29 Sept – 4 Oct 2024'],
    pathId: 'leadership',
    pricing: { basePrice: 747, minParticipants: 1, maxParticipants: 25, volumeDiscounts: [{ minQty: 5, discountPercent: 15 }] },
    offers: { ets: [{ id: 'ets_ldr_1', title: 'Leadership Essentials', description: 'Core skills', pricePerPerson: 747, features: ['Strategic frameworks', 'Certificate'] }] },
    isActive: true,
  },
  {
    id: 'cpd_inn',
    slug: 'innovation-entrepreneurship',
    code: 'CPD_INN',
    title: 'Innovation and Entrepreneurship',
    shortDescription: 'Drive innovation in university context.',
    fullDescription: `Skills to drive entrepreneurial initiatives.`,
    outcomes: ['Innovation ecosystem', 'Industry partnerships', 'Revenue streams'],
    targetAudience: ['Research Professionals', 'Technology Transfer'],
    deliveryMethods: [{ type: 'online-instructor', label: 'Online Instructor-Led', multiplier: 1.0 }, { type: 'self-paced', label: 'Online Self-Paced', multiplier: 0.75 }],
    upcomingDates: ['2–6 Sept 2024'],
    pathId: 'leadership',
    pricing: { basePrice: 697, minParticipants: 1, maxParticipants: 30, volumeDiscounts: [{ minQty: 8, discountPercent: 18 }] },
    offers: { ets: [{ id: 'ets_inn_1', title: 'Innovation Programme', description: 'Curriculum', pricePerPerson: 697, features: ['Business canvas', 'Certificate'] }] },
    isActive: true,
  },
  {
    id: 'cpd_dir',
    slug: 'director-preparation',
    code: 'CPD_DIR',
    title: 'Director Preparation Program',
    shortDescription: 'Bespoke 1-on-1 for aspiring directors.',
    fullDescription: `Tailored development journey for senior roles.`,
    outcomes: ['Institutional governance', 'Financial leadership', 'Crisis management'],
    targetAudience: ['Aspiring Directors'],
    deliveryMethods: [{ type: 'online-instructor', label: 'Online Instructor-Led', multiplier: 1.0 }],
    upcomingDates: ['On Demand'],
    pathId: 'leadership',
    pricing: { basePrice: 1997, minParticipants: 1, maxParticipants: 1, volumeDiscounts: [] },
    offers: { ets: [{ id: 'ets_dir_1', title: 'Director Prep', description: 'Personalised', pricePerPerson: 1997, features: ['10 coaching sessions', 'Mentorship'] }] },
    isActive: true,
  },
  {
    id: 'cpd_hrm',
    slug: 'hr-management-higher-education',
    code: 'CPD_HRM',
    title: 'HR Management in HEIs',
    shortDescription: 'Strategic role of HR in universities.',
    fullDescription: `Comprehensive understanding of HRM in higher education.`,
    outcomes: ['Staff management', 'Performance management', 'HEI HR ethics'],
    targetAudience: ['HR Professionals', 'Senior Admin'],
    deliveryMethods: [{ type: 'online-instructor', label: 'Online Instructor-Led', multiplier: 1.0 }, { type: 'self-paced', label: 'Online Self-Paced', multiplier: 0.75 }],
    upcomingDates: ['7–11 Oct 2024'],
    pathId: 'leadership',
    pricing: { basePrice: 697, minParticipants: 1, maxParticipants: 30, volumeDiscounts: [{ minQty: 1, discountPercent: 0 }] },
    offers: { ets: [{ id: 'ets_hrm_1', title: 'HR Strategic Leader', description: 'Policy templates', pricePerPerson: 697, features: ['Templates', 'Certificate'] }] },
    isActive: true,
  },
  {
    id: 'ets_avd',
    slug: 'advanced-english-managers-directors',
    code: 'ETS_AVD',
    title: 'Advanced English for Managers',
    shortDescription: 'High-level communication for leaders.',
    fullDescription: `Advanced language skills for strategic communication.`,
    outcomes: ['Negotiation effectively', 'Public speaking', 'Strategic documents'],
    targetAudience: ['Rectors', 'Deans', 'Directors'],
    deliveryMethods: [{ type: 'online-instructor', label: 'Online Instructor-Led', multiplier: 1.0 }, { type: 'onsite', label: 'Onsite', multiplier: 1.3 }],
    upcomingDates: ['Every Monday'],
    pathId: 'leadership',
    pricing: { basePrice: 797, minParticipants: 1, maxParticipants: 20, volumeDiscounts: [{ minQty: 1, discountPercent: 0 }] },
    offers: { ets: [{ id: 'ets_avd_1', title: 'Executive Pass', description: 'Elite English', pricePerPerson: 797, features: ['1-on-1 coaching', 'Certificate'] }] },
    isActive: true,
  },
]

const testimonials = [
  {
    id: 't1',
    name: 'Sarah Mitchell',
    role: 'Director of Academic Development',
    institution: 'Educational Leadership Board',
    content: 'PG Training transformed the way our staff approach teaching. The practical frameworks and real-world simulations gave our team immediately applicable skills that have measurably improved educational outcomes across our departments.',
    rating: 5,
  },
  {
    id: 't2',
    name: 'Carlos Mendes',
    role: 'Executive Manager',
    institution: 'Professional Training Academy',
    content: 'The Leadership and Strategic Management programme was exactly what I needed at a critical point in my career. The blend of theory, peer learning, and coaching gave me the confidence to lead institutional change effectively.',
    rating: 5,
  },
  {
    id: 't3',
    name: 'Amara Diallo',
    role: 'Head of International Operations',
    institution: 'Global Education Department',
    content: 'The Cultural Integration course was a revelation. Our team now handles diverse student populations with genuine competence. The case studies were directly relevant to our daily challenges.',
    rating: 5,
  },
  {
    id: 't4',
    name: 'Tomasz Kowalski',
    role: 'Research Director',
    institution: 'Scientific Research Council',
    content: 'I have attended many professional development programmes, but PG Training stands apart. The Innovation and Entrepreneurship course helped us establish successful project spin-offs within a single year.',
    rating: 5,
  },
  {
    id: 't5',
    name: 'Elena Vassiliev',
    role: 'Senior Operations Officer',
    institution: 'Institutional Quality Unit',
    content: 'The English for Administrators programme improved communication across our entire administrative team. Working with international partners has never been more productive.',
    rating: 5,
  },
  {
    id: 't6',
    name: 'James O\'Brien',
    role: 'Head of Student Affairs',
    institution: 'Student Services Council',
    content: 'We enrolled our entire operations team in the Cultural Integration course. The results were immediate. Student satisfaction scores improved significantly in a single semester.',
    rating: 5,
  },
  {
    id: 't7',
    name: 'Fatima Al-Rashid',
    role: 'Academic Development Lead',
    institution: 'Faculty Success Group',
    content: 'The Academic Writing Skills course gave our researchers the tools to publish in top-tier journals. Several of our participants had papers accepted within months of completing the programme.',
    rating: 5,
  },
  {
    id: 't8',
    name: 'Henrik Larsson',
    role: 'Vice President for Quality & Compliance',
    institution: 'Institutional Operations Board',
    content: 'PG Training\'s team-based approach to professional development creates lasting change. We have been working with them for several years and consistently see measurable improvements in staff performance and satisfaction.',
    rating: 5,
  },
]

const seedArticles = [
  {
    title: 'Leading Through Change: Why Adaptability Is the New Competitive Advantage',
    slug: 'leading-through-change',
    excerpt: 'Every generation of leaders faces change, but modern executives face transformation at unprecedented speed.',
    content: 'Leadership in the 21st century is defined not by static structures, but by dynamic adaptability. Organizations must configure professional learning as an active continuous capability rather than a passive annual training event. This briefing details core techniques to prepare boards and directors for rapid global integration and digital turbulence.',
    author: 'PGT Contributors',
    series: 'CEO Briefing',
    tags: ['Leadership', 'Adaptability'],
    publishedAt: new Date(),
    isPublished: true
  },
  {
    title: 'The Future Skills Every Organisation Needs by 2030',
    slug: 'future-skills-2030',
    excerpt: 'Comprehensive analysis of the key technological forces shaping the future of the global workplace.',
    content: 'By 2030, workforce intelligence will hinge on digital capability, strategic prompt engineering, and intercultural fluency. Institutional coordinators must establish clear curriculum lines supporting lifelong learning and global academic excellence.',
    author: 'PGT Contributors',
    series: 'Future Learning Review',
    tags: ['Skills', 'Future'],
    publishedAt: new Date(),
    isPublished: true
  },
  {
    title: 'How Artificial Intelligence Is Transforming Professional Learning',
    slug: 'ai-transforming-learning',
    excerpt: 'Practical applications of Artificial Intelligence across educational, business, and corporate spaces.',
    content: 'Artificial Intelligence is shifting from a speculative novelty to an active workplace catalyst. This paper outlines bespoke policies and productivity benchmarks for integrating LLM networks into educational and enterprise environments safely.',
    author: 'PGT Contributors',
    series: 'AI in Practice',
    tags: ['AI', 'Education'],
    publishedAt: new Date(),
    isPublished: true
  },
  {
    title: 'Five Characteristics of High Performing Executive Teams',
    slug: 'high-performing-executive-teams',
    excerpt: 'Strategic insights on leadership, executive decision making, corporate strategy, and sustainable growth.',
    content: 'Successful enterprise leadership requires five pillars: psychological safety, rigorous role clarity, deep structural alignment, absolute execution integrity, and continuous capability reinforcement.',
    author: 'PGT Contributors',
    series: 'CEO Briefing',
    tags: ['Executive', 'Teams'],
    publishedAt: new Date(),
    isPublished: true
  },
  {
    title: 'Designing Erasmus Plus Mobilities That Create Lasting Impact',
    slug: 'designing-erasmus-plus-mobilities',
    excerpt: 'Core funding opportunities, mobility trends, international collaboration, and modern program design.',
    content: 'VET mobility programs must be structurally aligned with European quality standards and learning outcomes. Planning with professional partners ensures bulletproof compliance and maximum institutional reputation.',
    author: 'PGT Contributors',
    series: 'Mobility Matters',
    tags: ['Erasmus', 'Mobility'],
    publishedAt: new Date(),
    isPublished: true
  },
  {
    title: 'Why Continuous Learning Is Becoming Every Organisation\'s Competitive Advantage',
    slug: 'continuous-learning-advantage',
    excerpt: 'Techniques for building capable teams, developing talent, and elevating overall corporate performance.',
    content: 'When markets are volatile, static knowledge depreciates instantly. True corporate value is maintained through persistent workforce development and collective capability quarterlies.',
    author: 'PGT Contributors',
    series: 'Capability Quarterly',
    tags: ['Learning', 'Advantage'],
    publishedAt: new Date(),
    isPublished: true
  },
  {
    title: 'From Knowledge to Capability: The Next Evolution of Professional Development',
    slug: 'knowledge-to-capability',
    excerpt: 'New thinking on education, employability, professional development and future skills.',
    content: 'Traditional credentials provide facts, but modern professional training must deliver actionable capability. This review explores case studies of PGT graduates applying frameworks live inside major European enterprises.',
    author: 'PGT Contributors',
    series: 'Capability Quarterly',
    tags: ['Knowledge', 'Capability'],
    publishedAt: new Date(),
    isPublished: true
  }
]

const seedResources = [
  {
    title: 'The Successful CEO Guide',
    slug: 'successful-ceo-guide',
    description: 'Practical strategies for building resilient organisations and high-performing executive teams in volatile markets.',
    coverImage: '/development.png',
    type: 'guide',
    category: 'executive',
    tier: 'free',
    price: 0,
    fileUrl: '/ebook-placeholder.pdf',
    isPublished: true
  },
  {
    title: 'The Erasmus+ Planning Guide',
    slug: 'erasmus-planning-guide',
    description: 'A practical handbook for planning impactful mobilities, learning agreements, and professional development programs.',
    coverImage: '/development.png',
    type: 'guide',
    category: 'erasmus',
    tier: 'free',
    price: 0,
    fileUrl: '/ebook-placeholder.pdf',
    isPublished: true
  },
  {
    title: 'Artificial Intelligence for Organisations',
    slug: 'ai-for-organisations',
    description: 'A practical introduction to AI implementation, prompt engineering, and policy formulation for leaders and corporate teams.',
    coverImage: '/development.png',
    type: 'guide',
    category: 'ai',
    tier: 'free',
    price: 0,
    fileUrl: '/ebook-placeholder.pdf',
    isPublished: true
  },
  {
    title: 'CEO Success Playbook & Toolkit',
    slug: 'ceo-success-playbook',
    description: 'A comprehensive kit containing editable strategic matrices, assessment scorecards, and board slide templates.',
    coverImage: '/development.png',
    type: 'toolkit',
    category: 'executive',
    tier: 'premium',
    price: 49.00,
    fileUrl: '/ebook-placeholder.pdf',
    isPublished: true
  },
  {
    title: 'Erasmus+ Proposal Toolkit',
    slug: 'erasmus-proposal-toolkit',
    description: 'Exhaustive mobility worksheets, QA checklists, learning outcomes plans, and successful proposal copy guidelines.',
    coverImage: '/development.png',
    type: 'toolkit',
    category: 'erasmus',
    tier: 'premium',
    price: 129.00,
    fileUrl: '/ebook-placeholder.pdf',
    isPublished: true
  },
  {
    title: 'AI Education Blueprint & Planner',
    slug: 'ai-education-blueprint',
    description: 'Bespoke templates, prompt libraries, classroom integration policies, and teacher productivity checklists.',
    coverImage: '/development.png',
    type: 'toolkit',
    category: 'ai',
    tier: 'premium',
    price: 89.00,
    fileUrl: '/ebook-placeholder.pdf',
    isPublished: true
  }
]

async function seed() {
  try {
    const uri = process.env.MONGODB_URI
    if (!uri) throw new Error('MONGODB_URI is not defined')
    await mongoose.connect(uri)
    console.log('Connected to MongoDB')

    await Course.deleteMany({})
    await TrainingPath.deleteMany({})
    await Testimonial.deleteMany({})
    await Article.deleteMany({})
    await Resource.deleteMany({})
    console.log('Cleared existing data')

    await TrainingPath.insertMany(trainingPaths)
    console.log(`Seeded ${trainingPaths.length} training paths`)

    await Course.insertMany(courses)
    console.log(`Seeded ${courses.length} courses`)

    await Testimonial.insertMany(testimonials)
    console.log(`Seeded ${testimonials.length} testimonials`)

    await Article.insertMany(seedArticles)
    console.log(`Seeded ${seedArticles.length} dynamic articles`)

    await Resource.insertMany(seedResources)
    console.log(`Seeded ${seedResources.length} dynamic resources`)

    console.log('\nDatabase seeded successfully!')
    await mongoose.disconnect()
    process.exit(0)
  } catch (error) {
    console.error('Seed error:', error)
    process.exit(1)
  }
}

seed()