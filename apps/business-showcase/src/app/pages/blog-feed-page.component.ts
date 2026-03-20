import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  HlmButtonImports,
  HlmCardImports,
  HlmInputImports,
  HlmTypographyImports,
} from '@business-ecosystem/shared-ui';
import { blogPosts } from '../data/showcase-data';

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

  protected updateQuery(event: Event): void {
    const target = event.target as HTMLInputElement | null;
    this.query.set(target?.value ?? '');
  }
}
