import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { ChipArray, CardList } from '.';

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#141416',
    color: 'white',
    flexGrow: 1,
    height: '120vh',
  },
  data: {
    width: '70vw',
    marginLeft: '15vw',
  },
  title: {
    fontWeight: 'Bold',
    wordSpacing: 1.1,
    letterSpacing: 1.1,
    paddingTop: theme.spacing(5),
    alignText: 'left',
  },
}));

export default function Discover(collectables) {
  const classes = useStyles();
  console.log(collectables);

  return (
    <div className={classes.root}>
      <div className={classes.data}>
        <Typography align="left" variant="h4" className={classes.title} gutterBottom>
          Discover
        </Typography>
        <ChipArray />
        <Grid container spacing={2} style={{ marginBottom: '30px' }} gutterBottom>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={5}>

              <Grid key={0} item>
                <CardList title="The amazing tringle" description="This nft has trangles for showcased product" imageurl="https://res.cloudinary.com/rarible-inc/image/upload/t_big/dev-itemImages/0xb37c0e089b010848d0507ec6a2b7d26cd8803fa1:34" price="2.1 ETH" linkUrl="https://ropsten.rarible.com/token/0xb37c0e089b010848d0507ec6a2b7d26cd8803fa1:34?tab=details" />
              </Grid>
              <Grid key={1} item>
                <CardList title="Multi tringle" description="Something with" imageurl="https://res.cloudinary.com/rarible-inc/image/upload/t_big/dev-itemImages/0x25ec3bbc85af8b7498c8f5b1cd1c39675431a13c:11539" price="4 ETH" linkUrl="https://ropsten.rarible.com/token/0x25ec3bbc85af8b7498c8f5b1cd1c39675431a13c:11539?tab=details" />
              </Grid>
              <Grid key={2} item>
                <CardList title="The amazing art" description="This NFT Card will give you Access to Special Airdrops." imageurl="https://res.cloudinary.com/rarible-inc/image/upload/t_big/dev-itemImages/0xb37c0e089b010848d0507ec6a2b7d26cd8803fa1:32" price="3 ETH" linkUrl="https://ropsten.rarible.com/token/0xb37c0e089b010848d0507ec6a2b7d26cd8803fa1:32?tab=details" />
              </Grid>
              <Grid key={3} item>
                <CardList title="Buffalo" description="It's actually a bison? " imageurl="https://res.cloudinary.com/rarible-inc/image/upload/t_big/dev-itemImages/0xb37c0e089b010848d0507ec6a2b7d26cd8803fa1:13" price="0.001 ETH" linkUrl="https://ropsten.rarible.com/token/0xb37c0e089b010848d0507ec6a2b7d26cd8803fa1:13?tab=details" />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
