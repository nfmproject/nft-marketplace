import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import logo from '../assets/logo_green.png';

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
  },
  empty: {
    flexGrow: 1,
  },
  emptyEnd: {
    flexGrow: 0.5,
  },
  vertical: {
    borderLeft: '1px solid #777E90',
    height: '30px',
    marginRight: theme.spacing(2),
  },
  chip: {
    borderColor: theme.palette.secondary.contrastText,
    borderWidth: '1.5px',
  },
  logo: {
    marginRight: '1px',
  },
  chipBlue: {
    backgroundColor: '#3772FF',
    marginRight: theme.spacing(2),
  },
}));

export default function Header({
  web3Modal,
  loadWeb3Modal,
  logoutOfWeb3Modal,
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
        <Toolbar>
          <div className={classes.emptyEnd} />
          <img
            className={classes.logo}
            src={logo}
            alt="logo"
            height="25"
            width="25"
          />
          <Typography edge="start" variant="h5" className={classes.title}>
            FM
          </Typography>
          <Button className={classes.navButtons}>Discover</Button>
          <Button className={classes.navButtons}>How it works?</Button>
          <div className={classes.empty} />
          <Chip
            className={classes.chipBlue}
            label="Create"
            onClick={handleClick}
          />
          {modalButtons}
          <div className={classes.emptyEnd} />
        </Toolbar>
      </AppBar>
    </div>
  );
}
