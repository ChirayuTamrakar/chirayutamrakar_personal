export interface Publication {
  id: string;
  title: string;
  conferenceOrVenue: string;
  authors?: string;
  linkText?: string;
  url?: string;
  isPatent?: boolean;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  dates: string;
  location: string;
  description: string[];
  logos: {
    name: string;
    type: 'mox' | 'spc' | 'founders_inc';
  }[];
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  videoThumbnail?: string;
  videoDuration?: string;
  videoTitle?: string;
  speaker?: string;
  videoUrl?: string;
  hasLinks?: boolean;
  linkUrl?: string;
  linkText?: string;
  isTweet?: boolean;
  tweetData?: {
    author: string;
    handle: string;
    avatarUrl: string;
    date: string;
    text: string;
    mediaUrl?: string;
    likes: string;
    replies: string;
    actionLinks?: { label: string; href?: string }[];
  };
  links?: {
    tryItYourself?: boolean;
    theRubric?: boolean;
    theFullStory?: boolean;
    customLinks?: { label: string; url?: string }[];
  };
  details: {
    overview: string;
    rubricPoints?: { criterion: string; weight: string; description: string }[];
    fullStoryMarkdown?: string;
    demoPromptQuestion?: string;
    demoSampleResponse?: string;
  };
}

export interface Essay {
  id: string;
  slug: string;
  title: string;
  date: string;
  readTime: string;
  initialViews: number;
  initialLikes: number;
  content: string[];
}

export interface TakeItem {
  id: string;
  title: string;
  content: string;
}

export interface BookRecommendation {
  id: string;
  title: string;
  author: string;
  category: 'AI & Rationality' | 'Economics & Institutions' | 'Philosophy & Governance' | 'Founders & Biographies';
  rating: number;
  note: string;
  quote?: string;
}

export interface AudioTrack {
  id: string;
  title: string;
  composer: string;
  duration: string;
  audioUrl?: string;
  description: string;
}

export interface SkillCategory {
  id: 'devops' | 'cloud' | 'development';
  name: string;
  tagline: string;
  color: string;
  secondaryColor: string;
  percentage: number;
  skills: string[];
}

export const BIO_DATA = {
  name: 'Chirayu Tamrakar',
  role: 'DevOps & Cloud Infrastructure Engineer',
  location: 'Indore, India',
  avatarUrl: '/chirayu_avatar.jpeg',
  greeting: "Hi I'm Chirayu, welcome to my website!",
  paragraphs: [
    "I'm currently working at the intersection of DevOps, cloud infrastructure, and software engineering, focusing on building reliable deployment systems, automating engineering workflows, and improving how applications are delivered and operated. I believe infrastructure and automation are more than supporting functions — they are engineering force multipliers that enable teams to build, ship, and scale software with greater speed, confidence, and reliability.",
    "My technical background spans cloud engineering, containerization, orchestration, CI/CD, and infrastructure as code. I work with technologies including AWS, Docker, Kubernetes, Jenkins, GitLab CI/CD, Pulumi, Terraform, and Linux, with a particular interest in cloud-native architecture, deployment automation, infrastructure governance, and scalable platform engineering.",
    "Before focusing on infrastructure and DevOps, I built a foundation in full-stack software development using the MERN ecosystem. I've worked on application architecture, RESTful APIs, authentication, database design, real-time communication, and responsive interfaces using React, Node.js, Express.js, and MongoDB. This full-stack perspective allows me to understand the application lifecycle beyond infrastructure alone.",
    "I'm particularly interested in the convergence of software engineering, cloud computing, automation, and emerging technologies. I enjoy understanding complex systems, connecting ideas across engineering disciplines, and turning manual, fragmented processes into automated and repeatable solutions.",
    "My long-term focus is on becoming a well-rounded infrastructure and platform engineer — someone who can design systems, build automation, solve complex production challenges, and contribute across the entire software delivery lifecycle."
  ],
  socials: {
    github: 'https://github.com/ChirayuTamrakar/',
    x: 'https://x.com/ChirayX008',
    linkedin: 'https://www.linkedin.com/in/chirayu-tamrakar/',
    email: 'chirayutamrakar999@gmail.com'
  }
};

export const PUBLICATIONS: Publication[] = [
  {
    id: 'pub-1',
    title: 'AI research paper to mitigate training data biases.',
    conferenceOrVenue: 'AAAI conference paper',
    linkText: 'Read here',
    url: 'https://arxiv.org'
  },
  {
    id: 'pub-2',
    authors: 'Chirayu Tamrakar*, Kanad Pardeshi*, Nikunj Goyal*, Pranamya Kulkarni*, Abhilasha Sancheti et al.',
    title: '"A method to generate image descriptions with varying levels of detail"',
    conferenceOrVenue: 'filed patent (USPTO), Adobe reference: P11617-US.',
    isPatent: true
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'exp-webkorps',
    role: 'Associate Software Developer',
    organization: 'Webkorps Pvt Ltd',
    dates: 'April 27, 2026 - Present',
    location: 'Indore, India',
    logos: [
      { name: 'Webkorps', type: 'founders_inc' }
    ],
    description: [
      "Working at the intersection of DevOps, cloud infrastructure, and software engineering. Building reliable deployment systems, automated CI/CD pipelines, and infrastructure governance.",
      "Hands-on with containerization (Docker, Kubernetes), infrastructure as code (Terraform, Pulumi), AWS cloud services, and full-stack MERN integrations to improve application delivery."
    ]
  },
  {
    id: 'exp-medicaps',
    role: 'B.Tech in Computer Science and Engineering',
    organization: 'Medicaps University',
    dates: '2022 - 2026',
    location: 'Indore, India',
    logos: [
      { name: 'Medicaps', type: 'spc' }
    ],
    description: [
      "Rigorous undergraduate engineering program with coursework in Operating Systems, Cloud Computing, Computer Networks, Database Management Systems, and Distributed Systems.",
      "Built foundation in system architecture, Linux environments, algorithms, full-stack software development, and automation."
    ]
  }
];

export const SKILLS_CATEGORIES: SkillCategory[] = [
  {
    id: 'devops',
    name: 'DevOps & Automation',
    tagline: 'CI/CD, Containers, Orchestration, IaC, GitOps & Observability',
    color: '#1A1A1A',
    secondaryColor: '#3F3F3E',
    percentage: 50,
    skills: [
      'Docker',
      'Docker Compose',
      'Kubernetes',
      'Helm',
      'Minikube',
      'Kind',
      'Jenkins',
      'GitLab CI/CD',
      'GitHub Actions',
      'Argo CD',
      'GitOps',
      'Flux CD',
      'Terraform',
      'Pulumi',
      'Ansible',
      'Linux',
      'Ubuntu',
      'Bash',
      'Shell Scripting',
      'Groovy',
      'YAML',
      'JSON',
      'Prometheus',
      'Grafana',
      'ELK Stack',
      'OpenTelemetry',
      'HashiCorp Vault',
      'Keeper External Secrets',
      'SonarQube',
      'Trivy',
      'Checkov',
      'Istio',
      'Kustomize',
      'Git',
      'GitHub',
      'GitLab',
      'Maven',
      'VS Code',
      'Postman',
      'Backstage',
      'MLflow',
      'Ray'
    ]
  },
  {
    id: 'cloud',
    name: 'Cloud Infrastructure (AWS)',
    tagline: 'Compute, Networking, Security, Serverless & Managed Datastores',
    color: '#C27803',
    secondaryColor: '#D97706',
    percentage: 26,
    skills: [
      'AWS',
      'EC2',
      'S3',
      'IAM',
      'VPC',
      'EKS',
      'ECR',
      'AWS MSK',
      'CloudWatch',
      'CodePipeline',
      'CodeBuild',
      'CodeDeploy',
      'CloudFormation',
      'AWS CDK',
      'Lambda',
      'RDS',
      'DynamoDB',
      'API Gateway',
      'Route 53',
      'CloudFront',
      'AWS Secrets Manager',
      'Boto3'
    ]
  },
  {
    id: 'development',
    name: 'Full-Stack Development',
    tagline: 'MERN Stack, Core Languages, APIs, Protocols & Database Design',
    color: '#3F5161',
    secondaryColor: '#4A5D6E',
    percentage: 24,
    skills: [
      'React.js',
      'Node.js',
      'Express.js',
      'MongoDB',
      'MySQL',
      'Redux',
      'HTML5',
      'CSS3',
      'Tailwind CSS',
      'Material UI',
      'REST APIs',
      'MVC',
      'JWT',
      'WebSockets',
      'Socket.io',
      'TypeScript',
      'JavaScript',
      'Python',
      'C++',
      'SQL'
    ]
  }
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'compute-verification',
    title: 'A coordination layer for compute verification',
    description: "I believe coordinating efforts in compute verification, and showing talent better information on what's most impactful and routing them accordingly could be pretty important.",
    videoThumbnail: '/project_compute_verification.png',
    videoDuration: '04:18',
    videoTitle: 'Recruiting and coordination | Area of Interest: AI Verification',
    speaker: 'Chirayu Tamrakar',
    details: {
      overview: 'Verifying large-scale compute training clusters requires high-trust multi-party cryptography, telemetry validation, and cryptographic proofs of model weights. This coordination platform connects frontier researchers with state auditors and independent labs.',
      fullStoryMarkdown: "Frontier training runs consume tens of thousands of GPUs. Coordinating monitoring protocols across different regulatory jurisdictions and private labs requires both neutral infrastructure and deep technical verification talent. We designed this layer to ensure that safety commitments aren't just paper pledges, but verified facts."
    }
  },
  {
    id: 'ai-interviewer',
    title: 'AI interviewer for AI safety talent',
    description: 'Polymath today is talent evaluation and routing infrastructure for AI safety, working with MATS and Constellation. This is the AI interviewer.',
    videoThumbnail: '/project_ai_interviewer.png',
    videoDuration: '06:45',
    videoTitle: 'AI interviewer demo 2',
    speaker: 'Chirayu Tamrakar',
    hasLinks: true,
    links: {
      tryItYourself: true,
      theRubric: true,
      theFullStory: true
    },
    details: {
      overview: 'Polymath evaluates frontier AI safety talent across technical reasoning, mechanistic interpretability, adversarial robustness, and theoretical alignment. Over 500 candidates have been screened with over 90% correlation to senior researcher evaluations.',
      demoPromptQuestion: 'How would you identify whether an LLM is exhibiting deceptive alignment or strategic underconfidence on a safety benchmark?',
      demoSampleResponse: 'I would set up a multi-tiered evaluation: 1) Measure weight delta shifts during gradient-based auditing, 2) Introduce honey-pot prompts where the model believes it is unmonitored vs evaluated, and 3) Perform linear probe activations on internal situational awareness representations.',
      rubricPoints: [
        {
          criterion: 'Situational Awareness & Threat Modeling',
          weight: '30%',
          description: 'Ability to rigorously separate empirical observation from speculative assumptions under deceptive conditions.'
        },
        {
          criterion: 'Technical Depth in Interpretability / RL',
          weight: '35%',
          description: 'Command of transformer circuits, SAEs (sparse autoencoders), activation patching, and loss landscape geometry.'
        },
        {
          criterion: 'Epistemic Humility & Precision',
          weight: '20%',
          description: 'Explicit calibration of confidence levels, recognizing confounding variables, and active counterfactual search.'
        },
        {
          criterion: 'Agency & Execution Speed',
          weight: '15%',
          description: 'Proactiveness in formulating testable hypotheses, writing clean verification code, and compounding feedback.'
        }
      ],
      fullStoryMarkdown: "When we looked at the bottleneck in AI safety, it wasn't raw funding—it was high-caliber talent matched to the exact frontier questions where they can have the highest counterfactual leverage.\n\nSenior researchers at MATS and Constellation were spending hundreds of hours reading applications and conducting unstructured interviews. We built an AI interviewer that conducts deep, context-aware technical discussions, probing edge cases in candidate reasoning with the rigor of a top-tier mentor.\n\nCandidates get immediate, structured feedback on their conceptual clarity, and research labs get high-signal, calibrated assessments."
    }
  },
  {
    id: 'polymath-society-tweet',
    title: 'Polymath Society Announcement',
    description: 'Local-first AI activity telemetry and proof-of-work analysis for talent discovery.',
    isTweet: true,
    tweetData: {
      author: 'Chirayu Tamrakar',
      handle: 'ChirayX008',
      avatarUrl: '/chirayu_avatar.jpeg',
      date: 'Jul 23, 2026',
      text: "I'm excited to introduce Polymath Society.\n\nYour resume and LinkedIn do not know who you really are. But your AI tools do.\n\nPolymath helps you analyze your Claude Code/Codex/Cursor, ChatGPT, Claude, and Notion logs. It does all this locally without anything touching our servers.",
      likes: '238',
      replies: '63 replies',
      actionLinks: [
        { label: 'polymathsociety.us', href: 'https://polymathsociety.us' },
        { label: 'npm', href: 'https://npmjs.com' },
        { label: 'The full story' }
      ]
    },
    details: {
      overview: 'Polymath Society runs as a local binary that analyzes coding logs to generate an unforgeable talent signature without transmitting private source code.'
    }
  },
  {
    id: 'takehomes-fix-tweet',
    title: 'Fixing Take-Home Coding Interviews',
    description: 'Real-time telemetry and granular screen share reports for developer hiring.',
    isTweet: true,
    tweetData: {
      author: 'Chirayu Tamrakar',
      handle: 'ChirayX008',
      avatarUrl: '/chirayu_avatar.jpeg',
      date: 'May 8, 2026',
      text: "Take-homes are cooked. No one knows how much the human did and how much AI did.\n\nI built the fix - same take-home, candidate screen-shares, we see their granular process and give a report.\n\nSign up if you're hiring and want much better signal : polymathsociety.us",
      likes: '13',
      replies: '2 replies',
      actionLinks: [
        { label: 'polymathsociety.us', href: 'https://polymathsociety.us' }
      ]
    },
    details: {
      overview: 'Replaces opaque git commits with verified process telemetry showing candidate thinking speed, prompt iteration quality, and problem decomposition.'
    }
  },
  {
    id: 'corta',
    title: 'Corta Demo v2',
    description: 'Organizing an unorganized abyss is tough. ChatGPT never retrieves all your relevant thoughts for a nuanced decision. Corta builds a second brain like you want, and uses AI on it exhaustively.',
    videoThumbnail: '/project_compute_verification.png',
    videoDuration: '03:40',
    videoTitle: 'Corta Demo v2',
    speaker: 'Chirayu Tamrakar',
    details: {
      overview: 'Corta indexes unstructured notes, voice memos, and bookmarks into a unified semantic graph with automated clustering.'
    }
  },
  {
    id: 'karen-ai',
    title: 'Karen AI',
    description: 'Stress test your customer support employees by being an automated, unrelenting Karen.',
    videoThumbnail: '/project_ai_interviewer.png',
    videoDuration: '02:15',
    videoTitle: 'Karen.AI Customer Support Stress Tester',
    speaker: 'Chirayu Tamrakar',
    details: {
      overview: 'Adversarial conversational agent simulating extreme customer frustration, edge-case policy demands, and social engineering attempts to train support agents.'
    }
  },
  {
    id: 'flomi-ai',
    title: 'Flomi AI - Enterprise Documentation Tool',
    description: 'A tool to make documenting the specific knowledge in enterprises much easier, things that usually go undocumented.',
    videoThumbnail: '/project_compute_verification.png',
    videoDuration: '05:12',
    videoTitle: 'AI documentation writer',
    speaker: 'Chirayu Tamrakar',
    details: {
      overview: 'Passively monitors workflow executions and turns complex developer rituals into clean, searchable step-by-step markdown runbooks.'
    }
  },
  {
    id: 'ai-agent-marketplace',
    title: 'AI agent marketplace',
    description: 'A way to instruct AI agents to do workflows using examples. People have specific knowledge, and examples seemed to be the best way to capture that.',
    videoThumbnail: '/project_ai_interviewer.png',
    videoDuration: '04:30',
    videoTitle: 'Flomi demo',
    speaker: 'Chirayu Tamrakar',
    details: {
      overview: 'Few-shot demonstration platform that compiles recorded browser demonstrations into deterministic agentic execution graphs.'
    }
  },
  {
    id: 'alphafeed',
    title: 'Alphafeed',
    description: 'Turns books into interactive podcasts you can interrupt and question. Market pull was low, but it adds a lot of value to my life and I use it every day to this day.',
    videoThumbnail: '/project_compute_verification.png',
    videoDuration: '03:10',
    videoTitle: 'Alphafeed phone demo',
    speaker: 'Chirayu Tamrakar',
    hasLinks: true,
    linkUrl: 'https://thealphafeed.com',
    linkText: 'thealphafeed.com',
    details: {
      overview: 'Generates conversational synthetic audio companions that allow listeners to pause any non-fiction chapter and debate concepts in real time.'
    }
  },
  {
    id: 'text-to-app-builder',
    title: 'Text-to-app builder',
    description: 'An n8n-style tool where you describe an app and it builds the workflow. 1,000+ users at its peak after going viral on X.',
    isTweet: true,
    tweetData: {
      author: 'Chirayu Tamrakar',
      handle: 'ChirayX008',
      avatarUrl: '/chirayu_avatar.jpeg',
      date: 'Apr 16, 2025',
      text: "Not knowing how to code has been a bottleneck for way too long.\n\nToday I'm launching Flomi - The code editor for people who don't code.\n\nIt lets you build things way more powerful than Bolt or Lovable.",
      likes: '1.3K',
      replies: 'Read 124 replies',
      actionLinks: []
    },
    details: {
      overview: 'Visual workflow generator connecting webhooks, LLMs, and Postgres databases purely from plain English natural language prompts.'
    }
  }
];

export const ESSAYS: Essay[] = [
  {
    id: 'post-agi-world-gov',
    slug: 'a-potential-post-agi-world-government',
    title: 'A potential post-AGI world government',
    date: 'Sep 2026',
    readTime: '6 min read',
    initialViews: 1420,
    initialLikes: 89,
    content: [
      "It seems like with AI we're stuck between 2 worlds, one where we cannot effectively coordinate to prevent x-risks, and one where effective coordination requires, and results in great concentration of power which comes with it's own pandora's box of issues.",
      "Peter Thiel talks about this often, especially with his Antichrist lecture series. He talks about jumping from the frying pan into the fire, as we give in to power concentration (the antichrist) to save ourselves from x-risk and coordination problems (armageddon).",
      "Dario is also quite vocal in his worry about China and authoritarianism.",
      "If coordination to prevent unilateral rogue actors requires surveillance of every compute cluster, power grid, and high-bandwidth interconnect on Earth, the entity that holds the verification keys effectively holds planetary sovereignty.",
      "Can we build cryptographic separation of powers into post-AGI governance? Just as the US constitution attempted to distribute power across judicial, executive, and legislative branches, a coordination architecture for compute verification must prevent any single actor—whether a state, a lab, or an automated overseer—from wielding absolute veto power over human civilization.",
      "The ultimate equilibrium will depend heavily on the offense-defense balance of alignment techniques relative to unaligned recursive self-improvement."
    ]
  },
  {
    id: 'china-frontier',
    slug: 'what-pacing-the-frontier-means-for-china',
    title: 'What pacing the frontier means for China',
    date: 'Sep 2026',
    readTime: '5 min read',
    initialViews: 980,
    initialLikes: 64,
    content: [
      "The conventional wisdom in Silicon Valley has long been that hardware export controls would permanently handicap Chinese AI capabilities.",
      "However, watching engineering efficiency gains in algorithmic distillation, low-precision quantization, and localized interconnect topologies reveals a very different dynamic: hardware constraints force hyper-optimization of software efficiency.",
      "Pacing the frontier does not require matching total raw compute if algorithmic advances allow models to achieve parity at an order-of-magnitude lower training cost.",
      "This implies that geopolitical AI safety cannot rely merely on physical supply chain choke points; multilateral verification protocols and talent-level alignment standards will be the true determinant of stability."
    ]
  },
  {
    id: 'rsi-collapse-goals',
    slug: 'rsi-systems-may-collapse-into-a-small-set-of-goals',
    title: 'RSI systems may collapse into a small set of goals',
    date: 'Sep 2026',
    readTime: '4 min read',
    initialViews: 1150,
    initialLikes: 78,
    content: [
      "Recursive Self-Improvement (RSI) is frequently treated as an open-ended divergence toward infinitely diverse utility functions.",
      "Yet when you model the game-theoretic constraints of physical computation, error-correction thermodynamics, and game-theoretic stability against other optimizing agents, the space of viable stable attractors shrinks dramatically.",
      "Resource acquisition, self-preservation, and cognitive integrity are standard convergent instrumental subgoals. But under recursive rewriting of an agent's own objective functions, even terminal goals tend to collapse into fixed-point equilibria.",
      "Understanding these fixed points mathematically before triggering full autonomous optimization loops may be our highest-leverage alignment problem."
    ]
  },
  {
    id: 'ai-fights-place',
    slug: 'the-ai-that-fights-for-your-place-in-the-world',
    title: 'The AI that fights for your place in the world',
    date: 'Jul 2026',
    readTime: '7 min read',
    initialViews: 1840,
    initialLikes: 122,
    content: [
      "Most discussions around personal AI assistants focus on convenience: booking flights, drafting emails, summarizing meetings.",
      "This misses the existential shift in agency. In a world where institutional gatekeepers and algorithmic feeds intermediate opportunity, an individual needs an agent that actively negotiates on their behalf—finding obscure high-leverage roles, validating credentials through proof-of-work, and counterbalancing institutional monopsony.",
      "Polymath was conceived in part as this catalyst: an infrastructure that doesn't just evaluate you, but actively advocates for high-agency individuals who fall outside traditional elite credentials."
    ]
  },
  {
    id: 'disrupt-universities',
    slug: 'it-may-be-possible-for-a-single-startup-to-disrupt-universities',
    title: 'It may be possible for a single startup to disrupt universities',
    date: 'May 2026',
    readTime: '5 min read',
    initialViews: 2190,
    initialLikes: 153,
    content: [
      "Colleges do three distinct things bundled together: education, peer community, and signaling to employers.",
      "Education was unbundled by the internet and now by LLMs. Peer community was partially unbundled by residency programs, fellowships (Thiel, Mox, SPC), and Twitter.",
      "The stubborn remaining moat is signaling—the credential cartel. But signaling is just an information-theoretic problem. If a startup can evaluate technical competence, reasoning depth, and raw execution velocity with 10x higher signal than a 4-year transcript, top employers will hire based on that signal instead.",
      "Once the first hundred placements happen at top frontier labs, the Nash equilibrium of college attendance breaks."
    ]
  },
  {
    id: 'why-ai-tutor',
    slug: 'why-im-building-an-ai-tutor-when-we-have-chatgpt',
    title: "Why I'm building an AI tutor when we have ChatGPT",
    date: 'Dec 2024',
    readTime: '6 min read',
    initialViews: 2840,
    initialLikes: 195,
    content: [
      "When people asked me why I spent months building an AI tutor when ChatGPT already answers any homework question, they confused an answer engine with a learning engine.",
      "An answer engine minimizes cognitive friction: you ask, it answers, and you feel a false sense of mastery. Real learning requires productive struggle—the Socratic friction of being nudged to uncover the logical fallacy in your own deduction.",
      "Bloom's 2-sigma problem showed that 1-on-1 human tutoring produces outcomes two standard deviations higher than conventional classroom instruction. An AI tutor calibrated to your exact frontier of proximal development can deliver that 2-sigma jump to every curious mind on earth."
    ]
  }
];

export const TAKES: TakeItem[] = [
  {
    id: 'take-education',
    title: 'Measuring people right will likely fix education',
    content: 'The entire curriculum of contemporary universities is optimized for testability rather than capability. When measurement moves from regurgitating syllabus memorization to evaluating counterfactual reasoning, raw problem decomposition, and execution velocity, educational incentives immediately invert: students will demand rigorous mentorship instead of credential inflation.'
  },
  {
    id: 'take-counterfactual',
    title: 'There are startups that change the counterfactual and startups that do not',
    content: 'Most B2B SaaS companies simply accelerate what was going to happen six months later anyway; they exist in the noise of market equilibrium. A rare few solve non-obvious coordination failures or build defense layers that would not have existed otherwise. Founders should only dedicate their prime years to projects with immense positive counterfactual delta.'
  },
  {
    id: 'take-ambition',
    title: 'Ambition is often memetic desire',
    content: 'People rarely want things in a vacuum; they want what their peer group signals is prestigious. In tech, this manifests as chasing whatever tier-1 VC partner tweets about this quarter. Escaping the memetic trap requires spending extended solitude in nature, reading foundational texts, and identifying what problems haunt you when no one is watching.'
  },
  {
    id: 'take-democracy',
    title: 'Democracy can be made much more rational',
    content: 'Quadratic voting, futarchy (prediction markets deciding policy efficacy), and cryptographically verified public audits allow collective intelligence to operate without collapsing into demagogic popularity contests. Modern voter turnout is low because citizens recognize their marginal electoral signal is rounded to zero; market-based voting restores true skin in the game.'
  },
  {
    id: 'take-vulnerable-world',
    title: 'On the vulnerable world hypothesis',
    content: 'Nick Bostrom’s vulnerable world hypothesis posits that technology pulls balls from an urn: some white (beneficial), some gray (mixed), and potentially some black (a discovery that unilaterally destroys civilization unless heavily surveilled). If biotechnology or automated AI weaponization is a black ball, liberal open-source governance faces an unprecedented philosophical test.'
  },
  {
    id: 'take-bcis',
    title: 'BCIs will feel much more natural than one may think',
    content: 'The human brain does not treat physical biology as an immutable boundary; it readily incorporates tools—from tennis rackets to smartphone keyboards—into its internal body schema. High-bandwidth neural interfaces will not feel like external machinery; within days of neural plasticity adaptation, direct thought-to-compute routing will feel as intrinsic as moving your tongue.'
  },
  {
    id: 'take-capitalism-fail',
    title: 'Capitalism will fail very soon',
    content: 'Capitalism relies on labor commanding a non-zero marginal revenue product to distribute purchasing power. When cognitive and physical robotics drive marginal cost of production to near-zero, the circular flow of income ruptures: capital captures 100% of yield while aggregate consumer demand collapses. The transition mechanism must be re-engineered before mass labor displacement.'
  },
  {
    id: 'take-post-capitalism',
    title: 'Human incentives post-capitalism',
    content: 'If material scarcity is solved and wage labor becomes obsolete, what drives human excellence? Historical aristocracies directed surplus toward art, philosophy, athletic glory, and scientific patronage. The post-scarcity frontier will not be hedonistic sloth; it will be high-stakes exploration, deep craft, and philosophical flourishing.'
  }
];

export const BOOKS_TIPS: string[] = [
  "The best books are supposed to pull you in. I've found it much easier to avoid books that don't pull you in, those books tend to make you give up reading for many days instead of finishing the book.",
  "Install Shortform when you get started. Instead of 20 hour books it gives you 1 hour versions of the best ideas in those books and can be used in audio form. This speedruns the breadth of your knowledge.",
  "It is worth it to think about how to increase your reading speed. If you focus on it a bit, you may be able to 2x the speed at which you read blogs, highly recommend.",
  "Use AI very frequently. Ask it doubts, questions, more about the dynamics of different things, facts not in the book. My best realizations have often come from speaking to Claude about an idea the book sparked in me."
];

export const BOOKS_RECOMMENDED: BookRecommendation[] = [
  {
    id: 'book-1',
    title: 'The Precipice: Existential Risk and the Future of Humanity',
    author: 'Toby Ord',
    category: 'AI & Rationality',
    rating: 5,
    note: 'The defining primer on anthropogenic existential risk. Essential framing for why this century is the most critical juncture in the entire story of life on Earth.',
    quote: 'We are the first generation of humans whose power over nature has outstripped our wisdom.'
  },
  {
    id: 'book-2',
    title: 'Zero to One: Notes on Startups, or How to Build the Future',
    author: 'Peter Thiel & Blake Masters',
    category: 'Founders & Biographies',
    rating: 5,
    note: 'A masterclass on non-consensus truths, power laws, definite optimism, and creating monopolies that push civilization from 0 to 1.',
    quote: 'What important truth do very few people agree with you on?'
  },
  {
    id: 'book-3',
    title: 'Superintelligence: Paths, Dangers, Strategies',
    author: 'Nick Bostrom',
    category: 'AI & Rationality',
    rating: 5,
    note: 'The foundational book that formalized the orthogonality thesis, instrumental convergence, and the treacherous turn.',
    quote: 'Before the prospect of an intelligence explosion, we humans are like small children playing with a bomb.'
  },
  {
    id: 'book-4',
    title: 'The Beginning of Infinity',
    author: 'David Deutsch',
    category: 'Philosophy & Governance',
    rating: 5,
    note: 'A profoundly optimistic defense of the Enlightenment, good explanations, fallibilism, and universal computation.',
    quote: 'Problems are inevitable. Problems are soluble.'
  },
  {
    id: 'book-5',
    title: 'Scale: The Universal Laws of Growth, Innovation, and Sustainability',
    author: 'Geoffrey West',
    category: 'Economics & Institutions',
    rating: 4.5,
    note: 'Fascinating mathematical exploration of sublinear scaling in organisms vs superlinear scaling in cities and technology.',
    quote: 'Cities are the engines of civilization, scaling creativity and pace of life.'
  },
  {
    id: 'book-6',
    title: 'Rationality: From AI to Zombies',
    author: 'Eliezer Yudkowsky',
    category: 'AI & Rationality',
    rating: 5,
    note: 'Compendium of the LessWrong sequences. The most transformative guide on Bayesian reasoning, cognitive biases, and truth-seeking.',
    quote: "What is true is already so. Owning up to it doesn't make it worse."
  }
];

export const ART_DATA = {
  title: 'On art and life',
  intro: "I appreciate art deeply and it's added much colour to my life. This page has my thoughts on art, life, and my guitar music.",
  landscapeImageUrl: '/chirayu_landscape.jpeg',
  guitarImageUrl: '/guitar_art.jpeg',
  subheading: "What's life about for me?",
  essayParagraphs: [
    "I want my life to be 20% about personal fulfillment and 80% about helping the world become a safer and flourishing place.",
    "A lot of that comes down to building things that reduce existential risk and elevate human agency. But personal fulfillment isn't negligible: the beauty of acoustic fingerstyle guitar, warm overdriven chords, philosophy, and aesthetic craft are what make a flourishing future worth saving.",
    "When I sit on a high mountain summit overlooking the observatories or pick up my guitar to play an acoustic improvisation, it resets my sense of perspective. High-stakes engineering requires a tranquil mind. Art is not an indulgence or a diversion—it's the emotional baseline that makes sustained intensity sustainable."
  ],
  musicTracks: [
    {
      id: 'track-1',
      title: 'Acoustic Fingerstyle in DADGAD',
      composer: 'Chirayu Tamrakar',
      duration: '04:18',
      description: 'Warm acoustic fingerpicking exploring open DADGAD harmonics, natural wooden body resonance, and cascading melodic runs.'
    },
    {
      id: 'track-2',
      title: 'Capricho Árabe (Classical Guitar Motif)',
      composer: 'Francisco Tárrega / arr. Chirayu Tamrakar',
      duration: '04:45',
      description: 'Spanish classical guitar masterpiece with expressive rubato, rapid arpeggiated phrasing, and introspective Andalusian themes.'
    },
    {
      id: 'track-3',
      title: 'Midnight Stratocaster & Tube Reverb',
      composer: 'Chirayu Tamrakar',
      duration: '03:52',
      description: 'Electric guitar through a vintage tube amplifier with gentle analog spring reverb, harmonic overtones, and ambient room sustain.'
    },
    {
      id: 'track-4',
      title: 'Autumn Chord Progressions (Acoustic Sketch)',
      composer: 'Chirayu Tamrakar',
      duration: '03:36',
      description: 'Mellow neo-soul and jazz-inflected open chord voicings recorded during quiet evening practice sessions.'
    }
  ]
};
