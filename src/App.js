import React, { useCallback, useEffect, useState } from 'react';
import { StaticJsonRpcProvider, Web3Provider } from '@ethersproject/providers';
import './App.css';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { useUserAddress } from 'eth-hooks';
import { Alert } from 'antd';
import {
  BrowserRouter, Route, Switch, Link,
} from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Chip from '@material-ui/core/Chip';
import { KeyboardBackspaceRounded, ArrowForwardIosRounded } from '@material-ui/icons';
import Button from '@material-ui/core/Button';

import { Header, MintSelection, Discover } from './components';
import { INFURA_ID, NETWORKS, NETWORK } from './constants';
import { useUserProvider, useContractLoader } from './hooks';

// https://www.npmjs.com/package/ipfs-http-client
const { create } = require('ipfs-http-client');

const ipfs = create({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' });

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

// EXAMPLE STARTING JSON:
const STARTING_JSON = {
  description: "It's actually a bison?",
  external_url: 'https://austingriffith.com/portfolio/paintings/', // <-- this can link to a page for the specific file too
  image: 'https://austingriffith.com/images/paintings/buffalo.jpg',
  name: 'Buffalo',
  attributes: [
    {
      trait_type: 'BackgroundColor',
      value: 'green',
    },
    {
      trait_type: 'Eyes',
      value: 'googly',
    },
  ],
};

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
const scaffoldEthProvider = new StaticJsonRpcProvider('https://rpc.scaffoldeth.io:48544');
const mainnetInfura = new StaticJsonRpcProvider('https://mainnet.infura.io/v3/' + INFURA_ID);
// ( ⚠️ Getting "failed to meet quorum" errors? Check your INFURA_I

// 🏠 Your local provider is usually pointed at your local blockchain
const localProviderUrl = targetNetwork.rpcUrl;
// as you deploy to other networks you can set REACT_APP_PROVIDER=https://dai.poa.network in packages/react-app/.env
const localProviderUrlFromEnv = process.env.REACT_APP_PROVIDER
  ? process.env.REACT_APP_PROVIDER
  : localProviderUrl;

if (DEBUG) console.log('🏠 Connecting to provider:', localProviderUrlFromEnv);

function App() {
  const mainnetProvider = scaffoldEthProvider && scaffoldEthProvider._network ? scaffoldEthProvider : mainnetInfura;
  const localProvider = new StaticJsonRpcProvider(localProviderUrlFromEnv);

  const [injectedProvider, setInjectedProvider] = useState();
  // Use your injected provider from 🦊 Metamask or
  // if you don't have it then instantly generate a 🔥 burner wallet.
  const userProvider = useUserProvider(injectedProvider, localProvider);
  const address = useUserAddress(userProvider);

  // You can warn the user if you would like them to be on a specific network
  const localChainId = localProvider && localProvider._network && localProvider._network.chainId;
  const selectedChainId = userProvider && userProvider._network && userProvider._network.chainId;

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  // If you want to make 🔐 write transactions to your contracts, use the userProvider:
  const writeContracts = useContractLoader(userProvider);

  /*
  const addressFromENS = useResolveName(mainnetProvider, "austingriffith.eth");
  console.log("🏷 Resolved austingriffith.eth as:",addressFromENS)
  */

  //
  // 🧫 DEBUG 👨🏻‍🔬
  //
  useEffect(() => {
    if (
      DEBUG &&
      mainnetProvider &&
      address &&
      selectedChainId
    ) {
      console.log('_____________________________________ 🏗 NFM-Project _____________________________________');
      console.log('🌎 mainnetProvider', mainnetProvider);
      console.log('🏠 localChainId', localChainId);
      console.log('👩‍💼 selected address:', address);
      console.log('🕵🏻‍♂️ selectedChainId:', selectedChainId);
    }
  }, [
    mainnetProvider,
    address,
    selectedChainId,
  ]);

  let networkDisplay = '';
  console.log(localChainId, selectedChainId, localChainId, selectedChainId);
  if (localChainId && selectedChainId && localChainId !== selectedChainId) {
    const networkSelected = NETWORK(selectedChainId);
    const networkLocal = NETWORK(localChainId);
    if (selectedChainId === 1337 && localChainId === 31337) {
      console.log('I am in wrong network id');
      networkDisplay = (
        <div style={{
          zIndex: 2, position: 'absolute', right: 0, top: 60, padding: 16,
        }}
        >
          <Alert
            message="⚠️ Wrong Network ID"
            description={(
              <div>
                You have
                {' '}
                <b>chain id 1337</b>
                {' '}
                for localhost and you need to change it to
                {' '}
                <b>31337</b>
                {' '}
                to work with
                HardHat.
                <div>(MetaMask -&gt; Settings -&gt; Networks -&gt; Chain ID -&gt; 31337)</div>
              </div>
            )}
            type="error"
            closable={false}
          />
        </div>
      );
    } else {
      console.log('I am in wrong network 1');

      networkDisplay = (
        <div style={{
          zIndex: 2, position: 'absolute', right: 0, top: 60, padding: 16,
        }}
        >
          <Alert
            message="⚠️ Wrong Network"
            description={(
              <div>
                You have
                {' '}
                <b>{networkSelected && networkSelected.name}</b>
                {' '}
                selected and you need to be on
                {' '}
                <b>{networkLocal && networkLocal.name}</b>
                .
              </div>
            )}
            type="error"
            closable={false}
          />
        </div>
      );
    }
  } else {
    console.log('I am in wrong network 2');
    networkDisplay = (
      <div style={{
        zIndex: -1, position: 'absolute', right: 430, top: 28, padding: 16, color: targetNetwork.color,
      }}
      >
        {targetNetwork.name}
      </div>
    );
  }

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

  const useStyles = makeStyles(() => ({
    root: {
      background: '#141416',
      color: 'white',
      flexGrow: 1,
      height: '120vh',
    },
    head: {
      height: '90px',
      borderBottom: '0.4px solid #353945',
    },
    middle: {
      verticalAlign: 'middle',
    },
    spacing: {
      flexGrow: 1,
    },
    chip: {
      borderColor: '#353945',
      borderWidth: '2px',
      fontSize: 14,
      padding: 5,
      height: 40,
      borderRadius: 20,
      fontWeight: 'bold',
      wordSpacing: 1.1,
      letterSpacing: 1.1,
    },
    navButtons: {
      color: theme.palette.secondary.contrastText,
      textTransform: 'none',
      marginRight: theme.spacing(1),
      fontSize: 14,
    },
    dataWidth: {
      width: '50vw',
      marginLeft: '25vw',
    },
    body: {
      justifyContent: 'center',
    },
    start: {
      marginLeft: theme.spacing(2),
    },
    up: {
      marginTop: theme.spacing(5),
    },
    endButton: {
      color: 'white',
      textTransform: 'none',
      marginRight: theme.spacing(2),
      fontSize: 14,
    },
    icon: {
      width: '10px',
      height: '10px',
      color: theme.palette.secondary.contrastText,
      marginRight: theme.spacing(2),
    },
    title: {
      fontWeight: 'medium',
      wordSpacing: 1.1,
      letterSpacing: 1.1,
      paddingTop: '50px',
      marginBottom: '40px',
    },
    bodys: {
      maxWidth: '300px',
      color: theme.palette.secondary.contrastText,
    },
    contentCard: {
      justifyContent: 'center',
    },
    subhead: {
      fontSize: '14',
      textAlign: 'left',
    },
    subtitle: {
      color: theme.palette.secondary.contrastText,
      textAlign: 'left',
    },
    upload: {
      '& > *': {
        margin: theme.spacing(1),
      },
      height: '250px',
      background: theme.palette.secondary.dark,
      borderRadius: 20,
      marginTop: '20px',
      color: theme.palette.secondary.contrastText,
      marginBottom: theme.spacing(5),
    },
    temp: {
      marginTop: '85px',
    },
    inputColor: {
      color: theme.palette.secondary.contrastText,
    },
    none: {
      display: 'none',
    },
    chipBlue: {
      backgroundColor: 'rgba(55, 114, 255, 0.1)',
      fontSize: 16,
      padding: 5,
      height: 50,
      borderRadius: 25,
      color: 'rgb(55, 114, 255)',
      marginTop: theme.spacing(5),
    },
    form: {
      '& .MuiTextField-root': {
        '& fieldset': {
          borderColor: '#353945',
          color: theme.palette.secondary.contrastText,
        },
      },
      '& MuiInputBase-root': {
        color: 'white',
      },
      '& MuiInputBase-input': {
        color: 'white',
      },
      '& label.Mui-focused': {
        color: theme.palette.secondary.contrastText,
      },
      '& label.Mui-normal': {
        color: theme.palette.secondary.contrastText,
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: theme.palette.secondary.contrastText,
        color: theme.palette.secondary.contrastText,
      },
      '& .MuiOutlinedInput-input': {
        borderColor: '#353945',
        color: 'white',
      },
      '& .MuiOutlinedInput-label': {
        borderColor: '#353945',
        color: 'white',
      },
      '& .MuiOutlinedInput-root': {
        color: theme.palette.secondary.contrastText,
        '& fieldset': {
          borderColor: '#353945',
          color: theme.palette.secondary.contrastText,
        },
        '&:hover fieldset': {
          borderColor: theme.palette.secondary.contrastText,
          color: theme.palette.secondary.contrastText,
        },
        '&.Mui-focused fieldset': {
          borderColor: theme.palette.secondary.contrastText,
          color: theme.palette.secondary.contrastText,
        },
      },
    },
  }));

  const classes = useStyles();

  const [yourJSON, setYourJSON] = useState(STARTING_JSON);
  const [sending, setSending] = useState();
  const [ipfsHash, setIpfsHash] = useState('');

  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [imageURL, setImageURL] = useState();

  if (sending) {
    console.log('sending true');
  }

  function onFormChange() {
    const da = {
      description,
      external_url: 'https://austingriffith.com/portfolio/paintings/', // <-- this can link to a page for the specific file too
      image: imageURL,
      name: title,
      attributes: [
        {
          trait_type: 'BackgroundColor',
          value: 'green',
        },
        {
          trait_type: 'Eyes',
          value: 'googly',
        },
      ],
    };
    console.log('your json', yourJSON);
    setYourJSON(da);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <BrowserRouter>
          <Header
            address={address}
            web3Modal={web3Modal}
            loadWeb3Modal={loadWeb3Modal}
            logoutOfWeb3Modal={logoutOfWeb3Modal}
            mainnetProvider={mainnetProvider}
          />
          {networkDisplay}
          <Switch>
            <Route exact path="/">
              <Discover />
            </Route>
            <Route path="/mint-selection">
              <MintSelection />
            </Route>
            <Route path="/mint-nft">
              <div className={classes.root}>
                <Toolbar className={classes.head}>
                  <div className={classes.start} />
                  <Link to="/" style={{ textDecoration: 'none' }}>
                    <Chip
                      className={classes.chip}
                      avatar={<KeyboardBackspaceRounded color="#00000" />}
                      label="Back to home"
                      variant="outlined"
                    />
                  </Link>
                  <div className={classes.spacing} />
                  <Button className={classes.navButtons}>Home</Button>
                  <ArrowForwardIosRounded className={classes.icon} />
                  <Button className={classes.endButton}>Create NFT</Button>
                </Toolbar>
                <div className={classes.dataWidth}>
                  <Typography variant="h3" className={classes.title} gutterBottom>
                    Create single collectible
                  </Typography>
                  <Typography variant="subtitle1" className={classes.subhead} gutterBottom>
                    Image file URL
                  </Typography>
                  {/* <Typography variant="subtitle2" className={classes.subtitle} gutterBottom>
          Drag or choose your file to upload
        </Typography> */}
                  {/* <div className={classes.upload}>
          <input
            accept="image/*"
            type="file"
            className={classes.temp}
          />
        </div> */}

                  <form className={classes.form} noValidate autoComplete="off">
                    <TextField
                      id="outlined-basic"
                      color="white"
                      placeholder="https://austingriffith.com/images/paintings/buffalo.jpg"
                      size="medium"
                      label="Image URL"
                      variant="outlined"
                      margin="normal"
                      InputLabelProps={{ className: classes.inputColor }}
                      value={imageURL}
                      onChange={
                        (e) => {
                          setImageURL(e.target.value);
                          onFormChange();
                        }
                      }
                      fullWidth
                    />

                    <Typography variant="subtitle1" className={classes.subhead} gutterBottom>
                      Item details
                    </Typography>
                    <TextField
                      id="outlined-basic"
                      color="white"
                      placeholder="Redeemable card with logo"
                      size="medium"
                      label="Item Name"
                      variant="outlined"
                      margin="normal"
                      InputLabelProps={{ className: classes.inputColor }}
                      value={title}
                      onChange={
                        (e) => {
                          setTitle(e.target.value);
                          onFormChange();
                        }
                      }
                      fullWidth
                    />
                    <TextField
                      id="outlined-basic"
                      color="white"
                      placeholder="After purchase you will able to recieve the logo..."
                      size="medium"
                      label="Description"
                      variant="outlined"
                      margin="normal"
                      value={description}
                      multiline
                      onChange={
                        (e) => {
                          setDescription(e.target.value);
                          onFormChange();
                        }
                      }
                      InputLabelProps={{ className: classes.inputColor }}
                      fullWidth
                    />

                    <Typography variant="subtitle1" style={{ marginTop: '10px' }} className={classes.subhead} gutterBottom>
                      Instant sale price
                    </Typography>

                    <TextField
                      id="outlined-basic"
                      color="white"
                      placeholder="0.002"
                      size="medium"
                      label="Price in ETH"
                      variant="outlined"
                      margin="normal"
                      multiline
                      InputLabelProps={{ className: classes.inputColor }}
                      fullWidth
                    />
                    <Chip
                      className={classes.chipBlue}
                      label="Mint NFT"
                      onClick={async () => {
                        console.log('UPLOADING...', yourJSON);
                        setSending(true);
                        setIpfsHash();
                        const result = await ipfs.add(JSON.stringify(yourJSON)); // addToIPFS(JSON.stringify(yourJSON))
                        if (result && result.path) {
                          setIpfsHash(result.path);
                        }

                        console.log('sending');
                        await writeContracts.YourCollectible.mintItem(address, result.path);
                        setSending(false);
                        console.log('RESULT:', result);
                        console.log('HASH: ', ipfsHash);
                      }}
                    />
                  </form>
                </div>
              </div>
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

/* eslint-disable */
window.ethereum &&
  window.ethereum.on("chainChanged", chainId => {
    web3Modal.cachedProvider &&
      setTimeout(() => {
        window.location.reload();
      }, 1);
  });

window.ethereum &&
  window.ethereum.on("accountsChanged", accounts => {
    web3Modal.cachedProvider &&
      setTimeout(() => {
        window.location.reload();
      }, 1);
  });
/* eslint-enable */

export default App;
