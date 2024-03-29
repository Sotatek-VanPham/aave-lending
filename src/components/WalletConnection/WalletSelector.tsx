import { Trans } from '@lingui/macro';
import { Box, Button, InputBase, Link, Typography, useMediaQuery, useTheme } from '@mui/material';
import { UnsupportedChainIdError } from '@web3-react/core';
import { NoEthereumProviderError } from '@web3-react/injected-connector';
import { utils } from 'ethers';
import { useEffect, useState } from 'react';
import { useWeb3Context } from 'src/libs/hooks/useWeb3Context';
import { UserRejectedRequestError } from 'src/libs/web3-data-provider/WalletConnectConnector';
import { WalletType } from 'src/libs/web3-data-provider/WalletOptions';
import { useRootStore } from 'src/store/root';
import { getENSProvider } from 'src/utils/marketsAndNetworksConfig';
import { AUTH } from 'src/utils/mixPanelEvents';

import { ReadOnlyModeTooltip } from '../infoTooltips/ReadOnlyModeTooltip';
import { Warning } from '../primitives/Warning';
import { TxModalTitle } from '../transactions/FlowCommons/TxModalTitle';

export type WalletRowProps = {
  walletName: string;
  walletType: WalletType;
};
const WalletRow = ({ walletName, walletType }: WalletRowProps) => {
  const { connectWallet, loading } = useWeb3Context();
  const trackEvent = useRootStore((store) => store.trackEvent);

  const getWalletIcon = (walletType: WalletType) => {
    switch (walletType) {
      case WalletType.INJECTED:
        return (
          <img
            src={`/icons/wallets/browserWallet.svg`}
            width="24px"
            height="24px"
            alt={`browser wallet icon`}
          />
        );
      case WalletType.WALLET_CONNECT:
        return (
          <img
            src={`/icons/wallets/walletConnect.svg`}
            width="24px"
            height="24px"
            alt={`browser wallet icon`}
          />
        );
      case WalletType.WALLET_LINK:
        return (
          <img
            src={`/icons/wallets/coinbase.svg`}
            width="24px"
            height="24px"
            alt={`browser wallet icon`}
          />
        );
      case WalletType.TORUS:
        return (
          <img
            src={`/icons/wallets/torus.svg`}
            width="24px"
            height="24px"
            alt={`browser wallet icon`}
          />
        );
      case WalletType.FRAME:
        return (
          <img
            src={`/icons/wallets/frame.svg`}
            width="24px"
            height="24px"
            alt={`browser wallet icon`}
          />
        );
      default:
        return null;
    }
  };

  const connectWalletClick = () => {
    trackEvent(AUTH.CONNECT_WALLET, { walletType: walletType, walletName: walletName });
    connectWallet(walletType);
  };
  return (
    <Button
      disabled={loading}
      sx={(theme) => ({
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        mb: '8px',
        bgcolor: theme.palette.background.surface,
        color: '#1A1A1C',
        fontSize: '15px',
        '&:hover': {
          bgcolor: theme.palette.background.surface,
          color: '#1A1A1C',
          opacity: 0.7,
        },
      })}
      size="large"
      onClick={connectWalletClick}
      endIcon={getWalletIcon(walletType)}
    >
      {walletName}
    </Button>
  );
};

export enum ErrorType {
  UNSUPORTED_CHAIN,
  USER_REJECTED_REQUEST,
  UNDETERMINED_ERROR,
  NO_WALLET_DETECTED,
}

export const WalletSelector = () => {
  const { error, connectReadOnlyMode } = useWeb3Context();
  const [inputMockWalletAddress, setInputMockWalletAddress] = useState('');
  const [validAddressError, setValidAddressError] = useState<boolean>(false);
  const { breakpoints } = useTheme();
  const sm = useMediaQuery(breakpoints.down('sm'));
  const mainnetProvider = getENSProvider();
  const [unsTlds, setUnsTlds] = useState<string[]>([]);

  // Get UNS Tlds. Grabbing this fron an endpoint since Unstoppable adds new TLDs frequently, so this wills tay updated
  useEffect(() => {
    const unsTlds = async () => {
      const url = 'https://resolve.unstoppabledomains.com/supported_tlds';
      const response = await fetch(url);
      const data = await response.json();
      setUnsTlds(data['tlds']);
    };

    try {
      unsTlds();
    } catch (e) {
      console.log('Error fetching UNS TLDs: ', e);
    }
  }, []);

  let blockingError: ErrorType | undefined = undefined;
  if (error) {
    if (error instanceof UnsupportedChainIdError) {
      blockingError = ErrorType.UNSUPORTED_CHAIN;
    } else if (error instanceof UserRejectedRequestError) {
      blockingError = ErrorType.USER_REJECTED_REQUEST;
    } else if (error instanceof NoEthereumProviderError) {
      blockingError = ErrorType.NO_WALLET_DETECTED;
    } else {
      blockingError = ErrorType.UNDETERMINED_ERROR;
    }
    // TODO: add other errors
  }

  const handleBlocking = () => {
    switch (blockingError) {
      case ErrorType.UNSUPORTED_CHAIN:
        return <Trans>Network not supported for this wallet</Trans>;
      case ErrorType.USER_REJECTED_REQUEST:
        return <Trans>Rejected connection request</Trans>;
      case ErrorType.NO_WALLET_DETECTED:
        return <Trans>Wallet not detected. Connect or install wallet and retry</Trans>;
      default:
        console.log('Uncatched error: ', error);
        return <Trans>Error connecting. Try refreshing the page.</Trans>;
    }
  };

  const handleReadAddress = async (inputMockWalletAddress: string): Promise<void> => {
    if (validAddressError) setValidAddressError(false);
    if (utils.isAddress(inputMockWalletAddress)) {
      connectReadOnlyMode(inputMockWalletAddress);
    } else {
      // Check if address could be valid ENS before trying to resolve
      if (inputMockWalletAddress.slice(-4) === '.eth') {
        // Attempt to resolve ENS name and use resolved address if valid
        const resolvedAddress = await mainnetProvider.resolveName(inputMockWalletAddress);
        if (resolvedAddress && utils.isAddress(resolvedAddress)) {
          connectReadOnlyMode(resolvedAddress);
        } else {
          setValidAddressError(true);
        }
      } else if (unsTlds.includes(inputMockWalletAddress.split('.').pop() as string)) {
        // Handle UNS names
        const url = 'https://resolve.unstoppabledomains.com/domains/' + inputMockWalletAddress;
        const options = {
          method: 'GET',
          headers: { Authorization: 'Bearer 01f60ca8-2dc3-457d-b12e-95ac2a7fb517' },
        };
        const response = await fetch(url, options);
        const data = await response.json();
        const resolvedAddress = data['meta']['owner'];
        if (resolvedAddress && utils.isAddress(resolvedAddress)) {
          connectReadOnlyMode(resolvedAddress);
        } else {
          setValidAddressError(true);
        }
      } else {
        setValidAddressError(true);
      }
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    handleReadAddress(inputMockWalletAddress);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <TxModalTitle title="Connect a wallet" />
      {error && <Warning severity="error">{handleBlocking()}</Warning>}
      <WalletRow
        key="browser_wallet"
        walletName="Browser wallet"
        walletType={WalletType.INJECTED}
      />
      <WalletRow
        key="walletconnect_wallet"
        walletName="WalletConnect"
        walletType={WalletType.WALLET_CONNECT}
      />
      {/* <WalletRow
        key="walletlink_wallet"
        walletName="Coinbase Wallet"
        walletType={WalletType.WALLET_LINK}
      /> */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, padding: '10px 0' }}>
        <Typography variant="subheader1" color="#fff" sx={{ fontWeight: '500' }}>
          <Trans>Track wallet balance in read-only mode</Trans>
        </Typography>
        <ReadOnlyModeTooltip />
      </Box>
      <form onSubmit={handleSubmit}>
        <InputBase
          sx={(theme) => ({
            py: 1,
            px: 3,
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: '6px',
            mb: 1,
            overflow: 'show',
            fontSize: sm ? '16px' : '14px',
            color: '#fff',
          })}
          placeholder="Enter ethereum address or username"
          fullWidth
          value={inputMockWalletAddress}
          onChange={(e) => setInputMockWalletAddress(e.target.value)}
          inputProps={{
            'aria-label': 'read-only mode address',
          }}
        />
        <Button
          type="submit"
          variant="outlined"
          sx={(theme) => ({
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            mb: '8px',
            mt: '12px',
            color: '#1A1A1C',
            backgroundColor: theme.palette.background.surface,
            border: 'none',
            '&:hover': {
              color: '#1A1A1C',
              backgroundColor: theme.palette.background.surface,
            },
            '&:disabled': {
              border: 'none',
              color: '#1A1A1C',
              opacity: 0.7,
            },
          })}
          size="large"
          fullWidth
          disabled={
            !utils.isAddress(inputMockWalletAddress) &&
            inputMockWalletAddress.slice(-4) !== '.eth' &&
            !unsTlds.includes(inputMockWalletAddress.split('.').pop() as string)
          }
          aria-label="read-only mode address"
        >
          <Trans>Track wallet</Trans>
        </Button>
      </form>
      {validAddressError && (
        <Typography variant="helperText" color="#FF4228" sx={{ fontSize: '12px' }}>
          <Trans>Please enter a valid wallet address.</Trans>
        </Typography>
      )}
      <Typography
        variant="description"
        sx={{ mt: '22px', mb: '30px', alignSelf: 'center' }}
        color="#fff"
      >
        <Trans>
          Need help connecting a wallet?{' '}
          <Link
            href="https://docs.colend.xyz/overview/faq"
            target="_blank"
            rel="noopener"
            sx={{
              color: '#fff',
              textDecoration: 'underline',
              opacity: '0.6',
            }}
          >
            Read our FAQ
          </Link>
        </Trans>
      </Typography>
      <Typography variant="helperText" color="#fff">
        <Trans>
          Wallets are provided by External Providers and by selecting you agree to Terms of those
          Providers. Your access to the wallet might be reliant on the External Provider being
          operational.
        </Trans>
      </Typography>
    </Box>
  );
};
