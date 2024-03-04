export type TxState = {
  txError?: string;
  success: boolean;
  gasEstimationError?: string;
};

export type Reward = {
  assets: string[];
  incentiveControllerAddress: string;
  symbol: string;
  balance: string;
  balanceUsd: string;
  tokenPrice: number;
  rewardTokenAddress: string;
  decimals?: number;
};

export type EmodeCategory = {
  id: number;
  ltv: number;
  liquidationThreshold: number;
  liquidationBonus: number;
  priceSource: string;
  label: string;
  assets: string[];
};

export enum CollateralType {
  ENABLED,
  ISOLATED_ENABLED,
  DISABLED,
  ISOLATED_DISABLED,
  UNAVAILABLE,
  UNAVAILABLE_DUE_TO_ISOLATION,
}
