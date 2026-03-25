import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { inject } from '@vercel/analytics';

// Initialize Vercel Analytics (only runs in browser)
inject({ mode: 'production' });

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
