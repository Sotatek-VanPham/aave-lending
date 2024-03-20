// import { ChainId } from 'colend-contract-helpers';
import { ReactNode } from 'react';

import { CHAIN_SUPPORT } from './networksConfig';

// Enable for premissioned market
// import { PermissionView } from 'src/components/transactions/FlowCommons/PermissionView';

export type MarketDataType = {
  v3?: boolean;
  marketTitle: string;
  // the network the market operates on
  chainId: any;
  enabledFeatures?: {
    liquiditySwap?: boolean;
    staking?: boolean;
    governance?: boolean;
    faucet?: boolean;
    collateralRepay?: boolean;
    incentives?: boolean;
    permissions?: boolean;
    debtSwitch?: boolean;
  };
  isFork?: boolean;
  permissionComponent?: ReactNode;
  disableCharts?: boolean;
  subgraphUrl?: string;
  addresses: {
    LENDING_POOL_ADDRESS_PROVIDER: string;
    LENDING_POOL: string;
    WETH_GATEWAY?: string;
    SWAP_COLLATERAL_ADAPTER?: string;
    REPAY_WITH_COLLATERAL_ADAPTER?: string;
    DEBT_SWITCH_ADAPTER?: string;
    FAUCET?: string;
    PERMISSION_MANAGER?: string;
    WALLET_BALANCE_PROVIDER: string;
    L2_ENCODER?: string;
    UI_POOL_DATA_PROVIDER: string;
    UI_INCENTIVE_DATA_PROVIDER?: string;
    COLLECTOR?: string;
    V3_MIGRATOR?: string;
    GHO_TOKEN_ADDRESS?: string;
    GHO_UI_DATA_PROVIDER?: string;
  };
  /**
   * https://www.hal.xyz/ has integrated aave for healtfactor warning notification
   * the integration doesn't follow aave market naming & only supports a subset of markets.
   * When a halIntegration is specified a link to hal will be displayed on the ui.
   */
  halIntegration?: {
    URL: string;
    marketName: string;
  };
};

export enum CustomMarket {
  // //testnet
  // proto_base_goerli_v3 = 'proto_base_goerli_v3',
  // //mainnet
  // proto_base_v3 = 'proto_base_v3',
  //testnet
  proto_core_testnet = 'proto_core_testnet',
  //mainnet
  proto_core_mainnet = 'proto_core_mainnet',
}

// const GOERLI_BASE_ADDRESSES = {
//   LENDING_POOL_ADDRESS_PROVIDER: '0x5E52dEc931FFb32f609681B8438A51c675cc232d',
//   LENDING_POOL: '0x4bd5643ac6f66a5237E18bfA7d47cF22f1c9F210',
//   WETH_GATEWAY: '0x3bd3a20Ac9Ff1dda1D99C0dFCE6D65C4960B3627',
//   WALLET_BALANCE_PROVIDER: '0xf1E4A6E7FA07421FD5139Ba0848290A27e22db7f',
//   UI_POOL_DATA_PROVIDER: '0xaaa2872d1F7f5ceb630Cb736BcA34Ff1e121992b',
//   UI_INCENTIVE_DATA_PROVIDER: '0xA2E05bE2090b3658A264bdf1C39387f5Dba367Ec',
//   L2_ENCODER: '0x4aaf5A3D9f69dFbcC7bd91303e624A55e8F59d0B',
//   COLLECTOR: '0x11cbC1a413CFE7d9d25254211f14B978fAb48934',
//   FAUCET: '0x681860075529352da2C94082Eb66c59dF958e89C',
// };

// const BASE_ADDRESSES = {
//   LENDING_POOL_ADDRESS_PROVIDER: '0x0E02EB705be325407707662C6f6d3466E939f3a0',
//   LENDING_POOL: '0x8F44Fd754285aa6A2b8B9B97739B79746e0475a7',
//   WETH_GATEWAY: '0xaeeB3898edE6a6e86864688383E211132BAa1Af3',
//   WALLET_BALANCE_PROVIDER: '0xDb0f02421f830398d7b59dae8d385e2Cd5ed5CF7',
//   UI_POOL_DATA_PROVIDER: '0xB7397f841a449793c634C06Cf12751d256b9bf50',
//   UI_INCENTIVE_DATA_PROVIDER: '0x3F5a90eF7BC3eE64e1E95b850DbBC2469fF71ce8',
//   L2_ENCODER: '0xceceF475167f7BFD8995c0cbB577644b623cD7Cf',
//   COLLECTOR: '0x982F3A0e3183896f9970b8A9Ea6B69Cd53AF1089',
//   FAUCET: '',
// };

const CORE_TESTNET_ADDRESS = {
  LENDING_POOL_ADDRESS_PROVIDER: '0xFf96217886e1dCb95da380EEb6Da5Af4B5537a4b',
  LENDING_POOL: '0x3eF1F1dF33f6D755cbCf411f2062Fe2E136fEDb5',
  WETH_GATEWAY: '0x26ba9df709B2b310Ef4225DC5c6bC3A8bd812e71',
  WALLET_BALANCE_PROVIDER: '0x618d6e950a996fAAc0B6C7a7f029CC03BA41a57f',
  UI_POOL_DATA_PROVIDER: '0xba4d0C0FC417181d4EFeC8905d508947700EAd79',
  UI_INCENTIVE_DATA_PROVIDER: '0x7B59eF30ccC4d6E137dc5E99ca2738D412B94CE2',
  L2_ENCODER: '',
  COLLECTOR: '0x6763b93B3Eff2c66a356422cE14b3D7a965056Ee',
  FAUCET: '',
};

const CORE_MAINNET_ADDRESS = {
  LENDING_POOL_ADDRESS_PROVIDER: '',
  LENDING_POOL: '',
  WETH_GATEWAY: '',
  WALLET_BALANCE_PROVIDER: '',
  UI_POOL_DATA_PROVIDER: '',
  UI_INCENTIVE_DATA_PROVIDER: '',
  L2_ENCODER: '',
  COLLECTOR: '',
  FAUCET: '',
};

export const marketsData: {
  [key in keyof typeof CustomMarket]: MarketDataType;
} = {
  [CustomMarket.proto_core_testnet]: {
    marketTitle: 'Core Testnet',
    v3: true,
    chainId: CHAIN_SUPPORT.core_testnet,
    enabledFeatures: {
      incentives: true,
    },
    // TODO: Need subgraph, currently not supported
    subgraphUrl: process.env.NEXT_PUBLIC_SUBGRAPH_URL,
    addresses: {
      LENDING_POOL_ADDRESS_PROVIDER: CORE_TESTNET_ADDRESS.LENDING_POOL_ADDRESS_PROVIDER,
      LENDING_POOL: CORE_TESTNET_ADDRESS.LENDING_POOL,
      WETH_GATEWAY: CORE_TESTNET_ADDRESS.WETH_GATEWAY,
      WALLET_BALANCE_PROVIDER: CORE_TESTNET_ADDRESS.WALLET_BALANCE_PROVIDER,
      UI_POOL_DATA_PROVIDER: CORE_TESTNET_ADDRESS.UI_POOL_DATA_PROVIDER,
      UI_INCENTIVE_DATA_PROVIDER: CORE_TESTNET_ADDRESS.UI_INCENTIVE_DATA_PROVIDER,
      L2_ENCODER: CORE_TESTNET_ADDRESS.L2_ENCODER,
      COLLECTOR: CORE_TESTNET_ADDRESS.COLLECTOR,
      // SWAP_COLLATERAL_ADAPTER: AaveV3Base.SWAP_COLLATERAL_ADAPTER,
      // REPAY_WITH_COLLATERAL_ADAPTER: AaveV3Base.REPAY_WITH_COLLATERAL_ADAPTER,
      // DEBT_SWITCH_ADAPTER: AaveV3Base.DEBT_SWAP_ADAPTER,
    },
  },
  [CustomMarket.proto_core_mainnet]: {
    marketTitle: 'Core',
    v3: true,
    chainId: CHAIN_SUPPORT.core_mainnet,
    enabledFeatures: {
      incentives: true,
    },
    // TODO: Need subgraph, currently not supported
    subgraphUrl: '',
    addresses: {
      LENDING_POOL_ADDRESS_PROVIDER: CORE_MAINNET_ADDRESS.LENDING_POOL_ADDRESS_PROVIDER,
      LENDING_POOL: CORE_MAINNET_ADDRESS.LENDING_POOL,
      WETH_GATEWAY: CORE_MAINNET_ADDRESS.WETH_GATEWAY,
      WALLET_BALANCE_PROVIDER: CORE_MAINNET_ADDRESS.WALLET_BALANCE_PROVIDER,
      UI_POOL_DATA_PROVIDER: CORE_MAINNET_ADDRESS.UI_POOL_DATA_PROVIDER,
      UI_INCENTIVE_DATA_PROVIDER: CORE_MAINNET_ADDRESS.UI_INCENTIVE_DATA_PROVIDER,
      L2_ENCODER: CORE_MAINNET_ADDRESS.L2_ENCODER,
      COLLECTOR: CORE_MAINNET_ADDRESS.COLLECTOR,
      // SWAP_COLLATERAL_ADAPTER: AaveV3Base.SWAP_COLLATERAL_ADAPTER,
      // REPAY_WITH_COLLATERAL_ADAPTER: AaveV3Base.REPAY_WITH_COLLATERAL_ADAPTER,
      // DEBT_SWITCH_ADAPTER: AaveV3Base.DEBT_SWAP_ADAPTER,
    },
  },
  // [CustomMarket.proto_base_v3]: {
  //   marketTitle: 'Base',
  //   v3: true,
  //   chainId: ChainId.base,
  //   enabledFeatures: {
  //     incentives: true,
  //   },
  //   // TODO: Need subgraph, currently not supported
  //   subgraphUrl: '',
  //   addresses: {
  //     LENDING_POOL_ADDRESS_PROVIDER: BASE_ADDRESSES.LENDING_POOL_ADDRESS_PROVIDER,
  //     LENDING_POOL: BASE_ADDRESSES.LENDING_POOL,
  //     WETH_GATEWAY: BASE_ADDRESSES.WETH_GATEWAY,
  //     WALLET_BALANCE_PROVIDER: BASE_ADDRESSES.WALLET_BALANCE_PROVIDER,
  //     UI_POOL_DATA_PROVIDER: BASE_ADDRESSES.UI_POOL_DATA_PROVIDER,
  //     UI_INCENTIVE_DATA_PROVIDER: BASE_ADDRESSES.UI_INCENTIVE_DATA_PROVIDER,
  //     L2_ENCODER: BASE_ADDRESSES.L2_ENCODER,
  //     COLLECTOR: BASE_ADDRESSES.COLLECTOR,
  //     // SWAP_COLLATERAL_ADAPTER: AaveV3Base.SWAP_COLLATERAL_ADAPTER,
  //     // REPAY_WITH_COLLATERAL_ADAPTER: AaveV3Base.REPAY_WITH_COLLATERAL_ADAPTER,
  //     // DEBT_SWITCH_ADAPTER: AaveV3Base.DEBT_SWAP_ADAPTER,
  //   },
  // },
  // [CustomMarket.proto_base_goerli_v3]: {
  //   marketTitle: 'Base Görli',
  //   v3: true,
  //   chainId: 84531 as ChainId, //ChainId.base_goerli,
  //   enabledFeatures: {
  //     faucet: true,
  //     incentives: true,
  //   },
  //   addresses: {
  //     LENDING_POOL_ADDRESS_PROVIDER: GOERLI_BASE_ADDRESSES.LENDING_POOL_ADDRESS_PROVIDER,
  //     LENDING_POOL: GOERLI_BASE_ADDRESSES.LENDING_POOL,
  //     WETH_GATEWAY: GOERLI_BASE_ADDRESSES.WETH_GATEWAY,
  //     WALLET_BALANCE_PROVIDER: GOERLI_BASE_ADDRESSES.WALLET_BALANCE_PROVIDER,
  //     //WALLET_BALANCE_PROVIDER:
  //     UI_POOL_DATA_PROVIDER: GOERLI_BASE_ADDRESSES.UI_POOL_DATA_PROVIDER,
  //     UI_INCENTIVE_DATA_PROVIDER: GOERLI_BASE_ADDRESSES.UI_INCENTIVE_DATA_PROVIDER,
  //     L2_ENCODER: GOERLI_BASE_ADDRESSES.L2_ENCODER,
  //     COLLECTOR: GOERLI_BASE_ADDRESSES.COLLECTOR,
  //     FAUCET: GOERLI_BASE_ADDRESSES.FAUCET,
  //   },
  // },
} as const;
