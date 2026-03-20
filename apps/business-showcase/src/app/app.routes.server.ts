import {
  PrerenderFallback,
  RenderMode,
  ServerRoute,
} from '@angular/ssr';
import { blogPosts } from './data/showcase-data';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'blog',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'blog/:slug',
    renderMode: RenderMode.Prerender,
    fallback: PrerenderFallback.Client,
    async getPrerenderParams() {
      return blogPosts.map((post) => ({ slug: post.slug }));
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Client,
  },
];
