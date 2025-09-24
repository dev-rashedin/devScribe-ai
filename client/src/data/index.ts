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
} from './icons';
import {
  helloFresh,
  honey,
  zendesk,
  vimeo,
  gartner,
  masterclass
} from './assets';


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
    question: 'CONSUMERS',
    answer:
      'We specialize in custom AI solutions including chatbots, predictive analytics, computer vision, NLP, and automation workflows tailored to your needs.',
  },
  {
    question: 'SMALL & MEDIUM BUSINESSES',
    answer:
      'Absolutely! We offer seamless integration with CRMs, ERPs, databases, APIs, and other third-party tools your business relies on.',
  },
  {
    question: 'GOVERNMENT & PUBLIC SECTORS',
    answer:
      "We conduct thorough testing and offer ongoing optimization post-launch. If something's off, we'll tweak it until it delivers results.",
  },
  {
    question: 'LARGE ENTERPRISES',
    answer:
      'Yes, we provide clear documentation and offer team training to help you and your staff understand and make the most of the AI systems we implement.',
  },
  {
    question: 'BANKS & CREDIT UNIONS',
    answer:
      'We offer flexible pricing based on project complexity and duration—ranging from fixed project fees to retainer and hourly models.',
  },
  {
    question: 'HEALTHCARE PROVIDERS',
    answer:
      'We deliver AI-powered diagnostics, patient monitoring, and workflow automation while ensuring compliance with healthcare regulations like HIPAA.',
  },
  {
    question: 'EDUCATIONAL INSTITUTIONS',
    answer:
      'Our AI tools help schools and universities with personalized learning, grading automation, student engagement, and research analytics.',
  },
  {
    question: 'E-COMMERCE & RETAIL',
    answer:
      'We provide intelligent product recommendations, customer behavior analysis, and automated support to boost sales and enhance customer experience.',
  },
];

export const benefitsData = [
  {
    title: 'Save Time Instantly',
    icon: BiTime,
    description:
      'Automate code explanations, document summaries, and article generation to free up hours in your workflow.',
  },
  {
    title: 'Reduce Errors & Confusion',
    description:
      'Get precise AI-powered insights for your code, emails, and content to avoid mistakes and misunderstandings.',
  },
  {
    title: 'Boost Productivity',
    description:
      'Focus on creative and critical tasks while AI handles repetitive or complex operations efficiently.',
  },
  {
    title: 'Professional-Ready Output',
    description:
      'Generate clean, polished content and code improvements suitable for portfolio, reports, or client delivery.',
  },
  {
    title: 'Accessible & Easy to Use',
    description:
      'Intuitive interface designed for developers, writers, and teams with no steep learning curve.',
  },
  {
    title: 'Seamless Integration',
    description:
      'Works well with your existing workflow, supporting multiple tools, formats, and platforms.',
  },
];
