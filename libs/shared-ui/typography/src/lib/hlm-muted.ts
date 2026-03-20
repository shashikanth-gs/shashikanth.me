import { Directive } from '@angular/core';
import { classes } from '@business-ecosystem/shared-ui/utils';

export const hlmMuted = 'text-sm text-muted-foreground';

@Directive({
	selector: '[hlmMuted]',
})
export class HlmMuted {
	constructor() {
		classes(() => hlmMuted);
	}
}
