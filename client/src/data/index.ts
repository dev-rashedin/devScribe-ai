import {
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaDiscord,
  FiCode,
  FiFileText,
  FiPenTool,
  FiEdit3,
  FiMail,
  FiUserCheck,
  BiTime,
  MdErrorOutline,
  GoRocket,
  MdOutput,
  MdOutlineIntegrationInstructions,
  SlGraph,
  FiBriefcase,
  LuDatabase,
  LuServer,
} from './icons';
import {
  helloFresh,
  honey,
  zendesk,
  vimeo,
  gartner,
  masterclass
} from './assets';
import { BenefitData, FAQItem, PlanData, SponsorLogo } from '@/types';


export const services2 = [
  {
    title: 'Code Explainer',
    desc: 'Paste your code and get a clear, in-depth explanation. Perfect for learning, debugging, and quickly understanding complex logic.',
    icon: FiCode,
    path: 'code-explainer',
    cta: 'Explain Code',
  },
  {
    title: 'Doc Summarizer',
    desc: 'Summarize documents or articles instantly. Ideal for saving time, extracting key points, and understanding content efficiently.',
    icon: FiFileText,
    path: 'doc-summarizer',
    cta: 'Summarize Now',
  },
  {
    title: 'Article Generator',
    desc: 'Generate professional articles, blogs, or notes effortlessly. Helps produce structured, creative, and engaging content quickly.',
    icon: FiPenTool,
    path: 'article-generator',
    cta: 'Generate Article',
  },
  {
    title: 'Code Refactor',
    desc: 'Improve and optimize your code without changing functionality. Enhances readability, reduces errors, and follows best practices.',
    icon: FiEdit3,
    path: 'code-refactor',
    cta: 'Refactor Code',
  },
  {
    title: 'Email Helper',
    desc: 'Draft clear, professional emails instantly without hassle. Perfect for concise, polite, and persuasive communication every time.',
    icon: FiMail,
    path: 'email-helper',
    cta: 'Draft Email',
  },
  {
    title: 'Resume Assistant',
    desc: 'Polish your resume or cover letter with AI expertise. Ensures professional formatting, clear phrasing and strong impact.',
    icon: FiUserCheck,
    path: 'resume-assistant',
    cta: 'Improve Resume',
  },
];


export const socialLinks = [
  {
    href: 'https://github.com/dev-rashedin',
    icon: FaGithub,
    title: 'Github',
  },
  {
    href: 'https://www.linkedin.com/in/dev-rashedin',
    icon: FaLinkedin,
    title: 'Linkedin',
  },
  {
    href: 'https://www.facebook.com/rashedin06/',
    icon: FaFacebook,
    title: 'Facebook',
  },
  {
    href: 'https://discord.com/users/dev_rashedin',
    icon: FaDiscord,
    title: 'Discord',
  },
];


// nav links
export const links = [

  { title: 'Home', path: '/' },
  { title: 'Subscription', path: '/subscription' },
  {
    title: 'Services',
    dropdown: [
      { title: 'Code Explainer', path: '/services/code-explainer' },
      { title: 'Doc Summarizer', path: '/services/doc-summarizer' },
      { title: 'Article Generator', path: '/services/article-generator' },
      { title: 'Code Refactor', path: '/services/code-refactor' },
      { title: 'Email Helper', path: '/services/email-helper' },
      { title: 'Resume Assistant', path: '/services/resume-assistant' },
    ],
  },
  { title: 'Blogs', path: 'https://blog.rashedin.dev' },
  { title: 'Login', path: '/login' },
];


export const sponsorLogos : SponsorLogo[] = [
  {
    id: 1,
    name: 'Hello Fresh',
    href: helloFresh,
  },
  {
    id: 2,
    name: 'Honey',
    href: honey,
  },
  {    id: 3,
    name: 'Zendesk',
    href: zendesk,
  },
  {    id: 4,
    name: 'Vimeo',
    href: vimeo,
  },
  {    id: 5,
    name: 'Gartner',
    href: gartner,
  },
  {    id: 6, 
    name: 'Masterclass',
    href: masterclass,
  },
]


export const faqData: FAQItem[] = [
  {
    question: 'DEVELOPERS',
    answer:
      'DevScribe-AI assists developers with code explanation, debugging hints, and refactoring support. Our AI helps simplify complex logic, reduce errors, and improve code readability while saving valuable development time.',
  },
  {
    question: 'WRITERS & CONTENT CREATORS',
    answer:
      'From article generation to content summarization, our AI boosts writing productivity. Writers can draft faster, refine tone, and maintain clarity—whether for blogs, technical docs, or professional communication.',
  },
  {
    question: 'SMALL & MEDIUM TEAMS',
    answer:
      'We integrate smoothly into existing workflows, supporting collaboration on projects. Teams can rely on AI for documentation, note-taking, task summaries, and streamlined communication across projects.',
  },
  {
    question: 'ENTERPRISES',
    answer:
      'For large-scale teams, we deliver scalable AI solutions with advanced customization. We also provide onboarding support, training, and ongoing optimization to ensure maximum value and adoption.',
  },
  {
    question: 'STUDENTS & EDUCATORS',
    answer:
      'Our tools simplify learning with personalized explanations, writing assistance, and project summaries. Educators benefit from grading support, plagiarism checks, and structured lesson content creation.',
  },
  {
    question: 'STARTUPS',
    answer:
      'Startups leverage DevScribe-AI to speed up product documentation, generate polished pitches, and automate communication tasks. This allows small teams to focus on innovation rather than repetitive work.',
  },
  {
    question: 'FREELANCERS',
    answer:
      'Freelancers save time with AI-powered project notes, client-ready reports, and quick content drafts. Whether coding or writing, our tools help maintain quality output under tight deadlines.',
  },
  {
    question: 'AGENCIES',
    answer:
      'Marketing and development agencies use our AI to scale output without scaling teams. From campaign content to technical deliverables, DevScribe-AI ensures consistency, speed, and reliability.',
  },
];


export const benefitsData : BenefitData[] = [
  {
    title: 'Save Time Instantly',
    icon: BiTime,
    description:
      'Automate code explanations, document summaries, and article generation to free up hours in your workflow.',
  },
  {
    title: 'Reduce Errors & Confusion',
    icon: MdErrorOutline,
    description:
      'Get precise AI-powered insights for your code, emails, and content to avoid mistakes and misunderstandings.',
  },
  {
    title: 'Boost Productivity',
    icon: GoRocket,
    description:
      'Focus on creative and critical tasks while AI handles repetitive or complex operations efficiently.',
  },
  {
    title: 'Professional-Ready Output',
    icon: MdOutput,
    description:
      'Generate clean, polished content and code improvements suitable for portfolio, reports, or client delivery.',
  },
  {
    title: 'Accessible & Easy to Use',
    icon: SlGraph,
    description:
      'Intuitive interface designed for developers, writers, and teams with no steep learning curve.',
  },
  {
    title: 'Seamless Integration',
    icon: MdOutlineIntegrationInstructions,
    description:
      'Works well with your existing workflow, supporting multiple tools, formats, and platforms.',
  },
];

export const PlansData: PlanData[] = [
  {
    name: 'Starter',
    description:
      'Great for small businesses and startups looking to get started with AI',
    price: 12,
    yearlyPrice: 99,
    buttonText: 'Get started',
    buttonVariant: 'outline' as const,
    features: [
      {
        text: 'Up to 10 boards per workspace',
        icon: FiBriefcase,
      },
      { text: 'Up to 10GB storage', icon: LuDatabase },
      { text: 'Limited analytics', icon: LuServer },
    ],
    includes: [
      'Free includes:',
      'Unlimted Cards',
      'Custom background & stickers',
      '2-factor authentication',
    ],
  },
  {
    name: 'Business',
    description:
      'Best value for growing businesses that need more advanced features',
    price: 48,
    yearlyPrice: 399,
    buttonText: 'Get started',
    buttonVariant: 'default' as const,
    popular: true,
    features: [
      { text: 'Unlimted boards', icon: FiBriefcase },
      { text: 'Storage (250MB/file)', icon: LuDatabase },
      { text: '100 workspace command runs', icon: LuServer },
    ],
    includes: [
      'Everything in Starter, plus:',
      'Advanced checklists',
      'Custom fields',
      'Servedless functions',
    ],
  },
  {
    name: 'Enterprise',
    description:
      'Advanced plan with enhanced security and unlimited access for large teams',
    price: 96,
    yearlyPrice: 899,
    buttonText: 'Get started',
    buttonVariant: 'outline' as const,
    features: [
      { text: 'Unlimited board', icon: FiBriefcase },
      { text: 'Unlimited storage ', icon: LuDatabase },
      { text: 'Unlimited workspaces', icon: LuServer },
    ],
    includes: [
      'Everything in Business, plus:',
      'Multi-board management',
      'Multi-board guest',
      'Attachment permissions',
    ],
  },
];

