import { Typography, useMediaQuery, useTheme } from '@mui/material';
import { ReactNode } from 'react';

import { ListWrapper } from '../../../components/lists/ListWrapper';
import { ListHeader } from './ListHeader';
import { ListItemLoader } from './ListItemLoader';
import { MobileListItemLoader } from './MobileListItemLoader';

interface ListLoaderProps {
  title: ReactNode;
  withTopMargin?: boolean;
  head: ReactNode[];
}

export const ListLoader = ({ title, withTopMargin, head }: ListLoaderProps) => {
  const theme = useTheme();
  const downToXSM = useMediaQuery(theme.breakpoints.down('xsm'));

  return (
    <ListWrapper
      titleComponent={
        <Typography
          component="div"
          sx={{
            mr: 4,
            color: '#fff',
            fontWeight: '500',
            fontFamily: 'Work Sans',
            fontSize: '24px',
          }}
        >
          {title}
        </Typography>
      }
      withTopMargin={withTopMargin}
    >
      <>
        {!downToXSM && <ListHeader head={head} />}
        {!downToXSM ? (
          <>
            <ListItemLoader />
            <ListItemLoader />
          </>
        ) : (
          <MobileListItemLoader />
        )}
      </>
    </ListWrapper>
  );
};
