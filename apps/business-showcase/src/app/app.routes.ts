import { Route } from '@angular/router';
import { BlogFeedPageComponent } from './pages/blog-feed-page.component';
import { HomePageComponent } from './pages/home-page.component';
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
];
