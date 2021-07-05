import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Chip from '@material-ui/core/Chip';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { KeyboardBackspaceRounded, ArrowForwardIosRounded } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
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

export default function MintSingle(yourJSON, setSending, setIpfsHash, ipfs, ipfsHash) {
  const classes = useStyles();

  const [title] = useState();
  const [description] = useState();
  const [imageURL] = useState();
  const [json, setjson] = useState();

  function onFormChange() {
    const da = {
      description: { description },
      external_url: 'https://austingriffith.com/portfolio/paintings/', // <-- this can link to a page for the specific file too
      image: { imageURL },
      name: { title },
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

    setjson(da);
  }

  return (
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
            onChange={onFormChange}
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
            onChange={onFormChange}
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
            onChange={onFormChange}
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
              setIpfsHash();
              const result = await ipfs.add(JSON.stringify(json)); // addToIPFS(JSON.stringify(yourJSON))
              if (result && result.path) {
                setIpfsHash(result.path);
              }
              console.log('RESULT:', result);
              console.log('HASH:', ipfsHash);
            }}
          />
        </form>
      </div>
    </div>
  );
}
