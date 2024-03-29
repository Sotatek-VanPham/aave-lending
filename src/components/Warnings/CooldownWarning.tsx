import { Trans } from '@lingui/macro';
import { Typography } from '@mui/material';

import { Warning } from '../primitives/Warning';

export const CooldownWarning = () => {
  return (
    <Warning severity="warning" sx={{ '.MuiAlert-message': { p: 0 }, mb: 6 }}>
      <Typography variant="subheader1">
        <Trans>Cooldown period warning</Trans>
      </Typography>
      <Typography variant="caption">
        <Trans>
          The cooldown period is the time required prior to unstaking your tokens (20 days). You can
          only withdraw your assets from the Security Module after the cooldown period and within
          the unstake window.
        </Trans>
      </Typography>
    </Warning>
  );
};
