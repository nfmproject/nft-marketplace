import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia'; import Chip from '@material-ui/core/Chip';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  root: {
    background: 'none',
    borderRadius: 20,
    marginTop: '40px',
    width: '250px',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  image: {
    width: '250px',
    height: '340px',
    objectFit: 'cover',
    borderRadius: 20,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  chip: {
    borderColor: '#353945',
    borderWidth: '0px',
    fontSize: 14,
    height: 40,
    borderRadius: 4,
    wordSpacing: 1.1,
    letterSpacing: 1.1,
    textAlign: 'center',
    marginBottom: '20px',
  },
  price: {
    borderColor: 'lightgreen',
    borderWidth: '2px',
    fontSize: 10,
    height: 20,
    borderRadius: 3,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '5px',
    color: 'lightgreen',
  },
  bodyText: {
    color: 'white',
  },
  row: {
    display: 'inline-block',
  },
});

export default function CardList(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="300"
          image={props.imageurl}
          title="Contemplative Reptile"
          className={classes.image}
        />
        <CardContent>
          <Chip
            className={classes.price}
            label={props.price}
            variant="outlined"
            clickable
          />
          <Typography className={classes.bodyText} gutterBottom variant="h5" component="h2">
            {props.title}
          </Typography>
          <Typography className={classes.bodyText} variant="body2" color="textSecondary" component="p">
            {props.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <a href={props.linkUrl} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
          <Chip
            className={classes.chip}
            label="OPEN"
            variant="outlined"
            clickable
          />
        </a>
      </CardActions>
    </Card>
  );
}
