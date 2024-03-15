import { Paper, Typography } from '@mui/material';
import { ReactNode } from 'react';

import { FormattedNumber } from '../../../components/primitives/FormattedNumber';

interface ListTopInfoItemProps {
  title: ReactNode;
  value: number | string;
  percent?: boolean;
  tooltip?: ReactNode;
}

export const ListTopInfoItem = ({ title, value, percent, tooltip }: ListTopInfoItemProps) => {
  return (
    <Paper
      variant="outlined"
      sx={{
        mr: 2,
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        boxShadow: 'none',
        bgcolor: 'transparent',
      }}
    >
      <Typography color="#FFF" sx={{ mr: 1, fontSize: '12px' }} noWrap>
        {title}
      </Typography>
      <FormattedNumber
        value={value}
        percent={percent}
        symbol="USD"
        sx={{ fontFamily: 'Mulish', color: '#fff', fontSize: '12px' }}
      />

      {tooltip}
    </Paper>
  );
};
