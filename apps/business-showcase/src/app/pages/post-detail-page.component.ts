import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, ParamMap, RouterLink } from '@angular/router';
import {
  HlmButtonImports,
  HlmCardImports,
  HlmTypographyImports,
} from '@business-ecosystem/shared-ui';
import { blogPosts } from '../data/showcase-data';

@Component({
  selector: 'app-post-detail-page',
  imports: [RouterLink, HlmButtonImports, HlmCardImports, HlmTypographyImports],
  templateUrl: './post-detail-page.component.html',
})
export class PostDetailPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly paramMap = toSignal(this.route.paramMap, {
    initialValue: this.route.snapshot.paramMap as ParamMap,
  });

  protected readonly post = computed(() =>
    blogPosts.find((entry) => entry.slug === this.paramMap().get('slug')),
  );
}
