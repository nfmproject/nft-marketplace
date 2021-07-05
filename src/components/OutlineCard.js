import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import { Link } from 'react-router-dom';
import singleUpload from '../assets/upload-single.jpeg';
import multiUpload from '../assets/upload-multiple.jpeg';

const useStyles = makeStyles({
  root: {
    width: 400,
    borderRadius: 20,
    background: '#141416',
    borderColor: '#353945',
    borderWidth: '2px',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  image: {
    width: 350,
    height: 300,
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
    textAlign: 'center',
    marginBottom: '20px',
  },
});

export default function OutlinedCard(checkSingle) {
  const classes = useStyles();
  let imageData = '';
  console.log(checkSingle);
  let chip = '';
  if (checkSingle.checkSingle === 'true') {
    imageData = <img alt="single upload" src={singleUpload} className={classes.image} />;
    chip = (
      <Link to="/mint-nft" style={{ textDecoration: 'none' }}>
        <Chip
          className={classes.chip}
          label="Create Single"
          variant="outlined"
          clickable
        />
      </Link>
    );
  } else {
    imageData = <img alt="multiple upload" src={multiUpload} className={classes.image} />;
    chip = (
      <Link to="/mint-nft-multiple" style={{ textDecoration: 'none' }}>
        <Chip
          className={classes.chip}
          label="Create Multiple"
          variant="outlined"
          clickable
        />
      </Link>
    );
  }

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        {imageData}
      </CardContent>
      {chip}
    </Card>
  );
}
