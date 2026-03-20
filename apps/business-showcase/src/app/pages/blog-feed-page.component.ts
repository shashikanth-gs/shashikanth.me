import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  HlmButtonImports,
  HlmCardImports,
  HlmInputImports,
  HlmTypographyImports,
} from '@business-ecosystem/shared-ui';
import { blogPosts } from '../data/showcase-data';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-blog-feed-page',
  imports: [
    RouterLink,
    HlmButtonImports,
    HlmCardImports,
    HlmInputImports,
    HlmTypographyImports,
  ],
  templateUrl: './blog-feed-page.component.html',
})
export class BlogFeedPageComponent {
  private readonly seo = inject(SeoService);
  protected readonly query = signal('');
  protected readonly posts = computed(() => {
    const value = this.query().trim().toLowerCase();

    if (!value) {
      return blogPosts;
    }

    return blogPosts.filter((post) =>
      [
        post.title,
        post.category,
        post.summary,
        post.platform,
        post.tags.join(' '),
      ]
        .join(' ')
        .toLowerCase()
        .includes(value),
    );
  });

  constructor() {
    this.seo.setMetadata({
      title: `Writing Archive | ${blogPosts[0]?.author.name ?? 'Portfolio'}`,
      description:
        'Browse architecture and engineering articles on airline systems, agentic AI tooling, infrastructure automation, and platform modernization.',
      path: '/blog',
      type: 'website',
      keywords: [
        'Architecture blog',
        'Airline technology',
        'Agentic AI',
        'MCP',
        'A2A',
        'Platform engineering',
      ],
    });
    this.seo.setStructuredData({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Writing Archive',
      description:
        'Public writing by Shashi Kanth G S across Medium and DEV, focused on applied architecture and AI systems.',
      url: this.seo.toAbsoluteUrl('/blog'),
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: blogPosts.map((post, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: this.seo.toAbsoluteUrl(`/blog/${post.slug}`),
          name: post.title,
        })),
      },
    });
  }

  protected updateQuery(event: Event): void {
    const target = event.target as HTMLInputElement | null;
    this.query.set(target?.value ?? '');
  }
}
