import { Trans } from '@lingui/macro';
import { Button, styled } from '@mui/material';
import { useAppDataContext } from 'src/hooks/app-data-provider/useAppDataProvider';
import { useAssetCaps } from 'src/hooks/useAssetCaps';
import { useModalContext } from 'src/hooks/useModal';
import { useRootStore } from 'src/store/root';
import { DashboardReserve } from 'src/utils/dashboardSortUtils';
import { GENERAL } from 'src/utils/mixPanelEvents';

import { ListColumn } from '../../../../components/lists/ListColumn';
import { useProtocolDataContext } from '../../../../hooks/useProtocolDataContext';
import { isFeatureEnabled } from '../../../../utils/marketsAndNetworksConfig';
import { ListAPRColumn } from '../ListAPRColumn';
import { ListButtonsColumn } from '../ListButtonsColumn';
import { ListItemUsedAsCollateral } from '../ListItemUsedAsCollateral';
import { ListItemWrapper } from '../ListItemWrapper';
import { ListValueColumn } from '../ListValueColumn';

export const ButtonWithdrawCustom = styled(Button)(() => ({
  borderRadius: '4px',
  background: '#484A77',
  border: 'none',
  width: '87px',
  height: '32px',
  fontSize: '12px',
  color: '#C4C8E2',
  fontWeight: 700,
  '&:hover': {
    background: '#484A77',
    opacity: 0.7,
  },
  '&:disabled': {
    background: '#484A77',
    color: '#C4C8E2',
    border: 'none',
    cursor: 'not-allowed',
    opacity: 0.7,
  },
})) as typeof Button;

export const SuppliedPositionsListItem = ({
  reserve,
  underlyingBalance,
  underlyingBalanceUSD,
  usageAsCollateralEnabledOnUser,
  underlyingAsset,
}: DashboardReserve) => {
  const { user } = useAppDataContext();
  const { isIsolated, aIncentivesData, isFrozen, isActive } = reserve;
  const { currentMarketData, currentMarket } = useProtocolDataContext();
  const { openSupply, openWithdraw, openCollateralChange, openSwap } = useModalContext();
  const { debtCeiling } = useAssetCaps();
  const isSwapButton = isFeatureEnabled.liquiditySwap(currentMarketData);
  const trackEvent = useRootStore((store) => store.trackEvent);

  const canBeEnabledAsCollateral =
    !debtCeiling.isMaxed &&
    reserve.reserveLiquidationThreshold !== '0' &&
    ((!reserve.isIsolated && !user.isInIsolationMode) ||
      user.isolatedReserve?.underlyingAsset === reserve.underlyingAsset ||
      (reserve.isIsolated && user.totalCollateralMarketReferenceCurrency === '0'));

  const disableSwap = !isActive || reserve.symbol == 'stETH';
  const disableWithdraw = !isActive;
  const disableSupply = !isActive || isFrozen;

  return (
    <ListItemWrapper
      symbol={reserve.symbol}
      iconSymbol={reserve.iconSymbol}
      name={reserve.name}
      detailsAddress={underlyingAsset}
      currentMarket={currentMarket}
      frozen={reserve.isFrozen}
      data-cy={`dashboardSuppliedListItem_${reserve.symbol.toUpperCase()}_${
        canBeEnabledAsCollateral && usageAsCollateralEnabledOnUser ? 'Collateral' : 'NoCollateral'
      }`}
      showSupplyCapTooltips
      showDebtCeilingTooltips
    >
      <ListValueColumn
        symbol={reserve.iconSymbol}
        value={Number(underlyingBalance)}
        subValue={Number(underlyingBalanceUSD)}
        disabled={Number(underlyingBalance) === 0}
      />

      <ListAPRColumn
        value={Number(reserve.supplyAPY)}
        incentives={aIncentivesData}
        symbol={reserve.symbol}
      />

      <ListColumn>
        <ListItemUsedAsCollateral
          isIsolated={isIsolated}
          usageAsCollateralEnabledOnUser={usageAsCollateralEnabledOnUser}
          canBeEnabledAsCollateral={canBeEnabledAsCollateral}
          onToggleSwitch={() => {
            openCollateralChange(
              underlyingAsset,
              currentMarket,
              reserve.name,
              'dashboard',
              usageAsCollateralEnabledOnUser
            );
          }}
          data-cy={`collateralStatus`}
        />
      </ListColumn>

      <ListButtonsColumn>
        <ButtonWithdrawCustom
          disabled={disableWithdraw}
          onClick={() => {
            openWithdraw(underlyingAsset, currentMarket, reserve.name, 'dashboard');
          }}
        >
          <Trans>Withdraw</Trans>
        </ButtonWithdrawCustom>

        {isSwapButton ? (
          <Button
            disabled={disableSwap}
            variant="outlined"
            onClick={() => {
              // track

              trackEvent(GENERAL.OPEN_MODAL, {
                modal: 'Swap Collateral',
                market: currentMarket,
                assetName: reserve.name,
                asset: underlyingAsset,
              });
              openSwap(underlyingAsset);
            }}
            data-cy={`swapButton`}
          >
            <Trans>Switch</Trans>
          </Button>
        ) : (
          <Button
            disabled={disableSupply}
            onClick={() => openSupply(underlyingAsset, currentMarket, reserve.name, 'dashboard')}
            sx={(theme) => ({
              backgroundColor: '#DA3E3E',
              color: '#1A1A1C',
              fontSize: '12px',
              width: '65.229px',
              height: '32px',
              '&:hover': { backgroundColor: theme.palette.background.surface, opacity: 0.7 },
            })}
          >
            <Trans>Supply</Trans>
          </Button>
        )}
      </ListButtonsColumn>
    </ListItemWrapper>
  );
};
