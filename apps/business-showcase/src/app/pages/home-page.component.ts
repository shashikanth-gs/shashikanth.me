import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  HlmAvatarImports,
  HlmButtonImports,
  HlmCardImports,
  HlmTypographyImports,
} from '@business-ecosystem/shared-ui';
import {
  blogPosts,
  experienceEntries,
  focusAreas,
  openSourceProjects,
  portfolioProfile,
  selectedClients,
} from '../data/showcase-data';
import { siteSeo } from '../data/site-seo';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-home-page',
  imports: [
    RouterLink,
    HlmAvatarImports,
    HlmButtonImports,
    HlmCardImports,
    HlmTypographyImports,
  ],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  private readonly seo = inject(SeoService);
  protected readonly profile = portfolioProfile;
  protected readonly experience = experienceEntries;
  protected readonly selectedClients = selectedClients;
  protected readonly focusAreas = focusAreas;
  protected readonly openSourceProjects = openSourceProjects;
  protected readonly featuredPosts = blogPosts.slice(0, 2);
  protected readonly githubLogo = '/logos/github.svg';
  protected readonly linkedinLogo = '/logos/linkedin.svg';

  constructor() {
    this.seo.setMetadata({
      title: siteSeo.defaultTitle,
      description: siteSeo.defaultDescription,
      path: '/',
      type: 'profile',
      keywords: [
        'Airline Solution Architect',
        'Airline Domain Expert',
        'NDC',
        'ONE Order',
        'Cloud Architecture',
        'Agentic AI',
        'Portfolio',
      ],
    });
    this.seo.setStructuredData([
      {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: this.profile.name,
        url: this.profile.website,
        image: this.seo.toAbsoluteUrl(this.profile.imageSrc),
        jobTitle: 'Solution Architect',
        worksFor: {
          '@type': 'Organization',
          name: 'Amadeus',
        },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Bengaluru',
          addressRegion: 'Karnataka',
          addressCountry: 'India',
        },
        sameAs: [this.profile.linkedin, this.profile.github],
        knowsAbout: this.profile.domainCoverage,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: this.profile.name,
        url: this.profile.website,
        description: this.profile.headline,
      },
    ]);
  }

  protected getLogoBadgeClass(logoBadge?: 'light' | 'dark'): string {
    if (logoBadge === 'dark') {
      return 'border-slate-800 bg-slate-900 dark:border-slate-700 dark:bg-slate-950';
    }

    return 'border-slate-200 bg-white dark:border-slate-200 dark:bg-slate-100';
  }

  protected getLogoBadgeTextClass(logoBadge?: 'light' | 'dark'): string {
    return logoBadge === 'dark' ? 'text-slate-100' : 'text-slate-700';
  }

  protected getClientMonogram(name: string): string {
    return name
      .split(/[\s()/-]+/)
      .filter((token) => token.length > 0)
      .slice(0, 3)
      .map((token) => token[0]?.toUpperCase() ?? '')
      .join('');
  }

  protected getFocusPillClass(category: string): string {
    void category;
    return 'rounded-full border border-border/70 bg-surface px-3 py-1 text-sm text-muted-foreground whitespace-nowrap';
  }

  protected getWritingPlatformClass(platform: string): string {
    const normalized = platform.toLowerCase();

    if (normalized.includes('medium')) {
      return 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300';
    }

    if (normalized.includes('dev')) {
      return 'border-sky-400/30 bg-sky-400/10 text-sky-300';
    }

    return 'border-primary/30 bg-primary/10 text-primary';
  }
}
