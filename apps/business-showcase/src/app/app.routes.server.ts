import {
  PrerenderFallback,
  RenderMode,
  ServerRoute,
} from '@angular/ssr';
import { landingPages } from './data/landing-pages';
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
  ...landingPages.map(
    (landing) =>
      ({
        path: landing.slug,
        renderMode: RenderMode.Prerender,
      }) satisfies ServerRoute,
  ),
  {
    path: '**',
    renderMode: RenderMode.Client,
  },
];
