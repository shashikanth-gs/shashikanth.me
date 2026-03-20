import { Route } from '@angular/router';
import { landingPages } from './data/landing-pages';
import { BlogFeedPageComponent } from './pages/blog-feed-page.component';
import { HomePageComponent } from './pages/home-page.component';
import { LandingPageComponent } from './pages/landing-page.component';
import { PostDetailPageComponent } from './pages/post-detail-page.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'blog',
    component: BlogFeedPageComponent,
  },
  {
    path: 'blog/:slug',
    component: PostDetailPageComponent,
  },
  ...landingPages.map((landing) => ({
    path: landing.slug,
    component: LandingPageComponent,
    data: { landing },
  })),
  {
    path: '**',
    redirectTo: '',
  },
];
