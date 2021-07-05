import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import TagFacesIcon from '@material-ui/icons/TagFaces';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
    background: '#141416',
    borderWidth: 0,
    border: 'none',
    marginTop: theme.spacing(4),
  },
  chip: {
    backgroundColor: '#141416',
    marginRight: theme.spacing(2),
    fontSize: 16,
    padding: 5,
    height: 40,
    borderRadius: 20,
    color: 'white',
  },
  chipSelect: {
    backgroundColor: 'white',
    marginRight: theme.spacing(2),
    fontSize: 16,
    padding: 5,
    height: 40,
    borderRadius: 20,
    color: 'black',
  },
}));

export default function ChipsArray() {
  const classes = useStyles();
  const [chipData] = React.useState([
    { key: 1, label: 'Art' },
    { key: 2, label: 'Mentorship' },
    { key: 3, label: 'Concerts' },
    { key: 4, label: 'Events' },
  ]);

  return (
    <Paper elevation={0} component="ul" className={classes.root}>
      <li key={0}>

        <Chip
          label="All items"
          className={classes.chipSelect}
          clickable
        />
      </li>
      {chipData.map((data) => {
        let icon;

        if (data.label === 'React') {
          icon = <TagFacesIcon />;
        }

        return (
          <li key={data.key}>
            <Chip
              icon={icon}
              label={data.label}
              className={classes.chip}
              clickable
            />
          </li>
        );
      })}
    </Paper>
  );
}
