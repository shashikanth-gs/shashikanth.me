import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { siteSeo } from '../data/site-seo';

export interface SeoMetadata {
  title: string;
  description: string;
  path?: string;
  imagePath?: string;
  type?: 'website' | 'article' | 'profile';
  robots?: string;
  keywords?: string[];
  publishedTime?: string;
  modifiedTime?: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);
  private readonly jsonLdScriptId = 'portfolio-jsonld';

  setMetadata({
    title,
    description,
    path = '/',
    imagePath = siteSeo.defaultImagePath,
    type = 'website',
    robots = 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1',
    keywords = [],
    publishedTime,
    modifiedTime,
  }: SeoMetadata): void {
    const canonicalUrl = this.toAbsoluteUrl(path);
    const imageUrl = this.toAbsoluteUrl(imagePath);
    const tags: MetaDefinition[] = [
      { name: 'description', content: description },
      { name: 'robots', content: robots },
      { name: 'author', content: siteSeo.siteName },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: type },
      { property: 'og:url', content: canonicalUrl },
      { property: 'og:image', content: imageUrl },
      { property: 'og:site_name', content: siteSeo.siteName },
      { property: 'og:locale', content: siteSeo.locale },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: imageUrl },
      { name: 'twitter:url', content: canonicalUrl },
    ];

    this.title.setTitle(title);
    tags.forEach((tag) => this.meta.updateTag(tag));

    if (keywords.length > 0) {
      this.meta.updateTag({ name: 'keywords', content: keywords.join(', ') });
    } else {
      this.meta.removeTag("name='keywords'");
    }

    if (publishedTime) {
      this.meta.updateTag({
        property: 'article:published_time',
        content: publishedTime,
      });
    } else {
      this.meta.removeTag("property='article:published_time'");
    }

    if (modifiedTime) {
      this.meta.updateTag({
        property: 'article:modified_time',
        content: modifiedTime,
      });
    } else {
      this.meta.removeTag("property='article:modified_time'");
    }

    this.setCanonicalUrl(canonicalUrl);
  }

  setStructuredData(data: object | object[]): void {
    this.clearStructuredData();

    const script = this.document.createElement('script');
    script.id = this.jsonLdScriptId;
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    this.document.head.appendChild(script);
  }

  clearStructuredData(): void {
    const existing = this.document.getElementById(this.jsonLdScriptId);
    existing?.remove();
  }

  toAbsoluteUrl(path: string): string {
    if (/^https?:\/\//.test(path)) {
      return path;
    }

    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return `${siteSeo.siteUrl}${normalizedPath}`;
  }

  private setCanonicalUrl(url: string): void {
    let canonical = this.document.querySelector(
      "link[rel='canonical']",
    ) as HTMLLinkElement | null;

    if (!canonical) {
      canonical = this.document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      this.document.head.appendChild(canonical);
    }

    canonical.setAttribute('href', url);
  }
}
