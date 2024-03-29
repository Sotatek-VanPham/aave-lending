import { Trans } from '@lingui/macro';

import { TextWithTooltip, TextWithTooltipProps } from '../TextWithTooltip';

export const VariableAPYTooltip = ({ ...rest }: TextWithTooltipProps) => {
  return (
    <TextWithTooltip sx={{ fontFamily: 'Mulish', fontWeight: '400' }} {...rest}>
      <Trans>
        Variable interest rate will <b>fluctuate</b> based on the market conditions. Recommended for
        short-term positions.
      </Trans>
    </TextWithTooltip>
  );
};
