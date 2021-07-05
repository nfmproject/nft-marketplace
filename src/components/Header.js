import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import { Link } from 'react-router-dom';
import logo from '../assets/logo_green.png';
import { Address } from '.';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    color: 'white',
    marginRight: theme.spacing(5),
    font: 'bold',
  },
  navButtons: {
    color: theme.palette.secondary.contrastText,
    textTransform: 'none',
    marginRight: theme.spacing(1),
    fontSize: 16,
  },
  left: {
    marginLeft: theme.spacing(2),
  },
  right: {
    marginRight: theme.spacing(2),
  },
  empty: {
    flexGrow: 1,
  },
  emptyEnd: {
    flexGrow: 0.5,
  },
  space: {
    marginRight: theme.spacing(2),
  },
  vertical: {
    borderLeft: '0.5px solid #ffffff',
    height: '35px',
    marginRight: theme.spacing(2),
  },
  chip: {
    borderColor: '#777E90',
    borderWidth: '1.5px',
    fontSize: 15,
    padding: 5,
    height: 40,
    borderRadius: 20,
  },
  logo: {
    marginRight: '1px',
  },
  chipBlue: {
    backgroundColor: 'rgba(55, 114, 255, 0.1)',
    marginRight: theme.spacing(2),
    fontSize: 16,
    padding: 5,
    height: 40,
    borderRadius: 20,
    color: 'rgb(55, 114, 255)',
  },
  appBar: {
    height: '80px',
    borderBottom: '0.4px solid #353945',
  },
}));

export default function Header({
  address,
  web3Modal,
  loadWeb3Modal,
  logoutOfWeb3Modal,
  mainnetProvider,
  blockExplorer,
}) {
  const classes = useStyles();

  const modalButtons = [];

  if (web3Modal) {
    if (web3Modal.cachedProvider) {
      modalButtons.push(
        <Chip
          className={classes.chip}
          label="Logout"
          onClick={logoutOfWeb3Modal}
          variant="outlined"
        />,
      );
    } else {
      modalButtons.push(
        <Chip
          className={classes.chip}
          label="Connect Wallet"
          onClick={loadWeb3Modal}
          variant="outlined"
        />,
      );
    }
  }

  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.appBar}>
          <div className={classes.left} />
          <img
            className={classes.logo}
            src={logo}
            alt="logo"
            height="30"
            width="30"
          />
          <Typography edge="start" variant="h5" className={classes.title}>
            FM
          </Typography>
          <div className={classes.vertical} />
          <Button className={classes.navButtons}>Discover</Button>
          <Button className={classes.navButtons}>How it works?</Button>
          <Button className={classes.navButtons}>Your items</Button>
          <div className={classes.empty} />
          <Address
            address={address}
            ensProvider={mainnetProvider}
            blockExplorer={blockExplorer}
            fontSize={16}
          />
          <div className={classes.space} />
          <Link to="/mint-selection" style={{ textDecoration: 'none' }}>
            <Chip
              className={classes.chipBlue}
              label="Create"
              onClick={handleClick}
            />
          </Link>
          {modalButtons}
          <div className={classes.right} />
        </Toolbar>
      </AppBar>
    </div>
  );
}
