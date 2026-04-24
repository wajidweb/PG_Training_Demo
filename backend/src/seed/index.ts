import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { Course } from '../models/Course'
import { TrainingPath } from '../models/TrainingPath'
import { Testimonial } from '../models/Testimonial'

dotenv.config()

// Training Paths Data
const trainingPaths = [
  {
    id: 'academic',
    title: 'Academic Excellence',
    subtitle: 'Teaching & Research Development',
    description: 'Develop advanced teaching methodologies, research skills, and academic writing capabilities for higher education success.',
    color: '#1B4F72',
    bgColor: '#E8F4F8',
    icon: 'GraduationCap',
    courseIds: ['cpd_aw', 'cpd_cm', 'cpd_cl', 'cpd_dig'],
    isActive: true,
  },
  {
    id: 'administrative',
    title: 'Administrative Excellence',
    subtitle: 'Operations & Student Services',
    description: 'Enhance administrative skills, student affairs management, and institutional operations for HEI professionals.',
    color: '#2E86C1',
    bgColor: '#E8F6FF',
    icon: 'Briefcase',
    courseIds: ['cpd_cult', 'cpd_tbu', 'cpd_cyb'],
    isActive: true,
  },
  {
    id: 'leadership',
    title: 'Leadership Excellence',
    subtitle: 'Strategic Management & Governance',
    description: 'Develop strategic leadership capabilities, governance knowledge, and management skills for senior HEI positions.',
    color: '#F39C12',
    bgColor: '#FEF9E7',
    icon: 'Users',
    courseIds: ['cpd_lsh', 'cpd_gov'],
    isActive: true,
  },
]

// Course Data
const courses = [
  // Academic Path Courses
  {
    id: 'cpd_aw',
    slug: 'academic-writing-skills',
    code: 'CPD_AW',
    title: 'Academic Writing Skills for Advanced Researchers and Tutors',
    shortDescription: 'Master academic writing, from research papers to grant proposals, with expert feedback.',
    fullDescription: `This course is designed to equip graduate students, researchers, and faculty with the advanced writing skills essential for academic success. Develop the clarity, precision, and persuasiveness required to excel in your field. Through in-depth analysis of scholarly texts, intensive writing practice, and expert feedback, you will master the art of crafting compelling research papers, articles, and grant proposals.`,
    outcomes: [
      'Research Ethics and Plagiarism awareness',
      'Advanced research and information synthesis',
      'Mastery of academic writing genres (literature reviews, research articles, grant proposals)',
      'Effective use of language and style for academic audiences',
      'Development of critical thinking and argumentation skills',
    ],
    targetAudience: [
      'Educators, Teachers and Tutors',
      'Early-Career Academics',
      'Research Professionals',
      'Junior Administrative Staff',
      'Senior Administrative Staff',
      'Heads of Departments',
      'Dean',
    ],
    deliveryMethods: [
      { type: 'online-instructor', label: 'Online Instructor-Led', multiplier: 1.0 },
      { type: 'self-paced', label: 'Online Self-Paced', multiplier: 0.75 },
      { type: 'onsite', label: 'Onsite', multiplier: 1.3 },
    ],
    upcomingDates: ['21–25 Oct 2024', '25–29 Nov 2024', '27–31 Jan 2025'],
    pathId: 'academic',
    pricing: { basePrice: 500, minParticipants: 1, maxParticipants: 50, volumeDiscounts: [
      { minQty: 1, discountPercent: 0 },
      { minQty: 5, discountPercent: 10 },
      { minQty: 10, discountPercent: 15 },
      { minQty: 20, discountPercent: 20 },
    ]},
    offers: {
      ets: [
        { id: 'ets_aw_1', title: 'Individual Enrolment', description: 'Single participant, full course access', pricePerPerson: 500, features: ['Full course access', 'Certificate of completion', 'Expert feedback', 'Course materials'] },
        { id: 'ets_aw_2', title: 'Team Package (5+)', description: 'Best value for small teams', pricePerPerson: 450, features: ['All Individual benefits', '10% group discount', 'Group progress dashboard', 'Priority support'] },
      ],
      limited: [{ id: 'ltd_aw_1', title: 'Early Bird Special', description: 'Book now and save 15% on any session', discountPercent: 15, expiresAt: new Date('2025-06-30') }],
      bundle: [{ id: 'bnd_aw_1', title: 'Department Bundle', minParticipants: 10, discountPercent: 20, description: 'Train your entire department at a 20% discount' }],
      celebration: [{ id: 'cel_aw_1', title: 'Academic Year Kickoff', occasion: 'New Academic Year', discountPercent: 12, validUntil: '2025-10-31' }],
    },
    isActive: true,
  },
  {
    id: 'cpd_cm',
    slug: 'classroom-management',
    code: 'CPD_CM',
    title: 'Creating a Positive Learning Environment and Classroom Management',
    shortDescription: 'Build supportive classrooms with proven management and engagement strategies.',
    fullDescription: `This course equips educators with the essential skills to foster a supportive and engaging classroom environment. Learn practical strategies for building positive relationships with students, managing classroom behavior, and creating a conducive learning atmosphere through a blend of theoretical knowledge and practical application.`,
    outcomes: [
      'Developing effective classroom management techniques',
      'Building a strong sense of community and belonging',
      'Creating a physically and emotionally safe learning space',
      'Implementing strategies for student engagement and motivation',
      'Managing challenging behaviors and conflicts',
    ],
    targetAudience: [
      'Educators, Teachers and Tutors',
      'Early-Career Academics',
      'Research Professionals',
      'Junior Administrative Staff',
      'Senior Administrative Staff',
      'Heads of Departments',
      'Dean',
    ],
    deliveryMethods: [
      { type: 'online-instructor', label: 'Online Instructor-Led', multiplier: 1.0 },
      { type: 'self-paced', label: 'Online Self-Paced', multiplier: 0.75 },
      { type: 'onsite', label: 'Onsite', multiplier: 1.3 },
    ],
    upcomingDates: ['20–24 Jan 2025', '17–21 Mar 2025', '19–25 May 2025'],
    pathId: 'academic',
    pricing: { basePrice: 500, minParticipants: 1, maxParticipants: 50, volumeDiscounts: [
      { minQty: 1, discountPercent: 0 },
      { minQty: 5, discountPercent: 10 },
      { minQty: 10, discountPercent: 15 },
      { minQty: 20, discountPercent: 20 },
    ]},
    offers: {
      ets: [{ id: 'ets_cm_1', title: 'Standard Enrolment', description: 'Full access to all course modules', pricePerPerson: 500, features: ['All modules included', 'Certificate', 'Materials', 'Q&A sessions'] }],
      limited: [{ id: 'ltd_cm_1', title: 'Spring Semester Offer', description: '15% off for spring 2025 intake', discountPercent: 15, expiresAt: new Date('2025-03-17') }],
      combo: [{ id: 'cmb_cm_1', title: 'Classroom + Digital Resources', courses: ['cpd_cm', 'cpd_dig'], discountPercent: 10, description: 'Combine Classroom Management with Digital Resources in Teaching for a complete educator toolkit' }],
      bundle: [{ id: 'bnd_cm_1', title: 'School Bundle', minParticipants: 15, discountPercent: 20, description: 'Ideal for school-wide training programmes' }],
    },
    isActive: true,
  },
  {
    id: 'cpd_cl',
    slug: 'content-language-integrated-learning',
    code: 'CPD_CL',
    title: 'Content and Language Integrated Learning (CLIL)',
    shortDescription: 'Master teaching subject matter through a foreign language using CLIL methodology.',
    fullDescription: `This course provides a comprehensive overview of Content and Language Integrated Learning (CLIL), equipping educators with the knowledge and skills to effectively teach subject matter through a foreign language. Participants will explore the theoretical underpinnings of CLIL, develop practical lesson planning strategies, and learn how to create engaging and effective CLIL classrooms.`,
    outcomes: [
      'Understanding the principles and benefits of CLIL',
      'Developing proficiency in language and content integration',
      'Designing CLIL curriculum and materials',
      'Implementing effective assessment strategies',
      'Building language skills through content-based learning',
    ],
    targetAudience: [
      'Educators, Teachers and Tutors',
      'Early-Career Academics',
      'Research Professionals',
      'Junior Administrative Staff',
      'Senior Administrative Staff',
      'Heads of Departments',
      'Dean',
    ],
    deliveryMethods: [
      { type: 'online-instructor', label: 'Online Instructor-Led', multiplier: 1.0 },
      { type: 'self-paced', label: 'Online Self-Paced', multiplier: 0.75 },
      { type: 'onsite', label: 'Onsite', multiplier: 1.3 },
    ],
    upcomingDates: ['16–20 Sept 2024', '5–9 May 2025', '28–31 July 2025'],
    pathId: 'academic',
    pricing: { basePrice: 500, minParticipants: 1, maxParticipants: 40, volumeDiscounts: [
      { minQty: 1, discountPercent: 0 },
      { minQty: 5, discountPercent: 10 },
      { minQty: 10, discountPercent: 15 },
      { minQty: 20, discountPercent: 20 },
    ]},
    offers: {
      ets: [{ id: 'ets_cl_1', title: 'Full CLIL Programme', description: 'Complete CLIL methodology training', pricePerPerson: 500, features: ['Theory + Practice', 'Lesson planning tools', 'Assessment frameworks', 'Certificate'] }],
      limited: [{ id: 'ltd_cl_1', title: 'Summer Intake Discount', description: 'Save 15% on the July 2025 cohort', discountPercent: 15, expiresAt: new Date('2025-07-01') }],
      bundle: [{ id: 'bnd_cl_1', title: 'Language Department Bundle', minParticipants: 8, discountPercent: 18, description: 'Perfect for language departments' }],
    },
    isActive: true,
  },
  {
    id: 'cpd_dig',
    slug: 'digital-resources-teaching',
    code: 'CPD_DIG',
    title: 'Digital Resources in Teaching',
    shortDescription: 'Embrace technology to enhance teaching, research, and collaboration. Microsoft 21st Century Certified.',
    fullDescription: `A Microsoft 21st Century Certified Course available online. This programme empowers educators to leverage the full spectrum of digital tools to enhance teaching quality, research efficiency, and collaborative learning. Delivered every 2nd Monday of the month for maximum flexibility.`,
    outcomes: [
      'Mastering Microsoft 365 tools for education',
      'Creating engaging digital learning content',
      'Implementing collaborative online platforms',
      'Measuring digital learning effectiveness',
      'Ensuring digital inclusion and accessibility',
    ],
    targetAudience: [
      'Educators, Teachers and Tutors',
      'Early-Career Academics',
      'Research Professionals',
      'Junior Administrative Staff',
      'Senior Administrative Staff',
      'Heads of Departments',
      'Dean',
    ],
    deliveryMethods: [
      { type: 'online-instructor', label: 'Online Instructor-Led', multiplier: 1.0 },
      { type: 'self-paced', label: 'Online Self-Paced', multiplier: 0.75 },
    ],
    upcomingDates: ['Every 2nd Monday (Sept 2024 – July 2025)'],
    pathId: 'academic',
    pricing: { basePrice: 400, minParticipants: 1, maxParticipants: 100, volumeDiscounts: [
      { minQty: 1, discountPercent: 0 },
      { minQty: 5, discountPercent: 10 },
      { minQty: 10, discountPercent: 15 },
      { minQty: 20, discountPercent: 20 },
    ]},
    offers: {
      ets: [{ id: 'ets_dig_1', title: 'Online Access Pass', description: 'Monthly cohort access with Microsoft certification', pricePerPerson: 400, features: ['Microsoft certification', 'Monthly cohorts', 'Lifetime access to materials', 'Tech support'] }],
      limited: [{ id: 'ltd_dig_1', title: 'Digital First Offer', description: 'First-time enrolees save 15%', discountPercent: 15, expiresAt: new Date('2025-12-31') }],
      combo: [{ id: 'cmb_dig_1', title: 'Digital + Classroom Bundle', courses: ['cpd_dig', 'cpd_cm'], discountPercent: 10, description: 'The complete modern educator toolkit' }],
      bundle: [{ id: 'bnd_dig_1', title: 'Institution Wide', minParticipants: 20, discountPercent: 25, description: 'Roll out digital skills across your entire institution' }],
    },
    isActive: true,
  },

  // Administrative Path Courses
  {
    id: 'cpd_cult',
    slug: 'cultural-integration-diverse-environment',
    code: 'CPD_CULT',
    title: 'Cultural Integration in a Diverse Higher Education Environment',
    shortDescription: 'Navigate diverse cultural landscapes and build truly inclusive higher education environments.',
    fullDescription: `This enhanced course is tailored specifically for Higher Education Institutions' administrative staff—including Heads of Student Affairs, Heads of International Offices, Rectors' Assistants, and similar roles. It provides practical tools, targeted strategies, and relevant case studies for those managing and supporting a culturally diverse student body from an operational and policy-making perspective. Participants will gain specialized insights into cultural differences, develop intercultural management strategies, and learn best practices for fostering inclusivity within institutional structures.`,
    outcomes: [
      'Enhancing Institutional Cultural Competence',
      'Intercultural Communication for Administrative Roles',
      'Building Effective Relationships Across Student Bodies',
      'Managing and Mediating Cultural Conflicts',
      'Designing Inclusive Student Policies and Services',
      'Leadership in Diversity and Inclusion',
    ],
    targetAudience: [
      'Heads of Student Affairs',
      'Heads of International Offices',
      "Rector's Assistants",
      'Administrative Staff',
      'Faculty Officers',
      'Heads of Departments',
      'Dean',
    ],
    deliveryMethods: [
      { type: 'online-instructor', label: 'Online Instructor-Led', multiplier: 1.0 },
      { type: 'self-paced', label: 'Online Self-Paced', multiplier: 0.75 },
      { type: 'onsite', label: 'Onsite', multiplier: 1.3 },
    ],
    upcomingDates: ['11–15 Nov 2024', '27–31 Oct 2024', '3–7 Mar 2025'],
    pathId: 'administrative',
    pricing: { basePrice: 550, minParticipants: 1, maxParticipants: 40, volumeDiscounts: [
      { minQty: 1, discountPercent: 0 },
      { minQty: 5, discountPercent: 10 },
      { minQty: 10, discountPercent: 15 },
      { minQty: 20, discountPercent: 20 },
    ]},
    offers: {
      ets: [
        { id: 'ets_cult_1', title: 'Individual Leader', description: 'For individual administrative leaders', pricePerPerson: 550, features: ['Full programme access', 'Action planning toolkit', 'Case study library', 'Certificate'] },
        { id: 'ets_cult_2', title: 'Team of Administrators', description: 'For teams of 5 or more', pricePerPerson: 495, features: ['All Individual benefits', '10% team discount', 'Shared action plan workshop', 'Follow-up coaching session'] },
      ],
      limited: [{ id: 'ltd_cult_1', title: 'New Year Enrolment Offer', description: 'Start 2025 with a 15% saving on this course', discountPercent: 15, expiresAt: new Date('2025-03-31') }],
      combo: [{ id: 'cmb_cult_1', title: 'Inclusion + Team Building', courses: ['cpd_cult', 'cpd_tbu'], discountPercent: 10, description: 'Combine cultural integration with team building for maximum impact' }],
      bundle: [{ id: 'bnd_cult_1', title: 'International Office Bundle', minParticipants: 10, discountPercent: 20, description: 'Upskill your entire international office team' }],
      celebration: [{ id: 'cel_cult_1', title: 'Diversity Month Special', occasion: 'International Diversity Month', discountPercent: 15, validUntil: '2025-05-31' }],
    },
    isActive: true,
  },
  {
    id: 'cpd_tbu',
    slug: 'team-building',
    code: 'CPD_TBU',
    title: 'Team Building: Building High-Performing Teams',
    shortDescription: 'Build trust, enhance communication, and lead high-performing teams in higher education.',
    fullDescription: `This course equips participants with the skills and knowledge to create and foster high-performing teams. Through a combination of theoretical frameworks and practical exercises, participants will learn how to build trust, enhance communication, resolve conflicts, and achieve shared goals within higher education settings.`,
    outcomes: [
      'Understanding team formation and development dynamics',
      'Developing effective communication and collaboration skills',
      'Building trust and fostering a positive team culture',
      'Managing conflict and resolving disagreements',
      'Enhancing problem-solving and decision-making as a team',
      'Leading and motivating team members',
    ],
    targetAudience: [
      'Educators, Teachers and Tutors',
      'Early-Career Academics',
      'Research Professionals',
      'Junior Administrative Staff',
      'Senior Administrative Staff',
      'Heads of Departments',
      'Dean',
    ],
    deliveryMethods: [
      { type: 'online-instructor', label: 'Online Instructor-Led', multiplier: 1.0 },
      { type: 'self-paced', label: 'Online Self-Paced', multiplier: 0.75 },
      { type: 'onsite', label: 'Onsite', multiplier: 1.3 },
    ],
    upcomingDates: ['18–22 Nov 2024', '20–24 Jan 2025', '21–25 July 2025'],
    pathId: 'administrative',
    pricing: { basePrice: 500, minParticipants: 1, maxParticipants: 50, volumeDiscounts: [
      { minQty: 1, discountPercent: 0 },
      { minQty: 5, discountPercent: 10 },
      { minQty: 10, discountPercent: 15 },
      { minQty: 20, discountPercent: 20 },
    ]},
    offers: {
      ets: [{ id: 'ets_tbu_1', title: 'Team Programme', description: 'Practical team dynamics training', pricePerPerson: 500, features: ['Interactive workshops', 'Team simulations', 'Leadership frameworks', 'Certificate'] }],
      limited: [{ id: 'ltd_tbu_1', title: 'Semester Start Special', description: '15% off for semester-start cohorts', discountPercent: 15, expiresAt: new Date('2025-02-28') }],
      bundle: [{ id: 'bnd_tbu_1', title: 'Department Wide', minParticipants: 12, discountPercent: 18, description: 'Transform your whole department\'s dynamics' }],
    },
    isActive: true,
  },
  {
    id: 'cpd_cyb',
    slug: 'cybersecurity-higher-education',
    code: 'CPD_CYB',
    title: 'Cybersecurity for Higher Education Institutions',
    shortDescription: 'Protect institutional data from cyber threats with practical security frameworks.',
    fullDescription: `This course equips higher education professionals with the knowledge and skills to protect institutional and student data from cyber threats. Participants will gain a comprehensive understanding of the cybersecurity landscape, develop strategies for risk management, and implement effective security measures tailored to the HEI context.`,
    outcomes: [
      'Understanding cybersecurity threats specific to higher education',
      'Developing institutional security policies and procedures',
      'Implementing data protection and privacy measures',
      'Creating incident response and disaster recovery plans',
      'Training staff and students on cybersecurity awareness',
    ],
    targetAudience: [
      'IT Security Professionals',
      'Heads of IT Departments',
      'Data Protection Officers',
      'Administrative Staff',
      'Heads of Departments',
      'Dean',
    ],
    deliveryMethods: [
      { type: 'online-instructor', label: 'Online Instructor-Led', multiplier: 1.0 },
      { type: 'self-paced', label: 'Online Self-Paced', multiplier: 0.75 },
      { type: 'onsite', label: 'Onsite', multiplier: 1.3 },
    ],
    upcomingDates: ['14–18 Oct 2024', '10–14 Feb 2025', '9–13 June 2025'],
    pathId: 'administrative',
    pricing: { basePrice: 600, minParticipants: 1, maxParticipants: 30, volumeDiscounts: [
      { minQty: 1, discountPercent: 0 },
      { minQty: 5, discountPercent: 10 },
      { minQty: 10, discountPercent: 15 },
      { minQty: 20, discountPercent: 20 },
    ]},
    offers: {
      ets: [{ id: 'ets_cyb_1', title: 'Security Essentials', description: 'Comprehensive cybersecurity training', pricePerPerson: 600, features: ['Risk assessment tools', 'Policy templates', 'Incident response guide', 'Certificate'] }],
      limited: [{ id: 'ltd_cyb_1', title: 'Security Awareness Month', description: '10% off during security awareness month', discountPercent: 10, expiresAt: new Date('2025-10-31') }],
      bundle: [{ id: 'bnd_cyb_1', title: 'IT Team Bundle', minParticipants: 8, discountPercent: 20, description: 'Train your entire IT security team' }],
    },
    isActive: true,
  },

  // Leadership Path Courses
  {
    id: 'cpd_lsh',
    slug: 'leadership-skills-heis',
    code: 'CPD_LSH',
    title: 'Leadership Skills for Higher Education Institutions',
    shortDescription: 'Develop strategic leadership capabilities for senior HEI management positions.',
    fullDescription: `This comprehensive leadership programme is designed for senior academics, department heads, and institutional leaders who aspire to advance their careers in higher education management. Participants will develop strategic thinking, decision-making, and leadership skills essential for navigating the complex landscape of modern universities and colleges.`,
    outcomes: [
      'Strategic planning and institutional leadership',
      'Financial management for educational leaders',
      'Change management and organizational transformation',
      'Stakeholder engagement and relationship building',
      'Building and leading high-performing teams',
      'Innovation in higher education management',
    ],
    targetAudience: [
      'Senior Academics',
      'Department Heads',
      'Deans',
      'Directors',
      'Vice Chancellors',
      'Heads of Departments',
    ],
    deliveryMethods: [
      { type: 'online-instructor', label: 'Online Instructor-Led', multiplier: 1.0 },
      { type: 'onsite', label: 'Onsite', multiplier: 1.3 },
    ],
    upcomingDates: ['4–8 Nov 2024', '3–7 Feb 2025', '5–9 May 2025'],
    pathId: 'leadership',
    pricing: { basePrice: 750, minParticipants: 1, maxParticipants: 25, volumeDiscounts: [
      { minQty: 1, discountPercent: 0 },
      { minQty: 5, discountPercent: 10 },
      { minQty: 10, discountPercent: 15 },
      { minQty: 20, discountPercent: 20 },
    ]},
    offers: {
      ets: [
        { id: 'ets_lsh_1', title: 'Executive Leadership', description: 'Comprehensive leadership programme', pricePerPerson: 750, features: ['Executive coaching', 'Case studies', 'Networking events', 'Certificate'] },
        { id: 'ets_lsh_2', title: 'Cohort Programme', description: 'Join a cohort of senior leaders', pricePerPerson: 700, features: ['Peer learning', 'Group coaching', 'Leadership assessment', 'Alumni network'] },
      ],
      limited: [{ id: 'ltd_lsh_1', title: 'Leadership Development Fund', description: 'Use your professional development fund', discountPercent: 12, expiresAt: new Date('2025-12-31') }],
      bundle: [{ id: 'bnd_lsh_1', title: 'Senior Leadership Team', minParticipants: 6, discountPercent: 22, description: 'Develop your entire senior leadership team together' }],
    },
    isActive: true,
  },
  {
    id: 'cpd_gov',
    slug: 'university-governance',
    code: 'CPD_GOV',
    title: 'University Governance and Board Management',
    shortDescription: 'Master the principles of effective university governance and board management.',
    fullDescription: `This course provides a comprehensive understanding of university governance structures, board operations, and regulatory compliance. Designed for board members, governors, and senior administrators, it covers the legal, financial, and strategic aspects of governing higher education institutions.`,
    outcomes: [
      'Understanding university governance structures and frameworks',
      'Board composition, roles, and responsibilities',
      'Financial oversight and resource allocation',
      'Regulatory compliance and accountability',
      'Strategic planning and institutional effectiveness',
      'Risk management and audit functions',
    ],
    targetAudience: [
      'Board Members',
      'Governors',
      'Chancellors',
      'Vice Chancellors',
      'Heads of Departments',
      'Senior Administrators',
    ],
    deliveryMethods: [
      { type: 'online-instructor', label: 'Online Instructor-Led', multiplier: 1.0 },
      { type: 'onsite', label: 'Onsite', multiplier: 1.3 },
    ],
    upcomingDates: ['21–25 Oct 2024', '20–24 Jan 2025', '21–25 Apr 2025'],
    pathId: 'leadership',
    pricing: { basePrice: 800, minParticipants: 1, maxParticipants: 20, volumeDiscounts: [
      { minQty: 1, discountPercent: 0 },
      { minQty: 5, discountPercent: 10 },
      { minQty: 10, discountPercent: 15 },
      { minQty: 20, discountPercent: 20 },
    ]},
    offers: {
      ets: [{ id: 'ets_gov_1', title: 'Governance Masterclass', description: 'Comprehensive governance training', pricePerPerson: 800, features: ['Governance toolkit', 'Best practice guides', 'Board simulation', 'Certificate'] }],
      limited: [{ id: 'ltd_gov_1', title: 'New Governor Induction', description: 'Special rate for new board members', discountPercent: 15, expiresAt: new Date('2025-06-30') }],
      bundle: [{ id: 'bnd_gov_1', title: 'Full Board Development', minParticipants: 10, discountPercent: 25, description: 'Develop your entire governing body together' }],
    },
    isActive: true,
  },
]

const testimonials = [
  { id: 't1', name: 'Dr. Sarah Mitchell', role: 'Head of Academic Affairs', institution: 'University of Amsterdam', content: 'PG Training transformed the way our academic staff approach teaching. The practical frameworks and real-world simulations gave our team immediately applicable skills that have measurably improved student outcomes across our faculties.', rating: 5 },
  { id: 't2', name: 'Prof. Carlos Mendes', role: 'Dean of Faculty', institution: 'Lisbon Business School', content: 'The Leadership and Management programme was exactly what I needed at a critical point in my career. The blend of theory, peer learning, and coaching gave me the confidence to lead institutional change effectively.', rating: 5 },
  { id: 't3', name: 'Ms. Amara Diallo', role: 'Head of International Office', institution: 'University of Malta', content: 'The Cultural Integration course was a revelation. Our international office team now handles diverse student needs with genuine competence. The case studies were directly relevant to our daily challenges.', rating: 5 },
  { id: 't4', name: 'Dr. Tomasz Kowalski', role: 'Research Director', institution: 'Warsaw University of Technology', content: 'I have attended many professional development programmes, but PG Training stands apart. The Innovation and Entrepreneurship course helped us establish two successful university spin-offs within a year.', rating: 5 },
  { id: 't5', name: 'Prof. Elena Vassiliev', role: "Rector's Assistant", institution: 'St. Petersburg State University', content: 'The English for Administrators programme improved communication across our entire administrative team. Working with international partners has never been more productive.', rating: 5 },
  { id: 't6', name: "Mr. James O'Brien", role: 'Head of Student Affairs', institution: 'Trinity College Dublin', content: 'We enrolled our entire student affairs team in the Cultural Integration course. The results were immediate — student satisfaction scores improved by 23% in one semester. Outstanding value for money.', rating: 5 },
  { id: 't7', name: 'Dr. Fatima Al-Rashid', role: 'Academic Development Officer', institution: 'Qatar University', content: 'The Academic Writing Skills course gave our researchers the tools to publish in top-tier journals. Three of our participants had papers accepted within six months of completing the programme.', rating: 5 },
  { id: 't8', name: 'Prof. Henrik Larsson', role: 'Vice Rector for Academic Affairs', institution: 'Uppsala University', content: "PG Training's team-based approach to professional development creates lasting change. We have been working with them for three years and consistently see measurable improvements in staff performance and satisfaction.", rating: 5 },
]

async function seed() {
  try {
    const uri = process.env.MONGODB_URI
    if (!uri) {
      throw new Error('MONGODB_URI is not defined in .env file')
    }

    await mongoose.connect(uri)
    console.log('Connected to MongoDB')

    // Clear existing data
    await Course.deleteMany({})
    await TrainingPath.deleteMany({})
    await Testimonial.deleteMany({})
    console.log('Cleared existing data')

    // Insert training paths
    await TrainingPath.insertMany(trainingPaths)
    console.log(`Seeded ${trainingPaths.length} training paths`)

    // Insert courses
    await Course.insertMany(courses)
    console.log(`Seeded ${courses.length} courses`)

    // Insert testimonials
    await Testimonial.insertMany(testimonials)
    console.log(`Seeded ${testimonials.length} testimonials`)

    console.log('\nDatabase seeded successfully!')
    await mongoose.disconnect()
    process.exit(0)
  } catch (error) {
    console.error('Seed error:', error)
    process.exit(1)
  }
}

seed()