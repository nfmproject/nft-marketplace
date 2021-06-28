import React, { useCallback, useEffect, useState } from 'react';
import { StaticJsonRpcProvider, Web3Provider } from '@ethersproject/providers';
import './App.css';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { useUserAddress } from 'eth-hooks';

import { Header } from './components';
import { INFURA_ID, NETWORKS } from './constants';
import { useUserProvider } from './hooks';

/*
  Web3 modal helps us "connect" external wallets:
*/
const web3Modal = new Web3Modal({
  // network: "mainnet", // optional
  cacheProvider: true, // optional
  providerOptions: {
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: INFURA_ID,
      },
    },
  },
});

const logoutOfWeb3Modal = async () => {
  await web3Modal.clearCachedProvider();
  setTimeout(() => {
    window.location.reload();
  }, 1);
};

/// 📡 What chain are your contracts deployed to?
const targetNetwork = NETWORKS.ropsten; // <-- (localhost, rinkeby, xdai, mainnet)

// 😬 Sorry for all the console logging
const DEBUG = true;

// 🛰 providers
if (DEBUG) console.log('📡 Connecting to Mainnet Ethereum');
// const mainnetProvider = getDefaultProvider("mainnet",
// { infura: INFURA_ID, etherscan: ETHERSCAN_KEY, quorum: 1 });
// const mainnetProvider = new InfuraProvider("mainnet",INFURA_ID);
//
// attempt to connect to our own scaffold eth rpc and if that fails fall back to infura...
// Using StaticJsonRpcProvider as the chainId won't change see https://github.com/ethers-io/ethers.js/issues/901
// const scaffoldEthProvider = new StaticJsonRpcProvider("https://rpc.scaffoldeth.io:48544");
// const mainnetInfura = new StaticJsonRpcProvider("https://mainnet.infura.io/v3/" + INFURA_ID);
// ( ⚠️ Getting "failed to meet quorum" errors? Check your INFURA_I

// 🏠 Your local provider is usually pointed at your local blockchain
const localProviderUrl = targetNetwork.rpcUrl;
// as you deploy to other networks you can set REACT_APP_PROVIDER=https://dai.poa.network in packages/react-app/.env
const localProviderUrlFromEnv = process.env.REACT_APP_PROVIDER
  ? process.env.REACT_APP_PROVIDER
  : localProviderUrl;

if (DEBUG) console.log('🏠 Connecting to provider:', localProviderUrlFromEnv);
const localProvider = new StaticJsonRpcProvider(localProviderUrlFromEnv);

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const [injectedProvider, setInjectedProvider] = useState();

  // Use your injected provider from 🦊 Metamask or
  // if you don't have it then instantly generate a 🔥 burner wallet.
  const userProvider = useUserProvider(injectedProvider, localProvider);
  const address = useUserAddress(userProvider);

  const loadWeb3Modal = useCallback(async () => {
    const provider = await web3Modal.connect();
    setInjectedProvider(new Web3Provider(provider));
  }, [setInjectedProvider]);

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      loadWeb3Modal();
    }
  }, [loadWeb3Modal]);

  const theme = React.useMemo(
    () => createMuiTheme({
      palette: {
        primary: {
          // light: will be calculated from palette.primary.main,
          main: '#141416',
          dark: '#141416',
          contrastText: '#FCFCFD',
        },
        secondary: {
          // light: '#0066ff',
          main: '#23262e',
          dark: '#23262e',
          contrastText: '#777E90',
        },
        // Used by `getContrastText()` to maximize the contrast between
        // the background and the text.
        contrastThreshold: 0,
        // Used by the functions below to shift a color's luminance by approximately
        // two indexes within its tonal palette.
        // E.g., shift from Red 500 to Red 300 or Red 700.
        tonalOffset: 0,
      },
    }),
    [prefersDarkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Header
          address={address}
          web3Modal={web3Modal}
          loadWeb3Modal={loadWeb3Modal}
          logoutOfWeb3Modal={logoutOfWeb3Modal}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
