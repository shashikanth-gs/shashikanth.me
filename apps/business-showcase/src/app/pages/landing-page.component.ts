import { Component, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  HlmButtonImports,
  HlmCardImports,
  HlmTypographyImports,
} from '@business-ecosystem/shared-ui';
import { portfolioProfile } from '../data/showcase-data';
import { LandingPageConfig } from '../data/landing-pages';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-landing-page',
  imports: [RouterLink, HlmButtonImports, HlmCardImports, HlmTypographyImports],
  templateUrl: './landing-page.component.html',
})
export class LandingPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly seo = inject(SeoService);
  private readonly routeData = toSignal(this.route.data, {
    initialValue: this.route.snapshot.data,
  });

  protected readonly profile = portfolioProfile;
  protected readonly page = computed(
    () => this.routeData()['landing'] as LandingPageConfig | undefined,
  );

  constructor() {
    effect(() => {
      const page = this.page();
      if (!page) {
        return;
      }

      const path = `/${page.slug}`;
      this.seo.setMetadata({
        title: page.title,
        description: page.metaDescription,
        path,
        type: 'website',
        keywords: page.targetKeywords,
      });
      this.seo.setStructuredData([
        {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: page.headline,
          description: page.metaDescription,
          url: this.seo.toAbsoluteUrl(path),
          about: page.targetKeywords,
          author: {
            '@type': 'Person',
            name: this.profile.name,
          },
        },
        {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: page.headline,
          serviceType: 'Airline Architecture Consulting',
          provider: {
            '@type': 'Person',
            name: this.profile.name,
            url: this.profile.website,
          },
          description: page.metaDescription,
          areaServed: 'Global',
          url: this.seo.toAbsoluteUrl(path),
        },
        {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: page.faq.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.answer,
            },
          })),
        },
      ]);
    });
  }
}
