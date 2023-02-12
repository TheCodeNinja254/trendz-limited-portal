import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
} from "@material-ui/core";
import { HashLink } from "react-router-hash-link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import introImage from "../../../../assets/images/Graphics/cooled.jpg";
import logo from "../../../../assets/images/Logo.png";
import Image from "../../../../components/Image";

const useStyles = makeStyles((theme) => ({
  root: {},
  introContainer: {
    paddingTop: theme.spacing(5),
  },
  textInitial: {
    fontSize: 30,
    fontWeight: "lighter",
    [theme.breakpoints.down("sm")]: {
      fontSize: 20,
    },
  },
  textTrailing: {
    fontSize: 30,
    fontWeight: "bolder",
    [theme.breakpoints.down("sm")]: {
      fontSize: 20,
    },
  },
  IntroText: {
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(3),
    overflowX: "inherit",
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      marginLeft: theme.spacing(0),
    },
  },
  sloganText: {
    fontSize: 26,
    fontWeight: 500,
    marginTop: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      fontSize: 16,
      fontWeight: 300,
    },
  },
  sendMoneyButton: {
    marginRight: theme.spacing(2),
    color: theme.palette.white.main,
    fontWeight: "lighter",
  },
  createAccount: {
    color: theme.palette.primary.main,
    fontWeight: "lighter",
    borderColor: theme.palette.primary.main,
  },
  actionButtons: {
    marginTop: theme.spacing(7),
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(2),
    },
  },
  introCard: {
    backgroundImage: `url(${introImage})`,
    height: 300,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    opacity: 0.9,
  },
  inCardTextMinor: {
    fontSize: 20,
    fontWeight: 200,
  },
  inlineText: {
    fontSize: 20,
    fontWeight: 500,
    color: theme.palette.primary.main,
  },
  inCardText: {
    fontSize: 25,
    fontWeight: 700,
  },
  introLogo: {
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(2),
    },
  },
}));
const IntroductionScreen = () => {
  const classes = useStyles();

  return (
    <Card elevation={0} className={classes.root} id="top">
      <CardContent>
        <Container>
          <Grid container spacing={3} className={classes.introContainer}>
            <Grid item lg={6} xl={6} md={6} sm={12} xs={12}>
              <Image src={logo} alt="logo" className={classes.introLogo} />
              <Typography className={classes.sloganText}>
                Send and Receive Money on <strong>Quikk</strong>
              </Typography>

              <div className={classes.actionButtons}>
                <HashLink to="#transactions" smooth>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.sendMoneyButton}
                  >
                    Make an Order
                  </Button>
                </HashLink>
                <HashLink to="#auth" smooth>
                  <Button variant="outlined" className={classes.createAccount}>
                    Learn More
                  </Button>
                </HashLink>
                <br />
              </div>
            </Grid>
            <Grid item lg={6} xl={6} md={6} sm={12} xs={12}>
              <Card className={classes.introCard} elevation={0}>
                <CardContent>
                  <Box display="flex" justifyContent="right">
                    <Typography variant="body2" color="primary">
                      <strong>Trendz Limited</strong>
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="right">
                    <Typography className={classes.inCardTextMinor}>
                      For all your cooling solutions
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </CardContent>
    </Card>
  );
};

export default IntroductionScreen;
