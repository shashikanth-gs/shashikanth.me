export interface LandingFaq {
  question: string;
  answer: string;
}

export interface LandingPageConfig {
  slug: string;
  title: string;
  metaDescription: string;
  headline: string;
  subheadline: string;
  targetKeywords: string[];
  offerPoints: string[];
  outcomes: string[];
  deliverables: string[];
  processSteps: string[];
  faq: LandingFaq[];
}

export const landingPages: LandingPageConfig[] = [
  {
    slug: 'airline-modernization-architecture',
    title: 'Airline Modernization Architecture | Shashi Kanth G S',
    metaDescription:
      'Airline modernization architecture for offer-order transformation, cloud migration, and API-first platform evolution across legacy PSS environments.',
    headline: 'Airline Modernization Architecture',
    subheadline:
      'Move from legacy PSS and fragmented middleware to resilient, API-first, domain-aligned airline platforms.',
    targetKeywords: [
      'airline modernization architecture',
      'airline platform transformation',
      'airline legacy modernization',
      'airline solution architect',
    ],
    offerPoints: [
      'Platform blueprinting for multi-year airline modernization programs.',
      'Dependency-aware decomposition from legacy systems to domain services.',
      'Execution planning that balances business continuity with transformation speed.',
    ],
    outcomes: [
      'Reduced release risk across retailing and servicing capabilities.',
      'Clear migration runway from EDIFACT-era integrations to modern API/event flows.',
      'Architecture decisions aligned to business goals, not only technical preference.',
    ],
    deliverables: [
      'Current-state and target-state architecture maps.',
      'Modernization sequence plan with risk controls and cutover strategy.',
      'Capability roadmap across offers, orders, servicing, and distribution.',
    ],
    processSteps: [
      'Assess current architecture, operating pain points, and delivery bottlenecks.',
      'Define target domain model, integration contracts, and platform boundaries.',
      'Deliver phased transition plan with measurable technical and business checkpoints.',
    ],
    faq: [
      {
        question:
          'How do you modernize an airline platform without disrupting operations?',
        answer:
          'By using phased domain decomposition, coexistence patterns, and explicit cutover controls so business-critical flows remain stable during migration.',
      },
      {
        question: 'Can modernization work with existing PSS and legacy middleware?',
        answer:
          'Yes. Most programs need staged modernization with wrappers, adapters, and contract-first integration before deep system replacement.',
      },
      {
        question:
          'What is the first architecture artifact to create for airline transformation?',
        answer:
          'A dependency-mapped capability model tied to business outcomes. It prevents random technical rewrites and clarifies migration order.',
      },
    ],
  },
  {
    slug: 'ndc-one-order-transformation',
    title: 'NDC and ONE Order Transformation Architect | Shashi Kanth G S',
    metaDescription:
      'NDC and ONE Order architecture strategy for airlines: offers, orders, servicing, ancillaries, and distribution modernization with standards-aware design.',
    headline: 'NDC and ONE Order Transformation',
    subheadline:
      'Design practical, standards-aware architecture for offer-order retailing without breaking commercial and operational continuity.',
    targetKeywords: [
      'NDC implementation architect',
      'ONE Order transformation',
      'airline offer and order architecture',
      'airline retailing modernization',
    ],
    offerPoints: [
      'Offer and order capability design grounded in airline operating realities.',
      'Standards-aware architecture for NDC messaging and order lifecycle management.',
      'Integration patterns across channels, servicing, fulfillment, and partner ecosystems.',
    ],
    outcomes: [
      'Faster rollout of modern retailing capabilities across channels.',
      'Improved consistency between offer creation, booking, and servicing.',
      'Reduced integration complexity through clearer bounded contexts.',
    ],
    deliverables: [
      'NDC and ONE Order capability map and transition blueprint.',
      'Offer-order service boundaries, events, and API contract model.',
      'Servicing and ancillaries workflow architecture with integration strategy.',
    ],
    processSteps: [
      'Map retailing journey from offer generation to servicing and settlement touchpoints.',
      'Define domain boundaries for offer, order, fulfillment, and partner integration.',
      'Sequence implementation by business value and operational readiness.',
    ],
    faq: [
      {
        question: 'Do airlines need to replace everything for ONE Order adoption?',
        answer:
          'No. A staged coexistence model is usually more practical, with selective modernization and incremental migration of order-centric capabilities.',
      },
      {
        question: 'How does NDC affect existing channel and servicing systems?',
        answer:
          'NDC changes how offers are distributed and fulfilled, so architecture must align channel APIs, servicing rules, and downstream operational integration.',
      },
      {
        question:
          'What is the biggest risk in NDC and ONE Order transformation?',
        answer:
          'Underestimating cross-system dependencies. A strong dependency and contract strategy prevents delays and operational regressions.',
      },
    ],
  },
  {
    slug: 'airline-cloud-platform-modernization',
    title:
      'Airline Cloud Platform Modernization Architect | Shashi Kanth G S',
    metaDescription:
      'Cloud-native modernization for airline platforms: API, events, observability, resilience, and deployment patterns for mission-critical systems.',
    headline: 'Airline Cloud Platform Modernization',
    subheadline:
      'Modernize airline platforms with cloud-native architecture patterns that improve resilience, observability, and delivery velocity.',
    targetKeywords: [
      'airline cloud architecture',
      'airline cloud platform modernization',
      'airline microservices architecture',
      'airline event-driven architecture',
    ],
    offerPoints: [
      'Cloud migration strategy aligned to airline domain constraints and uptime needs.',
      'Microservices and event architecture for scalable commercial and operational services.',
      'Observability and reliability controls for complex distributed environments.',
    ],
    outcomes: [
      'Lower incident resolution time through stronger observability and diagnostics.',
      'More predictable release cycles with platform-level guardrails.',
      'Improved resilience across high-volume booking and servicing workloads.',
    ],
    deliverables: [
      'Cloud target architecture and workload transition strategy.',
      'Operational readiness model covering SLOs, runbooks, and telemetry.',
      'Reference patterns for API gateway, event mesh, and service decomposition.',
    ],
    processSteps: [
      'Baseline workload criticality, dependency topology, and reliability pain points.',
      'Define platform reference architecture with governance and runtime standards.',
      'Execute phased modernization with measurable reliability and delivery KPIs.',
    ],
    faq: [
      {
        question:
          'How do you balance cloud modernization with strict airline uptime expectations?',
        answer:
          'Use incremental migration patterns, strong fallback paths, and reliability guardrails so critical operations remain protected throughout transition.',
      },
      {
        question:
          'Is microservices always the right approach for airline modernization?',
        answer:
          'Not always. Service boundaries should follow domain and operational constraints, not trends. Some capabilities remain better as modular monoliths.',
      },
      {
        question: 'What should be measured during cloud modernization?',
        answer:
          'Track deployment frequency, change-failure rate, mean time to recovery, and user-impacting incident trends alongside business KPIs.',
      },
    ],
  },
  {
    slug: 'airline-ai-ops-automation',
    title: 'Airline AI Ops and Automation Architecture | Shashi Kanth G S',
    metaDescription:
      'Agentic AI and AIOps architecture for airline engineering teams, including incident triage automation, policy-aware remediation, and secure operations.',
    headline: 'Airline AI Ops and Automation Architecture',
    subheadline:
      'Apply agentic AI to operations with security controls, auditability, and practical integration into real airline delivery environments.',
    targetKeywords: [
      'airline AIOps',
      'agentic AI architecture',
      'AI operations automation',
      'airline incident automation',
    ],
    offerPoints: [
      'Design AI-assisted incident triage and root-cause workflows for distributed systems.',
      'Integrate observability, ITSM, and policy boundaries for safe remediation patterns.',
      'Build secure protocol-driven architecture using MCP and interoperable agent patterns.',
    ],
    outcomes: [
      'Reduced mean time to detect and triage incidents.',
      'Higher consistency in operational response and remediation quality.',
      'Safer automation with clear human approval boundaries for sensitive changes.',
    ],
    deliverables: [
      'AIOps architecture blueprint with toolchain and governance model.',
      'Agent workflow design for triage, diagnosis, and remediation recommendations.',
      'Security and audit model for AI-assisted operational execution.',
    ],
    processSteps: [
      'Identify high-friction operational workflows with repeatable decision patterns.',
      'Design agent flow with policy, approvals, and observability integration.',
      'Roll out automation incrementally with outcome and risk monitoring.',
    ],
    faq: [
      {
        question: 'Can AI operations be used safely in production airline systems?',
        answer:
          'Yes, when designed with policy enforcement, auditability, and human approval checkpoints for high-impact actions.',
      },
      {
        question: 'Where should teams start with AIOps in complex environments?',
        answer:
          'Start with triage and diagnosis assistance first, then progress to remediation recommendations and controlled execution.',
      },
      {
        question: 'How do MCP and A2A help in AI operations architecture?',
        answer:
          'They provide standard boundaries for tool access and agent interoperability, which improves scalability, governance, and long-term maintainability.',
      },
    ],
  },
];
