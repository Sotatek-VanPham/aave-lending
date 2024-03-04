import { ExclamationIcon } from '@heroicons/react/outline';
import { Trans } from '@lingui/macro';
import { Box } from '@mui/material';
import { AssetCapData } from 'src/hooks/useAssetCaps';

import { TextWithTooltip, TextWithTooltipProps } from '../TextWithTooltip';

type BorrowCapMaxedTooltipProps = TextWithTooltipProps & {
  borrowCap: AssetCapData;
};

export const BorrowCapMaxedTooltip = ({ borrowCap, ...rest }: BorrowCapMaxedTooltipProps) => {
  if (!borrowCap || !borrowCap.isMaxed) return null;

  return (
    <Box sx={{ ml: 2 }}>
      <TextWithTooltip {...rest} icon={<ExclamationIcon />} iconColor="warning.main" iconSize={18}>
        <>
          <Trans>Protocol borrow cap at 100% for this asset. Further borrowing unavailable.</Trans>
        </>
      </TextWithTooltip>
    </Box>
  );
};
