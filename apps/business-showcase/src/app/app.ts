import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  Component,
  computed,
  inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HlmButtonImports } from '@business-ecosystem/shared-ui';
import { portfolioProfile } from './data/showcase-data';

@Component({
  imports: [RouterOutlet, RouterLink, RouterLinkActive, HlmButtonImports],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly themeStorageKey = 'shashi-portfolio-theme';
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly storage =
    typeof window !== 'undefined' &&
    typeof window.localStorage?.getItem === 'function' &&
    typeof window.localStorage?.setItem === 'function'
      ? window.localStorage
      : null;
  private systemThemeMediaQuery?: MediaQueryList;
  private readonly handleSystemThemeChange = (event: MediaQueryListEvent) => {
    if (this.followSystemTheme()) {
      this.theme.set(event.matches ? 'dark' : 'light');
      this.applyTheme();
    }
  };

  protected readonly theme = signal<'light' | 'dark'>('light');
  protected readonly followSystemTheme = signal(false);
  protected readonly profile = portfolioProfile;
  protected readonly isDarkTheme = computed(() => this.theme() === 'dark');
  protected readonly themeAriaLabel = computed(() =>
    this.isDarkTheme() ? 'Switch to light mode' : 'Switch to dark mode',
  );

  constructor() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const storedTheme = this.storage?.getItem(this.themeStorageKey);
    this.systemThemeMediaQuery =
      typeof window.matchMedia === 'function'
        ? window.matchMedia('(prefers-color-scheme: dark)')
        : undefined;

    this.theme.set(
      storedTheme === 'dark' || storedTheme === 'light'
        ? storedTheme
        : this.systemThemeMediaQuery?.matches
          ? 'dark'
          : 'light',
    );
    this.followSystemTheme.set(
      storedTheme !== 'dark' && storedTheme !== 'light',
    );
    this.attachSystemThemeListener();

    this.applyTheme();
  }

  protected toggleTheme(): void {
    this.followSystemTheme.set(false);
    this.theme.update((value) => (value === 'dark' ? 'light' : 'dark'));
    this.applyTheme();
  }

  private attachSystemThemeListener(): void {
    if (!this.systemThemeMediaQuery) {
      return;
    }

    if (typeof this.systemThemeMediaQuery.addEventListener === 'function') {
      this.systemThemeMediaQuery.addEventListener(
        'change',
        this.handleSystemThemeChange,
      );
      return;
    }

    this.systemThemeMediaQuery.addListener(this.handleSystemThemeChange);
  }

  private applyTheme(): void {
    const isDark = this.theme() === 'dark';
    this.document.documentElement.classList.toggle('dark', isDark);

    if (!this.storage) {
      return;
    }

    if (this.followSystemTheme()) {
      this.storage.removeItem(this.themeStorageKey);
      return;
    }

    this.storage.setItem(this.themeStorageKey, this.theme());
  }
}
