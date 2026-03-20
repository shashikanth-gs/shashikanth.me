import { portfolioProfile } from './showcase-data';

const siteUrl = portfolioProfile.website.replace(/\/$/, '');

export const siteSeo = {
  siteName: portfolioProfile.name,
  siteUrl,
  defaultTitle: `${portfolioProfile.name} | Airline Solution Architect Portfolio`,
  defaultDescription:
    'Portfolio of Shashi Kanth G S, Solution Architect specializing in airline domain modernization, cloud-native platforms, and applied AI systems.',
  defaultImagePath: '/shashi-kanth-gs.jpeg',
  locale: 'en_IN',
} as const;
