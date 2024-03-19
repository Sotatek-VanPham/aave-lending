import { ExternalLinkIcon } from '@heroicons/react/outline';
import { Trans } from '@lingui/macro';
import { Box, Menu, MenuItem, SvgIcon, Typography } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import { CircleIcon } from 'src/components/CircleIcon';
import { TokenIcon } from 'src/components/primitives/TokenIcon';
import { ComputedReserveData } from 'src/hooks/app-data-provider/useAppDataProvider';
import { useProtocolDataContext } from 'src/hooks/useProtocolDataContext';
import { useRootStore } from 'src/store/root';

import { RESERVE_DETAILS } from '../../utils/mixPanelEvents';

interface TokenLinkDropdownProps {
  poolReserve: ComputedReserveData;
  downToSM: boolean;
  hideSToken?: boolean;
}

export const TokenLinkDropdown = ({
  poolReserve,
  downToSM,
  hideSToken,
}: TokenLinkDropdownProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { currentNetworkConfig, currentMarket } = useProtocolDataContext();
  const open = Boolean(anchorEl);
  const trackEvent = useRootStore((store) => store.trackEvent);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    trackEvent(RESERVE_DETAILS.RESERVE_TOKENS_DROPDOWN, {
      assetName: poolReserve.name,
      asset: poolReserve.underlyingAsset,
      aToken: poolReserve.aTokenAddress,
      market: currentMarket,
      variableDebtToken: poolReserve.variableDebtTokenAddress,
    });
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (!poolReserve) {
    return null;
  }
  const showDebtTokenHeader = poolReserve.borrowingEnabled || poolReserve.stableBorrowRateEnabled;

  return (
    <>
      <Box onClick={handleClick}>
        <CircleIcon tooltipText={'View token contracts'} downToSM={downToSM}>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              color: '#fff',
              '&:hover': { color: '#F1F1F3' },
              cursor: 'pointer',
            }}
          >
            <SvgIcon sx={{ fontSize: '14px' }}>
              <ExternalLinkIcon />
            </SvgIcon>
          </Box>
        </CircleIcon>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        keepMounted={true}
        data-cy="addToWaletSelector"
      >
        <Box sx={{ px: 4, pt: 3, pb: 2 }}>
          <Typography variant="secondary12" color="text.secondary">
            <Trans>Underlying token</Trans>
          </Typography>
        </Box>

        <MenuItem
          onClick={() => {
            trackEvent(RESERVE_DETAILS.RESERVE_TOKEN_ACTIONS, {
              type: 'Underlying Token',
              assetName: poolReserve.name,
              asset: poolReserve.underlyingAsset,
              aToken: poolReserve.aTokenAddress,
              market: currentMarket,
              variableDebtToken: poolReserve.variableDebtTokenAddress,
            });
          }}
          component="a"
          href={currentNetworkConfig.explorerLinkBuilder({
            address: poolReserve?.underlyingAsset,
          })}
          target="_blank"
          divider
        >
          <TokenIcon symbol={poolReserve.iconSymbol} sx={{ fontSize: '20px' }} />
          <Typography variant="subheader1" sx={{ ml: 3 }} noWrap data-cy={`assetName`}>
            {poolReserve.symbol}
          </Typography>
        </MenuItem>

        {!hideSToken && (
          <Box>
            <Box sx={{ px: 4, pt: 3, pb: 2 }}>
              <Typography variant="secondary12" color="text.secondary">
                <Trans>Colend aCoreToken</Trans>
              </Typography>
            </Box>

            <MenuItem
              component="a"
              onClick={() => {
                trackEvent(RESERVE_DETAILS.RESERVE_TOKEN_ACTIONS, {
                  type: 'aToken',
                  assetName: poolReserve.name,
                  asset: poolReserve.underlyingAsset,
                  aToken: poolReserve.aTokenAddress,
                  market: currentMarket,
                  variableDebtToken: poolReserve.variableDebtTokenAddress,
                });
              }}
              href={currentNetworkConfig.explorerLinkBuilder({
                address: poolReserve?.aTokenAddress,
              })}
              target="_blank"
              divider={showDebtTokenHeader}
            >
              <TokenIcon symbol={poolReserve.iconSymbol} aToken={true} sx={{ fontSize: '20px' }} />
              <Typography variant="subheader1" sx={{ ml: 3 }} noWrap data-cy={`assetName`}>
                {'s' + poolReserve.symbol}
              </Typography>
            </MenuItem>
          </Box>
        )}

        {showDebtTokenHeader && (
          <Box sx={{ px: 4, pt: 3, pb: 2 }}>
            <Typography variant="secondary12" color="text.secondary">
              <Trans>Colend debt token</Trans>
            </Typography>
          </Box>
        )}
        {poolReserve.borrowingEnabled && (
          <MenuItem
            component="a"
            href={currentNetworkConfig.explorerLinkBuilder({
              address: poolReserve?.variableDebtTokenAddress,
            })}
            target="_blank"
            onClick={() => {
              trackEvent(RESERVE_DETAILS.RESERVE_TOKEN_ACTIONS, {
                type: 'Variable Debt',
                assetName: poolReserve.name,
                asset: poolReserve.underlyingAsset,
                aToken: poolReserve.aTokenAddress,
                market: currentMarket,
                variableDebtToken: poolReserve.variableDebtTokenAddress,
              });
            }}
          >
            <TokenIcon symbol="default" sx={{ fontSize: '20px' }} />
            <Typography variant="subheader1" sx={{ ml: 3 }} noWrap data-cy={`assetName`}>
              {'Variable debt ' + poolReserve.symbol}
            </Typography>
          </MenuItem>
        )}
        {poolReserve.stableBorrowRateEnabled && (
          <MenuItem
            component="a"
            href={currentNetworkConfig.explorerLinkBuilder({
              address: poolReserve?.stableDebtTokenAddress,
            })}
            target="_blank"
            onClick={() => {
              trackEvent(RESERVE_DETAILS.RESERVE_TOKEN_ACTIONS, {
                type: 'Stable Debt',
                assetName: poolReserve.name,
                asset: poolReserve.underlyingAsset,
                aToken: poolReserve.aTokenAddress,
                market: currentMarket,
                variableDebtToken: poolReserve.variableDebtTokenAddress,
                stableDebtToken: poolReserve.stableDebtTokenAddress,
              });
            }}
          >
            <TokenIcon symbol="default" sx={{ fontSize: '20px' }} />
            <Typography variant="subheader1" sx={{ ml: 3 }} noWrap data-cy={`assetName`}>
              {'Stable debt ' + poolReserve.symbol}
            </Typography>
          </MenuItem>
        )}
      </Menu>
    </>
  );
};
