import { Trans } from '@lingui/macro';

import { TextWithTooltip, TextWithTooltipProps } from '../TextWithTooltip';

export const StableAPYTooltip = ({ ...rest }: TextWithTooltipProps) => {
  return (
    <TextWithTooltip {...rest} sx={{ fontFamily: 'Mulish', fontWeight: '400' }}>
      <Trans>
        Stable interest rate will <b>stay the same</b> for the duration of your loan. Recommended
        for long-term loan periods and for users who prefer predictability.
      </Trans>
    </TextWithTooltip>
  );
};
