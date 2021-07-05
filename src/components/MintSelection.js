import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import { KeyboardBackspaceRounded, ArrowForwardIosRounded } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import { OutlinedCard } from '.';

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#141416',
    color: 'white',
    flexGrow: 1,
    height: '95vh',
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
  },
  bodys: {
    maxWidth: '300px',
    color: theme.palette.secondary.contrastText,
  },
  contentCard: {
    justifyContent: 'center',
  },
}));

function backHome() {
  console.log('hello');
}

export default function Header() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Toolbar className={classes.head}>
        <div className={classes.start} />
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Chip
            className={classes.chip}
            avatar={<KeyboardBackspaceRounded color="#00000" />}
            label="Back to home"
            onClick={backHome}
            variant="outlined"
          />
        </Link>
        <div className={classes.spacing} />
        <Button className={classes.navButtons}>Home</Button>
        <ArrowForwardIosRounded className={classes.icon} />
        <Button className={classes.endButton}>Create NFT</Button>
      </Toolbar>
      <div className={classes.body}>
        <Typography variant="h3" className={classes.title} gutterBottom>
          Create an nft
        </Typography>
        <Typography variant="body" className={classes.bodys} gutterBottom>
          Choose Single if you want your collectible to be one of a kind or Multiple if you want to create a nft for event.
        </Typography>
        <div className={classes.up} />
        <Grid container spacing={2} style={{ marginBottom: '30px' }} gutterBottom>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={5}>

              <Grid key={0} item>
                <OutlinedCard checkSingle="true" />
              </Grid>
              <Grid key={1} item>
                <OutlinedCard checkSingle="false" />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Typography variant="body" className={classes.bodys} gutterBottom>
          We do not own your private keys and cannot access your funds without your confirmation.
        </Typography>
      </div>
    </div>
  );
}
