import { Component, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, ParamMap, RouterLink } from '@angular/router';
import {
  HlmButtonImports,
  HlmCardImports,
  HlmTypographyImports,
} from '@business-ecosystem/shared-ui';
import { blogPosts } from '../data/showcase-data';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-post-detail-page',
  imports: [RouterLink, HlmButtonImports, HlmCardImports, HlmTypographyImports],
  templateUrl: './post-detail-page.component.html',
})
export class PostDetailPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly seo = inject(SeoService);
  private readonly paramMap = toSignal(this.route.paramMap, {
    initialValue: this.route.snapshot.paramMap as ParamMap,
  });

  protected readonly post = computed(() =>
    blogPosts.find((entry) => entry.slug === this.paramMap().get('slug')),
  );

  constructor() {
    effect(() => {
      const article = this.post();

      if (!article) {
        this.seo.setMetadata({
          title: 'Article Not Found | Writing Archive',
          description:
            'The requested article does not exist in this portfolio archive.',
          path: '/blog',
          robots: 'noindex,nofollow',
        });
        this.seo.clearStructuredData();
        return;
      }

      const postPath = `/blog/${article.slug}`;
      const publishedAt = `${article.publishedDate}T00:00:00+05:30`;
      this.seo.setMetadata({
        title: `${article.title} | ${article.author.name}`,
        description: article.summary,
        path: postPath,
        type: 'article',
        keywords: article.tags,
        publishedTime: publishedAt,
        modifiedTime: publishedAt,
      });
      this.seo.setStructuredData([
        {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: article.title,
          description: article.summary,
          datePublished: article.publishedDate,
          dateModified: article.publishedDate,
          inLanguage: 'en',
          author: {
            '@type': 'Person',
            name: article.author.name,
          },
          image: this.seo.toAbsoluteUrl('/shashi-kanth-gs.jpeg'),
          mainEntityOfPage: this.seo.toAbsoluteUrl(postPath),
          articleSection: article.category,
          keywords: article.tags.join(', '),
          publisher: {
            '@type': 'Person',
            name: article.author.name,
            url: this.seo.toAbsoluteUrl('/'),
          },
        },
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: this.seo.toAbsoluteUrl('/'),
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Writing',
              item: this.seo.toAbsoluteUrl('/blog'),
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: article.title,
              item: this.seo.toAbsoluteUrl(postPath),
            },
          ],
        },
      ]);
    });
  }
}
