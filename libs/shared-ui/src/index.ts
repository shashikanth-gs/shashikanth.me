import { HlmAvatarImports } from '../avatar/src';
import { HlmButtonImports } from '../button/src';
import { HlmCardImports } from '../card/src';
import { HlmInputImports } from '../input/src';
import { HlmTypographyImports } from '../typography/src';

export * from '../avatar/src';
export * from '../button/src';
export * from '../card/src';
export * from '../input/src';
export * from '../typography/src';
export * from '../utils/src';

export const SharedUiImports = [
  ...HlmAvatarImports,
  ...HlmButtonImports,
  ...HlmCardImports,
  ...HlmInputImports,
  ...HlmTypographyImports,
] as const;
