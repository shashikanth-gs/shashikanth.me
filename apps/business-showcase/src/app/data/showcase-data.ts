export interface PortfolioProfile {
  name: string;
  headline: string;
  intro: string;
  about: string[];
  location: string;
  website: string;
  github: string;
  linkedin: string;
  imageSrc: string;
  imageHint: string;
  initials: string;
  metrics: Array<{ label: string; value: string }>;
}

export interface ExperienceEntry {
  company: string;
  title: string;
  summary: string;
  achievements: string[];
  logoSrc?: string;
  logoBadge?: 'light' | 'dark';
}

export interface FocusArea {
  title: string;
  category: string;
  summary: string;
  technologies: string[];
  ipLabel?: string;
}

export interface OpenSourceProject {
  name: string;
  url: string;
  source: string;
  summary: string;
  highlights: string[];
}

export interface ClientEntry {
  name: string;
  logoSrc?: string;
  logoBadge?: 'light' | 'dark';
}

export interface AuthorProfile {
  name: string;
  role: string;
  initials: string;
}

export interface BlogSection {
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
  quote?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  summary: string;
  readTime: string;
  publishedOn: string;
  platform: string;
  sourceUrl: string;
  companionUrl?: string;
  relatedRepoUrl?: string;
  author: AuthorProfile;
  eyebrow: string;
  tags: string[];
  sections: BlogSection[];
}

export const portfolioProfile: PortfolioProfile = {
  name: 'Shashi Kanth G S',
  headline:
    'Solution Architect specializing in airline retailing, offer and order architecture, distribution modernization, and cloud-native platforms.',
  intro:
    'I design resilient airline platforms with hands-on depth across NDC, offer and order flows, retail distribution, servicing, and modernization programs, while also building AI-native tooling for real operational environments.',
  about: [
    'I have spent more than 12 years working exclusively in the airline domain, moving from hands-on delivery into architecture, platform strategy, and modernization leadership across retailing, distribution, and core airline systems.',
    'My work sits at the intersection of business context and engineering execution: cloud transformation, middleware modernization, offer management, order management, servicing, ancillaries, partner distribution, and observable distributed systems.',
    'Alongside enterprise architecture work, I actively build agentic AI platforms, protocol wrappers, and infrastructure tooling with a strong bias toward interoperability, auditability, and production readiness.',
    'Outside work, I run a self-managed homelab where I operate the full stack myself, from networking and gateways to Kubernetes, observability, and security hardening.',
  ],
  location: 'Bengaluru, Karnataka, India',
  website: 'https://shashikanth.me',
  github: 'https://github.com/shashikanth-gs',
  linkedin: 'https://www.linkedin.com/in/shashikanthgs',
  imageSrc: '/shashi-kanth-gs.jpeg',
  imageHint:
    'Solution Architect focused on airline retailing, distribution modernization, and AI-native platforms.',
  initials: 'SK',
  metrics: [
    { label: 'Experience', value: '12+ years' },
    { label: 'Core domain', value: 'Airline retailing' },
    { label: 'Standards', value: 'NDC + ONE Order' },
    { label: 'Platform scope', value: 'PSS, APIs, events' },
  ],
};

export const experienceEntries: ExperienceEntry[] = [
  {
    company: 'Amadeus',
    title: 'Solutions Architect',
    logoSrc: '/logos/amadeus.svg',
    logoBadge: 'light',
    summary:
      'Leading cloud transformation and middleware modernization initiatives for airline platforms, with emphasis on retailing evolution, distribution APIs, offers and orders, and operational architecture.',
    achievements: [
      'Defined modernization direction for airline platform landscapes with a focus on resilience, observability, and zero-downtime evolution.',
      'Worked on architecture concerns spanning airline retailing, distribution channels, order-centric flows, and integration modernization.',
      'Worked directly with customers and internal stakeholders to translate business needs into scalable platform roadmaps.',
      'Drove GenAI-oriented initiatives spanning agentic systems, AI-assisted API composition, AIOps patterns, and developer tooling.',
    ],
  },
  {
    company: 'Unisys',
    title: 'Consultant → Technical Lead → Technical Architect',
    logoSrc: '/logos/unisys.svg',
    logoBadge: 'light',
    summary:
      'Progressed across architecture and technical leadership roles while shaping airline-focused microservices, retailing integrations, deployment patterns, and recovery strategies.',
    achievements: [
      'Designed microservices ecosystems and cloud deployment architecture for customer-facing airline solutions.',
      'Contributed to airline retailing and order-centric integration patterns across customer-facing platforms.',
      'Defined disaster recovery thinking around RTO and RPO, and supported solution shaping for complex platform decisions.',
      'Contributed to client presentations, RFI/RFP responses, and roadmap conversations with teams across the UK and Spain.',
    ],
  },
  {
    company: 'NTT DATA',
    title: 'Trainee → Developer → Senior Software Engineer',
    logoSrc: '/logos/nttdata.svg',
    logoBadge: 'dark',
    summary:
      'Started in airline passenger systems delivery, growing quickly into client-facing engineering and strategic cutover work.',
    achievements: [
      'Worked on airline PSS web applications across development, support, and delivery functions.',
      'Supported strategic cutovers and airline-specific customizations for production systems.',
      'Became a key engineering contact for major airline accounts early in my career.',
    ],
  },
];

export const selectedClients: ClientEntry[] = [
  { name: 'Hahn Air', logoSrc: '/logos/hahnair.svg', logoBadge: 'dark' },
  { name: 'Iberia', logoSrc: '/logos/iberia.svg', logoBadge: 'light' },
  {
    name: 'Lufthansa Group',
    logoSrc: '/logos/lufthansa.svg',
    logoBadge: 'light',
  },
  { name: 'TravelSky', logoSrc: '/logos/travelsky.gif', logoBadge: 'light' },
  { name: 'Ministry of Defence (UK)' },
];

export const focusAreas: FocusArea[] = [
  {
    title: 'Modern Airline Retailing and Offer-Order Architecture',
    category: 'Airline Domain',
    summary:
      'Hands-on architecture across offer creation, order management, servicing, ancillaries, distribution APIs, and booking experiences aligned with modern airline retailing standards.',
    technologies: [
      'IATA NDC',
      'ONE Order',
      'Dynamic Offers',
      'Offer Management',
      'Order Manager',
      'Order Servicing',
      'Ancillary Retailing',
      'Internet Booking Engine',
      'PSS / EDIFACT',
    ],
  },
  {
    title: 'API and Event Intelligence',
    category: 'Architecture',
    ipLabel: 'Protected IP',
    summary:
      'Built for large enterprises where thousands of APIs and events exist across teams. This work creates a unified knowledge layer for API contracts, event schemas, ownership, and usage signals, then uses agents to power API recommendation, developer-facing discovery, and governance-aware contract and code workflows through MCP-enabled tooling.',
    technologies: [
      'Vector Search',
      'Agentic AI',
      'API Catalog',
      'Event Catalog',
      'OpenAPI',
      'AsyncAPI',
      'Schema Registry',
      'Contract Governance',
      'API Composition',
      'Event-Driven Architecture',
      'MCP Tooling',
      'Knowledge Platforms',
    ],
  },
  {
    title: 'AIOps Platform for Reactive Operations',
    category: 'AI Systems',
    summary:
      'A multi-agent platform for incident triage, root-cause analysis, and policy-aware remediation across distributed systems.',
    technologies: [
      'LangGraph',
      'Semantic Kernel',
      'Splunk',
      'Prometheus',
      'Grafana',
      'Tempo',
      'ServiceNow',
      'Kubernetes',
    ],
  },
  {
    title: 'Autonomous Vulnerability Remediation',
    category: 'AI Engineering',
    summary:
      'An end-to-end remediation pipeline that identifies, fixes, validates, and raises pull requests for security and dependency issues with human review kept at the approval boundary.',
    technologies: [
      'BMAD',
      'JIRA',
      'BlackDuck',
      'SonarQube',
      'Fortify',
      'Spring Boot',
      'Java',
    ],
  },
  {
    title: 'Homelab and Private Platform Operations',
    category: 'Infrastructure',
    summary:
      'A self-managed proving ground for infrastructure ideas, spanning clusters, WAF, gateways, SSL, observability, and secure hosting.',
    technologies: [
      'Kubernetes',
      'Reverse Proxy',
      'WAF',
      'API Gateways',
      'Observability',
      'Networking',
    ],
  },
];

export const openSourceProjects: OpenSourceProject[] = [
  {
    name: 'a2a-copilot',
    url: 'https://github.com/shashikanth-gs/a2a-copilot',
    source: 'GitHub',
    summary:
      'A TypeScript wrapper that exposes GitHub Copilot as a fully A2A-compliant standalone agent for orchestrated multi-agent systems.',
    highlights: [
      'Wraps the Copilot SDK behind the A2A protocol surface.',
      'Supports MCP tool access, multi-turn conversations, and streaming.',
      'Designed for protocol-first interoperability rather than SDK lock-in.',
    ],
  },
  {
    name: 'a2a-opencode',
    url: 'https://github.com/shashikanth-gs/a2a-opencode',
    source: 'GitHub',
    summary:
      'An A2A wrapper for OpenCode that keeps the orchestration boundary stable while allowing the underlying LLM provider to change.',
    highlights: [
      'Supports provider-neutral execution across Anthropic, OpenAI, GitHub Copilot, and more.',
      'Includes MCP transport support, SSE streaming, and Docker-friendly delivery.',
      'Builds on the same two-rail architecture described in the related Medium article.',
    ],
  },
  {
    name: 'mcp-ssh-bridge',
    url: 'https://github.com/shashikanth-gs/mcp-ssh-bridge',
    source: 'GitHub',
    summary:
      'A secure SSH bridge for MCP clients that lets AI assistants coordinate infrastructure tasks without exposing credentials or topology details.',
    highlights: [
      'Supports STDIO and HTTP/SSE deployment modes.',
      'Adds OAuth 2.0 / OIDC authentication, auditability, and multi-host orchestration.',
      'Targets real homelab and enterprise infrastructure use cases instead of toy examples.',
    ],
  },
];

export const authorProfile: AuthorProfile = {
  name: 'Shashi Kanth G S',
  role: 'Solution Architect · Airline Platforms · Agentic AI',
  initials: 'SK',
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'two-rails-of-modern-ai',
    title:
      'The Two Rails of Modern AI: How MCP and A2A Power the Next Generation of Agent Systems',
    category: 'AI Architecture',
    summary:
      'A protocol-first view of modern agent systems: MCP as the tool rail, A2A as the agent rail, and why the combination matters for composable AI architecture.',
    readTime: '6 min read',
    publishedOn: 'February 2026 · Medium',
    platform: 'Medium',
    sourceUrl:
      'https://medium.com/@shashikanth.gs/mcp-a2a-the-two-protocol-architecture-powering-the-next-generation-of-ai-systems-45ccbea91c2d',
    relatedRepoUrl: 'https://github.com/shashikanth-gs/a2a-copilot',
    author: authorProfile,
    eyebrow: 'Protocol Architecture',
    tags: ['MCP', 'A2A', 'Agentic AI', 'Software Architecture'],
    sections: [
      {
        paragraphs: [
          'This piece argues that AI systems are settling into two distinct protocol layers. MCP standardizes how an agent reaches tools and systems. A2A standardizes how agents expose capabilities and collaborate with each other.',
          'The architectural payoff is separation of concerns. Tool access and agent interoperability stop being coupled to a single SDK or runtime, which makes systems easier to scale, govern, and evolve.',
        ],
      },
      {
        heading: 'Why the model is useful',
        bullets: [
          'MCP works as the vertical rail: files, databases, APIs, and operational tools.',
          'A2A works as the horizontal rail: discovery, task assignment, streaming, and delegation across agents.',
          'Protocol boundaries reduce bespoke integration code inside orchestrators.',
          'Production-grade runtimes can be wrapped and reused instead of rebuilt from scratch.',
        ],
      },
      {
        heading: 'What stands out',
        paragraphs: [
          'A practical insight in the article is that not every team needs to build agent intelligence from first principles. In many cases the right move is to wrap mature runtimes such as Copilot or OpenCode and make them composable through a standard interface.',
          'That framing reflects the same engineering instinct seen in service meshes and API gateways: standardize the boundary so the ecosystem can grow without rewriting every consumer.',
        ],
        quote:
          'SDKs enable agent execution. Protocols enable agent ecosystems.',
      },
    ],
  },
  {
    slug: 'vendor-neutral-a2a-agent',
    title: 'Build a Vendor-Neutral A2A Agent That Works With Any LLM Provider',
    category: 'AI Tooling',
    summary:
      'A practical guide to exposing OpenCode behind A2A so orchestration logic stays stable even when the underlying model provider changes.',
    readTime: '5 min read',
    publishedOn: 'February 27, 2026 · DEV',
    platform: 'DEV',
    sourceUrl:
      'https://dev.to/shashikanthgs/build-a-vendor-neutral-a2a-agent-that-works-with-any-llm-provider-43e5',
    relatedRepoUrl: 'https://github.com/shashikanth-gs/a2a-opencode',
    author: authorProfile,
    eyebrow: 'Vendor-Neutral Agents',
    tags: ['A2A', 'OpenCode', 'LLM Providers', 'Agent Systems'],
    sections: [
      {
        paragraphs: [
          'This article makes a sharp architectural point: direct provider coupling becomes technical debt the moment teams want to benchmark, switch, or specialize models. The answer proposed here is to keep the orchestrator speaking A2A while OpenCode handles provider-specific execution underneath.',
          'That shift turns model selection into configuration rather than integration work. It is a small implementation detail with large long-term consequences for portability and platform agility.',
        ],
      },
      {
        heading: 'What the article demonstrates',
        bullets: [
          'OpenCode can sit behind an A2A wrapper as the execution runtime.',
          'Anthropic, OpenAI, GitHub Copilot, and other providers can be swapped without changing the orchestration contract.',
          'MCP tools remain part of the stack, so capability expansion still happens through standard interfaces.',
          'Multi-agent routing becomes easier because each agent exposes the same protocol surface.',
        ],
      },
      {
        heading: 'Why it belongs in this portfolio',
        paragraphs: [
          'The article reinforces a consistent theme across your work: prefer architecture that preserves optionality. Rather than betting on one provider-specific integration path, wrap strong runtimes behind stable protocol boundaries and let the system evolve underneath.',
        ],
      },
    ],
  },
  {
    slug: 'github-copilot-as-a2a-agent',
    title: 'Turn GitHub Copilot into an A2A-Compliant Agent in Under 5 Minutes',
    category: 'Developer Tooling',
    summary:
      'A concise walkthrough showing how to expose GitHub Copilot as a discoverable A2A agent with MCP tool access and minimal setup.',
    readTime: '5 min read',
    publishedOn: 'February 27, 2026 · DEV',
    platform: 'DEV',
    sourceUrl:
      'https://dev.to/shashikanthgs/turn-github-copilot-into-an-a2a-compliant-agent-in-under-5-minutes-4pfl',
    relatedRepoUrl: 'https://github.com/shashikanth-gs/a2a-copilot',
    author: authorProfile,
    eyebrow: 'Applied AI Tooling',
    tags: ['GitHub Copilot', 'A2A', 'MCP', 'TypeScript'],
    sections: [
      {
        paragraphs: [
          'This article translates the protocol idea into a usable developer workflow. Instead of discussing agent interoperability as theory, it demonstrates a concrete path for exposing Copilot through A2A so that other orchestrators can discover and call it.',
          'The strongest part of the piece is the framing: Copilot already brings planning, context management, tool execution, and streaming. The wrapper pattern focuses on interoperability rather than re-implementing intelligence.',
        ],
      },
      {
        heading: 'Key takeaways',
        bullets: [
          'Copilot can be surfaced behind Agent Cards, JSON-RPC, REST, and SSE.',
          'MCP tools can be layered into the runtime without changing the orchestration pattern.',
          'A config-first wrapper is often enough to convert a strong runtime into an interoperable agent.',
          'The result is easier discovery, reuse, and orchestration across broader AI systems.',
        ],
      },
      {
        heading: 'Why it matters',
        paragraphs: [
          'For engineering teams adopting AI, this is the difference between embedding a powerful tool in one place and making it a reusable service inside a larger ecosystem. That shift aligns closely with platform thinking and protocol-driven architecture.',
        ],
      },
    ],
  },
  {
    slug: 'ai-assisted-infrastructure-management',
    title: 'The Missing Piece for AI-Assisted Infrastructure Management',
    category: 'Infrastructure',
    summary:
      'A practical argument for secure, auditable AI-assisted operations, built around SSH MCP Bridge and real-world homelab and infrastructure workflows.',
    readTime: '7 min read',
    publishedOn: 'December 31, 2025 · Medium and DEV',
    platform: 'Medium / DEV',
    sourceUrl:
      'https://medium.com/@shashikanth.gs/the-missing-piece-for-ai-assisted-infrastructure-management-42597b53bbf6',
    companionUrl:
      'https://dev.to/shashikanthgs/the-missing-piece-for-ai-assisted-infrastructure-management-4709',
    relatedRepoUrl: 'https://github.com/shashikanth-gs/mcp-ssh-bridge',
    author: authorProfile,
    eyebrow: 'Operations and Security',
    tags: ['MCP', 'Infrastructure', 'Homelab', 'DevSecOps'],
    sections: [
      {
        paragraphs: [
          'This write-up starts from a grounded operational problem: infrastructure is not one machine and one command. Real environments involve multiple hosts, reverse proxies, databases, clusters, caches, and sequencing concerns that create coordination overhead.',
          'The proposed answer is SSH MCP Bridge, which gives AI assistants controlled SSH access through an MCP server while keeping secrets and topology details isolated from the model itself.',
        ],
      },
      {
        heading: 'What the architecture prioritizes',
        bullets: [
          'Credential isolation so the assistant never handles raw SSH keys, passwords, or host details.',
          'Auditability through command logging and policy boundaries.',
          'Support for both local STDIO and remote HTTP/SSE deployment modes.',
          'Multi-host orchestration for workflows such as deploy, validate, troubleshoot, and recover.',
        ],
      },
      {
        heading: 'Why the article lands well',
        paragraphs: [
          'The article avoids vague claims about AI magic. Instead, it frames AI as a coordination layer that can reduce repetitive operational toil while still respecting security and control boundaries.',
          'It also connects directly to your broader portfolio: self-hosted infrastructure, protocol-driven AI tooling, and production-oriented platform thinking.',
        ],
        quote: 'That is not paranoia. That is just good architecture.',
      },
    ],
  },
];
